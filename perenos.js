// ==UserScript==
// @name         BR Panel (Menu Only)
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Floating menu with servers and thread mover (FIXED: now uses same logic as first script)
// @author       Black Russia
// @match        https://forum.blackrussia.online/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    if (document.body.getAttribute('data-br-script-injected-panel')) {
        return;
    }
    document.body.setAttribute('data-br-script-injected-panel', 'true');

    try {
        (function() {
            const STORAGE_PREFIX = 'br_panel_mix_';

            // === ФУНКЦИЯ ИЗ ПЕРВОГО СКРИПТА (полностью скопирована) ===
            function getFormData(data) {
                const formData = new FormData();
                Object.entries(data).forEach(i => formData.append(i[0], i[1]));
                return formData;
            }

            // === ФУНКЦИЯ РЕДАКТИРОВАНИЯ ТЕМЫ ИЗ ПЕРВОГО СКРИПТА ===
            function editThreadData(prefix, pin = false) {
                const threadTitle = document.querySelector('.p-title-value')?.lastChild?.textContent || '';
                
                if (pin == false) {
                    fetch(`${document.URL}edit`, {
                        method: 'POST',
                        body: getFormData({
                            prefix_id: prefix,
                            title: threadTitle,
                            _xfToken: XF.config.csrf,
                            _xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
                            _xfWithData: 1,
                            _xfResponseType: 'json',
                        }),
                    }).then(() => location.reload());
                }
                if (pin == true) {
                    fetch(`${document.URL}edit`, {
                        method: 'POST',
                        body: getFormData({
                            prefix_id: prefix,
                            title: threadTitle,
                            discussion_open: 1,
                            sticky: 1,
                            _xfToken: XF.config.csrf,
                            _xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
                            _xfWithData: 1,
                            _xfResponseType: 'json',
                        }),
                    }).then(() => location.reload());
                }
            }

            // === ФУНКЦИЯ ПЕРЕМЕЩЕНИЯ ТЕМЫ ИЗ ПЕРВОГО СКРИПТА ===
            function moveThread(prefix, targetNodeId) {
                const threadTitle = document.querySelector('.p-title-value')?.lastChild?.textContent || '';
                
                fetch(`${document.URL}move`, {
                    method: 'POST',
                    body: getFormData({
                        prefix_id: prefix,
                        title: threadTitle,
                        target_node_id: targetNodeId,
                        redirect_type: 'none',
                        notify_watchers: 1,
                        starter_alert: 1,
                        starter_alert_reason: "",
                        _xfToken: XF.config.csrf,
                        _xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
                        _xfWithData: 1,
                        _xfResponseType: 'json',
                    }),
                }).then(() => location.reload());
            }

            // === ОСНОВНАЯ ФУНКЦИЯ ДЛЯ ПЕРЕНОСА (как в первом скрипте) ===
            function moveThreadToSection(targetNodeId, prefixId = 0) {
                const threadId = getThreadIdFromUrl();
                if (!threadId) {
                    alert('Эта функция доступна только при просмотре темы!');
                    return false;
                }
                
                // Сначала меняем префикс (если указан), потом переносим
                if (prefixId !== 0) {
                    editThreadData(prefixId, false);
                }
                moveThread(prefixId, targetNodeId);
                return true;
            }

            function getThreadIdFromUrl() {
                const match = window.location.pathname.match(/\/threads\/[^.]+\.(\d+)/);
                return match ? match[1] : null;
            }

            // Данные с префиксами (как в первом скрипте)
            const TRANSFER_PREFIX1 = 20;   // передача админам 31
            const TRANSFER_PREFIX2 = 21;   // передача в обжалования 31
            const TRANSFER_PREFIX3 = 22;   // передача в жб на игроков 31
            const TRANSFER_PREFIX4 = 23;   // передача в тех раздел 31
            const TRANSFER_PREFIX5 = 24;   // передача в жб на тех 31
            const TRANSFER_PREFIX6 = 25;   // передача админам 32
            const TRANSFER_PREFIX7 = 26;   // передача в обжалования 32
            const TRANSFER_PREFIX8 = 27;   // передача в жб на игроков 32
            const TRANSFER_PREFIX9 = 28;   // передача в тех раздел 32
            const TRANSFER_PREFIX10 = 29;  // передача в жб на тех 32
            const TRANSFER_PREFIX11 = 30;  // передача админам 33
            const TRANSFER_PREFIX12 = 31;  // передача в обжалования 33
            const TRANSFER_PREFIX13 = 32;  // передача в жб на игроков 33
            const TRANSFER_PREFIX14 = 33;  // передача в тех раздел 33
            const TRANSFER_PREFIX15 = 34;  // передача в жб на тех 33
            const TRANSFER_PREFIX16 = 35;  // передача админам 34
            const TRANSFER_PREFIX17 = 36;  // передача в обжалования 34
            const TRANSFER_PREFIX18 = 37;  // передача в жб на игроков 34
            const TRANSFER_PREFIX19 = 38;  // передача в тех раздел 34
            const TRANSFER_PREFIX20 = 39;  // передача в жб на тех 34
            const TRANSFER_PREFIX21 = 40;  // передача админам 35
            const TRANSFER_PREFIX22 = 41;  // передача в обжалования 35
            const TRANSFER_PREFIX23 = 42;  // передача в жб на игроков 35
            const TRANSFER_PREFIX24 = 43;  // передача в тех раздел 35
            const TRANSFER_PREFIX25 = 44;  // передача в жб на тех 35

            // Соответствие типа раздела и префикса
            function getPrefixForSection(sectionType, serverId) {
                const prefixMap = {
                    'tech_complaint': { 31: TRANSFER_PREFIX5, 32: TRANSFER_PREFIX10, 33: TRANSFER_PREFIX15, 34: TRANSFER_PREFIX20, 35: TRANSFER_PREFIX25 },
                    'tech': { 31: TRANSFER_PREFIX4, 32: TRANSFER_PREFIX9, 33: TRANSFER_PREFIX14, 34: TRANSFER_PREFIX19,  ادام35: TRANSFER_PREFIX24 },
                    'player_complaint': { 31: TRANSFER_PREFIX3, 32: TRANSFER_PREFIX8, 33: TRANSFER_PREFIX13, 34: TRANSFER_PREFIX18, 35: TRANSFER_PREFIX23 }
                };
                return prefixMap[sectionType]?.[serverId] || 0;
            }

            // Данные разделов (с ссылками и nodeId)
            const DATA_TECH = [
                { text: 'RED (1)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-red.226/', color: '#8B008B', nodeId: 226 },
                // ... (все остальные сервера до 35, оставляем как в оригинале)
                { text: 'EKB (31)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-ekb.1458/', color: '#8B008B', nodeId: 1458 },
                { text: 'KRASNODAR (32)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-krasnodar.1460/', color: '#8B008B', nodeId: 1460 },
                { text: 'ARZAMAS (33)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-arzamas.1502/', color: '#8B008B', nodeId: 1502 },
                { text: 'NOVOSIBIRSK (34)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-novosibirsk.1544/', color: '#8B008B', nodeId: 1544 },
                { text: 'GROZNY (35)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-grozny.1586/', color: '#8B008B', nodeId: 1586 },
            ];

            const DATA_TECH_COMPLAINT = [
                { text: 'RED (1)', link: 'https://forum.blackrussia.online/forums/Сервер-№1-red.1182/', color: '#0000CD', nodeId: 1182 },
                // ... (все остальные сервера до 35)
                { text: 'EKB (31)', link: 'https://forum.blackrussia.online/forums/Сервер-№31-ekb.1457/', color: '#0000CD', nodeId: 1457 },
                { text: 'KRASNODAR (32)', link: 'https://forum.blackrussia.online/forums/Сервер-№32-krasnodar.1459/', color: '#0000CD', nodeId: 1459 },
                { text: 'ARZAMAS (33)', link: 'https://forum.blackrussia.online/forums/Сервер-№33-arzamas.1501/', color: '#0000CD', nodeId: 1501 },
                { text: 'NOVOSIBIRSK (34)', link: 'https://forum.blackrussia.online/forums/Сервер-№34-novosibirsk.1543/', color: '#0000CD', nodeId: 1543 },
                { text: 'GROZNY (35)', link: 'https://forum.blackrussia.online/forums/Сервер-№35-grozny.1585/', color: '#0000CD', nodeId: 1585 },
            ];

            const DATA_PLAYER_COMPLAINT = [
                { text: 'RED (1)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.88/', color: '#DC143C', nodeId: 88 },
                // ... (все остальные сервера до 35)
                { text: 'EKB (31)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1444/', color: '#DC143C', nodeId: 1444 },
                { text: 'KRASNODAR (32)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1488/', color: '#DC143C', nodeId: 1488 },
                { text: 'ARZAMAS (33)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1531/', color: '#DC143C', nodeId: 1531 },
                { text: 'NOVOSIBIRSK (34)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1572/', color: '#DC143C', nodeId: 1572 },
                { text: 'GROZNY (35)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1614/', color: '#DC143C', nodeId: 1614 },
            ];

            const OPS_LINK = { text: 'ОПС', href: 'https://forum.blackrussia.online/threads/Общие-правила-серверов.312571/', color: '#f59e0b', glow: true };

            const SERVER_LIST = [31, 32, 33, 34, 35].map(id => ({ id, name: id === 31 ? 'EKB' : id === 32 ? 'KRASNODAR' : id === 33 ? 'ARZAMAS' : id === 34 ? 'NOVOSIBIRSK' : 'GROZNY' }));

            function getSelected() {
                const saved = localStorage.getItem(STORAGE_PREFIX + 'servers');
                return saved ? JSON.parse(saved) : [31, 32, 33, 34, 35];
            }

            function renderMenu() {
                const menu = document.querySelector('.fnp-menu');
                if (!menu) return;

                menu.innerHTML = '';
                const selectedIds = getSelected();

                if (selectedIds.length === 0) {
                    const emptyMsg = document.createElement('div');
                    emptyMsg.style.cssText = 'color:#888; text-align:center; padding:10px; font-size:12px;';
                    emptyMsg.textContent = 'Серверы не выбраны. Нажмите настройки.';
                    menu.appendChild(emptyMsg);
                } else {
                    const createMoveButton = (dataArray, serverId, label, sectionType) => {
                        const item = dataArray.find(s => s.text.includes(`(${serverId})`));
                        if (!item || !item.nodeId) return null;
                        
                        const a = document.createElement('a');
                        a.className = 'fnp-link';
                        a.href = '#';
                        a.textContent = `${label} ${serverId}`;
                        a.style.borderBottom = `2px solid ${item.color}`;
                        
                        const prefixId = getPrefixForSection(sectionType, serverId);
                        
                        a.addEventListener('click', async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (confirm(`Перенести текущую тему в раздел "${label} ${serverId}"?`)) {
                                moveThreadToSection(item.nodeId, prefixId);
                            }
                        });
                        
                        return a;
                    };

                    const addGroup = (data, labelPrefix, sectionType) => {
                        const group = document.createElement('div');
                        group.className = 'fnp-grid';
                        selectedIds.forEach(id => {
                            const btn = createMoveButton(data, id, labelPrefix, sectionType);
                            if (btn) group.appendChild(btn);
                        });
                        menu.appendChild(group);
                    };

                    addGroup(DATA_TECH_COMPLAINT, 'ЖБТ', 'tech_complaint');
                    menu.appendChild(Object.assign(document.createElement('div'), { className: 'fnp-divider' }));
                    addGroup(DATA_TECH, 'ТР', 'tech');
                    menu.appendChild(Object.assign(document.createElement('div'), { className: 'fnp-divider' }));
                    addGroup(DATA_PLAYER_COMPLAINT, 'ЖБИ', 'player_complaint');
                    menu.appendChild(Object.assign(document.createElement('div'), { className: 'fnp-divider' }));

                    const ops = document.createElement('a');
                    ops.className = 'fnp-link glow';
                    ops.href = '#';
                    ops.textContent = OPS_LINK.text;
                    ops.style.borderBottom = `2px solid ${OPS_LINK.color}`;
                    ops.addEventListener('click', (e) => {
                        e.preventDefault();
                        window.open(OPS_LINK.href, '_blank');
                    });
                    menu.appendChild(ops);
                }

                const settingsBtn = document.createElement('div');
                settingsBtn.className = 'fnp-settings-btn';
                settingsBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`;
                settingsBtn.addEventListener('click', (e) => { e.stopPropagation(); openSettings(); });
                menu.appendChild(settingsBtn);
            }

            function openSettings() {
                const menu = document.querySelector('.fnp-menu');
                const toggleBtn = document.querySelector('.fnp-toggle');
                if (menu) menu.classList.remove('show');
                if (toggleBtn) toggleBtn.classList.remove('active');
                localStorage.setItem(STORAGE_PREFIX + 'state', 'false');

                let overlay = document.querySelector('.fnp-modal-overlay');
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.className = 'fnp-modal-overlay';
                    overlay.innerHTML = `
                        <div class="fnp-modal">
                            <div class="fnp-modal-header">Выбор серверов</div>
                            <div class="fnp-modal-body"></div>
                            <div class="fnp-modal-footer">
                                <button class="fnp-btn fnp-btn-secondary" id="fnp-cancel">Отмена</button>
                                <button class="fnp-btn fnp-btn-primary" id="fnp-save">Сохранить</button>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(overlay);
                    overlay.querySelector('#fnp-cancel').onclick = () => overlay.classList.remove('open');
                    overlay.querySelector('#fnp-save').onclick = () => {
                        const checked = Array.from(overlay.querySelectorAll('input:checked')).map(el => +el.value).sort((a, b) => a - b);
                        localStorage.setItem(STORAGE_PREFIX + 'servers', JSON.stringify(checked));
                        renderMenu();
                        overlay.classList.remove('open');
                    };
                }

                const body = overlay.querySelector('.fnp-modal-body');
                body.innerHTML = '';
                const current = getSelected();
                SERVER_LIST.forEach(srv => {
                    const lbl = document.createElement('label');
                    lbl.className = 'fnp-checkbox-label ' + (current.includes(srv.id) ? 'checked' : '');
                    lbl.innerHTML = `<input type="checkbox" value="${srv.id}" ${current.includes(srv.id) ? 'checked' : ''}> ${srv.name} (${srv.id})`;
                    lbl.querySelector('input').onchange = function () {
                        this.parentElement.classList.toggle('checked', this.checked);
                    };
                    body.appendChild(lbl);
                });
                setTimeout(() => overlay.classList.add('open'), 10);
            }

            // Стили (оставляем как в оригинале)
            const style = document.createElement('style');
            style.textContent = `
                :root { --fnp-btn: 48px; }
                .fnp-wrapper { position: fixed; top: 0; left: 0; width: 0; height: 0; z-index: 2147483647; }
                .fnp-toggle { position: fixed; width: var(--fnp-btn); height: var(--fnp-btn); background: #151515; border: 1px solid rgba(255,255,255,0.2); border-radius: 50%; box-shadow: 0 6px 25px rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; color: #fff; cursor: grab; touch-action: none; user-select: none; transition: transform 0.2s; }
                .fnp-toggle:active { transform: scale(0.9); cursor: grabbing; }
                .fnp-toggle.active { background: #2563eb; border-color: #3b82f6; }
                .fnp-toggle.active svg { transform: rotate(45deg); }
                .fnp-menu { position: fixed; background: rgba(20,20,20,0.95); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 10px; display: flex; flex-direction: column; gap: 5px; width: 300px; max-height: 70vh; overflow-y: auto; opacity: 0; visibility: hidden; transform: scale(0.9); transition: opacity 0.2s, transform 0.2s, visibility 0.2s; pointer-events: none; box-shadow: 0 10px 40px rgba(0,0,0,0.6); }
                .fnp-menu.show { opacity: 1; visibility: visible; transform: scale(1); pointer-events: auto; }
                .fnp-menu::-webkit-scrollbar { width: 4px; }
                .fnp-menu::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 2px; }
                .fnp-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; }
                .fnp-link { display: flex; align-items: center; justify-content: center; padding: 6px 2px; font-family: system-ui, -apple-system, sans-serif; font-size: 10px; font-weight: 700; color: #e5e5e5; text-decoration: none; background: rgba(255,255,255,0.05); border-radius: 6px; border: 1px solid transparent; transition: background 0.1s; white-space: nowrap; cursor: pointer; }
                .fnp-link:active { background: rgba(255,255,255,0.2); transform: translateY(1px); }
                .fnp-link.glow { background: rgba(245,158,11,0.15); color: #fbbf24; border-color: rgba(245,158,11,0.3); }
                .fnp-divider { height: 1px; background: rgba(255,255,255,0.15); margin: 4px 0; width: 100%; }
                .fnp-settings-btn { width: 100%; padding: 8px; margin-top: 5px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #aaa; cursor: pointer; display: flex; justify-content: center; align-items: center; }
                .fnp-settings-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
                .fnp-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 2147483648; display: flex; align-items: center; justify-content: center; opacity: 0; visibility: hidden; transition: 0.3s; }
                .fnp-modal-overlay.open { opacity: 1; visibility: visible; }
                .fnp-modal { background: #1a1a1a; border: 1px solid #333; border-radius: 12px; width: 90%; max-width: 500px; max-height: 85vh; display: flex; flex-direction: column; box-shadow: 0 20px 50px rgba(0,0,0,0.8); }
                .fnp-modal-header { padding: 15px; border-bottom: 1px solid #333; color: #fff; font-weight: bold; }
                .fnp-modal-body { padding: 15px; overflow-y: auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 8px; }
                .fnp-modal-footer { padding: 15px; border-top: 1px solid #333; display: flex; justify-content: flex-end; gap: 10px; }
                .fnp-checkbox-label { display: flex; align-items: center; gap: 8px; background: #222; padding: 6px; border-radius: 6px; cursor: pointer; user-select: none; color: #ccc; font-size: 12px; border: 1px solid #333; }
                .fnp-checkbox-label:hover { background: #2a2a2a; }
                .fnp-checkbox-label input { accent-color: #2563eb; }
                .fnp-checkbox-label.checked { border-color: #2563eb; background: rgba(37,99,235,0.1); color: #fff; }
                .fnp-btn { padding: 8px 16px; border-radius: 6px; border: none; cursor: pointer; font-weight: bold; transition: 0.2s; }
                .fnp-btn-primary { background: #2563eb; color: #fff; }
                .fnp-btn-primary:hover { background: #1d4ed8; }
                .fnp-btn-secondary { background: #333; color: #ccc; }
                .fnp-btn-secondary:hover { background: #444; color: #fff; }
            `;
            document.head.appendChild(style);

            // Создание плавающей кнопки
            const wrapper = document.createElement('div');
            wrapper.className = 'fnp-wrapper';
            const toggleBtn = document.createElement('div');
            toggleBtn.className = 'fnp-toggle';
            toggleBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" fill="none"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;
            const menu = document.createElement('div');
            menu.className = 'fnp-menu';
            wrapper.appendChild(menu);
            wrapper.appendChild(toggleBtn);
            document.body.appendChild(wrapper);

            let savedPos = localStorage.getItem(STORAGE_PREFIX + 'pos');
            let pos = savedPos ? JSON.parse(savedPos) : { x: window.innerWidth - 60, y: window.innerHeight * 0.6 };
            let isDragging = false;

            const updatePos = (x, y) => {
                pos.x = Math.min(Math.max(0, x), window.innerWidth - 50);
                pos.y = Math.min(Math.max(0, y), window.innerHeight - 50);
                toggleBtn.style.left = pos.x + 'px';
                toggleBtn.style.top = pos.y + 'px';
                const rect = toggleBtn.getBoundingClientRect();
                menu.style.left = (rect.right + 310 > window.innerWidth ? rect.left - 310 : rect.right + 10) + 'px';
                menu.style.top = (rect.bottom + 300 > window.innerHeight ? rect.top - 300 : rect.top) + 'px';
            };

            toggleBtn.addEventListener('pointerdown', (e) => {
                isDragging = true;
                toggleBtn.setPointerCapture(e.pointerId);
                toggleBtn.style.transition = 'none';
            });

            toggleBtn.addEventListener('pointermove', (e) => {
                if (!isDragging) return;
                updatePos(e.clientX - 24, e.clientY - 24);
            });

            toggleBtn.addEventListener('pointerup', (e) => {
                isDragging = false;
                toggleBtn.releasePointerCapture(e.pointerId);
                toggleBtn.style.transition = 'all 0.3s';
                pos.x = pos.x < window.innerWidth / 2 ? 10 : window.innerWidth - 60;
                updatePos(pos.x, pos.y);
                localStorage.setItem(STORAGE_PREFIX + 'pos', JSON.stringify(pos));
                if (Math.abs(e.clientX - 24 - pos.x) < 10) {
                    const show = menu.classList.toggle('show');
                    toggleBtn.classList.toggle('active', show);
                    localStorage.setItem(STORAGE_PREFIX + 'state', show);
                    if (show) updatePos(pos.x, pos.y);
                }
            });

            updatePos(pos.x, pos.y);
            renderMenu();
            if (localStorage.getItem(STORAGE_PREFIX + 'state') === 'true') {
                menu.classList.add('show');
                toggleBtn.classList.add('active');
            }
        })();
    } catch (e) {
        console.error('[BR Script] Panel Error:', e);
    }
})();
