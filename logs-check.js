// ==UserScript==
// @name         BR Universal Checker V30 (Сфера + Формат сумм)
// @namespace    http://tampermonkey.net/
// @version      30.0
// @description  Перетаскиваемая сфера. Мульти (IP/APPMDID) + ППИВ (боты 3-го уровня).
// @author       You
// @match        https://logs.blackrussia.online/gslogs/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    let panelVisible = false;

    // === СТИЛИ ===
    const panelStyles = `
        #br-sphere {
            position: fixed;
            right: 30px;
            bottom: 30px;
            width: 55px;
            height: 55px;
            border-radius: 50%;
            background: linear-gradient(135deg, #2b8cff, #1f6cd9);
            box-shadow: 0 6px 20px rgba(43, 140, 255, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 26px;
            color: #fff;
            cursor: grab;
            z-index: 100000;
            user-select: none;
            transition: transform 0.2s, box-shadow 0.2s;
            touch-action: none; /* Для мобильных устройств */
        }
        #br-sphere:hover {
            transform: scale(1.08);
            box-shadow: 0 8px 25px rgba(43, 140, 255, 0.7);
            cursor: grab;
        }
        #br-sphere.dragging {
            cursor: grabbing;
            transition: none;
            box-shadow: 0 12px 35px rgba(43, 140, 255, 0.9);
        }
        #br-checker-panel {
            position: fixed;
            right: 20px;
            bottom: 100px;
            width: 340px;
            background: #1e1e1e;
            border: 1px solid #444;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.8);
            color: #e0e0e0;
            font-family: 'Segoe UI', sans-serif;
            z-index: 99999;
            display: none;
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.25s ease, transform 0.25s ease;
            flex-direction: column;
            gap: 12px;
        }
        #br-checker-panel.active {
            display: flex;
            opacity: 1;
            transform: translateY(0);
        }
        #br-checker-panel .panel-title { font-size: 18px; font-weight: bold; color: #2b8cff; text-align: center; margin-bottom: 5px; }
        #br-checker-panel label { font-size: 13px; color: #aaa; }
        #br-checker-panel input { width: 100%; padding: 8px 12px; background: #2d2d2d; border: 1px solid #555; border-radius: 6px; color: #fff; box-sizing: border-box; }
        #br-checker-panel select { width: 100%; padding: 8px 12px; background: #2d2d2d; border: 1px solid #555; border-radius: 6px; color: #fff; box-sizing: border-box; cursor: pointer; }
        #br-checker-panel .btn-run { width: 100%; padding: 10px; background: linear-gradient(145deg, #2b8cff, #1f6cd9); border: none; border-radius: 8px; color: #fff; font-weight: bold; cursor: pointer; transition: 0.2s; margin-top: 5px; }
        #br-checker-panel .btn-run:hover { filter: brightness(1.1); }
        #br-checker-panel .btn-run:disabled { opacity: 0.5; cursor: not-allowed; }
        #br-checker-panel .result-box { background: #2d2d2d; border-radius: 8px; padding: 12px; min-height: 40px; max-height: 300px; overflow-y: auto; font-size: 13px; line-height: 1.4; border: 1px solid #444; margin-top: 5px; }
        .result-found { border-left: 4px solid #d32f2f; }
        .result-clean { border-left: 4px solid #2e7d32; }
        .result-info { border-left: 4px solid #1976d2; }
        .result-error { border-left: 4px solid #d32f2f; }
        .result-ppiv { border-left: 4px solid #ff9800; }
    `;
    GM_addStyle(panelStyles);

    // === ВСПОМОГАТЕЛЬНЫЕ ===
    function showResult(message, type, resultBox) {
        resultBox.innerHTML = '';
        const div = document.createElement('div'); div.innerHTML = message; resultBox.appendChild(div);
        resultBox.className = `result-box ${type}`;
    }

    function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
    function isValidIp(ip) { return ip && ip !== '0.0.0.0' && ip !== '127.0.0.1'; }
    function extractAppmdid(desc) { const match = desc?.match(/APPMDID:\s*(\d+)/i); return match ? match[1] : null; }

    // ФОРМАТИРОВАНИЕ СУММ (добавление точек/пробелов)
    function formatAmount(amount) {
        if (!amount) return '0';
        // Преобразуем в строку, удаляем возможные точки/запятые, форматируем
        let numStr = String(amount).replace(/[.,\s]/g, '');
        // Если число дробное, сохраняем копейки (если есть)
        let parts = numStr.split('.');
        let intPart = parts[0];
        let decPart = parts.length > 1 ? '.' + parts[1] : '';
        // Разбиваем на тройки
        let formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return formatted + decPart;
    }

    let lastRequestTime = 0;
    const REQUEST_DELAY_MS = 600;
    const PERIOD_DAYS = 60;

    // === ОБЩАЯ ФУНКЦИЯ ЗАПРОСА ===
    async function getLogs(serverId, filters = {}) {
        const since = Date.now() - lastRequestTime;
        if (since < REQUEST_DELAY_MS) await wait(REQUEST_DELAY_MS - since);
        lastRequestTime = Date.now();

        const endDate = new Date();
        const startDate = new Date(Date.now() - PERIOD_DAYS * 24 * 60 * 60 * 1000);

        const params = new URLSearchParams({
            category_id__exact: '',
            player_name__exact: '',
            player_id__exact: '',
            player_ip__exact: '',
            transaction_desc__ilike: '',
            time__gte: startDate.toISOString().replace(/\.\d{3}Z$/, 'Z'),
            time__lte: endDate.toISOString().replace(/\.\d{3}Z$/, 'Z'),
            order_by: 'time',
            offset: '0',
            limit: '500',
            auto: 'false'
        });

        if (filters.playerName) params.set('player_name__exact', filters.playerName);
        if (filters.playerIp) params.set('player_ip__exact', filters.playerIp);
        if (filters.descLike) params.set('transaction_desc__ilike', filters.descLike);

        let paramsString = params.toString()
            .replace(/time__gte=[^&]*?%3A/g, m => m.replace(/%3A/g, ':'))
            .replace(/time__lte=[^&]*?%3A/g, m => m.replace(/%3A/g, ':'));

        const url = `${location.origin}/gslogs/${serverId}/api/list-game-logs/?${paramsString}`;

        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET', url: url, headers: { 'Accept': 'application/json' },
                onload: function(response) {
                    try {
                        const data = JSON.parse(response.responseText);
                        resolve(Array.isArray(data) ? data : (data?.results || []));
                    } catch (e) { reject(new Error('Ошибка парсинга JSON')); }
                },
                onerror: function(error) { reject(new Error(`HTTP ${error.status}`)); }
            });
        });
    }

    // === UI: СФЕРА + ПАНЕЛЬ + DRAG ===
    function createUI() {
        if (document.getElementById('br-sphere')) return;

        // Сфера
        const sphere = document.createElement('div');
        sphere.id = 'br-sphere';
        sphere.textContent = '⚡';
        document.body.appendChild(sphere);

        // Панель
        const panel = document.createElement('div');
        panel.id = 'br-checker-panel';
        panel.innerHTML = `
            <div class="panel-title">🔍 BR Проверки</div>
            <label>Имя игрока</label>
            <input type="text" id="br-input-name" placeholder="Введите ник..." />
            <label>Выберите проверку</label>
            <select id="br-select-check">
                <option value="multis">Мультиаккаунты (IP/APPMDID)</option>
                <option value="ppiv">ППИВ (Боты 3-го уровня)</option>
            </select>
            <button class="btn-run" id="br-btn-run">▶ Запустить проверку</button>
            <div class="result-box" id="br-result-box">Готов к проверке.</div>
        `;
        document.body.appendChild(panel);

        // --- DRAG & DROP ДЛЯ СФЕРЫ ---
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        const onMouseMove = (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            sphere.style.right = 'auto';
            sphere.style.bottom = 'auto';
            sphere.style.left = (initialLeft + dx) + 'px';
            sphere.style.top = (initialTop + dy) + 'px';
        };

        const onMouseUp = () => {
            if (isDragging) {
                isDragging = false;
                sphere.classList.remove('dragging');
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
        };

        sphere.addEventListener('mousedown', (e) => {
            // Если клик был просто по сфере (без перетаскивания), то открываем панель
            const rect = sphere.getBoundingClientRect();
            startX = e.clientX;
            startY = e.clientY;
            initialLeft = rect.left;
            initialTop = rect.top;
            
            // Небольшая задержка, чтобы отличить клик от перетаскивания
            const checkDrag = () => {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                    isDragging = true;
                    sphere.classList.add('dragging');
                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                } else {
                    // Это был клик, а не перетаскивание
                    panelVisible = !panelVisible;
                    panel.classList.toggle('active', panelVisible);
                }
            };
            setTimeout(checkDrag, 150);
        });

        // Обработчик запуска проверки
        document.getElementById('br-btn-run').addEventListener('click', runSelectedCheck);
    }

    async function runSelectedCheck() {
        const name = document.getElementById('br-input-name').value.trim();
        const type = document.getElementById('br-select-check').value;
        const resultBox = document.getElementById('br-result-box');
        const btn = document.getElementById('br-btn-run');

        if (!name) { showResult('⚠️ Введите имя игрока.', 'result-error', resultBox); return; }

        btn.disabled = true; btn.textContent = '⏳ Выполняется...';
        showResult('⏳ Проверка запущена...', 'result-info', resultBox);

        try {
            const pathParts = location.pathname.split('/').filter(p => p);
            const gslogsIndex = pathParts.indexOf('gslogs');
            const serverId = (gslogsIndex !== -1 && pathParts[gslogsIndex + 1]) ? pathParts[gslogsIndex + 1] : null;
            if (!serverId) throw new Error('Не удалось определить ID сервера');

            if (type === 'multis') {
                await checkMultiAccounts(serverId, name, resultBox);
            } else if (type === 'ppiv') {
                await checkPPIV(serverId, name, resultBox);
            }
        } catch (error) {
            showResult(`❌ Ошибка: ${error.message}`, 'result-error', resultBox);
        } finally {
            btn.disabled = false;
            btn.textContent = '▶ Запустить проверку';
        }
    }

    // ==============================================
    // МОДУЛЬ 1: МУЛЬТИАККАУНТЫ (IP/APPMDID)
    // ==============================================
    async function checkMultiAccounts(serverId, playerName, resultBox) {
        const playerAllLogs = await getLogs(serverId, { playerName: playerName });
        
        let playerIps = new Set(), playerAppmdids = new Set();
        for (const l of playerAllLogs) {
            if (isValidIp(l.player_ip)) playerIps.add(l.player_ip);
            const appmdid = extractAppmdid(l.transaction_desc);
            if (appmdid) playerAppmdids.add(appmdid);
        }

        if (playerIps.size === 0 && playerAppmdids.size === 0) {
            showResult(`⚠️ У игрока "${playerName}" нет данных по IP/APPMDID.`, 'result-info', resultBox);
            return;
        }

        let matches = new Set();

        // Поиск по IP
        for (const ip of playerIps) {
            const ipLogs = await getLogs(serverId, { playerIp: ip });
            for (const l of ipLogs) {
                if (l.player_name !== playerName && isValidIp(l.player_ip)) {
                    matches.add(l.player_name);
                }
            }
        }

        // Поиск по APPMDID
        for (const appmdid of playerAppmdids) {
            const allLogs = await getLogs(serverId, {});
            for (const l of allLogs) {
                const lAppmdid = extractAppmdid(l.transaction_desc);
                if (lAppmdid === appmdid && l.player_name !== playerName) {
                    matches.add(l.player_name);
                }
            }
        }

        if (matches.size > 0) {
            let html = `<div style="font-weight:bold; margin-bottom:8px;">🚨 ОБНАРУЖЕНЫ СВЯЗИ у ${playerName}</div>`;
            html += `<div>Связанные аккаунты:</div>`;
            matches.forEach(name => {
                html += `<div style="color:#d32f2f;">• ${name}</div>`;
            });
            showResult(html, 'result-found', resultBox);
        } else {
            showResult(`✅ Чисто. Совпадений по IP/APPMDID не найдено.`, 'result-clean', resultBox);
        }
    }

    // ==============================================
    // МОДУЛЬ 2: ППИВ (Боты 3-го уровня)
    // ==============================================
    async function checkPPIV(serverId, playerName, resultBox) {
        const transferLogs = await getLogs(serverId, { 
            descLike: `%Перевел на счет% ${playerName}%` 
        });

        if (!transferLogs || transferLogs.length === 0) {
            showResult(`✅ Игроку "${playerName}" не делали переводов за 60 дней.`, 'result-clean', resultBox);
            return;
        }

        let bots = [];

        for (const log of transferLogs) {
            const desc = log.transaction_desc;
            const senderName = log.player_name;
            
            // Берем ПОСЛЕДНИЙ уровень в строке (уровень отправителя)
            const levelMatches = [...desc.matchAll(/\(Уровень:\s*(\d+)\)/gi)];
            if (levelMatches.length > 0) {
                const lastMatch = levelMatches[levelMatches.length - 1];
                const level = parseInt(lastMatch[1], 10);
                
                if (level <= 3) {
                    bots.push({
                        sender: senderName,
                        level: level,
                        amount: log.transaction_amount,
                        date: log.time
                    });
                }
            }
        }

        if (bots.length > 0) {
            let html = `<div style="font-weight:bold; margin-bottom:8px;">🤖 ОБНАРУЖЕНЫ БОТЫ (ППИВ) у ${playerName}</div>`;
            bots.forEach(bot => {
                const date = bot.date.split('T')[0];
                html += `
                    <div style="border-top:1px solid #444; margin-top:6px; padding-top:6px;">
                        <b>👤 Отправитель:</b> ${bot.sender} (Уровень: ${bot.level})<br>
                        <b>💰 Сумма:</b> ${formatAmount(bot.amount)}<br>
                        <b>📅 Дата:</b> ${date}
                    </div>
                `;
            });
            showResult(html, 'result-ppiv', resultBox);
        } else {
            showResult(`✅ Чисто. Игроку "${playerName}" переводили только игроки выше 3-го уровня.`, 'result-clean', resultBox);
        }
    }

    // === ЗАПУСК ===
    const observer = new MutationObserver(() => {
        if (document.body && !document.getElementById('br-sphere')) createUI();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', createUI);
    else createUI();

})();
