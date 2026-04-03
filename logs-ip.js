// ==UserScript==
// @name        IP Info Viewer для Black Logs
// @namespace   http://tampermonkey.net/
// @version     1.1
// @description Просмотр информации об IP адресе на logs.blackrussia.online
// @match       https://logs.blackrussia.online/gslogs/*
// @grant       GM_xmlhttpRequest
// @connect     ipapi.co
// @connect     ipwhois.app
// @connect     ip.sb
// @connect     ip-api.com
// @connect     freeipapi.com
// @connect     reallyfreegeoip.org
// ==/UserScript==

(function() {
    'use strict';

    // Функция для получения информации об IP с несколькими сервисами
    async function getIPInfo(ip) {
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (!ipRegex.test(ip)) {
            throw new Error(`Неверный формат IP: ${ip}`);
        }

        return new Promise((resolve, reject) => {
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
                        getIPInfoAlternative(ip).then(resolve).catch(reject);
                    }
                },
                onerror: function(error) {
                    getIPInfoAlternative(ip).then(resolve).catch(reject);
                },
                timeout: 10000
            });
        });
    }

    // Альтернативная функция для получения информации об IP
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
                },
                {
                    url: `https://reallyfreegeoip.org/json/${ip}`,
                    parser: (data) => ({
                        ip: data.ip,
                        country: data.country_name,
                        city: data.city,
                        region: data.region_name,
                        timezone: data.time_zone,
                        org: '',
                        asn: '',
                        latitude: data.latitude,
                        longitude: data.longitude
                    }),
                    check: (data) => !!data.ip
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
                            tryNextService();
                        }
                    },
                    onerror: function(error) {
                        tryNextService();
                    },
                    ontimeout: function() {
                        tryNextService();
                    },
                    timeout: 15000
                });
            }

            tryNextService();
        });
    }

    // Функция для отображения информации об IP в модальном окне
    async function showIPInfo(ip) {
        const modalId = 'ip-info-modal-' + Date.now();
        
        const overlay = document.createElement("div");
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,.8);
            z-index: 9999;
            backdrop-filter: blur(4px);
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const wrapper = document.createElement("div");
        wrapper.style.cssText = `
            position: fixed;
            z-index: 10000;
            inset: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 16px;
        `;

        const modal = document.createElement("div");
        modal.style.cssText = `
            background: rgba(26, 26, 26, 0.95);
            color: #ffffff;
            box-shadow: 0 10px 35px rgba(0,0,0,.5);
            width: 95%;
            max-width: 500px;
            border-radius: 12px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            border: 1px solid rgba(255,255,255,0.1);
            backdrop-filter: blur(15px);
            opacity: 0;
            transform: scale(0.95);
            transition: opacity 0.3s ease, transform 0.3s ease;
        `;

        const header = document.createElement("div");
        header.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            cursor: move;
        `;

        const title = document.createElement("h3");
        title.style.cssText = `
            font-size: 16px;
            font-weight: 600;
            color: #2b8cff;
            margin: 0;
        `;
        title.textContent = `Информация об IP: ${ip}`;

        const closeBtn = document.createElement("button");
        closeBtn.innerHTML = "&times;";
        closeBtn.style.cssText = `
            background: transparent;
            border: none;
            color: #cccccc;
            font-size: 28px;
            line-height: 1;
            padding: 0 8px;
            cursor: pointer;
            transition: color 0.3s ease;
        `;
        closeBtn.onmouseover = () => closeBtn.style.color = '#ffffff';
        closeBtn.onmouseout = () => closeBtn.style.color = '#cccccc';

        const content = document.createElement("div");
        content.style.cssText = `
            padding: 16px;
            max-height: 60vh;
            overflow-y: auto;
        `;
        content.innerHTML = '<div style="text-align: center; padding: 20px;">⏳ Загрузка информации об IP...</div>';

        header.appendChild(title);
        header.appendChild(closeBtn);
        modal.appendChild(header);
        modal.appendChild(content);
        wrapper.appendChild(modal);
        document.body.appendChild(overlay);
        document.body.appendChild(wrapper);

        setTimeout(() => {
            overlay.style.opacity = '1';
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        }, 10);

        const closeModal = () => {
            overlay.style.opacity = '0';
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.95)';
            setTimeout(() => {
                overlay.remove();
                wrapper.remove();
            }, 300);
        };

        closeBtn.onclick = closeModal;
        overlay.onclick = closeModal;

        // Drag functionality
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;

        const dragStart = (e) => {
            if (e.target === closeBtn) return;
            initialX = e.clientX - modal.offsetLeft;
            initialY = e.clientY - modal.offsetTop;
            isDragging = true;
        };

        const drag = (e) => {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                modal.style.position = 'relative';
                modal.style.left = `${currentX}px`;
                modal.style.top = `${currentY}px`;
            }
        };

        const dragEnd = () => {
            isDragging = false;
        };

        header.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        try {
            const ipInfo = await getIPInfo(ip);
            
            const hasRealData = ipInfo.country &&
                               ipInfo.country !== 'Неизвестно' &&
                               ipInfo.country !== 'Не удалось определить' &&
                               ipInfo.country !== 'Undefined' &&
                               ipInfo.country !== '';

            if (hasRealData) {
                content.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <strong>🌐 IP адрес:</strong>
                            <span>${ipInfo.ip}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <strong>🇺🇳 Страна:</strong>
                            <span>${ipInfo.country}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <strong>🏙️ Город:</strong>
                            <span>${ipInfo.city || 'Неизвестно'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <strong>🗺️ Регион:</strong>
                            <span>${ipInfo.region || 'Неизвестно'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <strong>⏰ Временная зона:</strong>
                            <span>${ipInfo.timezone || 'Неизвестно'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <strong>🏢 Организация:</strong>
                            <span>${ipInfo.org || 'Неизвестно'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <strong>🔗 ASN:</strong>
                            <span>${ipInfo.asn || 'Неизвестно'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                            <strong>📍 Координаты:</strong>
                            <span>${ipInfo.latitude ? ipInfo.latitude + ', ' + ipInfo.longitude : 'Неизвестно'}</span>
                        </div>
                        ${ipInfo.note ? `<div style="padding: 8px 0; color: #ffd700; font-style: italic;">ℹ️ ${ipInfo.note}</div>` : ''}
                    </div>
                `;
            } else {
                content.innerHTML = `
                    <div style="text-align: center; padding: 20px; color: #ff4757;">
                        <strong>❌ Не удалось получить информацию об IP адресе ${ip}</strong>
                        <div style="margin-top: 15px; font-size: 14px; color: #cccccc;">
                            Возможные причины:<br>
                            • IP адрес принадлежит частной сети<br>
                            • Сервисы геолокации временно недоступны<br>
                            • IP адрес зарезервирован или не существует
                        </div>
                    </div>
                `;
            }
        } catch (error) {
            content.innerHTML = `
                <div style="text-align: center; padding: 20px; color: #ff4757;">
                    <strong>⚠️ Ошибка при получении информации об IP</strong>
                    <div style="margin-top: 10px; font-size: 14px;">${error.message}</div>
                </div>
            `;
        }
    }

    // Функция для добавления кнопок информации об IP
    function addIPInfoButtons() {
        // Ищем все ячейки с IP адресами на странице логов
        const ipElements = document.querySelectorAll('td.td-player-ip');
        
        ipElements.forEach(td => {
            const ip = td.textContent.trim();
            // Проверяем, что IP валидный и кнопка еще не добавлена
            if (ip && ip !== 'N/A' && ip !== '' && ip !== '—' && !td.querySelector('.ip-info-btn-custom')) {
                const btn = document.createElement('button');
                btn.textContent = 'ℹ️';
                btn.className = 'ip-info-btn-custom';
                btn.style.cssText = `
                    background: transparent;
                    color: #fff;
                    border: 1px solid #fff;
                    padding: 2px 8px;
                    margin-left: 8px;
                    font-size: 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                `;
                btn.title = 'Информация об IP';
                btn.onclick = (e) => {
                    e.stopPropagation();
                    showIPInfo(ip);
                };
                td.appendChild(btn);
            }
        });
    }

    // Ждем загрузки страницы
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            addIPInfoButtons();
            
            // Наблюдаем за изменениями на странице (пагинация, фильтры)
            const observer = new MutationObserver(() => {
                addIPInfoButtons();
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    } else {
        addIPInfoButtons();
        
        const observer = new MutationObserver(() => {
            addIPInfoButtons();
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

})();
