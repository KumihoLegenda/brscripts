// ==UserScript==
// @name        IP Info Viewer для Black Logs
// @namespace   http://tampermonkey.net/
// @version     1.5
// @description Просмотр информации об IP адресе на logs.blackrussia.online
// @match       https://logs.blackrussia.online/gslogs/*
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @connect     ip-api.com
// @connect     ipwhois.app
// @connect     ipapi.co
// @run-at      document-end
// ==/UserScript==

(function() {
    'use strict';

    // Добавляем стили
    GM_addStyle(`
        .ip-info-btn-custom {
            background: transparent !important;
            color: #fff !important;
            border: 1px solid #fff !important;
            padding: 2px 8px !important;
            margin-left: 8px !important;
            font-size: 12px !important;
            border-radius: 4px !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            display: inline-block !important;
        }
        .ip-info-btn-custom:hover {
            background: rgba(255, 255, 255, 0.2) !important;
            border-color: #2b8cff !important;
        }
        .ip-modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,.85);
            z-index: 99999;
            backdrop-filter: blur(4px);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .ip-modal-wrapper {
            position: fixed;
            z-index: 100000;
            inset: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 16px;
        }
        .ip-modal {
            background: rgba(20, 20, 30, 0.98);
            color: #ffffff;
            box-shadow: 0 20px 40px rgba(0,0,0,.5);
            width: 90%;
            max-width: 500px;
            border-radius: 16px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            border: 1px solid rgba(255,255,255,0.15);
            opacity: 0;
            transform: scale(0.95);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .ip-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .ip-modal-title {
            font-size: 18px;
            font-weight: 600;
            color: #2b8cff;
            margin: 0;
        }
        .ip-modal-close {
            background: transparent;
            border: none;
            color: #999;
            font-size: 24px;
            line-height: 1;
            padding: 0;
            width: 32px;
            height: 32px;
            cursor: pointer;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .ip-modal-close:hover {
            color: #fff;
            background: rgba(255,255,255,0.1);
        }
        .ip-modal-content {
            padding: 20px;
            max-height: 60vh;
            overflow-y: auto;
        }
        .ip-info-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .ip-info-label {
            font-weight: 600;
            color: #aaa;
        }
        .ip-info-value {
            word-break: break-word;
            text-align: right;
        }
        .loading-spinner {
            text-align: center;
            padding: 30px;
        }
        .error-message {
            text-align: center;
            padding: 30px 20px;
            color: #ff6b6b;
        }
        .success-message {
            color: #00ff88;
        }
    `);

    // Функция для получения информации об IP через GM_xmlhttpRequest
    function getIPInfo(ip) {
        return new Promise((resolve) => {
            // Используем ip-api.com (самый надежный, не требует ключа)
            const url = `http://ip-api.com/json/${ip}?fields=status,country,regionName,city,timezone,isp,as,lat,lon,query`;
            
            console.log(`[IP Info] Запрос информации для IP: ${ip}`);
            
            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                headers: {
                    "Accept": "application/json"
                },
                onload: function(response) {
                    try {
                        console.log(`[IP Info] Статус ответа: ${response.status}`);
                        
                        if (response.status === 200) {
                            const data = JSON.parse(response.responseText);
                            console.log(`[IP Info] Данные:`, data);
                            
                            if (data.status === 'success') {
                                resolve({
                                    ip: data.query || ip,
                                    country: data.country || 'Неизвестно',
                                    city: data.city || 'Неизвестно',
                                    region: data.regionName || 'Неизвестно',
                                    timezone: data.timezone || 'Неизвестно',
                                    org: data.isp || 'Неизвестно',
                                    asn: data.as || 'Неизвестно',
                                    latitude: data.lat,
                                    longitude: data.lon,
                                    success: true
                                });
                                return;
                            }
                        }
                        
                        // Если первый сервис не сработал, пробуем запасной
                        getIPInfoAlternative(ip).then(resolve);
                        
                    } catch (e) {
                        console.error('[IP Info] Ошибка парсинга:', e);
                        getIPInfoAlternative(ip).then(resolve);
                    }
                },
                onerror: function(error) {
                    console.error('[IP Info] Ошибка запроса:', error);
                    getIPInfoAlternative(ip).then(resolve);
                },
                ontimeout: function() {
                    console.error('[IP Info] Таймаут запроса');
                    getIPInfoAlternative(ip).then(resolve);
                },
                timeout: 10000
            });
        });
    }
    
    // Запасной сервис
    function getIPInfoAlternative(ip) {
        return new Promise((resolve) => {
            const url = `https://ipwhois.app/json/${ip}`;
            
            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                headers: {
                    "Accept": "application/json"
                },
                onload: function(response) {
                    try {
                        if (response.status === 200) {
                            const data = JSON.parse(response.responseText);
                            
                            if (data && data.success !== false && data.country) {
                                resolve({
                                    ip: data.ip || ip,
                                    country: data.country || 'Неизвестно',
                                    city: data.city || 'Неизвестно',
                                    region: data.region || 'Неизвестно',
                                    timezone: data.timezone || 'Неизвестно',
                                    org: data.isp || 'Неизвестно',
                                    asn: data.asn || 'Неизвестно',
                                    latitude: data.latitude,
                                    longitude: data.longitude,
                                    success: true
                                });
                                return;
                            }
                        }
                        
                        // Если ничего не сработало
                        resolve({
                            ip: ip,
                            country: 'Не удалось определить',
                            city: 'Неизвестно',
                            region: 'Неизвестно',
                            timezone: 'Неизвестно',
                            org: 'Неизвестно',
                            asn: 'Неизвестно',
                            latitude: null,
                            longitude: null,
                            success: false
                        });
                        
                    } catch (e) {
                        resolve({
                            ip: ip,
                            country: 'Не удалось определить',
                            city: 'Неизвестно',
                            region: 'Неизвестно',
                            timezone: 'Неизвестно',
                            org: 'Неизвестно',
                            asn: 'Неизвестно',
                            latitude: null,
                            longitude: null,
                            success: false
                        });
                    }
                },
                onerror: function() {
                    resolve({
                        ip: ip,
                        country: 'Не удалось определить',
                        city: 'Неизвестно',
                        region: 'Неизвестно',
                        timezone: 'Неизвестно',
                        org: 'Неизвестно',
                        asn: 'Неизвестно',
                        latitude: null,
                        longitude: null,
                        success: false
                    });
                },
                timeout: 10000
            });
        });
    }

    // Функция для отображения модального окна
    function showIPInfo(ip) {
        // Создаем элементы
        const overlay = document.createElement('div');
        overlay.className = 'ip-modal-overlay';
        
        const wrapper = document.createElement('div');
        wrapper.className = 'ip-modal-wrapper';
        
        const modal = document.createElement('div');
        modal.className = 'ip-modal';
        
        const header = document.createElement('div');
        header.className = 'ip-modal-header';
        
        const title = document.createElement('h3');
        title.className = 'ip-modal-title';
        title.textContent = `ℹ️ Информация об IP: ${ip}`;
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'ip-modal-close';
        closeBtn.innerHTML = '✕';
        
        const content = document.createElement('div');
        content.className = 'ip-modal-content';
        content.innerHTML = '<div class="loading-spinner">⏳ Загрузка информации...</div>';
        
        header.appendChild(title);
        header.appendChild(closeBtn);
        modal.appendChild(header);
        modal.appendChild(content);
        wrapper.appendChild(modal);
        document.body.appendChild(overlay);
        document.body.appendChild(wrapper);
        
        // Анимация появления
        setTimeout(() => {
            overlay.style.opacity = '1';
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        }, 10);
        
        // Закрытие
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
        
        // Escape
        const onEsc = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', onEsc);
            }
        };
        document.addEventListener('keydown', onEsc);
        
        // Загружаем данные
        getIPInfo(ip).then(ipInfo => {
            console.log('[IP Info] Результат:', ipInfo);
            
            if (ipInfo.success && ipInfo.country && ipInfo.country !== 'Не удалось определить') {
                content.innerHTML = `
                    <div class="ip-info-row">
                        <span class="ip-info-label">🌐 IP адрес:</span>
                        <span class="ip-info-value">${ipInfo.ip}</span>
                    </div>
                    <div class="ip-info-row">
                        <span class="ip-info-label">🌍 Страна:</span>
                        <span class="ip-info-value">${ipInfo.country}</span>
                    </div>
                    <div class="ip-info-row">
                        <span class="ip-info-label">🏙️ Город:</span>
                        <span class="ip-info-value">${ipInfo.city || '—'}</span>
                    </div>
                    <div class="ip-info-row">
                        <span class="ip-info-label">🗺️ Регион:</span>
                        <span class="ip-info-value">${ipInfo.region || '—'}</span>
                    </div>
                    <div class="ip-info-row">
                        <span class="ip-info-label">⏰ Часовой пояс:</span>
                        <span class="ip-info-value">${ipInfo.timezone || '—'}</span>
                    </div>
                    <div class="ip-info-row">
                        <span class="ip-info-label">🏢 Провайдер:</span>
                        <span class="ip-info-value" style="font-size: 12px;">${ipInfo.org || '—'}</span>
                    </div>
                    ${ipInfo.asn && ipInfo.asn !== 'Неизвестно' ? `
                    <div class="ip-info-row">
                        <span class="ip-info-label">🔗 ASN:</span>
                        <span class="ip-info-value">${ipInfo.asn}</span>
                    </div>` : ''}
                    ${ipInfo.latitude ? `
                    <div class="ip-info-row">
                        <span class="ip-info-label">📍 Координаты:</span>
                        <span class="ip-info-value">${ipInfo.latitude}, ${ipInfo.longitude}</span>
                    </div>` : ''}
                `;
            } else {
                content.innerHTML = `
                    <div class="error-message">
                        <div style="font-size: 48px; margin-bottom: 15px;">🌐</div>
                        <div style="margin-bottom: 10px;">Не удалось получить информацию об IP</div>
                        <div style="font-size: 12px; color: #aaa; font-family: monospace;">IP: ${ip}</div>
                        <div style="margin-top: 20px; font-size: 11px; color: #666;">Возможные причины:<br>• Сервисы геолокации временно недоступны<br>• IP адрес принадлежит частной сети<br>• Проблемы с подключением</div>
                    </div>
                `;
            }
        }).catch(err => {
            console.error('[IP Info] Ошибка:', err);
            content.innerHTML = `
                <div class="error-message">
                    <div style="font-size: 48px; margin-bottom: 15px;">⚠️</div>
                    <div>Ошибка при загрузке данных</div>
                    <div style="font-size: 12px; color: #aaa; margin-top: 10px;">${err.message || 'Проверьте консоль для деталей'}</div>
                </div>
            `;
        });
    }

    // Функция для добавления кнопок
    function addIPInfoButtons() {
        const ipCells = document.querySelectorAll('td.td-player-ip');
        
        ipCells.forEach(cell => {
            // Проверяем, есть ли уже кнопка
            if (cell.querySelector('.ip-info-btn-custom')) return;
            
            // Получаем текст IP (берем первый текстовый узел)
            let ipText = '';
            for (const node of cell.childNodes) {
                if (node.nodeType === Node.TEXT_NODE) {
                    ipText = node.textContent.trim();
                    break;
                }
            }
            if (!ipText) ipText = cell.textContent.trim();
            
            // Очищаем от лишних символов
            ipText = ipText.replace(/[^\d\.]/g, '');
            
            // Проверяем валидность IP
            const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
            if (ipText && ipRegex.test(ipText)) {
                const btn = document.createElement('button');
                btn.textContent = 'ℹ️';
                btn.className = 'ip-info-btn-custom';
                btn.title = `Информация об IP: ${ipText}`;
                btn.onclick = (e) => {
                    e.stopPropagation();
                    showIPInfo(ipText);
                };
                cell.appendChild(btn);
                console.log(`[IP Info] Добавлена кнопка для IP: ${ipText}`);
            }
        });
    }

    // Запускаем добавление кнопок
    function init() {
        console.log('[IP Info] Скрипт запущен');
        
        // Проверяем наличие таблицы
        const checkInterval = setInterval(() => {
            const ipCells = document.querySelectorAll('td.td-player-ip');
            if (ipCells.length > 0) {
                clearInterval(checkInterval);
                addIPInfoButtons();
            }
        }, 500);
        
        // Останавливаем проверку через 30 секунд
        setTimeout(() => clearInterval(checkInterval), 30000);
    }
    
    // Запуск
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Наблюдаем за изменениями
    const observer = new MutationObserver(() => {
        addIPInfoButtons();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
