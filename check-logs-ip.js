// ==UserScript==
// @name        IP Address Checker
// @namespace   https://github.com/
// @version      1.1
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
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Добавляем стили сразу
    GM_addStyle(`
        .ip-check-fab {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            cursor: pointer;
            font-size: 24px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 9999;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .ip-check-fab:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0,0,0,0.4);
        }
        
        .ip-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.85);
            backdrop-filter: blur(8px);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .ip-modal-content {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            border-radius: 20px;
            padding: 25px;
            max-width: 90%;
            width: 850px;
            max-height: 85%;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            color: white;
            animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .ip-modal-content::-webkit-scrollbar {
            width: 8px;
        }
        
        .ip-modal-content::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
        }
        
        .ip-modal-content::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.3);
            border-radius: 10px;
        }
        
        .ip-input-field {
            width: 100%;
            padding: 12px;
            border: 2px solid rgba(255,255,255,0.3);
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            color: white;
            font-size: 14px;
            transition: all 0.3s ease;
            box-sizing: border-box;
        }
        
        .ip-input-field:focus {
            outline: none;
            border-color: #667eea;
            background: rgba(255,255,255,0.15);
        }
        
        .ip-input-field::placeholder {
            color: rgba(255,255,255,0.5);
        }
        
        .check-ip-btn {
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
        }
        
        .check-ip-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        
        .ip-result-card {
            background: rgba(255,255,255,0.1);
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 20px;
        }
        
        .ip-result-title {
            margin: 0 0 15px 0;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 18px;
        }
        
        .ip-info-grid {
            display: grid;
            gap: 10px;
        }
        
        .ip-info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .ip-info-row:last-child {
            border-bottom: none;
        }
        
        .distance-card {
            background: rgba(255,255,255,0.1);
            padding: 20px;
            border-radius: 15px;
            text-align: center;
        }
        
        .distance-value {
            font-size: 36px;
            font-weight: bold;
            color: #ffd700;
            margin: 10px 0;
        }
        
        .loading-spinner {
            text-align: center;
            padding: 40px;
        }
        
        .loading-spinner::after {
            content: '';
            display: inline-block;
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .error-message {
            background: rgba(255,68,68,0.2);
            border: 1px solid #ff4444;
            border-radius: 10px;
            padding: 15px;
            text-align: center;
            color: #ff8888;
        }
        
        .close-modal-btn {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            font-size: 28px;
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .close-modal-btn:hover {
            background: rgba(255,255,255,0.3);
            transform: rotate(90deg);
        }
        
        #ip-map-container {
            margin-top: 20px;
            height: 300px;
            border-radius: 15px;
            overflow: hidden;
            border: 2px solid rgba(255,255,255,0.3);
        }
    `);

    let currentModal = null;

    // Создаем плавающую кнопку
    function createFloatingButton() {
        const button = document.createElement('button');
        button.className = 'ip-check-fab';
        button.innerHTML = '🔍';
        button.title = 'Проверка IP адресов';
        document.body.appendChild(button);
        
        button.addEventListener('click', () => {
            createIPCheckModal();
        });
        
        return button;
    }

    // Создание модального окна
    function createIPCheckModal() {
        if (currentModal) {
            currentModal.style.display = 'flex';
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'ip-modal-overlay';
        
        modal.innerHTML = `
            <div class="ip-modal-content">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid rgba(255,255,255,0.3);">
                    <h2 style="margin: 0; display: flex; align-items: center; gap: 10px;">
                        <span>🔍</span> Проверка IP адресов
                    </h2>
                    <button class="close-modal-btn">×</button>
                </div>
                
                <div style="margin-bottom: 25px;">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: bold;">Первый IP адрес:</label>
                        <input type="text" id="ip1-input" class="ip-input-field" placeholder="Например: 8.8.8.8 или 192.168.1.1">
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: bold;">Второй IP адрес:</label>
                        <input type="text" id="ip2-input" class="ip-input-field" placeholder="Например: 1.1.1.1 или 8.8.4.4">
                    </div>
                    <button id="check-ip-btn" class="check-ip-btn">🔍 Проверить IP</button>
                </div>
                
                <div id="results-container" style="background: rgba(0,0,0,0.3); border-radius: 15px; padding: 20px;">
                    <div style="text-align: center; color: rgba(255,255,255,0.7);">
                        💡 Введите два IP адреса для сравнения
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        currentModal = modal;
        
        // Закрытие модального окна
        const closeBtn = modal.querySelector('.close-modal-btn');
        closeBtn.onclick = () => closeModal(modal);
        
        modal.onclick = (e) => {
            if (e.target === modal) closeModal(modal);
        };
        
        // Обработчик кнопки проверки
        const checkBtn = document.getElementById('check-ip-btn');
        checkBtn.onclick = () => checkIPs();
        
        // Обработка Enter
        const ip1Input = document.getElementById('ip1-input');
        const ip2Input = document.getElementById('ip2-input');
        
        ip1Input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkIPs();
        });
        
        ip2Input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkIPs();
        });
        
        // Фокус на первое поле
        setTimeout(() => ip1Input.focus(), 100);
    }
    
    function closeModal(modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
            currentModal = null;
        }, 300);
    }

    // Получение информации об IP
    async function getIPInfo(ip) {
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (!ipRegex.test(ip)) {
            throw new Error(`Неверный формат IP: ${ip}`);
        }

        return new Promise((resolve) => {
            const services = [
                {
                    url: `https://ipwhois.app/json/${ip}`,
                    parser: (data) => ({
                        ip: data.ip,
                        country: data.country || 'Неизвестно',
                        city: data.city || 'Неизвестно',
                        region: data.region || 'Неизвестно',
                        timezone: data.timezone || 'Неизвестно',
                        org: data.isp || 'Неизвестно',
                        asn: data.asn || 'Неизвестно',
                        latitude: data.latitude,
                        longitude: data.longitude
                    })
                },
                {
                    url: `http://ip-api.com/json/${ip}?fields=status,country,regionName,city,lat,lon,timezone,isp,as,query`,
                    parser: (data) => ({
                        ip: data.query,
                        country: data.country || 'Неизвестно',
                        city: data.city || 'Неизвестно',
                        region: data.regionName || 'Неизвестно',
                        timezone: data.timezone || 'Неизвестно',
                        org: data.isp || 'Неизвестно',
                        asn: data.as || 'Неизвестно',
                        latitude: data.lat,
                        longitude: data.lon
                    })
                },
                {
                    url: `https://freeipapi.com/api/json/${ip}`,
                    parser: (data) => ({
                        ip: data.ipAddress,
                        country: data.countryName || 'Неизвестно',
                        city: data.cityName || 'Неизвестно',
                        region: data.regionName || 'Неизвестно',
                        timezone: data.timeZone || 'Неизвестно',
                        org: data.isp || 'Неизвестно',
                        asn: '',
                        latitude: data.latitude,
                        longitude: data.longitude
                    })
                }
            ];

            let currentIndex = 0;

            function tryNextService() {
                if (currentIndex >= services.length) {
                    resolve({
                        ip: ip,
                        country: 'Не удалось определить',
                        city: 'Неизвестно',
                        region: 'Неизвестно',
                        timezone: 'Неизвестно',
                        org: 'Неизвестно',
                        asn: 'Неизвестно',
                        latitude: null,
                        longitude: null
                    });
                    return;
                }

                const service = services[currentIndex++];
                
                GM_xmlhttpRequest({
                    method: "GET",
                    url: service.url,
                    timeout: 10000,
                    onload: function(response) {
                        try {
                            if (response.status === 200) {
                                const data = JSON.parse(response.responseText);
                                const result = service.parser(data);
                                
                                if (result.country !== 'Неизвестно' && result.country !== 'Не удалось определить') {
                                    resolve(result);
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
                    onerror: () => tryNextService(),
                    ontimeout: () => tryNextService()
                });
            }

            tryNextService();
        });
    }

    // Расчет расстояния
    function calculateDistance(lat1, lon1, lat2, lon2) {
        if (!lat1 || !lon1 || !lat2 || !lon2) return 'Недостаточно данных';
        
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;
        
        return distance.toFixed(2) + ' км';
    }

    // Отображение результатов
    async function displayResults(result1, result2) {
        const container = document.getElementById('results-container');
        const distance = calculateDistance(result1.latitude, result1.longitude, result2.latitude, result2.longitude);
        
        const formatValue = (value) => {
            if (!value || value === 'Неизвестно' || value === 'Не удалось определить') {
                return '<span style="color: #ff8888;">Неизвестно</span>';
            }
            return value;
        };
        
        container.innerHTML = `
            <div class="ip-result-card">
                <div class="ip-result-title">
                    <span>🖥️</span> IP 1: ${result1.ip}
                </div>
                <div class="ip-info-grid">
                    <div class="ip-info-row"><strong>🌍 Страна:</strong> ${formatValue(result1.country)}</div>
                    <div class="ip-info-row"><strong>🏙️ Город:</strong> ${formatValue(result1.city)}</div>
                    <div class="ip-info-row"><strong>🗺️ Регион:</strong> ${formatValue(result1.region)}</div>
                    <div class="ip-info-row"><strong>🕐 Временная зона:</strong> ${formatValue(result1.timezone)}</div>
                    <div class="ip-info-row"><strong>🏢 Организация:</strong> ${formatValue(result1.org)}</div>
                    <div class="ip-info-row"><strong>🔗 ASN:</strong> ${formatValue(result1.asn)}</div>
                    <div class="ip-info-row"><strong>📍 Координаты:</strong> ${result1.latitude ? result1.latitude + ', ' + result1.longitude : 'Неизвестно'}</div>
                </div>
            </div>
            
            <div class="ip-result-card">
                <div class="ip-result-title">
                    <span>🖥️</span> IP 2: ${result2.ip}
                </div>
                <div class="ip-info-grid">
                    <div class="ip-info-row"><strong>🌍 Страна:</strong> ${formatValue(result2.country)}</div>
                    <div class="ip-info-row"><strong>🏙️ Город:</strong> ${formatValue(result2.city)}</div>
                    <div class="ip-info-row"><strong>🗺️ Регион:</strong> ${formatValue(result2.region)}</div>
                    <div class="ip-info-row"><strong>🕐 Временная зона:</strong> ${formatValue(result2.timezone)}</div>
                    <div class="ip-info-row"><strong>🏢 Организация:</strong> ${formatValue(result2.org)}</div>
                    <div class="ip-info-row"><strong>🔗 ASN:</strong> ${formatValue(result2.asn)}</div>
                    <div class="ip-info-row"><strong>📍 Координаты:</strong> ${result2.latitude ? result2.latitude + ', ' + result2.longitude : 'Неизвестно'}</div>
                </div>
            </div>
            
            <div class="distance-card">
                <div style="font-size: 18px; margin-bottom: 10px;">📏 Расстояние между IP</div>
                <div class="distance-value">${distance}</div>
                ${distance !== 'Недостаточно данных' ? '<div style="font-size: 12px;">Прямое расстояние по поверхности Земли</div>' : ''}
            </div>
        `;
        
        // Показываем карту если есть координаты
        if (result1.latitude && result1.longitude && result2.latitude && result2.longitude) {
            await loadMap(result1, result2);
        }
    }
    
    // Загрузка карты
    async function loadMap(ip1, ip2) {
        const container = document.getElementById('results-container');
        
        const mapContainer = document.createElement('div');
        mapContainer.id = 'ip-map-container';
        container.appendChild(mapContainer);
        
        // Проверяем загружена ли Leaflet
        if (typeof L === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.onload = () => initMap(ip1, ip2);
            document.head.appendChild(script);
        } else {
            initMap(ip1, ip2);
        }
    }
    
    function initMap(ip1, ip2) {
        const container = document.getElementById('ip-map-container');
        if (!container) return;
        
        try {
            const map = L.map(container).setView([ip1.latitude, ip1.longitude], 3);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            L.marker([ip1.latitude, ip1.longitude])
                .addTo(map)
                .bindPopup(`<b>IP 1</b><br>${ip1.ip}<br>${ip1.city}, ${ip1.country}`);
            
            L.marker([ip2.latitude, ip2.longitude])
                .addTo(map)
                .bindPopup(`<b>IP 2</b><br>${ip2.ip}<br>${ip2.city}, ${ip2.country}`);
            
            L.polyline([
                [ip1.latitude, ip1.longitude],
                [ip2.latitude, ip2.longitude]
            ], {
                color: '#ffd700',
                weight: 3,
                opacity: 0.8,
                dashArray: '5, 10'
            }).addTo(map);
            
            const bounds = L.latLngBounds([
                [ip1.latitude, ip1.longitude],
                [ip2.latitude, ip2.longitude]
            ]);
            map.fitBounds(bounds.pad(0.1));
            
        } catch (error) {
            console.error('Map error:', error);
            container.innerHTML = '<div style="padding: 20px; text-align: center; color: #ff8888;">❌ Не удалось загрузить карту</div>';
        }
    }

    // Проверка IP
    async function checkIPs() {
        const ip1 = document.getElementById('ip1-input').value.trim();
        const ip2 = document.getElementById('ip2-input').value.trim();
        const container = document.getElementById('results-container');
        
        if (!ip1 || !ip2) {
            container.innerHTML = '<div class="error-message">⚠️ Пожалуйста, введите оба IP адреса</div>';
            return;
        }
        
        container.innerHTML = '<div class="loading-spinner"></div>';
        
        try {
            const [result1, result2] = await Promise.all([
                getIPInfo(ip1),
                getIPInfo(ip2)
            ]);
            
            await displayResults(result1, result2);
        } catch (error) {
            container.innerHTML = `<div class="error-message">❌ Ошибка: ${error.message}</div>`;
        }
    }

    // Запуск скрипта
    function init() {
        // Ждем загрузки body
        if (document.body) {
            createFloatingButton();
        } else {
            document.addEventListener('DOMContentLoaded', () => createFloatingButton());
        }
    }
    
    init();
    
})();
