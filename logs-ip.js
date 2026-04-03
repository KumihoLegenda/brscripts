// ==UserScript==
// @name        IP Info Viewer для Black Logs
// @namespace   http://tampermonkey.net/
// @version     1.2
// @description Просмотр информации об IP адресе на logs.blackrussia.online
// @match       https://logs.blackrussia.online/gslogs/*
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @connect     ipapi.co
// @connect     ipwhois.app
// @connect     ip.sb
// @connect     ip-api.com
// @connect     freeipapi.com
// @connect     reallyfreegeoip.org
// @connect     *
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

        // Пробуем несколько сервисов
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
            },
            {
                url: `https://freeipapi.com/api/json/${ip}`,
                parser: (data) => ({
                    ip: data.ipAddress || ip,
                    country: data.countryName || 'Неизвестно',
                    city: data.cityName || 'Неизвестно',
                    region: data.regionName || 'Неизвестно',
                    timezone: data.timeZone || 'Неизвестно',
                    org: data.isp || 'Неизвестно',
                    asn: '',
                    latitude: data.latitude,
                    longitude: data.longitude
                }),
                check: (data) => data && data.ipAddress
            }
        ];

        for (const service of services) {
            try {
                console.log(`[IP Info] Trying: ${service.url}`);
                const response = await fetch(service.url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    signal: AbortSignal.timeout(10000)
                });
                
                if (response.ok) {
                    const data = await response.json();
                    if (service.check(data)) {
                        const result = service.parser(data);
                        console.log(`[IP Info] Success from ${service.url}:`, result);
                        return result;
                    }
                }
            } catch (error) {
                console.log(`[IP Info] Failed ${service.url}:`, error.message);
                continue;
            }
        }

        // Если все сервисы не сработали
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
        // Создаем модальное окно
        const overlay = document.createElement("div");
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,.8);
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
            background: rgba(26, 26, 26, 0.98);
            color: #ffffff;
            box-shadow: 0 10px 35px rgba(0,0,0,.5);
            width: 95%;
            max-width: 550px;
            border-radius: 16px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            border: 1px solid rgba(255,255,255,0.15);
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
            padding: 16px 20px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            cursor: move;
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
            transition: all 0.2s ease;
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
        content.innerHTML = '<div style="text-align: center; padding: 30px;">⏳ Загрузка информации об IP...</div>';

        const footer = document.createElement("div");
        footer.style.cssText = `
            padding: 12px 20px;
            border-top: 1px solid rgba(255,255,255,0.1);
            text-align: center;
            font-size: 12px;
            color: #888;
        `;
        footer.innerHTML = 'Данные получены из открытых гео-сервисов';

        header.appendChild(title);
        header.appendChild(closeBtn);
        modal.appendChild(header);
        modal.appendChild(content);
        modal.appendChild(footer);
        wrapper.appendChild(modal);
        document.body.appendChild(overlay);
        document.body.appendChild(wrapper);

        // Анимация появления
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        });

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
        
        // Закрытие по Escape
        const onEsc = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        document.addEventListener('keydown', onEsc);

        // Drag functionality
        let isDragging = false;
        let startX, startY, startLeft, startTop;

        const dragStart = (e) => {
            if (e.target === closeBtn) return;
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            const rect = modal.getBoundingClientRect();
            startLeft = rect.left;
            startTop = rect.top;
            modal.style.position = 'fixed';
            modal.style.left = startLeft + 'px';
            modal.style.top = startTop + 'px';
            modal.style.margin = '0';
        };

        const drag = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            modal.style.left = (startLeft + dx) + 'px';
            modal.style.top = (startTop + dy) + 'px';
        };

        const dragEnd = () => {
            isDragging = false;
        };

        header.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        // Загружаем информацию
        try {
            const ipInfo = await getIPInfo(ip);
            
            const hasRealData = ipInfo.country &&
                               ipInfo.country !== 'Неизвестно' &&
                               ipInfo.country !== 'Не удалось определить';

            if (hasRealData) {
                content.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 14px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
                            <span style="font-weight: 600; color: #aaa;">🌐 IP адрес:</span>
                            <span style="font-family: monospace; font-size: 14px;">${ipInfo.ip}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
                            <span style="font-weight: 600; color: #aaa;">🌍 Страна:</span>
                            <span>${ipInfo.country}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
                            <span style="font-weight: 600; color: #aaa;">🏙️ Город:</span>
                            <span>${ipInfo.city || '—'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
                            <span style="font-weight: 600; color: #aaa;">🗺️ Регион:</span>
                            <span>${ipInfo.region || '—'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
                            <span style="font-weight: 600; color: #aaa;">⏰ Часовой пояс:</span>
                            <span>${ipInfo.timezone || '—'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
                            <span style="font-weight: 600; color: #aaa;">🏢 Провайдер:</span>
                            <span style="font-size: 13px;">${ipInfo.org || '—'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0;">
                            <span style="font-weight: 600; color: #aaa;">📍 Координаты:</span>
                            <span>${ipInfo.latitude ? ipInfo.latitude + ', ' + ipInfo.longitude : '—'}</span>
                        </div>
                        ${ipInfo.asn ? `<div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-top: 1px solid rgba(255,255,255,0.08); margin-top: 5px;">
                            <span style="font-weight: 600; color: #aaa;">🔗 ASN:</span>
                            <span style="font-size: 12px;">${ipInfo.asn}</span>
                        </div>` : ''}
                        ${ipInfo.note ? `<div style="margin-top: 15px; padding: 10px; background: rgba(255,215,0,0.1); border-radius: 8px; color: #ffd700; font-size: 12px; text-align: center;">
                            ℹ️ ${ipInfo.note}
                        </div>` : ''}
                    </div>
                `;
            } else {
                content.innerHTML = `
                    <div style="text-align: center; padding: 30px 20px;">
                        <div style="font-size: 48px; margin-bottom: 15px;">🌐</div>
                        <div style="color: #ff6b6b; font-weight: 600; margin-bottom: 15px;">Не удалось получить информацию об IP</div>
                        <div style="color: #aaa; font-size: 13px; line-height: 1.5;">
                            IP: <strong style="color: #fff; font-family: monospace;">${ip}</strong>
                        </div>
                        <div style="margin-top: 20px; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 10px; font-size: 12px; color: #888; text-align: left;">
                            Возможные причины:<br>
                            • IP адрес принадлежит частной сети (localhost, 192.168.x.x и т.д.)<br>
                            • Сервисы геолокации временно недоступны<br>
                            • IP адрес не существует или зарезервирован
                        </div>
                    </div>
                `;
            }
        } catch (error) {
            console.error('[IP Info] Error:', error);
            content.innerHTML = `
                <div style="text-align: center; padding: 30px 20px;">
                    <div style="font-size: 48px; margin-bottom: 15px;">⚠️</div>
                    <div style="color: #ff6b6b; font-weight: 600; margin-bottom: 10px;">Ошибка при получении информации</div>
                    <div style="color: #aaa; font-size: 13px;">${error.message}</div>
                    <div style="margin-top: 15px; font-size: 12px; color: #666;">Попробуйте обновить страницу или проверить другой IP</div>
                </div>
            `;
        }

        // Убираем слушатель Escape после закрытия
        const cleanup = () => {
            document.removeEventListener('keydown', onEsc);
            header.removeEventListener('mousedown', dragStart);
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', dragEnd);
        };
        
        // Переопределяем closeModal с cleanup
        const originalClose = closeModal;
        const newCloseModal = () => {
            cleanup();
            originalClose();
        };
        closeBtn.onclick = newCloseModal;
        overlay.onclick = newCloseModal;
    }

    // Функция для добавления кнопок
    function addIPInfoButtons() {
        const ipElements = document.querySelectorAll('td.td-player-ip');
        
        ipElements.forEach(td => {
            const ip = td.textContent.trim();
            if (ip && ip !== 'N/A' && ip !== '' && ip !== '—' && ip !== '0.0.0.0' && !td.querySelector('.ip-info-btn-custom')) {
                const btn = document.createElement('button');
                btn.textContent = 'ℹ️';
                btn.className = 'ip-info-btn-custom';
                btn.onclick = (e) => {
                    e.stopPropagation();
                    showIPInfo(ip);
                };
                td.appendChild(btn);
            }
        });
    }

    // Запуск
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(addIPInfoButtons, 500);
            const observer = new MutationObserver(() => addIPInfoButtons());
            observer.observe(document.body, { childList: true, subtree: true });
        });
    } else {
        setTimeout(addIPInfoButtons, 500);
        const observer = new MutationObserver(() => addIPInfoButtons());
        observer.observe(document.body, { childList: true, subtree: true });
    }

})();
