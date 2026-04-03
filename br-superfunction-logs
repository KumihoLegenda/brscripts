// ==UserScript==
// @name        Скрипт для системы логирования + TradeID Viewer (Light)
// @namespace    https://logs.blackrussia.online/
// @version      1.3
// @description  TradeID Viewer + IP Checker + Vehicle Exchange (без изменения стилей)
// @author       Kumiho + Assistant
// @match        https://logs.blackrussia.online/gslogs/*
// @icon         https://freepngimg.com/thumb/eagle/20-eagle-black-siluet-png-image-download-thumb.png
// @license      Kumiho + GNU GPLv3
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @connect      logs.blackrussia.online
// @connect      2ip.ru
// @connect      ipapi.co
// @connect      ipwhois.app
// @connect      ip.sb
// @connect      freeipapi.com
// @connect      ip-api.com
// @connect      reallyfreegeoip.org
// @connect      jsonip.com
// @resource leafletCSS https://unpkg.com/leaflet@1.9.4/dist/leaflet.css
// @resource fontAwesomeCSS https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css
// @downloadURL https://update.greasyfork.org/scripts/487756/%D0%A1%D0%BA%D1%80%D0%B8%D0%BF%D1%82%20%D0%B4%D0%BB%D1%8F%20%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D1%8B%20%D0%BB%D0%BE%D0%B3%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%20%2B%20TradeID%20Viewer.user.js
// @updateURL https://update.greasyfork.org/scripts/487756/%D0%A1%D0%BA%D1%80%D0%B8%D0%BF%D1%82%20%D0%B4%D0%BB%D1%8F%20%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D1%8B%20%D0%BB%D0%BE%D0%B3%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%20%2B%20TradeID%20Viewer.meta.js
// ==/UserScript==

