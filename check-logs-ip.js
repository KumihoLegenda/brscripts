// ==UserScript==
// @name        IP Address Checker
// @namespace   https://github.com/
// @version      1.0
// @description  Проверка IP адресов с геолокацией и отображением расстояния между ними
// @author       Based on BR Logs script
// @match        https://logs.blackrussia.online/gslogs/*
// @match        *://*/*
// @icon         https://cdn-icons-png.flaticon.com/512/1057/1057108.png
// @license      MIT
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @connect      ipapi.co
// @connect      ipwhois.app
// @connect      ip.sb
// @connect      ip-api.com
// @connect      freeipapi.com
// @connect      reallyfreegeoip.org
// @resource leafletCSS https://unpkg.com/leaflet@1.9.4/dist/leaflet.css
// @resource fontAwesomeCSS https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css
// @downloadURL https://update.greasyfork.org/scripts/ip-address-checker.user.js
// @updateURL https://update.greasyfork.org/scripts/ip-address-checker.meta.js
// ==/UserScript==

(function() {
    'use strict';

    // === КОНФИГУРАЦИЯ ===
    let currentModal = null;

    // === СОЗДАНИЕ КНОПКИ ===
    function createIPCheckButton() {
        // Ждем загрузки страницы
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', insertButton);
        } else {
            insertButton();
        }
    }

    function insertButton() {
        // Ищем подходящее место для кнопки
        let targetElement = document.querySelector('.navbar-nav');
        
        if (!targetElement) {
            targetElement = document.querySelector('nav .container-fluid');
        }
        
        if (!targetElement) {
            targetElement = document.querySelector('header');
        }
        
        if (!targetElement) {
            targetElement = document.body;
        }

        const ipCheckButton = document.createElement('button');
        ipCheckButton.className = 'ip-check-button-global';
        ipCheckButton.id = 'ip-check-button-global';
        ipCheckButton.textContent = '🔍 ПРОВЕРКА IP';
        ipCheckButton.style.cssText = `
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            margin: 5px;
        `;

        ipCheckButton.onmouseenter = () => {
            ipCheckButton.style.transform = 'translateY(-2px)';
            ipCheckButton.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
        };
        
        ipCheckButton.onmouseleave = () => {
            ipCheckButton.style.transform = 'translateY(0)';
            ipCheckButton.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        };

        ipCheckButton.onclick = () => {
            createIPCheckModal();
        };

        // Вставляем кнопку
        if (targetElement && targetElement !== document.body) {
            targetElement.appendChild(ipCheckButton);
        } else {
            const container = document.createElement('div');
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
            `;
            container.appendChild(ipCheckButton);
            document.body.appendChild(container);
        }
    }

    // === СОЗДАНИЕ МОДАЛЬНОГО ОКНА ===
    function createIPCheckModal() {
        if (currentModal) {
            currentModal.style.display = 'flex';
            return;
        }

        const modal = document.createElement('div');
        modal.id = 'ip-check-modal-global';
        modal.className = 'ip-modal-global';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            backdrop-filter: blur(5px);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        `;

        const modalContent = document.createElement('div');
        modalContent.className = 'ip-modal-content-global';
        modalContent.style.cssText = `
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            border-radius: 20px;
            padding: 25px;
            max-width: 90%;
            width: 800px;
            max-height: 90%;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            color: white;
        `;

        const header = document.createElement('div');
        header.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid rgba(255,255,255,0.3);
        `;
        header.innerHTML = `
            <h2 style="margin: 0; display: flex; align-items: center; gap: 10px;">
                <span>🔍</span> Проверка IP адресов
            </h2>
            <button class="ip-modal-close-global" style="
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                width: 35px;
                height: 35px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            ">×</button>
        `;

        const body = document.createElement('div');
        body.innerHTML = `
            <div class="ip-form-global" style="margin-bottom: 25px;">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: bold;">Первый IP адрес:</label>
                    <input type="text" id="ip1-global" placeholder="Например: 8.8.8.8" style="
                        width: 100%;
                        padding: 10px;
                        border: 2px solid rgba(255,255,255,0.3);
                        background: rgba(255,255,255,0.1);
                        border-radius: 10px;
                        color: white;
                        font-size: 14px;
                    ">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: bold;">Второй IP адрес:</label>
                    <input type="text" id="ip2-global" placeholder="Например: 1.1.1.1" style="
                        width: 100%;
                        padding: 10px;
                        border: 2px solid rgba(255,255,255,0.3);
                        background: rgba(255,255,255,0.1);
                        border-radius: 10px;
                        color: white;
                        font-size: 14px;
                    ">
                </div>
                <button id="check-ip-btn-global" style="
                    width: 100%;
                    padding: 12px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">🔍 Проверить IP</button>
            </div>
            <div id="ip-results-global" style="
                background: rgba(0,0,0,0.3);
                border-radius: 15px;
                padding: 20px;
                text-align: center;
            ">
                <div style="color: rgba(255,255,255,0.7);">Введите IP адреса для проверки</div>
            </div>
        `;

        modalContent.appendChild(header);
        modalContent.appendChild(body);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        currentModal = modal;

        // Закрытие модального окна
        const closeBtn = modal.querySelector('.ip-modal-close-global');
        closeBtn.onclick = () => {
            modal.style.display = 'none';
            setTimeout(() => {
                modal.remove();
                currentModal = null;
            }, 300);
        };

        // Закрытие по клику вне окна
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                setTimeout(() => {
                    modal.remove();
                    currentModal = null;
                }, 300);
            }
        };

        // Обработчик кнопки проверки
        const checkBtn = document.getElementById('check-ip-btn-global');
        checkBtn.onclick = () => checkIPs();

        // Добавляем обработку Enter в полях ввода
        const ip1Input = document.getElementById('ip1-global');
        const ip2Input = document.getElementById('ip2-global');
        
        ip1Input.onkeypress = (e) => {
            if (e.key === 'Enter') checkIPs();
        };
        
        ip2Input.onkeypress = (e) => {
            if (e.key === 'Enter') checkIPs();
        };
    }

    // === ПОЛУЧЕНИЕ ИНФОРМАЦИИ ОБ IP ===
    async function getIPInfo(ip) {
        // Проверяем валидность IP
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (!ipRegex.test(ip)) {
            throw new Error(`Неверный формат IP: ${ip}`);
        }

        return new Promise((resolve, reject) => {
            // Сначала пробуем ipapi.co
            GM_xmlhttpRequest({
                method: "GET",
                url: `https://ipapi.co/${ip}/json/`,
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                    "Accept": "application/json"
                },
                onload: function(response) {
                    try {
                        if (response.status === 200) {
                            const data = JSON.parse(response.responseText);
                            
                            if (data.error || data.reserved) {
                                getIPInfoAlternative(ip).then(resolve).catch(reject);
                            } else {
                                const result = {
                                    ip: data.ip || ip,
                                    country: data.country_name || 'Неизвестно',
                                    city: data.city || 'Неизвестно',
                                    region: data.region || 'Неизвестно',
                                    timezone: data.timezone || 'Неизвестно',
                                    org: data.org || 'Неизвестно',
                                    asn: data.asn || 'Неизвестно',
                                    latitude: data.latitude,
                                    longitude: data.longitude
                                };

                                if (result.country !== 'Неизвестно' && result.city !== 'Неизвестно') {
                                    resolve(result);
                                } else {
                                    getIPInfoAlternative(ip).then(resolve).catch(reject);
                                }
                            }
                        } else {
                            getIPInfoAlternative(ip).then(resolve).catch(reject);
                        }
                    } catch (e) {
                        console.error('Error with ipapi.co:', e);
                        getIPInfoAlternative(ip).then(resolve).catch(reject);
                    }
                },
                onerror: function(error) {
                    console.error('Network error with ipapi.co:', error);
                    getIPInfoAlternative(ip).then(resolve).catch(reject);
                },
                timeout: 10000
            });
        });
    }

    // Альтернативные сервисы для получения информации об IP
    function getIPInfoAlternative(ip) {
        return new Promise((resolve, reject) => {
            const services = [
                {
                    url: `https://ipwhois.app/json/${ip}`,
                    parser: (data) => ({
                        ip: data.ip,
                        country: data.country,
                        city: data.city,
                        region: data.region,
                        timezone: data.timezone,
                        org: data.isp,
                        asn: data.asn,
                        latitude: data.latitude,
                        longitude: data.longitude
                    }),
                    check: (data) => data.success !== false
                },
                {
                    url: `https://api.ip.sb/geoip/${ip}`,
                    parser: (data) => ({
                        ip: data.ip,
                        country: data.country,
                        city: data.city,
                        region: data.region,
                        timezone: data.timezone,
                        org: data.organization,
                        asn: data.asn,
                        latitude: data.latitude,
                        longitude: data.longitude
                    }),
                    check: (data) => !!data.ip
                },
                {
                    url: `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`,
                    parser: (data) => ({
                        ip: data.query,
                        country: data.country,
                        city: data.city,
                        region: data.regionName,
                        timezone: data.timezone,
                        org: data.isp,
                        asn: data.as,
                        latitude: data.lat,
                        longitude: data.lon
                    }),
                    check: (data) => data.status === 'success'
                },
                {
                    url: `https://freeipapi.com/api/json/${ip}`,
                    parser: (data) => ({
                        ip: data.ipAddress,
                        country: data.countryName,
                        city: data.cityName,
                        region: data.regionName,
                        timezone: data.timeZone,
                        org: data.isp,
                        asn: '',
                        latitude: data.latitude,
                        longitude: data.longitude
                    }),
                    check: (data) => !!data.ipAddress
                }
            ];

            let currentServiceIndex = 0;

            function tryNextService() {
                if (currentServiceIndex >= services.length) {
                    const fallbackResult = {
                        ip: ip,
                        country: 'Не удалось определить',
                        city: 'Неизвестно',
                        region: 'Неизвестно',
                        timezone: 'Неизвестно',
                        org: 'Неизвестно',
                        asn: 'Неизвестно',
                        latitude: null,
                        longitude: null,
                        note: 'Сервисы геолокации временно недоступны'
                    };
                    resolve(fallbackResult);
                    return;
                }

                const service = services[currentServiceIndex];
                currentServiceIndex++;

                GM_xmlhttpRequest({
                    method: "GET",
                    url: service.url,
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                        "Accept": "application/json"
                    },
                    onload: function(response) {
                        try {
                            if (response.status === 200) {
                                const data = JSON.parse(response.responseText);

                                if (service.check(data)) {
                                    const result = service.parser(data);

                                    const hasRealData = result.country &&
                                                       result.country !== 'Неизвестно' &&
                                                       result.country !== 'Undefined' &&
                                                       result.country !== '';

                                    if (hasRealData) {
                                        resolve(result);
                                    } else {
                                        tryNextService();
                                    }
                                } else {
                                    tryNextService();
                                }
                            } else {
                                tryNextService();
                            }
                        } catch (e) {
                            console.error('Error parsing IP API response:', e);
                            tryNextService();
                        }
                    },
                    onerror: function(error) {
                        console.error('Network error for IP API:', error);
                        tryNextService();
                    },
                    ontimeout: function() {
                        console.error('Timeout for IP API');
                        tryNextService();
                    },
                    timeout: 15000
                });
            }

            tryNextService();
        });
    }

    // === РАСЧЕТ РАССТОЯНИЯ МЕЖДУ КООРДИНАТАМИ ===
    function calculateDistance(lat1, lon1, lat2, lon2) {
        if (!lat1 || !lon1 || !lat2 || !lon2) return 'Недостаточно данных';

        const R = 6371; // Радиус Земли в км
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;

        return distance.toFixed(2) + ' км';
    }

    // === ОТОБРАЖЕНИЕ РЕЗУЛЬТАТОВ ===
    async function displayIPResults(result1, result2) {
        const resultsContainer = document.getElementById('ip-results-global');
        const distance = calculateDistance(result1.latitude, result1.longitude, result2.latitude, result2.longitude);

        const formatValue = (value) => {
            if (!value || value === 'Неизвестно' || value === 'Не удалось определить') {
                return '<span style="color: #ff6b6b;">Неизвестно</span>';
            }
            return value;
        };

        resultsContainer.innerHTML = `
            <div style="display: grid; gap: 20px;">
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px;">
                    <h3 style="margin: 0 0 15px 0; display: flex; align-items: center; gap: 10px;">
                        <span>🖥️</span> IP 1: ${result1.ip}
                    </h3>
                    <div style="display: grid; gap: 10px;">
                        <div><strong>🌍 Страна:</strong> ${formatValue(result1.country)}</div>
                        <div><strong>🏙️ Город:</strong> ${formatValue(result1.city)}</div>
                        <div><strong>🗺️ Регион:</strong> ${formatValue(result1.region)}</div>
                        <div><strong>🕐 Временная зона:</strong> ${formatValue(result1.timezone)}</div>
                        <div><strong>🏢 Организация:</strong> ${formatValue(result1.org)}</div>
                        <div><strong>🔗 ASN:</strong> ${formatValue(result1.asn)}</div>
                        <div><strong>📍 Координаты:</strong> ${result1.latitude ? result1.latitude + ', ' + result1.longitude : 'Неизвестно'}</div>
                        ${result1.note ? `<div style="color: #ffd700;"><strong>ℹ️ Примечание:</strong> ${result1.note}</div>` : ''}
                    </div>
                </div>

                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px;">
                    <h3 style="margin: 0 0 15px 0; display: flex; align-items: center; gap: 10px;">
                        <span>🖥️</span> IP 2: ${result2.ip}
                    </h3>
                    <div style="display: grid; gap: 10px;">
                        <div><strong>🌍 Страна:</strong> ${formatValue(result2.country)}</div>
                        <div><strong>🏙️ Город:</strong> ${formatValue(result2.city)}</div>
                        <div><strong>🗺️ Регион:</strong> ${formatValue(result2.region)}</div>
                        <div><strong>🕐 Временная зона:</strong> ${formatValue(result2.timezone)}</div>
                        <div><strong>🏢 Организация:</strong> ${formatValue(result2.org)}</div>
                        <div><strong>🔗 ASN:</strong> ${formatValue(result2.asn)}</div>
                        <div><strong>📍 Координаты:</strong> ${result2.latitude ? result2.latitude + ', ' + result2.longitude : 'Неизвестно'}</div>
                        ${result2.note ? `<div style="color: #ffd700;"><strong>ℹ️ Примечание:</strong> ${result2.note}</div>` : ''}
                    </div>
                </div>

                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; text-align: center;">
                    <h3 style="margin: 0 0 15px 0;">📏 Расстояние между IP</h3>
                    <div style="font-size: 32px; font-weight: bold; color: #ffd700;">${distance}</div>
                    ${distance !== 'Недостаточно данных' ? '<div style="font-size: 12px; margin-top: 10px;">Прямое расстояние по поверхности Земли</div>' : ''}
                </div>
            </div>
        `;

        // Показываем карту, если есть координаты
        if (result1.latitude && result1.longitude && result2.latitude && result2.longitude) {
            await showMap(result1, result2);
        }
    }

    // === ПОКАЗ КАРТЫ ===
    async function showMap(ip1, ip2) {
        const resultsContainer = document.getElementById('ip-results-global');
        
        const mapContainer = document.createElement('div');
        mapContainer.id = 'ip-map-container-global';
        mapContainer.style.cssText = `
            margin-top: 20px;
            height: 300px;
            border-radius: 15px;
            overflow: hidden;
            border: 2px solid rgba(255,255,255,0.3);
        `;
        
        resultsContainer.appendChild(mapContainer);

        // Загружаем Leaflet
        if (typeof L === 'undefined') {
            // Загружаем CSS
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);
            
            // Загружаем JS
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.onload = () => initializeMap(ip1, ip2, mapContainer);
            document.head.appendChild(script);
        } else {
            initializeMap(ip1, ip2, mapContainer);
        }
    }

    function initializeMap(ip1, ip2, container) {
        try {
            const map = L.map(container).setView([ip1.latitude, ip1.longitude], 3);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            L.marker([ip1.latitude, ip1.longitude])
                .addTo(map)
                .bindPopup(`<b>IP 1</b><br>${ip1.ip}<br>${ip1.city || 'Неизвестно'}, ${ip1.country || 'Неизвестно'}`)
                .openPopup();

            L.marker([ip2.latitude, ip2.longitude])
                .addTo(map)
                .bindPopup(`<b>IP 2</b><br>${ip2.ip}<br>${ip2.city || 'Неизвестно'}, ${ip2.country || 'Неизвестно'}`);

            L.polyline([
                [ip1.latitude, ip1.longitude],
                [ip2.latitude, ip2.longitude]
            ], {
                color: '#ff4757',
                weight: 3,
                opacity: 0.8,
                dashArray: '5, 10'
            }).addTo(map);

            const group = new L.featureGroup([
                L.marker([ip1.latitude, ip1.longitude]),
                L.marker([ip2.latitude, ip2.longitude])
            ]);
            map.fitBounds(group.getBounds().pad(0.1));

        } catch (error) {
            console.error('Error initializing map:', error);
            container.innerHTML = '<div style="padding: 20px; text-align: center; color: #ff6b6b;">❌ Не удалось загрузить карту</div>';
        }
    }

    // === ПРОВЕРКА IP ===
    async function checkIPs() {
        const ip1 = document.getElementById('ip1-global').value.trim();
        const ip2 = document.getElementById('ip2-global').value.trim();
        const resultsContainer = document.getElementById('ip-results-global');

        if (!ip1 || !ip2) {
            resultsContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: #ff6b6b;">⚠️ Пожалуйста, введите оба IP адреса</div>';
            return;
        }

        resultsContainer.innerHTML = '<div style="padding: 20px; text-align: center;">⏳ Загрузка данных...</div>';

        try {
            const [result1, result2] = await Promise.all([
                getIPInfo(ip1),
                getIPInfo(ip2)
            ]);

            await displayIPResults(result1, result2);
        } catch (error) {
            resultsContainer.innerHTML = `<div style="padding: 20px; text-align: center; color: #ff6b6b;">❌ Ошибка при получении данных: ${error.message}</div>`;
        }
    }

    // === ЗАПУСК СКРИПТА ===
    createIPCheckButton();

})();
