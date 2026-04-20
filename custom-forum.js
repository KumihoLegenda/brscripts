// ==UserScript==
// @name         BR Theme & Background Manager
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Добавляет кнопку для смены темы и фона форума Black Russia
// @author       Custom Script
// @match        https://forum.blackrussia.online/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (document.body.getAttribute('data-br-theme-manager')) {
        return;
    }
    document.body.setAttribute('data-br-theme-manager', 'true');

    const STORAGE_THEME = 'br_selected_theme';
    const STORAGE_BG = 'br_custom_background';

    const themes = [
        { id: 'none', name: 'Без темы', css: '' },
        { id: 'neon-orange', name: '🔥 Неоновый Оранжевый', css: `.block.block--category .block-header { text-shadow: 0 0 1px rgba(255, 69, 0, 0.7); } .menu-tabHeader .tabs-tab.is-active { border-color: #FF4500; } .badge.badge--highlighted, .badgeContainer.badgeContainer--highlighted:after { background: #FF4500; } .tabs-tab { color: #FF4500; } .blockLink.is-selected { color: #FF4500; border-left: 2px solid #FF4500; } .block-tabHeader .tabs-tab:hover { color: #FF4500; } .button.button--primary, a.button.button--primary { background: linear-gradient(#FF4500, #FF4500); } .menu-linkRow.is-selected, .menu-linkRow:hover { color: #FF4500; } .fr-toolbar { border-top: 1px solid #FF4500; } .block-tabHeader .tabs-tab.is-active { color: #FF4500; border-color: #FF4500; } .messageNotice { border-left: 2px solid #FF4500; } .messageNotice:before { color: #FF4500; } .bbCodeBlock { border-left: 2px solid #FF4500; } .bbCodeBlock-title { color: #FF4500; } .button.button--scroll { background: linear-gradient(#FF4500, #FF4500); } .message-newIndicator { background: #FF4500; } .p-nav-list .p-navEl.is-selected { color: #FF4500; } .button.button--cta { background: #FF4500; background-color: #FF4500; }` },
        { id: 'cyber-blue', name: '💙 Кибер-Синий', css: `.block.block--category .block-header { text-shadow: 0 0 1px rgba(0, 191, 255, 0.7); } .menu-tabHeader .tabs-tab.is-active { border-color: #00BFFF; } .badge.badge--highlighted, .badgeContainer.badgeContainer--highlighted:after { background: #00BFFF; } .tabs-tab { color: #00BFFF; } .blockLink.is-selected { color: #00BFFF; border-left: 2px solid #00BFFF; } .block-tabHeader .tabs-tab:hover { color: #00BFFF; } .button.button--primary { background: linear-gradient(#00BFFF, #00BFFF); } .menu-linkRow.is-selected, .menu-linkRow:hover { color: #00BFFF; } .fr-toolbar { border-top: 1px solid #00BFFF; } .block-tabHeader .tabs-tab.is-active { color: #00BFFF; border-color: #00BFFF; } .messageNotice { border-left: 2px solid #00BFFF; } .bbCodeBlock { border-left: 2px solid #00BFFF; } .bbCodeBlock-title { color: #00BFFF; } .button.button--scroll { background: linear-gradient(#00BFFF, #00BFFF); } .message-newIndicator { background: #00BFFF; } .p-nav-list .p-navEl.is-selected { color: #00BFFF; } .button.button--cta { background: #00BFFF; background-color: #00BFFF; }` },
        { id: 'neon-green', name: '💚 Неоново-Зеленый', css: `.block.block--category .block-header { text-shadow: 0 0 1px rgba(57, 255, 20, 0.7); } .menu-tabHeader .tabs-tab.is-active { border-color: #39FF14; } .badge.badge--highlighted, .badgeContainer.badgeContainer--highlighted:after { background: #39FF14; } .tabs-tab { color: #39FF14; } .blockLink.is-selected { color: #39FF14; border-left: 2px solid #39FF14; } .block-tabHeader .tabs-tab:hover { color: #39FF14; } .button.button--primary { background: linear-gradient(#39FF14, #39FF14); } .menu-linkRow.is-selected, .menu-linkRow:hover { color: #39FF14; } .fr-toolbar { border-top: 1px solid #39FF14; } .block-tabHeader .tabs-tab.is-active { color: #39FF14; border-color: #39FF14; } .messageNotice { border-left: 2px solid #39FF14; } .bbCodeBlock { border-left: 2px solid #39FF14; } .bbCodeBlock-title { color: #39FF14; } .button.button--scroll { background: linear-gradient(#39FF14, #39FF14); } .message-newIndicator { background: #39FF14; } .p-nav-list .p-navEl.is-selected { color: #39FF14; } .button.button--cta { background: #39FF14; background-color: #39FF14; }` },
        { id: 'royal-purple', name: '👑 Королевский Пурпурный', css: `.block.block--category .block-header { text-shadow: 0 0 1px rgba(138, 43, 226, 0.7); } .menu-tabHeader .tabs-tab.is-active { border-color: #8A2BE2; } .badge.badge--highlighted, .badgeContainer.badgeContainer--highlighted:after { background: #8A2BE2; } .tabs-tab { color: #8A2BE2; } .blockLink.is-selected { color: #8A2BE2; border-left: 2px solid #8A2BE2; } .block-tabHeader .tabs-tab:hover { color: #8A2BE2; } .button.button--primary { background: linear-gradient(#8A2BE2, #8A2BE2); } .menu-linkRow.is-selected, .menu-linkRow:hover { color: #8A2BE2; } .fr-toolbar { border-top: 1px solid #8A2BE2; } .block-tabHeader .tabs-tab.is-active { color: #8A2BE2; border-color: #8A2BE2; } .messageNotice { border-left: 2px solid #8A2BE2; } .bbCodeBlock { border-left: 2px solid #8A2BE2; } .bbCodeBlock-title { color: #8A2BE2; } .button.button--scroll { background: linear-gradient(#8A2BE2, #8A2BE2); } .message-newIndicator { background: #8A2BE2; } .p-nav-list .p-navEl.is-selected { color: #8A2BE2; } .button.button--cta { background: #8A2BE2; background-color: #8A2BE2; }` },
        { id: 'hot-pink', name: '💖 Горячий Розовый', css: `.block.block--category .block-header { text-shadow: 0 0 1px rgba(255, 105, 180, 0.7); } .menu-tabHeader .tabs-tab.is-active { border-color: #FF69B4; } .badge.badge--highlighted, .badgeContainer.badgeContainer--highlighted:after { background: #FF69B4; } .tabs-tab { color: #FF69B4; } .blockLink.is-selected { color: #FF69B4; border-left: 2px solid #FF69B4; } .block-tabHeader .tabs-tab:hover { color: #FF69B4; } .button.button--primary { background: linear-gradient(#FF69B4, #FF69B4); } .menu-linkRow.is-selected, .menu-linkRow:hover { color: #FF69B4; } .fr-toolbar { border-top: 1px solid #FF69B4; } .block-tabHeader .tabs-tab.is-active { color: #FF69B4; border-color: #FF69B4; } .messageNotice { border-left: 2px solid #FF69B4; } .bbCodeBlock { border-left: 2px solid #FF69B4; } .bbCodeBlock-title { color: #FF69B4; } .button.button--scroll { background: linear-gradient(#FF69B4, #FF69B4); } .message-newIndicator { background: #FF69B4; } .p-nav-list .p-navEl.is-selected { color: #FF69B4; } .button.button--cta { background: #FF69B4; background-color: #FF69B4; }` },
        { id: 'golden', name: '⭐ Золотой', css: `.block.block--category .block-header { text-shadow: 0 0 1px rgba(255, 215, 0, 0.7); } .menu-tabHeader .tabs-tab.is-active { border-color: #FFD700; } .badge.badge--highlighted, .badgeContainer.badgeContainer--highlighted:after { background: #FFD700; } .tabs-tab { color: #FFD700; } .blockLink.is-selected { color: #FFD700; border-left: 2px solid #FFD700; } .block-tabHeader .tabs-tab:hover { color: #FFD700; } .button.button--primary { background: linear-gradient(#FFD700, #FFD700); } .menu-linkRow.is-selected, .menu-linkRow:hover { color: #FFD700; } .fr-toolbar { border-top: 1px solid #FFD700; } .block-tabHeader .tabs-tab.is-active { color: #FFD700; border-color: #FFD700; } .messageNotice { border-left: 2px solid #FFD700; } .bbCodeBlock { border-left: 2px solid #FFD700; } .bbCodeBlock-title { color: #FFD700; } .button.button--scroll { background: linear-gradient(#FFD700, #FFD700); } .message-newIndicator { background: #FFD700; } .p-nav-list .p-navEl.is-selected { color: #FFD700; } .button.button--cta { background: #FFD700; background-color: #FFD700; }` },
        { id: 'crimson-red', name: '❤️ Багровый Красный', css: `.block.block--category .block-header { text-shadow: 0 0 1px rgba(220, 20, 60, 0.7); } .menu-tabHeader .tabs-tab.is-active { border-color: #DC143C; } .badge.badge--highlighted, .badgeContainer.badgeContainer--highlighted:after { background: #DC143C; } .tabs-tab { color: #DC143C; } .blockLink.is-selected { color: #DC143C; border-left: 2px solid #DC143C; } .block-tabHeader .tabs-tab:hover { color: #DC143C; } .button.button--primary { background: linear-gradient(#DC143C, #DC143C); } .menu-linkRow.is-selected, .menu-linkRow:hover { color: #DC143C; } .fr-toolbar { border-top: 1px solid #DC143C; } .block-tabHeader .tabs-tab.is-active { color: #DC143C; border-color: #DC143C; } .messageNotice { border-left: 2px solid #DC143C; } .bbCodeBlock { border-left: 2px solid #DC143C; } .bbCodeBlock-title { color: #DC143C; } .button.button--scroll { background: linear-gradient(#DC143C, #DC143C); } .message-newIndicator { background: #DC143C; } .p-nav-list .p-navEl.is-selected { color: #DC143C; } .button.button--cta { background: #DC143C; background-color: #DC143C; }` },
        { id: 'teal', name: '🐚 Бирюзовый', css: `.block.block--category .block-header { text-shadow: 0 0 1px rgba(0, 206, 209, 0.7); } .menu-tabHeader .tabs-tab.is-active { border-color: #00CED1; } .badge.badge--highlighted, .badgeContainer.badgeContainer--highlighted:after { background: #00CED1; } .tabs-tab { color: #00CED1; } .blockLink.is-selected { color: #00CED1; border-left: 2px solid #00CED1; } .block-tabHeader .tabs-tab:hover { color: #00CED1; } .button.button--primary { background: linear-gradient(#00CED1, #00CED1); } .menu-linkRow.is-selected, .menu-linkRow:hover { color: #00CED1; } .fr-toolbar { border-top: 1px solid #00CED1; } .block-tabHeader .tabs-tab.is-active { color: #00CED1; border-color: #00CED1; } .messageNotice { border-left: 2px solid #00CED1; } .bbCodeBlock { border-left: 2px solid #00CED1; } .bbCodeBlock-title { color: #00CED1; } .button.button--scroll { background: linear-gradient(#00CED1, #00CED1); } .message-newIndicator { background: #00CED1; } .p-nav-list .p-navEl.is-selected { color: #00CED1; } .button.button--cta { background: #00CED1; background-color: #00CED1; }` },
        { id: 'rainbow', name: '🌈 Радужный', css: `.block.block--category .block-header { text-shadow: 0 0 2px rgba(255,0,0,0.7); } .tabs-tab { color: #ff6b6b; } .blockLink.is-selected { color: #ff6b6b; border-left: 2px solid #ff6b6b; } .block-tabHeader .tabs-tab:hover { color: #ff6b6b; } .button.button--primary { background: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet); } .menu-linkRow.is-selected, .menu-linkRow:hover { color: #ff6b6b; } .block-tabHeader .tabs-tab.is-active { color: #ff6b6b; border-color: #ff6b6b; } .messageNotice { border-left: 2px solid #ff6b6b; } .bbCodeBlock { border-left: 2px solid #ff6b6b; } .bbCodeBlock-title { color: #ff6b6b; } .button.button--scroll { background: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet); } .message-newIndicator { background: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet); } .p-nav-list .p-navEl.is-selected { color: #ff6b6b; } .button.button--cta { background: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet); border-color: transparent; }` }
    ];

    function applyTheme(themeId) {
        let styleElement = document.getElementById('br-theme-styles');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'br-theme-styles';
            document.head.appendChild(styleElement);
        }
        const theme = themes.find(t => t.id === themeId);
        styleElement.textContent = (theme && theme.id !== 'none') ? theme.css : '';
        localStorage.setItem(STORAGE_THEME, themeId);
    }

    function applyBackground(bgUrl) {
        let bgStyle = document.getElementById('br-bg-styles');
        if (!bgStyle) {
            bgStyle = document.createElement('style');
            bgStyle.id = 'br-bg-styles';
            document.head.appendChild(bgStyle);
        }
        if (bgUrl && bgUrl.trim() !== '') {
            bgStyle.textContent = `body { background-image: url("${bgUrl}"); background-attachment: fixed; background-size: cover; background-position: center; background-repeat: no-repeat; } .p-nav, .block-container, .p-footer, .button.button--cta, .buttonGroup, .pageNav-main, .tabPanes, .menu-content, .overlay, span[class="hScroller-scroll is-calculated"], .block-minorHeader { opacity: 0.95; }`;
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
        let modal = document.getElementById('br-theme-modal');
        if (modal) {
            modal.classList.add('open');
            return;
        }
        
        modal = document.createElement('div');
        modal.id = 'br-theme-modal';
        modal.className = 'br-modal';
        modal.innerHTML = `
            <div class="br-modal-content">
                <div class="br-modal-header">
                    <div class="br-modal-title">🎨 Настройка темы и фона</div>
                    <button class="br-modal-close">&times;</button>
                </div>
                <div class="br-modal-body">
                    <div class="br-form-group">
                        <label class="br-label">Выберите цветовую тему:</label>
                        <select id="br-theme-select" class="br-select">${themes.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}</select>
                    </div>
                    <div class="br-form-group">
                        <label class="br-label">URL адрес фонового изображения:</label>
                        <input type="text" id="br-bg-input" class="br-input" placeholder="https://example.com/background.jpg">
                        <small class="br-hint">Вставьте прямую ссылку на изображение (JPG, PNG, GIF)</small>
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

    // ========== ГЛАВНАЯ ФУНКЦИЯ - ДОБАВЛЯЕМ КНОПКУ ==========
    function addButton() {
        // Ищем контейнер с кнопками
        let container = document.querySelector('.bgButtonsContainer');
        
        if (!container) {
            // Если контейнера нет - пробуем найти .pageContent и создаем свой контейнер
            const pageContent = document.querySelector('.pageContent');
            if (pageContent) {
                // Создаем свой контейнер, если его нет
                let newContainer = document.querySelector('.bgButtonsContainer-custom');
                if (!newContainer) {
                    newContainer = document.createElement('div');
                    newContainer.className = 'bgButtonsContainer bgButtonsContainer-custom';
                    newContainer.style.cssText = 'display: flex; gap: 2px; flex-wrap: wrap; padding: 5px 0; margin-bottom: 10px;';
                    pageContent.insertBefore(newContainer, pageContent.firstChild);
                }
                container = newContainer;
            } else {
                // Если нет ни того, ни другого - пробуем снова через секунду
                setTimeout(addButton, 500);
                return;
            }
        }
        
        // Проверяем, есть ли уже наша кнопка
        if (document.getElementById('br-theme-button')) {
            return;
        }
        
        // Создаем кнопку
        const btn = document.createElement('button');
        btn.id = 'br-theme-button';
        btn.textContent = '🖼';
        btn.className = 'bgButton';
        btn.style.cssText = 'border-bottom: 2px solid #9b59b6; font-size: 14px;';
        btn.title = 'Настройка темы и фона';
        btn.onclick = openThemeModal;
        
        container.appendChild(btn);
        console.log('[BR Theme] Кнопка 🖼 успешно добавлена!');
    }

    // Добавляем стили для модального окна
    const style = document.createElement('style');
    style.textContent = `
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
    `;
    document.head.appendChild(style);

    // Запускаем
    loadSavedSettings();
    
    // Пробуем добавить кнопку сразу
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addButton);
    } else {
        addButton();
    }
    
    // Также следим за изменениями (на случай если контейнер пересоздадут)
    const observer = new MutationObserver(() => {
        if (!document.getElementById('br-theme-button')) {
            addButton();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
