// ==UserScript==
// @name        Скрипт для системы логирования + TradeID Viewer (Full)
// @namespace    https://logs.blackrussia.online/
// @version      1.4
// @description  TradeID Viewer + IP Checker + Vehicle Exchange (ИСПРАВЛЕНАЯ)
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

    // === КОНФИГУРАЦИЯ ===
    const REQUEST_DELAY_MS = 4000;
    const SHOW_CONNECT_BTN_DELAY_MS = 2000;
    let lastRequestTime = 0;
    const openModals = {};

    const SERVER_ID_MATCH = window.location.pathname.match(/\/gslogs\/(\d+)/);
    const SERVER_ID = SERVER_ID_MATCH ? SERVER_ID_MATCH[1] : '1';

    // === ФУНКЦИИ IP ПРОВЕРКИ ===
    function createIPCheckButton() {
        // Ждём появления элемента
        const checkExisting = document.getElementById('ip-check-toggle');
        if (checkExisting) return;

        const ipCheckButton = document.createElement('button');
        ipCheckButton.className = 'ip-check-button';
        ipCheckButton.id = 'ip-check-toggle';
        ipCheckButton.textContent = 'ПРОВЕРКА IP';
        ipCheckButton.style.marginLeft = '10px';
        ipCheckButton.style.whiteSpace = 'nowrap';
        ipCheckButton.style.minWidth = '140px';
        ipCheckButton.style.padding = '6px 12px';
        ipCheckButton.style.borderRadius = '8px';
        ipCheckButton.style.border = 'none';
        ipCheckButton.style.backgroundColor = '#2b8cff';
        ipCheckButton.style.color = 'white';
        ipCheckButton.style.cursor = 'pointer';

        ipCheckButton.onclick = () => {
            const modal = document.getElementById('ip-check-modal');
            if (modal) {
                const bsModal = new bootstrap.Modal(modal);
                bsModal.show();
            }
        };

        // Пытаемся найти место для кнопки
        const insertAfterElement = () => {
            const targetElement = document.querySelector('div.container-fluid span.badge.bg-success');
            if (targetElement && targetElement.parentNode) {
                targetElement.parentNode.insertBefore(ipCheckButton, targetElement.nextSibling);
                return true;
            }
            return false;
        };

        if (!insertAfterElement()) {
            const checkExist = setInterval(() => {
                if (insertAfterElement()) {
                    clearInterval(checkExist);
                }
            }, 500);
        }
    }

    function createIPCheckModal() {
        if (document.getElementById('ip-check-modal')) return;

        const ipCheckModal = document.createElement('div');
        ipCheckModal.className = 'modal fade';
        ipCheckModal.id = 'ip-check-modal';
        ipCheckModal.tabIndex = '-1';
        ipCheckModal.setAttribute('data-bs-backdrop', 'static');

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
        closeButton.setAttribute('data-bs-dismiss', 'modal');
        modalHeader.appendChild(closeButton);

        const modalBody = document.createElement('div');
        modalBody.className = 'modal-body';
        modalContent.appendChild(modalBody);

        modalBody.innerHTML = `
            <div class="ip-check-form">
                <div class="ip-input-group">
                    <label>Первый IP адрес:</label>
                    <input type="text" class="form-control ip-input" id="ip1" placeholder="Введите IP адрес">
                </div>
                <div class="ip-input-group">
                    <label>Второй IP адрес:</label>
                    <input type="text" class="form-control ip-input" id="ip2" placeholder="Введите IP адрес">
                </div>
                <button class="btn btn-primary check-ip-btn" id="check-ip-btn">Проверить IP</button>
            </div>
            <div class="ip-results-container" id="ip-results">
                <div class="loading-resp">Введите IP адреса для проверки</div>
            </div>
        `;

        document.body.appendChild(ipCheckModal);

        const checkBtn = document.getElementById('check-ip-btn');
        if (checkBtn) {
            checkBtn.addEventListener('click', checkIPs);
        }
    }

    async function checkIPs() {
        const ip1 = document.getElementById('ip1')?.value.trim();
        const ip2 = document.getElementById('ip2')?.value.trim();
        const resultsContainer = document.getElementById('ip-results');

        if (!ip1 || !ip2) {
            if (resultsContainer) {
                resultsContainer.innerHTML = '<div class="error-resp">Пожалуйста, введите оба IP адреса</div>';
            }
            return;
        }

        if (resultsContainer) {
            resultsContainer.innerHTML = '<div class="loading-resp">Загрузка данных...</div>';
        }

        try {
            const [result1, result2] = await Promise.all([
                getIPInfo(ip1),
                getIPInfo(ip2)
            ]);
            displayIPResults(result1, result2);
        } catch (error) {
            if (resultsContainer) {
                resultsContainer.innerHTML = `<div class="error-resp">Ошибка: ${error.message}</div>`;
            }
        }
    }

    async function getIPInfo(ip) {
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (!ipRegex.test(ip)) {
            throw new Error(`Неверный формат IP: ${ip}`);
        }

        return new Promise((resolve) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: `https://ipapi.co/${ip}/json/`,
                timeout: 10000,
                onload: function(response) {
                    try {
                        if (response.status === 200) {
                            const data = JSON.parse(response.responseText);
                            if (!data.error) {
                                resolve({
                                    ip: data.ip || ip,
                                    country: data.country_name || 'Неизвестно',
                                    city: data.city || 'Неизвестно',
                                    region: data.region || 'Неизвестно',
                                    timezone: data.timezone || 'Неизвестно',
                                    org: data.org || 'Неизвестно',
                                    asn: data.asn || 'Неизвестно',
                                    latitude: data.latitude,
                                    longitude: data.longitude
                                });
                                return;
                            }
                        }
                    } catch (e) {}
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
                },
                onerror: () => {
                    resolve({
                        ip: ip,
                        country: 'Ошибка соединения',
                        city: 'Неизвестно',
                        region: 'Неизвестно',
                        timezone: 'Неизвестно',
                        org: 'Неизвестно',
                        asn: 'Неизвестно',
                        latitude: null,
                        longitude: null
                    });
                }
            });
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
        return (R * c).toFixed(2) + ' км';
    }

    function displayIPResults(result1, result2) {
        const resultsContainer = document.getElementById('ip-results');
        if (!resultsContainer) return;

        const distance = calculateDistance(result1.latitude, result1.longitude, result2.latitude, result2.longitude);

        resultsContainer.innerHTML = `
            <div class="ip-results-grid">
                <div class="ip-result-card">
                    <h4>📍 IP 1: ${result1.ip}</h4>
                    <div>🌍 Страна: ${result1.country}</div>
                    <div>🏙️ Город: ${result1.city}</div>
                    <div>🗺️ Регион: ${result1.region}</div>
                    <div>🕐 Часовой пояс: ${result1.timezone}</div>
                    <div>🏢 Орг: ${result1.org}</div>
                </div>
                <div class="ip-result-card">
                    <h4>📍 IP 2: ${result2.ip}</h4>
                    <div>🌍 Страна: ${result2.country}</div>
                    <div>🏙️ Город: ${result2.city}</div>
                    <div>🗺️ Регион: ${result2.region}</div>
                    <div>🕐 Часовой пояс: ${result2.timezone}</div>
                    <div>🏢 Орг: ${result2.org}</div>
                </div>
                <div class="distance-info">
                    <h4>📏 Расстояние между IP</h4>
                    <div class="distance-value">${distance}</div>
                </div>
            </div>
        `;
    }

    // === ФУНКЦИИ ДЛЯ ТРЕЙДОВ ===
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
                timeout: 15000,
                onload: (res) => {
                    try {
                        if (res.status !== 200) {
                            resolve({ nick, appmdid: null, level: null, playerIp: null });
                            return;
                        }
                        const data = JSON.parse(res.responseText);
                        if (!Array.isArray(data) || data.length === 0) {
                            resolve({ nick, appmdid: null, level: null, playerIp: null });
                            return;
                        }

                        let appmdid = null, level = null, playerIp = null;
                        let closestConnectTime = null;

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
                            if (/отключился/i.test(item.transaction_desc) && !level) {
                                const m = item.transaction_desc.match(/Уровень:\s*(\d+)/i);
                                if (m) {
                                    level = m[1];
                                    if (!playerIp) playerIp = item.player_ip;
                                }
                            }
                        }
                        resolve({ nick, appmdid, level, playerIp });
                    } catch (e) {
                        resolve({ nick, appmdid: null, level: null, playerIp: null });
                    }
                },
                onerror: () => resolve({ nick, appmdid: null, level: null, playerIp: null })
            });
        });
    }

    async function globalThrottle() {
        const now = Date.now();
        const timeSinceLastRequest = now - lastRequestTime;
        if (timeSinceLastRequest < REQUEST_DELAY_MS) {
            await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY_MS - timeSinceLastRequest));
        }
        lastRequestTime = Date.now();
    }

    function createModal(tradeID) {
        if (openModals[tradeID]) return;

        const modalId = `trade-modal-${tradeID}`;
        let existingModal = document.getElementById(modalId);
        if (existingModal) {
            existingModal.style.display = 'flex';
            return;
        }

        const modalHtml = `
            <div id="${modalId}" class="trade-modal-overlay-resp" style="display: none;">
                <div class="trade-wrapper-resp">
                    <div class="trade-modal-resp">
                        <div class="trade-modal-header-resp">
                            <h3 class="trade-modal-title-resp">Логи трейда #${tradeID}</h3>
                            <button class="trade-modal-close-resp">&times;</button>
                        </div>
                        <div class="trade-modal-content-resp">
                            <div class="loading-resp">Загрузка логов...</div>
                        </div>
                        <div class="trade-modal-footer-resp"></div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const modal = document.getElementById(modalId);
        const wrapper = modal.querySelector('.trade-wrapper-resp');
        const content = modal.querySelector('.trade-modal-content-resp');
        const footer = modal.querySelector('.trade-modal-footer-resp');
        const closeBtn = modal.querySelector('.trade-modal-close-resp');

        openModals[tradeID] = modal;

        const closeModal = () => {
            modal.style.display = 'none';
            setTimeout(() => {
                if (modal.parentNode) modal.remove();
                delete openModals[tradeID];
            }, 300);
        };

        closeBtn.onclick = closeModal;
        modal.onclick = (e) => {
            if (e.target === modal) closeModal();
        };

        modal.style.display = 'flex';

        // Загрузка данных
        (async () => {
            await globalThrottle();
            const startDate = new Date(Date.now() - 5 * 30 * 24 * 60 * 1000).toISOString();
            const endDate = new Date().toISOString();
            const url = `https://logs.blackrussia.online/gslogs/${SERVER_ID}/api/list-game-logs/?transaction_desc__ilike=%25TradeID%3A+${tradeID}%25&time__gte=${startDate}&time__lte=${endDate}&order_by=time&offset=0&auto=false`;

            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                timeout: 15000,
                onload: (res) => {
                    try {
                        if (res.status !== 200) {
                            content.innerHTML = `<div class="error-resp">Ошибка: ${res.status}</div>`;
                            return;
                        }
                        const data = JSON.parse(res.responseText);
                        if (!Array.isArray(data) || data.length === 0) {
                            content.innerHTML = '<div class="error-resp">Логи не найдены</div>';
                            return;
                        }

                        content.innerHTML = '';
                        const tradeTime = data[0].time;
                        data.forEach(item => {
                            content.innerHTML += `
                                <div class="trade-row-resp">
                                    <div class="trade-player-info">
                                        <span class="trade-player-resp">${escapeHtml(item.player_name)}</span>
                                        <span class="trade-time-resp">${formatTime(item.time)}</span>
                                    </div>
                                    <div class="trade-desc-resp">${escapeHtml(item.transaction_desc)}</div>
                                </div>
                            `;
                        });

                        const uniquePlayers = [...new Set(data.map(i => i.player_name))].slice(0, 2);
                        if (uniquePlayers.length >= 2) {
                            footer.innerHTML = '<button class="both-nicks-btn-resp">Загрузить данные игроков</button>';
                            const connectBtn = footer.querySelector('.both-nicks-btn-resp');
                            connectBtn.onclick = async () => {
                                connectBtn.disabled = true;
                                connectBtn.textContent = "Загрузка...";
                                const results = await Promise.all([
                                    loadConnectData(uniquePlayers[0], tradeTime),
                                    loadConnectData(uniquePlayers[1], tradeTime)
                                ]);
                                createConnectPanel(results, wrapper, modal);
                                connectBtn.remove();
                            };
                        }
                    } catch (e) {
                        content.innerHTML = '<div class="error-resp">Ошибка обработки</div>';
                    }
                },
                onerror: () => {
                    content.innerHTML = '<div class="error-resp">Ошибка соединения</div>';
                }
            });
        })();
    }

    function createConnectPanel(players, wrapper, modal) {
        const existingPanel = wrapper.querySelector('.connect-panel-resp');
        if (existingPanel) existingPanel.remove();

        const panel = document.createElement('div');
        panel.className = 'connect-panel-resp';

        players.forEach(p => {
            if (p.appmdid) {
                const btn = document.createElement('button');
                btn.className = 'connect-btn-resp';
                btn.textContent = `${p.nick} | APPMDID: ${p.appmdid}`;
                btn.onclick = () => {
                    navigator.clipboard.writeText(p.appmdid);
                    btn.textContent = `${p.nick} | Скопировано!`;
                    setTimeout(() => btn.textContent = `${p.nick} | APPMDID: ${p.appmdid}`, 1500);
                };
                panel.appendChild(btn);
            }
            if (p.level) {
                const btn = document.createElement('button');
                btn.className = 'connect-btn-resp';
                btn.textContent = `${p.nick} | Уровень: ${p.level}`;
                panel.appendChild(btn);
            }
            if (p.playerIp) {
                const btn = document.createElement('button');
                btn.className = 'connect-btn-resp';
                btn.textContent = `${p.nick} | IP: ${p.playerIp}`;
                panel.appendChild(btn);
            }
        });

        wrapper.appendChild(panel);
    }

    function attachTradeButtons() {
        const tradeRegex = /TradeID:\s*(\d+)/g;
        const allCells = document.querySelectorAll('td');
        
        allCells.forEach(td => {
            if (td.innerHTML && td.innerHTML.includes('TradeID:')) {
                const matches = [...td.innerHTML.matchAll(tradeRegex)];
                matches.forEach(match => {
                    const tradeID = match[1];
                    if (!td.querySelector(`.details-btn-resp[data-trade="${tradeID}"]`)) {
                        const btn = document.createElement('button');
                        btn.className = 'details-btn-resp';
                        btn.dataset.trade = tradeID;
                        btn.textContent = `Детали #${tradeID}`;
                        btn.style.marginLeft = '10px';
                        btn.onclick = (e) => {
                            e.stopPropagation();
                            createModal(tradeID);
                        };
                        td.appendChild(btn);
                    }
                });
            }
        });
    }

    function attachVehicleExchangeButtons() {
        const rows = document.querySelectorAll('tr');
        rows.forEach(row => {
            const categoryCell = row.querySelector('.td-category a');
            if (categoryCell && categoryCell.textContent === 'Личное транспортное средство') {
                const transactionCell = row.querySelector('.td-transaction-desc');
                if (transactionCell && transactionCell.textContent) {
                    const desc = transactionCell.textContent;
                    if ((desc.includes('Доплата за обмен') || desc.includes('Обменялся с')) && 
                        desc.includes('Авто') && 
                        !transactionCell.querySelector('.vehicle-details-btn')) {
                        
                        const btn = document.createElement('button');
                        btn.className = 'details-btn-resp vehicle-details-btn';
                        btn.textContent = 'Детали обмена';
                        btn.style.marginLeft = '10px';
                        btn.onclick = (e) => {
                            e.stopPropagation();
                            alert('Детали обмена транспорта\n\n' + desc);
                        };
                        transactionCell.appendChild(btn);
                    }
                }
            }
        });
    }

    function attachIPInfoButtons() {
        const ipCells = document.querySelectorAll('.td-player-ip');
        ipCells.forEach(td => {
            const ip = td.textContent.trim();
            if (ip && ip !== 'N/A' && ip !== '' && !td.querySelector('.ip-info-btn')) {
                const btn = document.createElement('button');
                btn.className = 'ip-info-btn-resp';
                btn.textContent = 'ℹ️';
                btn.style.marginLeft = '5px';
                btn.style.cursor = 'pointer';
                btn.title = 'Информация об IP';
                btn.onclick = async (e) => {
                    e.stopPropagation();
                    const info = await getIPInfo(ip);
                    alert(`IP: ${info.ip}\nСтрана: ${info.country}\nГород: ${info.city}\nОрг: ${info.org}`);
                };
                td.appendChild(btn);
            }
        });
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }

    // === СТИЛИ ===
    GM_addStyle(`
        .details-btn-resp, .ip-info-btn-resp, .both-nicks-btn-resp, .connect-btn-resp, .ip-check-button {
            background: #2b8cff;
            color: white;
            border: none;
            padding: 4px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.2s;
        }
        .details-btn-resp:hover, .ip-info-btn-resp:hover, .both-nicks-btn-resp:hover, .ip-check-button:hover {
            background: #1f6cd9;
            transform: translateY(-1px);
        }
        .vehicle-details-btn {
            background: #8e2de2 !important;
        }
        .vehicle-details-btn:hover {
            background: #6a1fb5 !important;
        }
        .trade-modal-overlay-resp {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .trade-wrapper-resp {
            background: #1e1e23;
            border-radius: 12px;
            width: 90%;
            max-width: 700px;
            max-height: 80vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        .trade-modal-resp {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        .trade-modal-header-resp {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            border-bottom: 1px solid #333;
        }
        .trade-modal-title-resp {
            color: #2b8cff;
            margin: 0;
            font-size: 18px;
        }
        .trade-modal-close-resp {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
        }
        .trade-modal-content-resp {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
        }
        .trade-modal-footer-resp {
            padding: 12px 16px;
            border-top: 1px solid #333;
        }
        .trade-row-resp {
            padding: 10px 0;
            border-bottom: 1px solid #2a2a2a;
        }
        .trade-player-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        .trade-player-resp {
            font-weight: bold;
            color: #2b8cff;
        }
        .trade-time-resp {
            color: #888;
            font-size: 12px;
        }
        .trade-desc-resp {
            color: #ddd;
            font-size: 13px;
            word-break: break-word;
        }
        .connect-panel-resp {
            margin-top: 16px;
            padding: 12px;
            background: #2a2a2f;
            border-radius: 8px;
        }
        .connect-btn-resp {
            display: block;
            width: 100%;
            margin: 5px 0;
            text-align: left;
        }
        .both-nicks-btn-resp {
            width: 100%;
            padding: 8px;
            font-size: 14px;
        }
        .loading-resp {
            color: #2b8cff;
            text-align: center;
            padding: 20px;
        }
        .error-resp {
            color: #ff4757;
            text-align: center;
            padding: 20px;
        }
        .ip-results-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }
        .ip-result-card {
            background: #2a2a2f;
            padding: 12px;
            border-radius: 8px;
        }
        .ip-result-card h4 {
            margin: 0 0 10px 0;
            color: #2b8cff;
        }
        .distance-info {
            grid-column: span 2;
            background: #2a2a2f;
            padding: 12px;
            border-radius: 8px;
            text-align: center;
        }
        .distance-value {
            font-size: 20px;
            font-weight: bold;
            color: #ffd700;
        }
        .ip-input-group {
            margin-bottom: 12px;
        }
        .ip-input-group label {
            display: block;
            margin-bottom: 4px;
            color: white;
        }
        .ip-input-group input {
            width: 100%;
            padding: 8px;
            border-radius: 6px;
            border: 1px solid #444;
            background: #2a2a2f;
            color: white;
        }
        .check-ip-btn {
            background: #2b8cff;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
        }
        @media (max-width: 768px) {
            .ip-results-grid {
                grid-template-columns: 1fr;
            }
            .distance-info {
                grid-column: span 1;
            }
        }
    `);

    // === ИНИЦИАЛИЗАЦИЯ ===
    function init() {
        createIPCheckButton();
        createIPCheckModal();
        attachTradeButtons();
        attachVehicleExchangeButtons();
        attachIPInfoButtons();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Наблюдатель за изменениями DOM
    const observer = new MutationObserver(() => {
        attachTradeButtons();
        attachVehicleExchangeButtons();
        attachIPInfoButtons();
    });
    observer.observe(document.body, { childList: true, subtree: true });

})();
