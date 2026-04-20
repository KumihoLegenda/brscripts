// ==UserScript==
// @name         BR Theme & Background Manager (Full)
// @namespace    http://tampermonkey.net/
// @version      3.2
// @description  Полноценные темы оформления форума + смена фона (РАБОТАЕТ НА ВСЕХ СТРАНИЦАХ)
// @match        https://forum.blackrussia.online/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Уникальный идентификатор для этого скрипта
    const SCRIPT_ID = 'br-theme-manager-full-v3';
    
    if (document.body.getAttribute(`data-${SCRIPT_ID}`)) {
        return;
    }
    document.body.setAttribute(`data-${SCRIPT_ID}`, 'true');

    const STORAGE_THEME = 'br_selected_theme_v3';
    const STORAGE_BG = 'br_custom_background_v3';

    // ========== ПОЛНЫЕ ТЕМЫ ОФОРМЛЕНИЯ ФОРУМА ==========
    const themes = [
        { id: 'none', name: '🌙 Стандартная тема', css: '' },
        { id: 'neon-orange', name: '🔥 Неоновый Оранжевый', accent: '#FF4500', accentGlow: '#ff6a2e', accentRgb: '255, 69, 0' },
        { id: 'cyber-blue', name: '💙 Кибер-Синий', accent: '#00BFFF', accentGlow: '#4dc3ff', accentRgb: '0, 191, 255' },
        { id: 'neon-green', name: '💚 Неоново-Зеленый', accent: '#39FF14', accentGlow: '#6eff4d', accentRgb: '57, 255, 20' },
        { id: 'royal-purple', name: '👑 Королевский Пурпурный', accent: '#9b59b6', accentGlow: '#c27bd6', accentRgb: '155, 89, 182' },
        { id: 'hot-pink', name: '💖 Горячий Розовый', accent: '#FF69B4', accentGlow: '#ff8dc9', accentRgb: '255, 105, 180' },
        { id: 'golden', name: '⭐ Золотой', accent: '#FFD700', accentGlow: '#ffe44d', accentRgb: '255, 215, 0' },
        { id: 'crimson-red', name: '❤️ Багровый Красный', accent: '#DC143C', accentGlow: '#ff3355', accentRgb: '220, 20, 60' },
        { id: 'teal', name: '🐚 Бирюзовый', accent: '#00CED1', accentGlow: '#33e5e8', accentRgb: '0, 206, 209' },
        { id: 'dark-knight', name: '🦇 Тёмный рыцарь', accent: '#1a1a2e', accentGlow: '#2d2d44', accentRgb: '26, 26, 46' }
    ];

    // Функция генерации полного CSS темы (ПОЛНАЯ ВЕРСИЯ с полупрозрачными эффектами)
    function generateThemeCSS(accent, accentGlow, accentRgb) {
        return `
            :root {
                --theme-accent: ${accent};
                --theme-accent-glow: ${accentGlow};
                --theme-accent-rgb: ${accentRgb};
                --glass-dark: rgba(11, 17, 26, 0.95);
                --glass-light: rgba(20, 30, 45, 0.6);
                --border-color: rgba(${accentRgb}, 0.3);
                --text-main: #dbe4eb;
                --hover-bg: rgba(${accentRgb}, 0.08);
            }

            html, body { background-color: #05080c !important; color: var(--text-main) !important; }
            body::before {
                content: ''; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: radial-gradient(circle at top, #15202b 0%, #05080c 100%);
                z-index: -5;
            }

            /* Основные блоки */
            .p-body, .p-body-inner, .p-body-content, .p-body-main { background: transparent !important; }
            .block, .block-outer { background: transparent !important; border: none !important; }
            .block-container {
                background: var(--glass-dark) !important;
                border: 1px solid var(--border-color) !important;
                border-radius: 12px !important;
                box-shadow: 0 5px 25px rgba(0,0,0,0.4) !important;
                overflow: hidden !important;
            }
            .block-header, .block-minorHeader {
                background: transparent !important;
                border-bottom: 1px solid rgba(255,255,255,0.05) !important;
                color: #fff !important;
                padding: 15px !important;
                text-shadow: 0 0 10px rgba(${accentRgb}, 0.4);
            }
            .block-header a, .block-minorHeader a { color: #fff !important; }
            .block-filterBar { background: rgba(0,0,0,0.2) !important; border-bottom: none !important; }
            .block-body { background: transparent !important; }
            .block-footer { background: rgba(0,0,0,0.15) !important; border-top: 1px solid rgba(255,255,255,0.05) !important; }

            /* Навигация */
            .p-nav {
                background: rgba(10, 14, 20, 0.95) !important;
                border-bottom: 1px solid var(--border-color) !important;
            }
            .p-nav-list .p-navEl.is-selected { color: var(--theme-accent) !important; }
            .p-nav-list .p-navEl:hover { color: var(--theme-accent-glow) !important; }

            /* Элементы списка */
            .node, .node-body, .node-extra, .node-stats, .node-meta { background: transparent !important; }
            .node-body:hover, .node:hover > .node-body { background: var(--hover-bg) !important; }
            .structItem, .structItem-cell { background: transparent !important; }
            .structItem { border-bottom: 1px solid rgba(255,255,255,0.05) !important; }
            .structItem:hover { background: var(--hover-bg) !important; }

            /* Сообщения */
            .message {
                background: rgba(20, 25, 35, 0.5) !important;
                border: 1px solid rgba(255,255,255,0.05) !important;
                border-radius: 8px !important;
                margin-bottom: 10px !important;
            }
            .message-inner, .message-cell, .message-content, .message-userContent,
            .message-user, .message-userDetails, .message-attribution { background: transparent !important; }
            .message-userArrow { display: none !important; }

            /* Формы и кнопки */
            .formButtonGroup, .formSubmitRow { background: transparent !important; }
            .formRow { background: transparent !important; border-bottom: 1px solid rgba(255,255,255,0.05) !important; }
            input[type="text"], input[type="password"], input[type="email"], input[type="search"],
            input[type="number"], input[type="url"], textarea, select, .input {
                background: rgba(15, 20, 30, 0.8) !important;
                border: 1px solid var(--border-color) !important;
                color: var(--text-main) !important;
                border-radius: 6px !important;
            }
            input:focus, textarea:focus, select:focus {
                border-color: var(--theme-accent) !important;
                box-shadow: 0 0 8px rgba(${accentRgb}, 0.3) !important;
            }
            .button, button, input[type="submit"], input[type="button"] {
                background: rgba(${accentRgb}, 0.3) !important;
                border: 1px solid var(--border-color) !important;
                color: #fff !important;
                border-radius: 6px !important;
            }
            .button:hover, button:hover { background: rgba(${accentRgb}, 0.5) !important; }
            .button--primary, .button.button--primary {
                background: rgba(${accentRgb}, 0.6) !important;
            }
            .button.button--cta {
                background: var(--theme-accent) !important;
                background-color: var(--theme-accent) !important;
            }

            /* Меню и выпадашки */
            .menu, .menu-content {
                background: var(--glass-dark) !important;
                border: 1px solid var(--border-color) !important;
                border-radius: 8px !important;
                box-shadow: 0 5px 20px rgba(0,0,0,0.5) !important;
            }
            .menu-row, .menu-linkRow { background: transparent !important; }
            .menu-row:hover, .menu-linkRow:hover { background: var(--hover-bg) !important; }
            .menu-linkRow.is-selected { color: var(--theme-accent) !important; }

            /* Вкладки */
            .tabs, .tabs-tab { background: transparent !important; }
            .tabs-tab { color: var(--theme-accent) !important; }
            .tabs-tab.is-active {
                background: rgba(${accentRgb}, 0.2) !important;
                border-bottom-color: var(--theme-accent) !important;
                color: var(--theme-accent) !important;
            }
            .block-tabHeader .tabs-tab:hover { color: var(--theme-accent-glow) !important; }

            /* Бейджи и индикаторы */
            .badge.badge--highlighted, .badgeContainer.badgeContainer--highlighted:after {
                background: var(--theme-accent) !important;
            }
            .message-newIndicator { background: var(--theme-accent) !important; }

            /* Блоки кода и цитаты */
            .bbCodeBlock {
                background: rgba(10, 15, 25, 0.6) !important;
                border-left: 2px solid var(--theme-accent) !important;
                border-radius: 8px !important;
            }
            .bbCodeBlock-title {
                background: transparent !important;
                border-bottom: 1px solid rgba(255,255,255,0.05) !important;
                color: var(--theme-accent) !important;
            }
            .messageNotice { border-left: 2px solid var(--theme-accent) !important; }
            .messageNotice:before { color: var(--theme-accent) !important; }

            /* Пагинация */
            .pageNav, .pageNav-main { background: transparent !important; }
            .pageNav-page, .pageNav-jump {
                background: rgba(20, 30, 45, 0.5) !important;
                border: 1px solid rgba(255,255,255,0.1) !important;
                border-radius: 4px !important;
            }
            .pageNav-page:hover, .pageNav-jump:hover { background: rgba(${accentRgb}, 0.3) !important; }
            .pageNav-page.pageNav-page--current {
                background: rgba(${accentRgb}, 0.5) !important;
                border-color: var(--theme-accent) !important;
            }

            /* Футер */
            .p-footer { background: transparent !important; border: none !important; }
            .p-footer-inner {
                background: rgba(8, 12, 18, 0.95) !important;
                border-top: 1px solid var(--border-color) !important;
            }
            .p-footer a { color: var(--theme-accent) !important; }

            /* Панель инструментов редактора */
            .fr-toolbar { border-top: 1px solid var(--theme-accent) !important; }

            /* Скролл-кнопка */
            .button.button--scroll { background: linear-gradient(var(--theme-accent), var(--theme-accent)) !important; }

            /* Сайдбар */
            .p-body-sidebar .block-container { background: var(--glass-dark) !important; }

            /* Профиль пользователя */
            .memberHeader-avatar .avatar {
                border: 2px solid var(--theme-accent) !important;
                box-shadow: 0 0 20px var(--theme-accent) !important;
            }
            .memberHeader-name .username {
                text-shadow: 0 0 10px rgba(${accentRgb}, 0.8), 0 0 20px rgba(${accentRgb}, 0.4) !important;
            }
        `;
    }

    // Тема "Тёмный рыцарь" (черная гамма с полупрозрачными эффектами)
    function generateDarkKnightCSS() {
        return `
            :root {
                --theme-accent: #1a1a2e;
                --theme-accent-glow: #2d2d44;
                --theme-accent-rgb: 26, 26, 46;
                --glass-dark: rgba(8, 8, 12, 0.98);
                --glass-light: rgba(15, 15, 22, 0.8);
                --border-color: rgba(45, 45, 68, 0.5);
                --text-main: #b8b8c8;
                --hover-bg: rgba(45, 45, 68, 0.15);
            }

            html, body { background-color: #0a0a0f !important; color: var(--text-main) !important; }
            body::before {
                content: ''; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: radial-gradient(circle at top, #14141e 0%, #0a0a0f 100%);
                z-index: -5;
            }

            /* Основные блоки */
            .p-body, .p-body-inner, .p-body-content, .p-body-main { background: transparent !important; }
            .block, .block-outer { background: transparent !important; border: none !important; }
            .block-container {
                background: var(--glass-dark) !important;
                border: 1px solid var(--border-color) !important;
                border-radius: 12px !important;
                box-shadow: 0 5px 25px rgba(0,0,0,0.6) !important;
                overflow: hidden !important;
            }
            .block-header, .block-minorHeader {
                background: linear-gradient(135deg, rgba(20,20,30,0.9), rgba(15,15,22,0.95)) !important;
                border-bottom: 1px solid rgba(45,45,68,0.5) !important;
                color: #c8c8d8 !important;
                padding: 15px !important;
                text-shadow: 0 0 10px rgba(0,0,0,0.5);
            }
            .block-header a, .block-minorHeader a { color: #c8c8d8 !important; }
            .block-filterBar { background: rgba(0,0,0,0.3) !important; border-bottom: none !important; }
            .block-body { background: transparent !important; }
            .block-footer { background: rgba(0,0,0,0.2) !important; border-top: 1px solid rgba(45,45,68,0.3) !important; }

            /* Навигация */
            .p-nav {
                background: rgba(8, 8, 12, 0.98) !important;
                border-bottom: 1px solid var(--border-color) !important;
            }
            .p-nav-list .p-navEl.is-selected { color: #8888aa !important; }
            .p-nav-list .p-navEl:hover { color: #aaaacc !important; }

            /* Элементы списка */
            .node, .node-body, .node-extra, .node-stats, .node-meta { background: transparent !important; }
            .node-body:hover, .node:hover > .node-body { background: var(--hover-bg) !important; }
            .structItem, .structItem-cell { background: transparent !important; }
            .structItem { border-bottom: 1px solid rgba(45,45,68,0.3) !important; }
            .structItem:hover { background: var(--hover-bg) !important; }

            /* Сообщения */
            .message {
                background: rgba(15, 15, 22, 0.6) !important;
                border: 1px solid rgba(45,45,68,0.4) !important;
                border-radius: 8px !important;
                margin-bottom: 10px !important;
            }
            .message-inner, .message-cell, .message-content, .message-userContent,
            .message-user, .message-userDetails, .message-attribution { background: transparent !important; }
            .message-userArrow { display: none !important; }

            /* Формы и кнопки */
            .formButtonGroup, .formSubmitRow { background: transparent !important; }
            .formRow { background: transparent !important; border-bottom: 1px solid rgba(45,45,68,0.3) !important; }
            input[type="text"], input[type="password"], input[type="email"], input[type="search"],
            input[type="number"], input[type="url"], textarea, select, .input {
                background: rgba(10, 10, 15, 0.9) !important;
                border: 1px solid rgba(45,45,68,0.5) !important;
                color: var(--text-main) !important;
                border-radius: 6px !important;
            }
            input:focus, textarea:focus, select:focus {
                border-color: #555577 !important;
                box-shadow: 0 0 8px rgba(85,85,119,0.3) !important;
            }
            .button, button, input[type="submit"], input[type="button"] {
                background: rgba(45,45,68,0.5) !important;
                border: 1px solid rgba(85,85,119,0.4) !important;
                color: #c8c8d8 !important;
                border-radius: 6px !important;
            }
            .button:hover, button:hover { background: rgba(45,45,68,0.7) !important; }
            .button--primary, .button.button--primary {
                background: rgba(55,55,78,0.7) !important;
            }
            .button.button--cta {
                background: #2a2a3e !important;
                background-color: #2a2a3e !important;
            }

            /* Меню и выпадашки */
            .menu, .menu-content {
                background: rgba(10, 10, 15, 0.98) !important;
                border: 1px solid rgba(45,45,68,0.5) !important;
                border-radius: 8px !important;
                box-shadow: 0 5px 20px rgba(0,0,0,0.7) !important;
            }
            .menu-row, .menu-linkRow { background: transparent !important; }
            .menu-row:hover, .menu-linkRow:hover { background: var(--hover-bg) !important; }
            .menu-linkRow.is-selected { color: #8888aa !important; }

            /* Вкладки */
            .tabs, .tabs-tab { background: transparent !important; }
            .tabs-tab { color: #8888aa !important; }
            .tabs-tab.is-active {
                background: rgba(55,55,78,0.3) !important;
                border-bottom-color: #555577 !important;
                color: #aaaacc !important;
            }
            .block-tabHeader .tabs-tab:hover { color: #aaaacc !important; }

            /* Бейджи и индикаторы */
            .badge.badge--highlighted, .badgeContainer.badgeContainer--highlighted:after {
                background: #2a2a3e !important;
            }
            .message-newIndicator { background: #2a2a3e !important; }

            /* Блоки кода и цитаты */
            .bbCodeBlock {
                background: rgba(8, 8, 12, 0.8) !important;
                border-left: 2px solid #444466 !important;
                border-radius: 8px !important;
            }
            .bbCodeBlock-title {
                background: transparent !important;
                border-bottom: 1px solid rgba(45,45,68,0.3) !important;
                color: #8888aa !important;
            }
            .messageNotice { border-left: 2px solid #444466 !important; }
            .messageNotice:before { color: #8888aa !important; }

            /* Пагинация */
            .pageNav, .pageNav-main { background: transparent !important; }
            .pageNav-page, .pageNav-jump {
                background: rgba(15, 15, 22, 0.6) !important;
                border: 1px solid rgba(45,45,68,0.4) !important;
                border-radius: 4px !important;
            }
            .pageNav-page:hover, .pageNav-jump:hover { background: rgba(45,45,68,0.5) !important; }
            .pageNav-page.pageNav-page--current {
                background: rgba(55,55,78,0.6) !important;
                border-color: #555577 !important;
            }

            /* Футер */
            .p-footer { background: transparent !important; border: none !important; }
            .p-footer-inner {
                background: rgba(8, 8, 12, 0.98) !important;
                border-top: 1px solid var(--border-color) !important;
            }
            .p-footer a { color: #8888aa !important; }

            /* Панель инструментов редактора */
            .fr-toolbar { border-top: 1px solid #444466 !important; }

            /* Скролл-кнопка */
            .button.button--scroll { background: linear-gradient(#2a2a3e, #1a1a2e) !important; }

            /* Сайдбар */
            .p-body-sidebar .block-container { background: var(--glass-dark) !important; }

            /* Профиль пользователя */
            .memberHeader-avatar .avatar {
                border: 2px solid #444466 !important;
                box-shadow: 0 0 20px rgba(68,68,102,0.5) !important;
            }
            .memberHeader-name .username {
                text-shadow: 0 0 10px rgba(68,68,102,0.6), 0 0 20px rgba(68,68,102,0.3) !important;
            }
        `;
    }

    function getThemeCSS(theme) {
        if (theme.id === 'none') return '';
        if (theme.id === 'dark-knight') return generateDarkKnightCSS();
        return generateThemeCSS(theme.accent, theme.accentGlow, theme.accentRgb);
    }

    function applyTheme(themeId) {
        let styleElement = document.getElementById('br-theme-styles-v3');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'br-theme-styles-v3';
            document.head.appendChild(styleElement);
        }
        const theme = themes.find(t => t.id === themeId);
        styleElement.textContent = theme ? getThemeCSS(theme) : '';
        localStorage.setItem(STORAGE_THEME, themeId);
    }

    function applyBackground(bgUrl) {
        let bgStyle = document.getElementById('br-bg-styles-v3');
        if (!bgStyle) {
            bgStyle = document.createElement('style');
            bgStyle.id = 'br-bg-styles-v3';
            document.head.appendChild(bgStyle);
        }
        if (bgUrl && bgUrl.trim() !== '') {
            bgStyle.textContent = `body { background-image: url("${bgUrl}"); background-attachment: fixed; background-size: cover; background-position: center; background-repeat: no-repeat; } body::before { background: rgba(0,0,0,0.6) !important; }`;
            localStorage.setItem(STORAGE_BG, bgUrl);
        } else {
            bgStyle.textContent = '';
            localStorage.removeItem(STORAGE_BG);
        }
    }

    function loadSavedSettings() {
        const savedTheme = localStorage.getItem(STORAGE_THEME);
        if (savedTheme && savedTheme !== 'none') applyTheme(savedTheme);
        const savedBg = localStorage.getItem(STORAGE_BG);
        if (savedBg) applyBackground(savedBg);
    }

    function openThemeModal() {
        let modal = document.getElementById('br-theme-modal-v3');
        if (modal) {
            modal.classList.add('open');
            return;
        }

        modal = document.createElement('div');
        modal.id = 'br-theme-modal-v3';
        modal.className = 'br-modal';
        modal.innerHTML = `
            <div class="br-modal-content">
                <div class="br-modal-header">
                    <div class="br-modal-title">🎨 Полное оформление форума</div>
                    <button class="br-modal-close">&times;</button>
                </div>
                <div class="br-modal-body">
                    <div class="br-form-group">
                        <label class="br-label">Выберите тему оформления:</label>
                        <select id="br-theme-select" class="br-select">${themes.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}</select>
                    </div>
                    <div class="br-form-group">
                        <label class="br-label">Фоновое изображение (опционально):</label>
                        <input type="text" id="br-bg-input" class="br-input" placeholder="https://example.com/background.jpg">
                        <small class="br-hint">Прямая ссылка на изображение (JPG, PNG, GIF)</small>
                    </div>
                </div>
                <div class="br-modal-footer">
                    <button class="br-btn br-btn-secondary" id="br-cancel">Отмена</button>
                    <button class="br-btn br-btn-primary" id="br-save">Сохранить</button>
                </div>
            </div>
        `;

        const themeSelect = modal.querySelector('#br-theme-select');
        const bgInput = modal.querySelector('#br-bg-input');
        themeSelect.value = localStorage.getItem(STORAGE_THEME) || 'none';
        bgInput.value = localStorage.getItem(STORAGE_BG) || '';

        modal.querySelector('.br-modal-close').onclick = () => { modal.classList.remove('open'); setTimeout(() => modal.remove(), 300); };
        modal.querySelector('#br-cancel').onclick = () => { modal.classList.remove('open'); setTimeout(() => modal.remove(), 300); };
        modal.querySelector('#br-save').onclick = () => {
            applyTheme(themeSelect.value);
            applyBackground(bgInput.value.trim());
            modal.classList.remove('open');
            setTimeout(() => modal.remove(), 300);
        };

        modal.onclick = (e) => { if (e.target === modal) { modal.classList.remove('open'); setTimeout(() => modal.remove(), 300); } };

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('open'), 10);
    }

    // ========== СОЗДАНИЕ КНОПКИ 🖼 (ВСЕГДА ВИДИМА НА ЛЮБОЙ СТРАНИЦЕ) ==========
    function createButton() {
        // Удаляем старую кнопку, если есть
        const oldBtn = document.getElementById('br-theme-button-v3');
        if (oldBtn) oldBtn.remove();
        
        // Создаём плавающую кнопку в правом верхнем углу
        const btn = document.createElement('div');
        btn.id = 'br-theme-button-v3';
        btn.innerHTML = '🖼';
        btn.title = 'Полное оформление форума';
        btn.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border: 2px solid #9b59b6;
            border-radius: 50%;
            color: white;
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 999999;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
            font-family: Arial, sans-serif;
        `;
        
        btn.onmouseenter = () => {
            btn.style.transform = 'scale(1.1)';
            btn.style.boxShadow = '0 6px 20px rgba(155, 89, 182, 0.5)';
            btn.style.borderColor = '#c27bd6';
        };
        
        btn.onmouseleave = () => {
            btn.style.transform = 'scale(1)';
            btn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
            btn.style.borderColor = '#9b59b6';
        };
        
        btn.onclick = openThemeModal;
        
        document.body.appendChild(btn);
    }

    // Стили модального окна
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .br-modal {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85); z-index: 2147483648;
            display: flex; align-items: center; justify-content: center;
            opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .br-modal.open { opacity: 1; visibility: visible; }
        .br-modal-content {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border: 1px solid rgba(255,255,255,0.1); border-radius: 16px;
            width: 90%; max-width: 500px; box-shadow: 0 25px 50px rgba(0,0,0,0.5);
            animation: modalSlideIn 0.3s ease;
        }
        @keyframes modalSlideIn {
            from { transform: translateY(-30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .br-modal-header { padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; }
        .br-modal-title { font-size: 20px; font-weight: bold; color: #fff; }
        .br-modal-close { background: none; border: none; color: #fff; font-size: 28px; cursor: pointer; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 8px; transition: background 0.2s; }
        .br-modal-close:hover { background: rgba(255,255,255,0.1); }
        .br-modal-body { padding: 24px; }
        .br-form-group { margin-bottom: 24px; }
        .br-label { display: block; margin-bottom: 8px; color: #fff; font-weight: 600; font-size: 14px; }
        .br-select, .br-input { width: 100%; padding: 10px 12px; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; color: #fff; font-size: 14px; box-sizing: border-box; }
        .br-select:focus, .br-input:focus { outline: none; border-color: #9b59b6; background: rgba(0,0,0,0.6); }
        .br-select option { background: #1a1a2e; }
        .br-hint { display: block; margin-top: 6px; font-size: 12px; color: rgba(255,255,255,0.5); }
        .br-modal-footer { padding: 16px 24px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: flex-end; gap: 12px; }
        .br-btn { padding: 8px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .br-btn-primary { background: linear-gradient(135deg, #9b59b6, #8e44ad); color: #fff; }
        .br-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(155, 89, 182, 0.4); }
        .br-btn-secondary { background: rgba(255,255,255,0.1); color: #fff; }
        .br-btn-secondary:hover { background: rgba(255,255,255,0.2); }
        
        /* Адаптация для мобильных устройств */
        @media (max-width: 768px) {
            #br-theme-button-v3 {
                width: 44px !important;
                height: 44px !important;
                font-size: 20px !important;
                top: 70px !important;
                right: 10px !important;
            }
        }
    `;
    document.head.appendChild(modalStyle);

    // ========== ЗАПУСК ==========
    // Загружаем сохранённые настройки темы и фона
    loadSavedSettings();

    // Функция для создания кнопки с проверкой готовности DOM
    const initButton = () => {
        if (document.body) {
            createButton();
        } else {
            document.addEventListener('DOMContentLoaded', createButton);
        }
    };

    // Запускаем создание кнопки (работает на всех страницах, включая главную)
    initButton();

    // Следим, чтобы кнопка всегда была на месте (если вдруг исчезнет из-за динамических изменений)
    const observer = new MutationObserver(() => {
        if (!document.getElementById('br-theme-button-v3')) {
            createButton();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
