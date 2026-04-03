// ==UserScript==
// @name        IP Info Viewer для Black Logs
// @namespace   http://tampermonkey.net/
// @version     1.3
// @description Просмотр информации об IP адресе на logs.blackrussia.online
// @match       https://logs.blackrussia.online/gslogs/*
// @grant       GM_addStyle
// @run-at      document-end
// ==/UserScript==

(function() {
    'use strict';

    // Добавляем стили для кнопки
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
    `);

    // Функция для получения информации об IP с использованием fetch
    async function getIPInfo(ip) {
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (!ipRegex.test(ip)) {
            throw new Error(`Неверный формат IP: ${ip}`);
        }

        const services = [
            {
                url: `https://ipapi.co/${ip}/json/`,
                parser: (data) => ({
                    ip: data.ip || ip,
                    country: data.country_name || 'Неизвестно',
                    city: data.city || 'Неизвестно',
                    region: data.region || 'Неизвестно',
                    timezone: data.timezone || 'Неизвестно',
                    org: data.org || 'Неизвестно',
                    asn: data.asn || 'Неизвестно',
                    latitude: data.latitude,
                    longitude: data.longitude
                }),
                check: (data) => data && !data.error && data.country_name
            },
            {
                url: `https://ipwhois.app/json/${ip}`,
                parser: (data) => ({
                    ip: data.ip || ip,
                    country: data.country || 'Неизвестно',
                    city: data.city || 'Неизвестно',
                    region: data.region || 'Неизвестно',
                    timezone: data.timezone || 'Неизвестно',
                    org: data.isp || 'Неизвестно',
                    asn: data.asn || 'Неизвестно',
                    latitude: data.latitude,
                    longitude: data.longitude
                }),
                check: (data) => data && data.success !== false && data.country
            },
            {
                url: `https://ip-api.com/json/${ip}?fields=status,country,regionName,city,timezone,isp,as,lat,lon,query`,
                parser: (data) => ({
                    ip: data.query || ip,
                    country: data.country || 'Неизвестно',
                    city: data.city || 'Неизвестно',
                    region: data.regionName || 'Неизвестно',
                    timezone: data.timezone || 'Неизвестно',
                    org: data.isp || 'Неизвестно',
                    asn: data.as || 'Неизвестно',
                    latitude: data.lat,
                    longitude: data.lon
                }),
                check: (data) => data && data.status === 'success'
            }
        ];

        for (const service of services) {
            try {
                const response = await fetch(service.url, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' },
                    signal: AbortSignal.timeout(8000)
                });
                
                if (response.ok) {
                    const data = await response.json();
                    if (service.check(data)) {
                        const result = service.parser(data);
                        return result;
                    }
                }
            } catch (error) {
                continue;
            }
        }

        return {
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
    }

    // Функция для отображения информации об IP в модальном окне
    async function showIPInfo(ip) {
        const overlay = document.createElement("div");
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,.85);
            z-index: 99999;
            backdrop-filter: blur(4px);
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const wrapper = document.createElement("div");
        wrapper.style.cssText = `
            position: fixed;
            z-index: 100000;
            inset: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 16px;
        `;

        const modal = document.createElement("div");
        modal.style.cssText = `
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
        `;

        const header = document.createElement("div");
        header.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        `;

        const title = document.createElement("h3");
        title.style.cssText = `
            font-size: 18px;
            font-weight: 600;
            color: #2b8cff;
            margin: 0;
        `;
        title.textContent = `ℹ️ Информация об IP: ${ip}`;

        const closeBtn = document.createElement("button");
        closeBtn.innerHTML = "✕";
        closeBtn.style.cssText = `
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
        `;
        closeBtn.onmouseover = () => {
            closeBtn.style.color = '#fff';
            closeBtn.style.background = 'rgba(255,255,255,0.1)';
        };
        closeBtn.onmouseout = () => {
            closeBtn.style.color = '#999';
            closeBtn.style.background = 'transparent';
        };

        const content = document.createElement("div");
        content.style.cssText = `
            padding: 20px;
            max-height: 60vh;
            overflow-y: auto;
        `;
        content.innerHTML = '<div style="text-align: center; padding: 30px;">⏳ Загрузка информации...</div>';

        header.appendChild(title);
        header.appendChild(closeBtn);
        modal.appendChild(header);
        modal.appendChild(content);
        wrapper.appendChild(modal);
        document.body.appendChild(overlay);
        document.body.appendChild(wrapper);

        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        });

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
        
        document.addEventListener('keydown', function onEsc(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', onEsc);
            }
        });

        try {
            const ipInfo = await getIPInfo(ip);
            
            const hasRealData = ipInfo.country &&
                               ipInfo.country !== 'Неизвестно' &&
                               ipInfo.country !== 'Не удалось определить';

            if (hasRealData) {
                content.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
                            <span style="font-weight: 600; color: #aaa;">🌐 IP:</span>
                            <span style="font-family: monospace;">${ipInfo.ip}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
                            <span style="font-weight: 600; color: #aaa;">🌍 Страна:</span>
                            <span>${ipInfo.country}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
                            <span style="font-weight: 600; color: #aaa;">🏙️ Город:</span>
                            <span>${ipInfo.city || '—'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
                            <span style="font-weight: 600; color: #aaa;">🗺️ Регион:</span>
                            <span>${ipInfo.region || '—'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
                            <span style="font-weight: 600; color: #aaa;">⏰ Часовой пояс:</span>
                            <span>${ipInfo.timezone || '—'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                            <span style="font-weight: 600; color: #aaa;">🏢 Провайдер:</span>
                            <span style="font-size: 12px;">${ipInfo.org || '—'}</span>
                        </div>
                        ${ipInfo.note ? `<div style="margin-top: 15px; padding: 10px; background: rgba(255,215,0,0.1); border-radius: 8px; color: #ffd700; font-size: 12px; text-align: center;">
                            ℹ️ ${ipInfo.note}
                        </div>` : ''}
                    </div>
                `;
            } else {
                content.innerHTML = `
                    <div style="text-align: center; padding: 30px 20px;">
                        <div style="font-size: 48px; margin-bottom: 15px;">🌐</div>
                        <div style="color: #ff6b6b; margin-bottom: 15px;">Не удалось получить информацию</div>
                        <div style="color: #aaa; font-size: 13px;">
                            IP: <strong style="color: #fff;">${ip}</strong>
                        </div>
                    </div>
                `;
            }
        } catch (error) {
            content.innerHTML = `
                <div style="text-align: center; padding: 30px 20px;">
                    <div style="font-size: 48px; margin-bottom: 15px;">⚠️</div>
                    <div style="color: #ff6b6b;">Ошибка загрузки</div>
                    <div style="color: #aaa; font-size: 12px; margin-top: 10px;">${error.message}</div>
                </div>
            `;
        }
    }

    // Функция для добавления кнопок - более агрессивный поиск
    function addIPInfoButtons() {
        // Ищем все ячейки с IP адресами
        const ipCells = document.querySelectorAll('td.td-player-ip');
        
        ipCells.forEach(cell => {
            // Получаем текст IP (может быть вложен в другие элементы)
            let ipText = cell.textContent || cell.innerText;
            ipText = ipText.trim();
            
            // Очищаем от лишних символов
            ipText = ipText.replace(/[^\d\.]/g, '');
            
            // Проверяем, что это похоже на IP и кнопка еще не добавлена
            const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
            if (ipText && ipRegex.test(ipText) && !cell.querySelector('.ip-info-btn-custom')) {
                const btn = document.createElement('button');
                btn.textContent = 'ℹ️';
                btn.className = 'ip-info-btn-custom';
                btn.title = `Информация об IP: ${ipText}`;
                btn.onclick = (e) => {
                    e.stopPropagation();
                    showIPInfo(ipText);
                };
                cell.appendChild(btn);
            }
        });
    }

    // Функция для поиска таблицы и ожидания её загрузки
    function waitForTableAndAddButtons() {
        // Проверяем каждые 500ms, появилась ли таблица
        const interval = setInterval(() => {
            const table = document.querySelector('#log-table');
            const ipCells = document.querySelectorAll('td.td-player-ip');
            
            if (table && ipCells.length > 0) {
                clearInterval(interval);
                addIPInfoButtons();
            }
        }, 500);
        
        // Останавливаем проверку через 30 секунд, чтобы не весить вечно
        setTimeout(() => clearInterval(interval), 30000);
    }

    // Запуск после полной загрузки страницы
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(waitForTableAndAddButtons, 1000);
        });
    } else {
        setTimeout(waitForTableAndAddButtons, 1000);
    }

    // Наблюдаем за изменениями (пагинация, фильтры)
    const observer = new MutationObserver(() => {
        addIPInfoButtons();
    });
    
    // Запускаем observer после загрузки страницы
    window.addEventListener('load', () => {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });

})();
