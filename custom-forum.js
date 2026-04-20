// ==UserScript==
// @name         BR Theme & Background Customizer
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Adds theme and background customization for Black Russia forum
// @author       Customizer Addon
// @match        https://forum.blackrussia.online/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Предотвращаем двойную загрузку
    if (window._brThemeCustomizerLoaded) return;
    window._brThemeCustomizerLoaded = true;

    // Конфигурация тем
    const THEMES = {
        none: {
            name: 'Без темы',
            css: ''
        },
        orange: {
            name: 'Огненная Оранжевая',
            css: `
                .menu-tabHeader .tabs-tab.is-active { border-color: #FF4500; }
                .badge.badge--highlighted, .badgeContainer.badgeContainer--highlighted:after { background: #FF4500; }
                .tabs-tab { color: #FF4500; }
                .blockLink.is-selected { color: #FF4500; border-left: 2px solid #FF4500; }
                .block-tabHeader .tabs-tab:hover { color: #FF4500; }
                .button.button--primary, a.button.button--primary { background: linear-gradient(#FF4500, #FF4500); }
                .menu-linkRow.is-selected, .menu-linkRow:hover { color: #FF4500; }
                .fr-toolbar { border-top: 1px solid #FF4500; }
                .block-tabHeader .tabs-tab.is-active { color: #FF4500; border-color: #FF4500; }
                .messageNotice { border-left: 2px solid #FF4500; }
                .bbCodeBlock { border-left: 2px solid #FF4500; }
                .bbCodeBlock-title { color: #FF4500; }
                .message-newIndicator { background: #FF4500; }
                .p-nav-list .p-navEl.is-selected:after { background: linear-gradient(-270deg, #FF4500 0%, #FF4500 100%); }
                .p-nav-list .p-navEl.is-selected { color: #FF4500; }
            `
        },
        neon: {
            name: 'Неоновая Зеленая',
            css: `
                .menu-tabHeader .tabs-tab.is-active { border-color: #00FF41; }
                .badge.badge--highlighted, .badgeContainer.badgeContainer--highlighted:after { background: #00FF41; }
                .tabs-tab { color: #00FF41; }
                .blockLink.is-selected { color: #00FF41; border-left: 2px solid #00FF41; }
                .block-tabHeader .tabs-tab:hover { color: #00FF41; }
                .button.button--primary, a.button.button--primary { background: linear-gradient(#00FF41, #00CC33); }
                .menu-linkRow.is-selected, .menu-linkRow:hover { color: #00FF41; }
                .fr-toolbar { border-top: 1px solid #00FF41; }
                .block-tabHeader .tabs-tab.is-active { color: #00FF41; border-color: #00FF41; }
                .messageNotice { border-left: 2px solid #00FF41; }
                .bbCodeBlock { border-left: 2px solid #00FF41; }
                .bbCodeBlock-title { color: #00FF41; }
                .message-newIndicator { background: #00FF41; }
                .p-nav-list .p-navEl.is-selected:after { background: linear-gradient(-270deg, #00FF41 0%, #00CC33 100%); }
                .p-nav-list .p-navEl.is-selected { color: #00FF41; }
            `
        },
        cyber: {
            name: 'Кибер-Синяя',
            css: `
                .menu-tabHeader .tabs-tab.is-active { border-color: #00FFFF; }
                .badge.badge--highlighted, .badgeContainer.badgeContainer--highlighted:after { background: #00FFFF; }
                .tabs-tab { color: #00FFFF; }
                .blockLink.is-selected { color: #00FFFF; border-left: 2px solid #00FFFF; }
                .block-tabHeader .tabs-tab:hover { color: #00FFFF; }
                .button.button--primary, a.button.button--primary { background: linear-gradient(#00FFFF, #0099FF); }
                .menu-linkRow.is-selected, .menu-linkRow:hover { color: #00FFFF; }
                .fr-toolbar { border-top: 1px solid #00FFFF; }
                .block-tabHeader .tabs-tab.is-active { color: #00FFFF; border-color: #00FFFF; }
                .messageNotice { border-left: 2px solid #00FFFF; }
                .bbCodeBlock { border-left: 2px solid #00FFFF; }
                .bbCodeBlock-title { color: #00FFFF; }
                .message-newIndicator { background: #00FFFF; }
                .p-nav-list .p-navEl.is-selected:after { background: linear-gradient(-270deg, #00FFFF 0%, #0099FF 100%); }
                .p-nav-list .p-navEl.is-selected { color: #00FFFF; }
            `
        },
        royal: {
            name: 'Королевский Пурпурный',
            css: `
                .menu-tabHeader .tabs-tab.is-active { border-color: #9B30FF; }
                .badge.badge--highlighted, .badgeContainer.badgeContainer--highlighted:after { background: #9B30FF; }
                .tabs-tab { color: #9B30FF; }
                .blockLink.is-selected { color: #9B30FF; border-left: 2px solid #9B30FF; }
                .block-tabHeader .tabs-tab:hover { color: #9B30FF; }
                .button.button--primary, a.button.button--primary { background: linear-gradient(#9B30FF, #7B1FA2); }
                .menu-linkRow.is-selected, .menu-linkRow:hover { color: #9B30FF; }
                .fr-toolbar { border-top: 1px solid #9B30FF; }
                .block-tabHeader .tabs-tab.is-active { color: #9B30FF; border-color: #9B30FF; }
                .messageNotice { border-left: 2px solid #9B30FF; }
                .bbCodeBlock { border-left: 2px solid #9B30FF; }
                .bbCodeBlock-title { color: #9B30FF; }
                .message-newIndicator { background: #9B30FF; }
                .p-nav-list .p-navEl.is-selected:after { background: linear-gradient(-270deg, #9B30FF 0%, #7B1FA2 100%); }
                .p-nav-list .p-navEl.is-selected { color: #9B30FF; }
            `
        },
        gold: {
            name: 'Золотая Роскошь',
            css: `
                .menu-tabHeader .tabs-tab.is-active { border-color: #FFD700; }
                .badge.badge--highlighted, .badgeContainer.badgeContainer--highlighted:after { background: #FFD700; }
                .tabs-tab { color: #FFD700; }
                .blockLink.is-selected { color: #FFD700; border-left: 2px solid #FFD700; }
                .block-tabHeader .tabs-tab:hover { color: #FFD700; }
                .button.button--primary, a.button.button--primary { background: linear-gradient(#FFD700, #FFA500); }
                .menu-linkRow.is-selected, .menu-linkRow:hover { color: #FFD700; }
                .fr-toolbar { border-top: 1px solid #FFD700; }
                .block-tabHeader .tabs-tab.is-active { color: #FFD700; border-color: #FFD700; }
                .messageNotice { border-left: 2px solid #FFD700; }
                .bbCodeBlock { border-left: 2px solid #FFD700; }
                .bbCodeBlock-title { color: #FFD700; }
                .message-newIndicator { background: #FFD700; }
                .p-nav-list .p-navEl.is-selected:after { background: linear-gradient(-270deg, #FFD700 0%, #FFA500 100%); }
                .p-nav-list .p-navEl.is-selected { color: #FFD700; }
            `
        },
        ruby: {
            name: 'Рубиново-Красная',
            css: `
                .menu-tabHeader .tabs-tab.is-active { border-color: #FF1493; }
                .badge.badge--highlighted, .badgeContainer.badgeContainer--highlighted:after { background: #FF1493; }
                .tabs-tab { color: #FF1493; }
                .blockLink.is-selected { color: #FF1493; border-left: 2px solid #FF1493; }
                .block-tabHeader .tabs-tab:hover { color: #FF1493; }
                .button.button--primary, a.button.button--primary { background: linear-gradient(#FF1493, #C71585); }
                .menu-linkRow.is-selected, .menu-linkRow:hover { color: #FF1493; }
                .fr-toolbar { border-top: 1px solid #FF1493; }
                .block-tabHeader .tabs-tab.is-active { color: #FF1493; border-color: #FF1493; }
                .messageNotice { border-left: 2px solid #FF1493; }
                .bbCodeBlock { border-left: 2px solid #FF1493; }
                .bbCodeBlock-title { color: #FF1493; }
                .message-newIndicator { background: #FF1493; }
                .p-nav-list .p-navEl.is-selected:after { background: linear-gradient(-270deg, #FF1493 0%, #C71585 100%); }
                .p-nav-list .p-navEl.is-selected { color: #FF1493; }
            `
        }
    };

    // Ключи для localStorage
    const STORAGE_KEYS = {
        theme: 'br_custom_theme',
        background: 'br_custom_background'
    };

    // Функция применения темы
    function applyTheme(themeId) {
        const oldStyle = document.getElementById('br-theme-style');
        if (oldStyle) oldStyle.remove();

        if (themeId !== 'none' && THEMES[themeId]) {
            const style = document.createElement('style');
            style.id = 'br-theme-style';
            style.textContent = THEMES[themeId].css;
            document.head.appendChild(style);
        }
    }

    // Функция применения фона
    function applyBackground(url) {
        if (!url || url.trim() === '') {
            document.body.style.backgroundImage = '';
            document.body.style.backgroundAttachment = '';
            document.body.style.backgroundSize = '';
            return;
        }
        document.body.style.backgroundImage = `url("${url}")`;
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundSize = 'cover';
    }

    // Функция загрузки сохраненных настроек
    function loadSavedSettings() {
        const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
        const savedBackground = localStorage.getItem(STORAGE_KEYS.background);
        
        if (savedTheme && savedTheme !== 'none') {
            applyTheme(savedTheme);
        }
        if (savedBackground && savedBackground.trim() !== '') {
            applyBackground(savedBackground);
        }
    }

    // Функция создания модального окна
    function createModal() {
        const modal = document.createElement('div');
        modal.id = 'br-customizer-modal';
        modal.className = 'br-modal';
        modal.innerHTML = `
            <div class="br-modal-content">
                <div class="br-modal-header">
                    <div class="br-modal-title">🎨 Кастомизация форума</div>
                    <button class="br-modal-close">&times;</button>
                </div>
                <div class="br-modal-body">
                    <div class="br-form-group">
                        <label class="br-label">🎭 Выберите тему оформления:</label>
                        <select id="br-theme-select" class="br-select">
                            ${Object.entries(THEMES).map(([id, theme]) => 
                                `<option value="${id}">${theme.name}</option>`
                            ).join('')}
                        </select>
                    </div>
                    
                    <div class="br-divider"></div>
                    
                    <div class="br-form-group">
                        <label class="br-label">🖼️ URL фонового изображения:</label>
                        <input type="text" id="br-bg-url" class="br-input" 
                               placeholder="https://example.com/image.jpg">
                        <div class="br-hint">Поддерживаются любые форматы изображений (jpg, png, gif, webp)</div>
                    </div>
                </div>
                <div class="br-modal-footer">
                    <button class="br-btn br-btn-secondary" id="br-reset-bg">Сбросить фон</button>
                    <button class="br-btn br-btn-primary" id="br-save-settings">Сохранить</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        return modal;
    }

    function openModal() {
        let modal = document.getElementById('br-customizer-modal');
        if (!modal) {
            modal = createModal();
            
            const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || 'none';
            const savedBg = localStorage.getItem(STORAGE_KEYS.background) || '';
            
            const themeSelect = modal.querySelector('#br-theme-select');
            const bgUrlInput = modal.querySelector('#br-bg-url');
            
            if (themeSelect) themeSelect.value = savedTheme;
            if (bgUrlInput) bgUrlInput.value = savedBg;
            
            modal.querySelector('#br-save-settings').addEventListener('click', () => {
                const selectedTheme = themeSelect.value;
                const bgUrl = bgUrlInput.value.trim();
                
                localStorage.setItem(STORAGE_KEYS.theme, selectedTheme);
                localStorage.setItem(STORAGE_KEYS.background, bgUrl);
                
                applyTheme(selectedTheme);
                applyBackground(bgUrl);
                closeModal();
                showNotification('✅ Настройки сохранены!');
            });
            
            modal.querySelector('#br-reset-bg').addEventListener('click', () => {
                bgUrlInput.value = '';
                showNotification('🖼️ Фон сброшен');
            });
            
            modal.querySelector('.br-modal-close').addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
        }
        
        modal.style.display = 'flex';
    }
    
    function closeModal() {
        const modal = document.getElementById('br-customizer-modal');
        if (modal) modal.style.display = 'none';
    }
    
    function showNotification(message, duration = 3000) {
        let notification = document.getElementById('br-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'br-notification';
            notification.className = 'br-notification';
            document.body.appendChild(notification);
        }
        
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => notification.classList.remove('show'), duration);
    }

    // ГЛАВНАЯ ФУНКЦИЯ - добавляем кнопку вручную в нужное место
    function addCustomizeButton() {
        // Ищем контейнер с кнопками
        let container = document.querySelector('.bgButtonsContainer');
        
        // Если контейнера нет, создаем свой и вставляем после pageContent
        if (!container) {
            const pageContent = document.querySelector('.pageContent');
            if (pageContent && !document.querySelector('.bgButtonsContainer')) {
                // Создаем временный контейнер
                container = document.createElement('div');
                container.className = 'bgButtonsContainer';
                pageContent.appendChild(container);
            }
        }
        
        // Если контейнер существует, добавляем кнопку
        if (container && !container.querySelector('.br-customize-btn')) {
            const customizeBtn = document.createElement('button');
            customizeBtn.textContent = '🖼';
            customizeBtn.className = 'bgButton br-customize-btn';
            customizeBtn.style.borderBottom = '2px solid #FF69B4';
            customizeBtn.style.fontSize = '16px';
            customizeBtn.title = 'Кастомизация темы и фона';
            customizeBtn.addEventListener('click', openModal);
            container.appendChild(customizeBtn);
            console.log('[BR Customizer] Кнопка добавлена!');
        }
    }

    // Стили
    const style = document.createElement('style');
    style.textContent = `
        .br-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 2147483647;
            align-items: center;
            justify-content: center;
        }
        
        .br-modal-content {
            background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
            border: 1px solid #333;
            border-radius: 16px;
            width: 90%;
            max-width: 500px;
            animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .br-modal-header {
            padding: 20px;
            border-bottom: 1px solid #333;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .br-modal-title {
            font-size: 18px;
            font-weight: bold;
            color: #fff;
        }
        
        .br-modal-close {
            background: none;
            border: none;
            color: #fff;
            font-size: 24px;
            cursor: pointer;
            width: 30px;
            height: 30px;
            border-radius: 50%;
        }
        
        .br-modal-close:hover {
            background: rgba(255,255,255,0.1);
        }
        
        .br-modal-body {
            padding: 20px;
        }
        
        .br-form-group {
            margin-bottom: 20px;
        }
        
        .br-label {
            display: block;
            margin-bottom: 10px;
            color: #fff;
            font-weight: bold;
            font-size: 14px;
        }
        
        .br-select, .br-input {
            width: 100%;
            padding: 10px;
            background: #1a1a1a;
            color: #fff;
            border: 1px solid #333;
            border-radius: 8px;
            font-size: 14px;
        }
        
        .br-select:focus, .br-input:focus {
            outline: none;
            border-color: #FF69B4;
        }
        
        .br-hint {
            margin-top: 5px;
            font-size: 11px;
            color: #888;
        }
        
        .br-divider {
            height: 1px;
            background: #333;
            margin: 20px 0;
        }
        
        .br-modal-footer {
            padding: 20px;
            border-top: 1px solid #333;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }
        
        .br-btn {
            padding: 8px 16px;
            border: none;
            border-radius: 6px;
            font-size: 13px;
            font-weight: bold;
            cursor: pointer;
        }
        
        .br-btn-primary {
            background: linear-gradient(135deg, #FF69B4, #FF1493);
            color: #fff;
        }
        
        .br-btn-secondary {
            background: #333;
            color: #fff;
        }
        
        .br-btn-secondary:hover {
            background: #444;
        }
        
        .br-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #FF69B4, #FF1493);
            color: #fff;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 13px;
            z-index: 2147483647;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        }
        
        .br-notification.show {
            transform: translateX(0);
        }
        
        .br-customize-btn {
            background: linear-gradient(135deg, #FF69B4, #FF1493) !important;
            border: none !important;
        }
    `;
    document.head.appendChild(style);
    
    // Загружаем настройки
    loadSavedSettings();
    
    // Пытаемся добавить кнопку сразу
    setTimeout(() => {
        addCustomizeButton();
    }, 500);
    
    // Следим за изменениями на странице
    const observer = new MutationObserver(() => {
        addCustomizeButton();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Также пробуем добавить через 2 секунды (на случай если основной скрипт медленный)
    setTimeout(() => {
        addCustomizeButton();
    }, 2000);
    
    setTimeout(() => {
        addCustomizeButton();
    }, 5000);
    
})();