(function () {
    'use strict';

    // === КОНФИГУРАЦИЯ TRADEID VIEWER ===
    const REQUEST_DELAY_MS = 4000;
    const SHOW_CONNECT_BTN_DELAY_MS = 2000;
    let lastRequestTime = 0;
    const openModals = {};

    const SERVER_ID_MATCH = window.location.pathname.match(/\/gslogs\/(\d+)/);
    const SERVER_ID = SERVER_ID_MATCH ? SERVER_ID_MATCH[1] : '1';

    // === ФУНКЦИИ IP ПРОВЕРКИ ===

    function createIPCheckButton() {
        const ipCheckButton = document.createElement('button');
        ipCheckButton.className = 'ip-check-button';
        ipCheckButton.id = 'ip-check-toggle';
        ipCheckButton.href = '#!';
        ipCheckButton.tabIndex = '0';
        ipCheckButton.dataset.bsToggle = 'modal';
        ipCheckButton.dataset.bsTarget = '#ip-check-modal';
        ipCheckButton.textContent = 'ПРОВЕРКА IP';
        ipCheckButton.style.marginLeft = '10px';
        ipCheckButton.style.whiteSpace = 'nowrap';
        ipCheckButton.style.minWidth = '140px';

        const targetElement = document.querySelector('div.container-fluid span.badge.bg-success');
        if (targetElement && targetElement.parentNode) {
            targetElement.parentNode.insertBefore(ipCheckButton, targetElement.nextSibling);
        } else {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.appendChild(ipCheckButton);
            }
        }
    }

    function createIPCheckModal() {
        const ipCheckModal = document.createElement('div');
        ipCheckModal.className = 'modal fade';
        ipCheckModal.id = 'ip-check-modal';
        ipCheckModal.tabIndex = '-1';
        ipCheckModal.style.display = 'none';
        ipCheckModal.ariaHidden = 'true';

        const modalDialog = document.createElement('div');
        modalDialog.className = 'modal-dialog modal-dialog-centered modal-lg';
        ipCheckModal.appendChild(modalDialog);

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalDialog.appendChild(modalContent);

        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        modalContent.appendChild(modalHeader);

        const modalTitle = document.createElement('h5');
        modalTitle.className = 'modal-title';
        modalTitle.textContent = 'Проверка IP адресов';
        modalHeader.appendChild(modalTitle);

        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = 'btn-close';
        closeButton.dataset.bsDismiss = 'modal';
        closeButton.ariaLabel = 'Close';
        modalHeader.appendChild(closeButton);

        const modalBody = document.createElement('div');
        modalBody.className = 'modal-body';
        modalContent.appendChild(modalBody);

        const ipForm = document.createElement('div');
        ipForm.className = 'ip-check-form';
        ipForm.innerHTML = `
            <div class="ip-input-group">
                <label>Первый IP адрес:</label>
                <input type="text" class="form-control ip-input" id="ip1" placeholder="Введите IP адрес">
            </div>
            <div class="ip-input-group">
                <label>Второй IP адрес:</label>
                <input type="text" class="form-control ip-input" id="ip2" placeholder="Введите IP адрес">
            </div>
            <button class="btn btn-primary check-ip-btn" id="check-ip-btn">Проверить IP</button>
        `;
        modalBody.appendChild(ipForm);

        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'ip-results-container';
        resultsContainer.id = 'ip-results';
        resultsContainer.innerHTML = '<div class="loading-resp">Введите IP адреса для проверки</div>';
        modalBody.appendChild(resultsContainer);

        document.body.appendChild(ipCheckModal);

        document.getElementById('check-ip-btn').addEventListener('click', checkIPs);
    }

    async function checkIPs() {
        const ip1 = document.getElementById('ip1').value.trim();
        const ip2 = document.getElementById('ip2').value.trim();
        const resultsContainer = document.getElementById('ip-results');

        if (!ip1 || !ip2) {
            resultsContainer.innerHTML = '<div class="error-resp">Пожалуйста, введите оба IP адреса</div>';
            return;
        }

        resultsContainer.innerHTML = '<div class="loading-resp">Загрузка данных...</div>';

        try {
            const [result1, result2] = await Promise.all([
                getIPInfo(ip1),
                getIPInfo(ip2)
            ]);

            displayIPResults(result1, result2);
        } catch (error) {
            resultsContainer.innerHTML = `<div class="error-resp">Ошибка при получении данных: ${error.message}</div>`;
        }
    }

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

    function displayIPResults(result1, result2) {
        const resultsContainer = document.getElementById('ip-results');
        const distance = calculateDistance(result1.latitude, result1.longitude, result2.latitude, result2.longitude);

        const formatValue = (value) => {
            if (!value || value === 'Неизвестно' || value === 'Не удалось определить') {
                return '<span style="color: #ff6b6b;">Неизвестно</span>';
            }
            return value;
        };

        resultsContainer.innerHTML = `
            <div class="ip-results-grid">
                <div class="ip-result-card">
                    <h4><i class="fas fa-desktop"></i> IP 1: ${result1.ip}</h4>
                    <div class="ip-info">
                        <div class="info-row"><strong><i class="fas fa-flag"></i> Страна:</strong> ${formatValue(result1.country)}</div>
                        <div class="info-row"><strong><i class="fas fa-city"></i> Город:</strong> ${formatValue(result1.city)}</div>
                        <div class="info-row"><strong><i class="fas fa-map"></i> Регион:</strong> ${formatValue(result1.region)}</div>
                        <div class="info-row"><strong><i class="fas fa-clock"></i> Временная зона:</strong> ${formatValue(result1.timezone)}</div>
                        <div class="info-row"><strong><i class="fas fa-building"></i> Организация:</strong> ${formatValue(result1.org)}</div>
                        <div class="info-row"><strong><i class="fas fa-network-wired"></i> ASN:</strong> ${formatValue(result1.asn)}</div>
                        <div class="info-row"><strong><i class="fas fa-map-marker-alt"></i> Координаты:</strong> ${result1.latitude ? result1.latitude + ', ' + result1.longitude : 'Неизвестно'}</div>
                        ${result1.note ? `<div class="info-row note"><strong><i class="fas fa-info-circle"></i> Примечание:</strong> ${result1.note}</div>` : ''}
                    </div>
                </div>

                <div class="ip-result-card">
                    <h4><i class="fas fa-desktop"></i> IP 2: ${result2.ip}</h4>
                    <div class="ip-info">
                        <div class="info-row"><strong><i class="fas fa-flag"></i> Страна:</strong> ${formatValue(result2.country)}</div>
                        <div class="info-row"><strong><i class="fas fa-city"></i> Город:</strong> ${formatValue(result2.city)}</div>
                        <div class="info-row"><strong><i class="fas fa-map"></i> Регион:</strong> ${formatValue(result2.region)}</div>
                        <div class="info-row"><strong><i class="fas fa-clock"></i> Временная зона:</strong> ${formatValue(result2.timezone)}</div>
                        <div class="info-row"><strong><i class="fas fa-building"></i> Организация:</strong> ${formatValue(result2.org)}</div>
                        <div class="info-row"><strong><i class="fas fa-network-wired"></i> ASN:</strong> ${formatValue(result2.asn)}</div>
                        <div class="info-row"><strong><i class="fas fa-map-marker-alt"></i> Координаты:</strong> ${result2.latitude ? result2.latitude + ', ' + result2.longitude : 'Неизвестно'}</div>
                        ${result2.note ? `<div class="info-row note"><strong><i class="fas fa-info-circle"></i> Примечание:</strong> ${result2.note}</div>` : ''}
                    </div>
                </div>

                <div class="distance-info">
                    <h4><i class="fas fa-ruler-combined"></i> Расстояние между IP</h4>
                    <div class="distance-value">${distance}</div>
                    ${distance !== 'Недостаточно данных' ? '<div class="distance-note">Прямое расстояние по поверхности Земли</div>' : ''}
                </div>
            </div>
        `;

        if (result1.latitude && result1.longitude && result2.latitude && result2.longitude) {
            setTimeout(() => {
                showIPMap(result1, result2);
            }, 100);
        }
    }

    function showIPMap(ip1, ip2) {
        const resultsContainer = document.getElementById('ip-results');
        const mapContainer = document.createElement('div');
        mapContainer.id = 'ip-map-container';
        mapContainer.style.marginTop = '20px';
        mapContainer.style.height = '300px';
        mapContainer.style.borderRadius = '8px';
        mapContainer.style.overflow = 'hidden';
        mapContainer.style.border = '1px solid #ccc';

        resultsContainer.appendChild(mapContainer);

        if (typeof L === 'undefined') {
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
                color: 'red',
                weight: 2,
                opacity: 0.7,
                dashArray: '5, 10'
            }).addTo(map);
            const group = new L.featureGroup([
                L.marker([ip1.latitude, ip1.longitude]),
                L.marker([ip2.latitude, ip2.longitude])
            ]);
            map.fitBounds(group.getBounds().pad(0.1));
        } catch (error) {
            container.innerHTML = '<div class="error-resp">Не удалось загрузить карту</div>';
        }
    }

    // === ФУНКЦИИ TRADEID VIEWER ===

    function formatTime(iso) {
        const d = new Date(iso);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} | ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
    }

    async function globalThrottle() {
        const now = Date.now();
        const timeSinceLastRequest = now - lastRequestTime;
        if (timeSinceLastRequest < REQUEST_DELAY_MS) {
            const delay = REQUEST_DELAY_MS - timeSinceLastRequest;
            showGlobalWaitMessage(delay);
            await new Promise(resolve => setTimeout(resolve, delay));
            hideGlobalWaitMessage();
        }
        lastRequestTime = Date.now();
    }

    function showGlobalWaitMessage(delayMs) {
        Object.values(openModals).forEach(modal => {
            const contentArea = modal.querySelector('.trade-modal-content-resp');
            if (contentArea) {
                let waitMsg = contentArea.querySelector('.request-waiting-resp');
                if (!waitMsg) {
                    waitMsg = document.createElement('div');
                    waitMsg.className = 'request-waiting-resp';
                    contentArea.insertBefore(waitMsg, contentArea.firstChild);
                }
                waitMsg.textContent = `Ожидание ${Math.ceil(delayMs / 1000)}с перед запросом...`;
            }
        });
    }

    function hideGlobalWaitMessage() {
        Object.values(openModals).forEach(modal => {
            const waitMsg = modal.querySelector('.request-waiting-resp');
            if (waitMsg) waitMsg.remove();
        });
    }

    async function loadConnectData(nick, tradeTime) {
        await globalThrottle();
        return new Promise((resolve) => {
            const tradeDate = new Date(tradeTime);
            const startDate = new Date(tradeDate.getTime() - 24 * 60 * 60 * 1000).toISOString();
            const endDate = new Date(tradeDate.getTime() + 24 * 60 * 60 * 1000).toISOString();
            const url = `https://logs.blackrussia.online/gslogs/${SERVER_ID}/api/list-game-logs/?category_id__exact=38&player_name__exact=${encodeURIComponent(nick)}&time__gte=${startDate}&time__lte=${endDate}&order_by=time&offset=0&auto=false`;

            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                onload: (res) => {
                    try {
                        if (res.status !== 200) {
                            return resolve({ nick, appmdid: null, level: null, playerIp: null });
                        }
                        const data = JSON.parse(res.responseText);
                        if (!Array.isArray(data) || data.length === 0) {
                            return resolve({ nick, appmdid: null, level: null, playerIp: null });
                        }

                        let appmdid = null, level = null, playerIp = null;
                        let closestConnectTime = null, closestDisconnectTime = null;

                        for (const item of data) {
                            const itemTime = new Date(item.time).getTime();
                            if (/подключился/i.test(item.transaction_desc)) {
                                if (itemTime <= tradeDate.getTime() && (!closestConnectTime || itemTime > closestConnectTime)) {
                                    const m = item.transaction_desc.match(/APPMDID:\s*([A-Za-z0-9_-]+)/i);
                                    if (m) {
                                        appmdid = m[1];
                                        playerIp = item.player_ip;
                                        closestConnectTime = itemTime;
                                    }
                                }
                            }
                            if (/отключился/i.test(item.transaction_desc)) {
                                const timeDiff = Math.abs(itemTime - tradeDate.getTime());
                                if (!closestDisconnectTime || timeDiff < Math.abs(closestDisconnectTime - tradeDate.getTime())) {
                                    const m = item.transaction_desc.match(/Уровень:\s*(\d+)/i);
                                    if (m) {
                                        level = m[1];
                                        if (!playerIp) playerIp = item.player_ip;
                                        closestDisconnectTime = itemTime;
                                    }
                                }
                            }
                        }
                        resolve({ nick, appmdid, level, playerIp });
                    } catch (e) {
                        resolve({ nick, appmdid: null, level: null, playerIp: null });
                    }
                },
                onerror: (err) => {
                    resolve({ nick, appmdid: null, level: null, playerIp: null });
                }
            });
        });
    }

    function createConnectPanel(players, wrapper) {
        wrapper.querySelectorAll(".connect-panel-resp").forEach(el => el.remove());
        const panel = document.createElement("div");
        panel.className = "connect-panel-resp";
        let hasData = false;

        players.forEach(p => {
            if (p.appmdid) {
                hasData = true;
                const btnApp = document.createElement("button");
                btnApp.className = "connect-btn-resp";
                btnApp.textContent = `${p.nick} | APPMDID: ${p.appmdid}`;
                btnApp.onclick = () => {
                    navigator.clipboard.writeText(p.appmdid).then(() => {
                        const originalText = btnApp.textContent;
                        btnApp.textContent = `${p.nick} | Скопировано!`;
                        setTimeout(() => btnApp.textContent = originalText, 1500);
                    }).catch(err => console.error('[BR-Viewer] Could not copy APPMDID: ', err));
                };
                panel.appendChild(btnApp);
            }
            if (p.level) {
                hasData = true;
                const btnLvl = document.createElement("button");
                btnLvl.className = "connect-btn-resp empty";
                btnLvl.textContent = `${p.nick} | Уровень: ${p.level}`;
                panel.appendChild(btnLvl);
            }
            if (p.playerIp) {
                hasData = true;
                const btnIp = document.createElement("button");
                btnIp.className = "connect-btn-resp empty";
                btnIp.textContent = `${p.nick} | IP: ${p.playerIp}`;
                panel.appendChild(btnIp);
            }
        });

        if (!hasData) {
            panel.innerHTML = '<div class="loading-resp">Данные подключения не найдены.</div>';
        }

        const modal = wrapper.querySelector('.trade-modal-resp');
        const content = modal.querySelector('.trade-modal-content-resp');

        if (window.innerWidth < 800) {
            content.appendChild(panel);
        } else {
            wrapper.appendChild(panel);
        }
    }

    function createModal(tradeID) {
        if (openModals[tradeID]) return;

        const overlay = document.createElement("div");
        overlay.className = "trade-modal-overlay-resp";

        const wrapper = document.createElement("div");
        wrapper.className = "trade-wrapper-resp";
        wrapper.dataset.tradeId = tradeID;

        const modal = document.createElement("div");
        modal.className = "trade-modal-resp";
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', `trade-modal-title-${tradeID}`);

        const header = document.createElement("div");
        header.className = "trade-modal-header-resp";

        const title = document.createElement("h3");
        title.className = "trade-modal-title-resp";
        title.id = `trade-modal-title-${tradeID}`;
        title.textContent = "Логи трейда #" + tradeID;

        const closeBtn = document.createElement("button");
        closeBtn.className = "trade-modal-close-resp";
        closeBtn.innerHTML = "&times;";
        closeBtn.setAttribute('aria-label', 'Закрыть окно');

        let handleEscKey;
        let handleClickOutside;

        const closeModal = () => {
            wrapper.classList.remove('visible');
            overlay.classList.remove('visible');
            setTimeout(() => {
                wrapper.remove();
                overlay.remove();
                delete openModals[tradeID];
                document.removeEventListener('keydown', handleEscKey);
                document.removeEventListener('mousedown', handleClickOutside);
            }, 300);
        };

        handleEscKey = (event) => {
            if (event.key === 'Escape' || event.keyCode === 27) closeModal();
        };

        handleClickOutside = (event) => {
            if (modal && !modal.contains(event.target)) {
                closeModal();
            }
        };

        closeBtn.onclick = closeModal;

        header.appendChild(title);
        header.appendChild(closeBtn);

        const content = document.createElement("div");
        content.className = "trade-modal-content-resp";
        content.innerHTML = '<div class="loading-resp">Загрузка логов...</div>';

        const footer = document.createElement("div");
        footer.className = "trade-modal-footer-resp";

        modal.appendChild(header);
        modal.appendChild(content);
        modal.appendChild(footer);
        wrapper.appendChild(modal);
        document.body.appendChild(overlay);
        document.body.appendChild(wrapper);
        openModals[tradeID] = wrapper;

        requestAnimationFrame(() => {
            overlay.classList.add('visible');
            wrapper.classList.add('visible');
        });

        (function makeDraggable(modalWrapper, headerElement) {
            let isDragging = false, initialX, initialY;
            const dragStart = (e) => {
                if (window.innerWidth < 800 || e.target === closeBtn) return;
                const rect = modalWrapper.getBoundingClientRect();
                initialX = e.clientX - rect.left;
                initialY = e.clientY - rect.top;
                isDragging = true;
                document.body.style.userSelect = 'none';
            };
            const drag = (e) => {
                if (isDragging) {
                    e.preventDefault();
                    modalWrapper.style.left = `${e.clientX - initialX}px`;
                    modalWrapper.style.top = `${e.clientY - initialY}px`;
                    modalWrapper.style.transform = 'none';
                }
            };
            const dragEnd = () => {
                isDragging = false;
                document.body.style.userSelect = '';
            };
            headerElement.addEventListener('mousedown', dragStart);
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', dragEnd);
        })(wrapper, header);

        document.addEventListener('keydown', handleEscKey);
        document.addEventListener('mousedown', handleClickOutside);

        (async () => {
            await globalThrottle();
            const startDate = new Date(Date.now() - 5 * 30 * 24 * 60 * 1000).toISOString();
            const endDate = new Date().toISOString();
            const url = `https://logs.blackrussia.online/gslogs/${SERVER_ID}/api/list-game-logs/?transaction_desc__ilike=%25TradeID%3A+${tradeID}%25&time__gte=${startDate}&time__lte=${endDate}&order_by=time&offset=0&auto=false`;

            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                onload: (res) => {
                    try {
                        if (res.status !== 200) {
                            content.innerHTML = `<div class="error-resp">Ошибка загрузки: ${res.status}</div>`;
                            return;
                        }
                        const data = JSON.parse(res.responseText);
                        content.innerHTML = "";
                        if (!Array.isArray(data) || data.length === 0) {
                            content.innerHTML = '<div class="loading-resp">Логи трейда не найдены.</div>';
                            return;
                        }

                        const tradeTime = data[0].time;
                        data.forEach(item => {
                            const row = document.createElement("div");
                            row.className = "trade-row-resp";
                            row.innerHTML = `
                                <div class="trade-player-info">
                                    <span class="trade-player-resp">${item.player_name}</span>
                                    <span class="trade-time-resp">${formatTime(item.time)}</span>
                                </div>
                                <div class="trade-desc-resp">${item.transaction_desc}</div>
                            `;
                            content.appendChild(row);
                        });

                        const uniquePlayers = [...new Set(data.map(i => i.player_name))].slice(0, 2);
                        if (uniquePlayers.length === 2) {
                            footer.innerHTML = `<span style="color:#666; font-size:12px; font-style:italic;">Кнопка загрузки данных появится через ${SHOW_CONNECT_BTN_DELAY_MS / 1000} сек...</span>`;
                            setTimeout(() => {
                                footer.innerHTML = '';
                                const connectBtn = document.createElement("button");
                                connectBtn.className = "both-nicks-btn-resp";
                                connectBtn.textContent = `Загрузить данные игроков`;
                                footer.appendChild(connectBtn);

                                connectBtn.onclick = async () => {
                                    connectBtn.disabled = true;
                                    connectBtn.textContent = "Загрузка...";
                                    try {
                                        const results = await Promise.allSettled([
                                            loadConnectData(uniquePlayers[0], tradeTime),
                                            loadConnectData(uniquePlayers[1], tradeTime)
                                        ]);
                                        const playerData = results.map(r => r.status === 'fulfilled' ? r.value : null).filter(Boolean);
                                        createConnectPanel(playerData, wrapper);
                                        connectBtn.remove();
                                    } catch (error) {
                                        console.error('[BR-Viewer] Error loading connection data:', error);
                                        connectBtn.textContent = "Ошибка загрузки";
                                        setTimeout(() => {
                                            connectBtn.disabled = false;
                                            connectBtn.textContent = `Повторить загрузку`;
                                        }, 3000);
                                    }
                                };
                            }, SHOW_CONNECT_BTN_DELAY_MS);
                        } else {
                            footer.innerHTML = `<span style="color:#777; font-size:12px;">Участники трейда не определены (${uniquePlayers.length} найдено).</span>`;
                        }
                    } catch (e) {
                        content.innerHTML = '<div class="error-resp">Ошибка обработки данных.</div>';
                        console.error("[BR-Viewer] Error processing trade data #" + tradeID, e);
                    }
                },
                onerror: (err) => {
                    content.innerHTML = '<div class="error-resp">Ошибка соединения.</div>';
                    console.error("[BR-Viewer] Network error loading trade logs #" + tradeID, err);
                }
            });
        })();
    }

    function createVehicleExchangeModal(transactionDesc, playerName, transactionAmount, transactionDate) {
        const modalId = 'vehicle-exchange-modal-' + Date.now();
        if (openModals[modalId]) return;

        let fromPlayer = '', toPlayer = '', fromVehicle = '', toVehicle = '', payment = '';

        if (transactionDesc.includes('+ Доплата за обмен от')) {
            const match = transactionDesc.match(/\+ Доплата за обмен от (.+?) \[.*?\] \(Авто (.+?) \(.*?\) на Авто (.+?) \(/);
            if (match) {
                fromPlayer = match[1];
                fromVehicle = match[2];
                toVehicle = match[3];
                payment = `+${transactionAmount}`;
            }
        } else if (transactionDesc.includes('- Доплата за обмен игроку')) {
            const match = transactionDesc.match(/- Доплата за обмен игроку (.+?) \[.*?\] \(Авто (.+?) \(.*?\) на Авто (.+?) \(/);
            if (match) {
                toPlayer = match[1];
                fromVehicle = match[2];
                toVehicle = match[3];
                payment = `-${transactionAmount}`;
            }
        } else if (transactionDesc.includes('Обменялся с')) {
            const match = transactionDesc.match(/Обменялся с (.+?) \[.*?\] \(Авто (.+?) \(.*?\) на Авто (.+?) \(/);
            if (match) {
                fromPlayer = match[1];
                fromVehicle = match[2];
                toVehicle = match[3];
                payment = 'Без доплаты';
            }
        }

        const overlay = document.createElement("div");
        overlay.className = "trade-modal-overlay-resp";

        const wrapper = document.createElement("div");
        wrapper.className = "trade-wrapper-resp";
        wrapper.dataset.modalId = modalId;

        const modal = document.createElement("div");
        modal.className = "trade-modal-resp";
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', `vehicle-exchange-title-${modalId}`);

        const header = document.createElement("div");
        header.className = "trade-modal-header-resp";

        const title = document.createElement("h3");
        title.className = "trade-modal-title-resp";
        title.id = `vehicle-exchange-title-${modalId}`;
        title.textContent = "Детали обмена транспорта";

        const closeBtn = document.createElement("button");
        closeBtn.className = "trade-modal-close-resp";
        closeBtn.innerHTML = "&times;";
        closeBtn.setAttribute('aria-label', 'Закрыть окно');

        let handleEscKey;
        let handleClickOutside;

        const closeModal = () => {
            wrapper.classList.remove('visible');
            overlay.classList.remove('visible');
            setTimeout(() => {
                wrapper.remove();
                overlay.remove();
                delete openModals[modalId];
                document.removeEventListener('keydown', handleEscKey);
                document.removeEventListener('mousedown', handleClickOutside);
            }, 300);
        };

        handleEscKey = (event) => {
            if (event.key === 'Escape' || event.keyCode === 27) closeModal();
        };

        handleClickOutside = (event) => {
            if (modal && !modal.contains(event.target)) {
                closeModal();
            }
        };

        closeBtn.onclick = closeModal;

        header.appendChild(title);
        header.appendChild(closeBtn);

        const content = document.createElement("div");
        content.className = "trade-modal-content-resp";

        content.innerHTML = `
            <div class="exchange-table-container">
                <table class="exchange-table">
                    <thead>
                        <tr>
                            <th>Ник</th>
                            <th>Машина до обмена</th>
                            <th>Машина после обмена</th>
                            <th>Доплата</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${playerName}</td>
                            <td>${fromVehicle}</td>
                            <td>${toVehicle}</td>
                            <td class="${payment.startsWith('+') ? 'positive-resp' : payment.startsWith('-') ? 'negative-resp' : ''}">${payment}</td>
                        </tr>
                        ${fromPlayer ? `
                        <tr>
                            <td>${fromPlayer}</td>
                            <td>${toVehicle}</td>
                            <td>${fromVehicle}</td>
                            <td class="${payment.startsWith('+') ? 'negative-resp' : payment.startsWith('-') ? 'positive-resp' : ''}">${payment.startsWith('+') ? '-' + payment.substring(1) : payment.startsWith('-') ? '+' + payment.substring(1) : payment}</td>
                        </tr>
                        ` : ''}
                    </tbody>
                </table>
            </div>
        `;

        const footer = document.createElement("div");
        footer.className = "trade-modal-footer-resp";

        modal.appendChild(header);
        modal.appendChild(content);
        modal.appendChild(footer);
        wrapper.appendChild(modal);
        document.body.appendChild(overlay);
        document.body.appendChild(wrapper);
        openModals[modalId] = wrapper;

        requestAnimationFrame(() => {
            overlay.classList.add('visible');
            wrapper.classList.add('visible');
        });

        const uniquePlayers = [playerName];
        if (fromPlayer) uniquePlayers.push(fromPlayer);
        if (toPlayer) uniquePlayers.push(toPlayer);

        const uniquePlayerNames = [...new Set(uniquePlayers)].slice(0, 2);

        if (uniquePlayerNames.length >= 1) {
            footer.innerHTML = `<span style="color:#666; font-size:12px; font-style:italic;">Кнопка загрузки данных появится через ${SHOW_CONNECT_BTN_DELAY_MS / 1000} сек...</span>`;
            setTimeout(() => {
                footer.innerHTML = '';
                const connectBtn = document.createElement("button");
                connectBtn.className = "both-nicks-btn-resp";
                connectBtn.textContent = `Загрузить данные игроков`;
                footer.appendChild(connectBtn);

                connectBtn.onclick = async () => {
                    connectBtn.disabled = true;
                    connectBtn.textContent = "Загрузка...";
                    try {
                        const results = await Promise.allSettled(
                            uniquePlayerNames.map(nick => loadConnectData(nick, new Date(transactionDate)))
                        );
                        const playerData = results.map(r => r.status === 'fulfilled' ? r.value : null).filter(Boolean);
                        createConnectPanel(playerData, wrapper);
                        connectBtn.remove();
                    } catch (error) {
                        console.error('[BR-Viewer] Error loading connection data:', error);
                        connectBtn.textContent = "Ошибка загрузки";
                        setTimeout(() => {
                            connectBtn.disabled = false;
                            connectBtn.textContent = `Повторить загрузку`;
                        }, 3000);
                    }
                };
            }, SHOW_CONNECT_BTN_DELAY_MS);
        }

        (function makeDraggable(modalWrapper, headerElement) {
            let isDragging = false, initialX, initialY;
            const dragStart = (e) => {
                if (window.innerWidth < 800 || e.target === closeBtn) return;
                const rect = modalWrapper.getBoundingClientRect();
                initialX = e.clientX - rect.left;
                initialY = e.clientY - rect.top;
                isDragging = true;
                document.body.style.userSelect = 'none';
            };
            const drag = (e) => {
                if (isDragging) {
                    e.preventDefault();
                    modalWrapper.style.left = `${e.clientX - initialX}px`;
                    modalWrapper.style.top = `${e.clientY - initialY}px`;
                    modalWrapper.style.transform = 'none';
                }
            };
            const dragEnd = () => {
                isDragging = false;
                document.body.style.userSelect = '';
            };
            headerElement.addEventListener('mousedown', dragStart);
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', dragEnd);
        })(wrapper, header);

        document.addEventListener('keydown', handleEscKey);
        document.addEventListener('mousedown', handleClickOutside);
    }

    function attachTradeButtons() {
        const tradeRegex = /TradeID:\s*(\d+)/g;
        document.querySelectorAll('td:not([class*="-resp"])').forEach(td => {
            if (td.innerHTML.includes('TradeID:') && !td.querySelector('.details-btn-resp')) {
                const uniqueIds = [...new Set(Array.from(td.innerHTML.matchAll(tradeRegex), m => m[1]))];
                uniqueIds.forEach(tradeID => {
                    if (!td.querySelector(`.details-btn-resp[data-trade='${tradeID}']`)) {
                        const btn = document.createElement('button');
                        btn.className = 'details-btn-resp trade';
                        btn.dataset.trade = tradeID;
                        btn.textContent = `Детали`;
                        btn.style.marginLeft = '10px';
                        btn.onclick = (e) => { e.stopPropagation(); createModal(tradeID); };
                        td.appendChild(btn);
                    }
                });
            }
        });
    }

    function attachVehicleExchangeButtons() {
        document.querySelectorAll('tr.second-row').forEach(row => {
            const transactionCell = row.querySelector('.td-transaction-desc');
            const categoryCell = row.previousSibling?.querySelector('.td-category a');
            const playerName = row.previousSibling?.querySelector('.td-player-name a')?.textContent;
            const transactionAmount = row.previousSibling?.querySelector('.td-transaction-amount')?.textContent;
            const transactionDate = row.previousSibling?.querySelector('.td-time')?.textContent.replace(/\s/g, ' | ');

            if (categoryCell?.textContent === 'Личное транспортное средство' && transactionCell) {
                const transactionDesc = transactionCell.textContent;

                if ((transactionDesc.includes('+ Доплата за обмен от') ||
                     transactionDesc.includes('- Доплата за обмен игроку') ||
                     transactionDesc.includes('Обменялся с')) &&
                    transactionDesc.includes('Авто') &&
                    transactionDesc.includes('на Авто') &&
                    !transactionCell.querySelector('.details-btn-resp.vehicle')) {

                    const btn = document.createElement('button');
                    btn.className = 'details-btn-resp vehicle';
                    btn.textContent = 'Детали';
                    btn.style.marginLeft = '10px';
                    btn.onclick = (e) => {
                        e.stopPropagation();
                        createVehicleExchangeModal(transactionDesc, playerName, transactionAmount, transactionDate);
                    };
                    transactionCell.appendChild(btn);
                }
            }
        });
    }

    function attachIPInfoButtons() {
        document.querySelectorAll('td.td-player-ip[data-v-2d76ca92]').forEach(td => {
            const ip = td.textContent.trim();
            if (ip && ip !== 'N/A' && !td.querySelector('.ip-info-btn-resp')) {
                const btn = document.createElement('button');
                btn.className = 'ip-info-btn-resp';
                btn.textContent = 'ℹ️';
                btn.title = 'Информация об IP';
                btn.style.marginLeft = '5px';
                btn.onclick = async (e) => {
                    e.stopPropagation();
                    await showIPInfo(ip);
                };
                td.appendChild(btn);
            }
        });
    }

    async function showIPInfo(ip) {
        const modalId = 'ip-info-modal-' + Date.now();
        if (openModals[modalId]) return;

        const overlay = document.createElement("div");
        overlay.className = "trade-modal-overlay-resp";

        const wrapper = document.createElement("div");
        wrapper.className = "trade-wrapper-resp";
        wrapper.dataset.modalId = modalId;

        const modal = document.createElement("div");
        modal.className = "trade-modal-resp";
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', `ip-info-title-${modalId}`);

        const header = document.createElement("div");
        header.className = "trade-modal-header-resp";

        const title = document.createElement("h3");
        title.className = "trade-modal-title-resp";
        title.id = `ip-info-title-${modalId}`;
        title.textContent = `Информация об IP: ${ip}`;

        const closeBtn = document.createElement("button");
        closeBtn.className = "trade-modal-close-resp";
        closeBtn.innerHTML = "&times;";
        closeBtn.setAttribute('aria-label', 'Закрыть окно');

        let handleEscKey;
        let handleClickOutside;

        const closeModal = () => {
            wrapper.classList.remove('visible');
            overlay.classList.remove('visible');
            setTimeout(() => {
                wrapper.remove();
                overlay.remove();
                delete openModals[modalId];
                document.removeEventListener('keydown', handleEscKey);
                document.removeEventListener('mousedown', handleClickOutside);
            }, 300);
        };

        handleEscKey = (event) => {
            if (event.key === 'Escape' || event.keyCode === 27) closeModal();
        };

        handleClickOutside = (event) => {
            if (modal && !modal.contains(event.target)) {
                closeModal();
            }
        };

        closeBtn.onclick = closeModal;

        header.appendChild(title);
        header.appendChild(closeBtn);

        const content = document.createElement("div");
        content.className = "trade-modal-content-resp";
        content.innerHTML = '<div class="loading-resp">Загрузка информации об IP...</div>';

        const footer = document.createElement("div");
        footer.className = "trade-modal-footer-resp";

        modal.appendChild(header);
        modal.appendChild(content);
        modal.appendChild(footer);
        wrapper.appendChild(modal);
        document.body.appendChild(overlay);
        document.body.appendChild(wrapper);
        openModals[modalId] = wrapper;

        requestAnimationFrame(() => {
            overlay.classList.add('visible');
            wrapper.classList.add('visible');
        });

        (function makeDraggable(modalWrapper, headerElement) {
            let isDragging = false, initialX, initialY;
            const dragStart = (e) => {
                if (window.innerWidth < 800 || e.target === closeBtn) return;
                const rect = modalWrapper.getBoundingClientRect();
                initialX = e.clientX - rect.left;
                initialY = e.clientY - rect.top;
                isDragging = true;
                document.body.style.userSelect = 'none';
            };
            const drag = (e) => {
                if (isDragging) {
                    e.preventDefault();
                    modalWrapper.style.left = `${e.clientX - initialX}px`;
                    modalWrapper.style.top = `${e.clientY - initialY}px`;
                    modalWrapper.style.transform = 'none';
                }
            };
            const dragEnd = () => {
                isDragging = false;
                document.body.style.userSelect = '';
            };
            headerElement.addEventListener('mousedown', dragStart);
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', dragEnd);
        })(wrapper, header);

        document.addEventListener('keydown', handleEscKey);
        document.addEventListener('mousedown', handleClickOutside);

        try {
            const ipInfo = await getIPInfo(ip);

            const hasRealData = ipInfo.country &&
                               ipInfo.country !== 'Неизвестно' &&
                               ipInfo.country !== 'Не удалось определить' &&
                               ipInfo.country !== 'Undefined' &&
                               ipInfo.country !== '';

            if (hasRealData) {
                content.innerHTML = `
                    <div class="ip-info-details-resp">
                        <div class="info-row-resp"><strong><i class="fas fa-desktop"></i> IP адрес:</strong> ${ipInfo.ip}</div>
                        <div class="info-row-resp"><strong><i class="fas fa-flag"></i> Страна:</strong> ${ipInfo.country}</div>
                        <div class="info-row-resp"><strong><i class="fas fa-city"></i> Город:</strong> ${ipInfo.city || 'Неизвестно'}</div>
                        <div class="info-row-resp"><strong><i class="fas fa-map"></i> Регион:</strong> ${ipInfo.region || 'Неизвестно'}</div>
                        <div class="info-row-resp"><strong><i class="fas fa-clock"></i> Временная зона:</strong> ${ipInfo.timezone || 'Неизвестно'}</div>
                        <div class="info-row-resp"><strong><i class="fas fa-building"></i> Организация:</strong> ${ipInfo.org || 'Неизвестно'}</div>
                        <div class="info-row-resp"><strong><i class="fas fa-network-wired"></i> ASN:</strong> ${ipInfo.asn || 'Неизвестно'}</div>
                        <div class="info-row-resp"><strong><i class="fas fa-map-marker-alt"></i> Координаты:</strong> ${ipInfo.latitude ? ipInfo.latitude + ', ' + ipInfo.longitude : 'Неизвестно'}</div>
                        ${ipInfo.note ? `<div class="info-row-resp note"><strong><i class="fas fa-info-circle"></i> Примечание:</strong> ${ipInfo.note}</div>` : ''}
                    </div>
                `;
            } else {
                content.innerHTML = `
                    <div class="error-resp">
                        <p><strong><i class="fas fa-exclamation-triangle"></i> Не удалось получить информацию об IP адресе ${ip}</strong></p>
                        <p>Возможные причины:</p>
                        <ul style="text-align: left; margin-left: 20px;">
                            <li><i class="fas fa-network-wired"></i> IP адрес принадлежит частной сети</li>
                            <li><i class="fas fa-server"></i> Сервисы геолокации временно недоступны</li>
                            <li><i class="fas fa-shield-alt"></i> IP адрес зарезервирован или не существует</li>
                            <li><i class="fas fa-wifi"></i> Проблемы с подключением к интернету</li>
                        </ul>
                        <p style="margin-top: 15px;"><i class="fas fa-sync-alt"></i> Попробуйте проверить другой IP адрес или повторить попытку позже.</p>
                    </div>
                `;
            }
        } catch (error) {
            content.innerHTML = `
                <div class="error-resp">
                    <p><strong><i class="fas fa-exclamation-circle"></i> Ошибка при получении информации об IP:</strong></p>
                    <p>${error.message}</p>
                    <p style="margin-top: 15px;"><i class="fas fa-sync-alt"></i> Попробуйте проверить другой IP адрес.</p>
                </div>
            `;
        }
    }

    // === СТИЛИ ТОЛЬКО ДЛЯ МОДАЛЬНЫХ ОКОН И КНОПОК ===
    GM_addStyle(`
        :root {
            --bg-main: rgba(30, 30, 35, 0.95);
            --bg-panel: rgba(40, 40, 45, 0.95);
            --text-primary: #ffffff;
            --text-secondary: #cccccc;
            --text-highlight: #2b8cff;
            --primary-gradient: linear-gradient(145deg, #2b8cff, #1f6cd9);
            --secondary-gradient: linear-gradient(145deg, #8e2de2, #4a00e0);
            --danger-color: #ff4757;
            --warning-color: #ffd700;
            --border-color: rgba(255, 255, 255, 0.1);
            --shadow: 0 10px 35px rgba(0,0,0,.5);
            --radius: 12px;
            --font-family: 'Inter', 'Segoe UI', sans-serif;
            --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .ip-check-button {
            color: #ffffff;
            background: #2b8cff;
            border: none;
            border-radius: 8px;
            padding: 6px 12px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
            white-space: nowrap;
            min-width: 120px;
        }
        .ip-check-button:hover {
            background: #1f6cd9;
        }

        .details-btn-resp {
            background: #2b8cff;
            color: #fff;
            border: none;
            padding: 4px 12px;
            margin: 2px;
            margin-left: 10px;
            font-size: 12px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: var(--font-family);
        }
        .details-btn-resp:hover {
            background: #1f6cd9;
        }
        .details-btn-resp.vehicle {
            background: #8e2de2;
        }
        .details-btn-resp.vehicle:hover {
            background: #6a1fb5;
        }

        .ip-info-btn-resp {
            background: #2b8cff;
            color: #fff;
            border: none;
            padding: 2px 8px;
            margin: 2px;
            margin-left: 5px;
            font-size: 12px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: var(--font-family);
        }
        .ip-info-btn-resp:hover {
            background: #1f6cd9;
        }

        .trade-modal-overlay-resp {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,.7);
            z-index: 9999;
            backdrop-filter: blur(4px);
            opacity: 0;
            transition: opacity var(--transition);
        }
        .trade-modal-overlay-resp.visible { opacity: 1; }

        .trade-wrapper-resp {
            position: fixed;
            z-index: 10000;
            inset: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 16px;
        }

        .trade-modal-resp {
            background: var(--bg-main);
            color: var(--text-primary);
            box-shadow: var(--shadow);
            width: 95%;
            max-width: 600px;
            height: auto;
            max-height: 90vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            font-family: var(--font-family);
            border: 1px solid var(--border-color);
            backdrop-filter: blur(15px);
            border-radius: var(--radius);
            opacity: 0;
            transform: scale(0.95);
            transition: opacity var(--transition), transform var(--transition);
        }
        .trade-wrapper-resp.visible .trade-modal-resp {
            opacity: 1;
            transform: scale(1);
        }

        .trade-modal-header-resp {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-color);
            flex-shrink: 0;
            cursor: move;
        }
        .trade-modal-header-resp::before { display: none !important; }

        .trade-modal-title-resp {
            font-size: 16px;
            font-weight: 600;
            color: var(--text-highlight);
            margin: 0;
            flex-grow: 1;
        }
        .trade-modal-close-resp {
            background: transparent;
            border: none;
            color: var(--text-secondary);
            font-size: 28px;
            line-height: 1;
            padding: 0 8px;
            cursor: pointer;
            transition: color var(--transition);
        }
        .trade-modal-close-resp:hover {
            color: var(--danger-color);
        }

        .trade-modal-content-resp {
            overflow-y: auto;
            flex-grow: 1;
            padding: 8px 16px;
        }

        .trade-row-resp {
            padding: 12px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .trade-player-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        .trade-player-resp { font-weight: 600; color: var(--text-primary); }
        .trade-time-resp { font-size: 12px; color: var(--text-secondary); }
        .trade-desc-resp {
            font-size: 14px;
            color: var(--text-primary);
            line-height: 1.5;
            word-break: break-word;
            white-space: pre-wrap;
        }

        .trade-modal-footer-resp {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 12px 16px;
            padding-bottom: calc(12px + env(safe-area-inset-bottom));
            border-top: 1px solid var(--border-color);
            flex-shrink: 0;
            background: rgba(30, 30, 35, 0.9);
        }
        .both-nicks-btn-resp {
            background: #2b8cff;
            color: #fff;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 14px;
            width: 100%;
            font-family: var(--font-family);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .both-nicks-btn-resp:hover {
            background: #1f6cd9;
        }

        .connect-panel-resp {
            background: var(--bg-panel);
            padding: 16px;
            border-radius: var(--radius);
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin: 16px 0;
            border: 1px solid var(--border-color);
            backdrop-filter: blur(15px);
        }
        .connect-btn-resp {
            background: transparent;
            color: var(--text-primary);
            border: 1px solid #fff;
            padding: 8px 12px;
            border-radius: 6px;
            font-weight: 500;
            text-align: left;
            font-size: 13px;
            font-family: var(--font-family);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .connect-btn-resp:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: #aaa;
        }
        .connect-btn-resp.empty { 
            background: transparent; 
            cursor: default; 
        }
        .connect-btn-resp.empty:hover {
            background: transparent;
            border-color: #fff;
        }

        .exchange-table-container {
            overflow-x: auto;
            margin: 16px 0;
        }
        .exchange-table {
            width: 100%;
            border-collapse: collapse;
            font-family: var(--font-family);
            font-size: 14px;
        }
        .exchange-table th,
        .exchange-table td {
            padding: 8px 12px;
            text-align: left;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .exchange-table th {
            background: rgba(255, 255, 255, 0.05);
            color: var(--text-highlight);
            font-weight: 600;
        }
        .exchange-table td {
            background: rgba(255, 255, 255, 0.02);
        }
        .positive-resp {
            color: #00ff00;
            font-weight: 600;
        }
        .negative-resp {
            color: #ff4757;
            font-weight: 600;
        }

        .ip-info-details-resp {
            padding: 16px 0;
        }
        .info-row-resp {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .info-row-resp:last-child {
            border-bottom: none;
        }
        .info-row-resp i {
            width: 16px;
            margin-right: 8px;
            text-align: center;
        }

        .ip-check-form {
            margin-bottom: 20px;
        }
        .ip-input-group {
            margin-bottom: 15px;
        }
        .ip-input-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: var(--text-primary);
            font-family: var(--font-family);
        }
        .ip-results-container {
            margin-top: 20px;
        }
        .ip-results-grid {
            display: grid;
            gap: 20px;
            grid-template-columns: 1fr;
        }
        .ip-result-card {
            background: var(--bg-panel);
            padding: 16px;
            border-radius: var(--radius);
            border: 1px solid var(--border-color);
            font-family: var(--font-family);
        }
        .ip-result-card h4 {
            margin: 0 0 12px 0;
            color: var(--text-highlight);
            font-size: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .ip-info {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 4px 0;
        }
        .info-row i {
            width: 16px;
            margin-right: 8px;
            text-align: center;
        }
        .info-row.note {
            color: var(--warning-color);
            font-style: italic;
        }
        .distance-info {
            background: var(--bg-panel);
            padding: 16px;
            border-radius: var(--radius);
            border: 1px solid var(--border-color);
            text-align: center;
            font-family: var(--font-family);
        }
        .distance-value {
            font-size: 24px;
            font-weight: bold;
            color: #ffd700;
            margin-top: 10px;
        }
        .distance-note {
            font-size: 12px;
            color: var(--text-secondary);
            margin-top: 5px;
            font-style: italic;
        }

        #ip-map-container {
            font-family: var(--font-family);
        }

        .loading-resp, .error-resp, .request-waiting-resp {
            padding: 16px;
            text-align: center;
            border-radius: var(--radius);
            margin: 10px 0;
            font-family: var(--font-family);
        }
        .loading-resp {
            background: rgba(43, 140, 255, 0.1);
            color: var(--text-highlight);
            border: 1px solid rgba(43, 140, 255, 0.3);
        }
        .error-resp {
            background: rgba(255, 71, 87, 0.1);
            color: var(--danger-color);
            border: 1px solid rgba(255, 71, 87, 0.3);
        }
        .request-waiting-resp {
            background: rgba(255, 215, 0, 0.1);
            color: var(--warning-color);
            border: 1px solid rgba(255, 215, 0, 0.3);
        }

        @media (min-width: 800px) {
            .trade-wrapper-resp {
                flex-direction: row;
                align-items: center;
                padding: 32px;
            }
            .trade-modal-resp {
                max-width: 800px;
                width: 100%;
                height: auto;
                min-height: 150px;
                max-height: 85vh;
            }
            .trade-modal-header-resp { padding: 16px 24px; }
            .trade-modal-content-resp { padding: 8px 24px; }
            .trade-modal-footer-resp { padding: 16px 24px; padding-bottom: 16px; }
            .both-nicks-btn-resp { width: auto; }

            .trade-row-resp {
                display: grid;
                grid-template-columns: 150px 180px 1fr;
                gap: 16px;
            }
            .trade-player-info { display: contents; }
            .trade-player-resp { margin-bottom: 0; }
            .trade-desc-resp { font-size: 13px; }

            .connect-panel-resp {
                width: 340px;
                flex-shrink: 0;
                margin: 0;
                height: auto;
                max-height: 85vh;
                overflow-y: auto;
            }

            .ip-results-grid {
                grid-template-columns: 1fr 1fr;
            }
            .distance-info {
                grid-column: 1 / -1;
            }
        }

        @supports (-webkit-touch-callout: none) {
            .details-btn-resp,
            .ip-info-btn-resp,
            .both-nicks-btn-resp,
            .connect-btn-resp {
                -webkit-appearance: none;
                appearance: none;
            }
            
            .trade-modal-resp {
                -webkit-overflow-scrolling: touch;
            }
            
            .trade-modal-content-resp {
                -webkit-overflow-scrolling: touch;
                overflow-y: scroll;
            }
        }
    `);

    // === ОСНОВНАЯ ФУНКЦИЯ ИНИЦИАЛИЗАЦИИ ===
    function scriptInit() {
        createIPCheckButton();
        createIPCheckModal();

        attachTradeButtons();
        attachVehicleExchangeButtons();
        attachIPInfoButtons();
        
        setInterval(() => {
            attachTradeButtons();
            attachVehicleExchangeButtons();
            attachIPInfoButtons();
        }, 1000);
    }

    scriptInit();

})();
