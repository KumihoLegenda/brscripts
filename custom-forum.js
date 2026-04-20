// ==UserScript==
// @name         BR Theme & Background Customizer
// @namespace    http://tampermonkey.net/
// @version      1.0
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
                .button-text { font-weight: bold; }
                .button, a.button { color: #fff; }
                .menu-tabHeader .tabs-tab.is-active { border-color: #FF4500; }
                .badge.badge--highlighted, .badgeContainer.badgeContainer--highlighted:after { background: #FF4500; }
                .tabs-tab { color: #FF4500; }
                .blockLink.is-selected { color: #FF4500; border-left: 2px solid #FF4500; }
                .block-tabHeader .tabs-tab:hover { color: #FF4500; }
                .button.button--primary, a.button.button--primary { background: linear-gradient(#FF4500, #FF4500); }
                .button.button--primary:hover, a.button.button--primary:hover { background: linear-gradient(#FF4500, #FF4500); }
                .menu-linkRow.is-selected, .menu-linkRow:hover { color: #FF4500; }
                .fr-toolbar { border-top: 1px solid #FF4500; }
                .block-tabHeader .tabs-tab.is-active { color: #FF4500; border-color: #FF4500; }
                .messageNotice { border-left: 2px solid #FF4500; }
                .messageNotice:before { color: #FF4500; }
                .bbCodeBlock { border-left: 2px solid #FF4500; }
                .bbCodeBlock-title { color: #FF4500; }
                .button.button--scroll, a.button.button--scroll { background: linear-gradient(#FF4500, #FF4500); }
                .bbCodeBlock-expandLink a { color: #FF4500; }
                .message-newIndicator { background: #FF4500; }
                .tabs--standalone .tabs-tab.is-active { color: #FF4500; border-color: #FF4500; }
                .tabs--standalone .tabs-tab:hover { color: #FF4500; }
                .p-nav-list .p-navEl.is-selected:after { background: linear-gradient(-270deg, #FF4500 0%, #FF4500 100%); }
                .p-nav-list .p-navEl.is-selected { color: #FF4500; }
                .button.button--link, a.button.button--link { background: #FF4500; }
                .block-body .block-minorHeader.uix_threadListSeparator:before { background: linear-gradient(-270deg, #FF4500 0%, #FF4500 100%); }
                .button.button--cta, a.button.button--cta { background: #FF4500; border-color: #00A8FF00; background-color: #FF4500; }
            `
        },
        neon: {
            name: 'Неоновая Зеленая',
            css: `
                .button-text { font-weight: bold; }
                .button, a.button { color: #fff; }
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
                .messageNotice:before { color: #00FF41; }
                .bbCodeBlock { border-left: 2px solid #00FF41; }
                .bbCodeBlock-title { color: #00FF41; }
                .button.button--scroll, a.button.button--scroll { background: linear-gradient(#00FF41, #00CC33); }
                .message-newIndicator { background: #00FF41; }
                .tabs--standalone .tabs-tab.is-active { color: #00FF41; border-color: #00FF41; }
                .p-nav-list .p-navEl.is-selected:after { background: linear-gradient(-270deg, #00FF41 0%, #00CC33 100%); }
                .button.button--link, a.button.button--link { background: #00FF41; }
                .button.button--cta, a.button.button--cta { background: #00FF41; border-color: #00FF41; }
            `
        },
        cyber: {
            name: 'Кибер-Синяя',
            css: `
                .button-text { font-weight: bold; }
                .button, a.button { color: #fff; }
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
                .messageNotice:before { color: #00FFFF; }
                .bbCodeBlock { border-left: 2px solid #00FFFF; }
                .bbCodeBlock-title { color: #00FFFF; }
                .button.button--scroll, a.button.button--scroll { background: linear-gradient(#00FFFF, #0099FF); }
                .message-newIndicator { background: #00FFFF; }
                .tabs--standalone .tabs-tab.is-active { color: #00FFFF; border-color: #00FFFF; }
                .p-nav-list .p-navEl.is-selected:after { background: linear-gradient(-270deg, #00FFFF 0%, #0099FF 100%); }
                .button.button--link, a.button.button--link { background: #00FFFF; }
                .button.button--cta, a.button.button--cta { background: #00FFFF; border-color: #00FFFF; }
            `
        },
        royal: {
            name: 'Королевский Пурпурный',
            css: `
                .button-text { font-weight: bold; }
                .button, a.button { color: #fff; }
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
                .messageNotice:before { color: #9B30FF; }
                .bbCodeBlock { border-left: 2px solid #9B30FF; }
                .bbCodeBlock-title { color: #9B30FF; }
                .button.button--scroll, a.button.button--scroll { background: linear-gradient(#9B30FF, #7B1FA2); }
                .message-newIndicator { background: #9B30FF; }
                .tabs--standalone .tabs-tab.is-active { color: #9B30FF; border-color: #9B30FF; }
                .p-nav-list .p-navEl.is-selected:after { background: linear-gradient(-270deg, #9B30FF 0%, #7B1FA2 100%); }
                .button.button--link, a.button.button--link { background: #9B30FF; }
                .button.button--cta, a.button.button--cta { background: #9B30FF; border-color: #9B30FF; }
            `
        },
        gold: {
            name: 'Золотая Роскошь',
            css: `
                .button-text { font-weight: bold; }
                .button, a.button { color: #fff; }
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
                .messageNotice:before { color: #FFD700; }
                .bbCodeBlock { border-left: 2px solid #FFD700; }
                .bbCodeBlock-title { color: #FFD700; }
                .button.button--scroll, a.button.button--scroll { background: linear-gradient(#FFD700, #FFA500); }
                .message-newIndicator { background: #FFD700; }
                .tabs--standalone .tabs-tab.is-active { color: #FFD700; border-color: #FFD700; }
                .p-nav-list .p-navEl.is-selected:after { background: linear-gradient(-270deg, #FFD700 0%, #FFA500 100%); }
                .button.button--link, a.button.button--link { background: #FFD700; }
                .button.button--cta, a.button.button--cta { background: #FFD700; border-color: #FFD700; }
            `
        },
        ruby: {
            name: 'Рубиново-Красная',
            css: `
                .button-text { font-weight: bold; }
                .button, a.button { color: #fff; }
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
                .messageNotice:before { color: #FF1493; }
                .bbCodeBlock { border-left: 2px solid #FF1493; }
                .bbCodeBlock-title { color: #FF1493; }
                .button.button--scroll, a.button.button--scroll { background: linear-gradient(#FF1493, #C71585); }
                .message-newIndicator { background: #FF1493; }
                .tabs--standalone .tabs-tab.is-active { color: #FF1493; border-color: #FF1493; }
                .p-nav-list .p-navEl.is-selected:after { background: linear-gradient(-270deg, #FF1493 0%, #C71585 100%); }
                .button.button--link, a.button.button--link { background: #FF1493; }
                .button.button--cta, a.button.button--cta { background: #FF1493; border-color: #FF1493; }
            `
        },
        ice: {
            name: 'Ледяная Голубая',
            css: `
                .button-text { font-weight: bold; }
                .button, a.button { color: #fff; }
                .menu-tabHeader .tabs-tab.is-active { border-color: #00BFFF; }
                .badge.badge--highlighted, .badgeContainer.badgeContainer--highlighted:after { background: #00BFFF; }
                .tabs-tab { color: #00BFFF; }
                .blockLink.is-selected { color: #00BFFF; border-left: 2px solid #00BFFF; }
                .block-tabHeader .tabs-tab:hover { color: #00BFFF; }
                .button.button--primary, a.button.button--primary { background: linear-gradient(#00BFFF, #1E90FF); }
                .menu-linkRow.is-selected, .menu-linkRow:hover { color: #00BFFF; }
                .fr-toolbar { border-top: 1px solid #00BFFF; }
                .block-tabHeader .tabs-tab.is-active { color: #00BFFF; border-color: #00BFFF; }
                .messageNotice { border-left: 2px solid #00BFFF; }
                .messageNotice:before { color: #00BFFF; }
                .bbCodeBlock { border-left: 2px solid #00BFFF; }
                .bbCodeBlock-title { color: #00BFFF; }
                .button.button--scroll, a.button.button--scroll { background: linear-gradient(#00BFFF, #1E90FF); }
                .message-newIndicator { background: #00BFFF; }
                .tabs--standalone .tabs-tab.is-active { color: #00BFFF; border-color: #00BFFF; }
                .p-nav-list .p-navEl.is-selected:after { background: linear-gradient(-270deg, #00BFFF 0%, #1E90FF 100%); }
                .button.button--link, a.button.button--link { background: #00BFFF; }
                .button.button--cta, a.button.button--cta { background: #00BFFF; border-color: #00BFFF; }
            `
        },
        forest: {
            name: 'Лесная Изумрудная',
            css: `
                .button-text { font-weight: bold; }
                .button, a.button { color: #fff; }
                .menu-tabHeader .tabs-tab.is-active { border-color: #50C878; }
                .badge.badge--highlighted, .badgeContainer.badgeContainer--highlighted:after { background: #50C878; }
                .tabs-tab { color: #50C878; }
                .blockLink.is-selected { color: #50C878; border-left: 2px solid #50C878; }
                .block-tabHeader .tabs-tab:hover { color: #50C878; }
                .button.button--primary, a.button.button--primary { background: linear-gradient(#50C878, #3CB371); }
                .menu-linkRow.is-selected, .menu-linkRow:hover { color: #50C878; }
                .fr-toolbar { border-top: 1px solid #50C878; }
                .block-tabHeader .tabs-tab.is-active { color: #50C878; border-color: #50C878; }
                .messageNotice { border-left: 2px solid #50C878; }
                .messageNotice:before { color: #50C878; }
                .bbCodeBlock { border-left: 2px solid #50C878; }
                .bbCodeBlock-title { color: #50C878; }
                .button.button--scroll, a.button.button--scroll { background: linear-gradient(#50C878, #3CB371); }
                .message-newIndicator { background: #50C878; }
                .tabs--standalone .tabs-tab.is-active { color: #50C878; border-color: #50C878; }
                .p-nav-list .p-navEl.is-selected:after { background: linear-gradient(-270deg, #50C878 0%, #3CB371 100%); }
                .button.button--link, a.button.button--link { background: #50C878; }
                .button.button--cta, a.button.button--cta { background: #50C878; border-color: #50C878; }
            `
        },
        sunset: {
            name: 'Закатная Розовая',
            css: `
                .button-text { font-weight: bold; }
                .button, a.button { color: #fff; }
                .menu-tabHeader .tabs-tab.is-active { border-color: #FF6B6B; }
                .badge.badge--highlighted, .badgeContainer.badgeContainer--highlighted:after { background: #FF6B6B; }
                .tabs-tab { color: #FF6B6B; }
                .blockLink.is-selected { color: #FF6B6B; border-left: 2px solid #FF6B6B; }
                .block-tabHeader .tabs-tab:hover { color: #FF6B6B; }
                .button.button--primary, a.button.button--primary { background: linear-gradient(#FF6B6B, #FF4757); }
                .menu-linkRow.is-selected, .menu-linkRow:hover { color: #FF6B6B; }
                .fr-toolbar { border-top: 1px solid #FF6B6B; }
                .block-tabHeader .tabs-tab.is-active { color: #FF6B6B; border-color: #FF6B6B; }
                .messageNotice { border-left: 2px solid #FF6B6B; }
                .messageNotice:before { color: #FF6B6B; }
                .bbCodeBlock { border-left: 2px solid #FF6B6B; }
                .bbCodeBlock-title { color: #FF6B6B; }
                .button.button--scroll, a.button.button--scroll { background: linear-gradient(#FF6B6B, #FF4757); }
                .message-newIndicator { background: #FF6B6B; }
                .tabs--standalone .tabs-tab.is-active { color: #FF6B6B; border-color: #FF6B6B; }
                .p-nav-list .p-navEl.is-selected:after { background: linear-gradient(-270deg, #FF6B6B 0%, #FF4757 100%); }
                .button.button--link, a.button.button--link { background: #FF6B6B; }
                .button.button--cta, a.button.button--cta { background: #FF6B6B; border-color: #FF6B6B); }
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
        // Удаляем старую тему
        const oldStyle = document.getElementById('br-theme-style');
        if (oldStyle) oldStyle.remove();

        // Если тема не "none", применяем новую
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
        } else {
            applyTheme('none');
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
                    
                    <div class="br-preview" id="br-bg-preview" style="display: none;">
                        <div class="br-preview-title">Предпросмотр:</div>
                        <div class="br-preview-image"></div>
                    </div>
                </div>
                <div class="br-modal-footer">
                    <button class="br-btn br-btn-secondary" id="br-reset-bg">Сбросить фон</button>
                    <button class="br-btn br-btn-primary" id="br-save-settings">Сохранить</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Добавляем предпросмотр при вводе URL
        const bgUrlInput = modal.querySelector('#br-bg-url');
        bgUrlInput.addEventListener('input', function() {
            const preview = modal.querySelector('#br-bg-preview');
            const previewImage = modal.querySelector('.br-preview-image');
            const url = this.value.trim();
            
            if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
                previewImage.style.backgroundImage = `url("${url}")`;
                preview.style.display = 'block';
            } else {
                preview.style.display = 'none';
            }
        });
        
        return modal;
    }

    // Функция открытия модального окна
    function openModal() {
        let modal = document.getElementById('br-customizer-modal');
        if (!modal) {
            modal = createModal();
            
            // Загружаем сохраненные значения
            const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || 'none';
            const savedBg = localStorage.getItem(STORAGE_KEYS.background) || '';
            
            const themeSelect = modal.querySelector('#br-theme-select');
            const bgUrlInput = modal.querySelector('#br-bg-url');
            
            if (themeSelect) themeSelect.value = savedTheme;
            if (bgUrlInput) bgUrlInput.value = savedBg;
            
            // Обработчики кнопок
            modal.querySelector('#br-save-settings').addEventListener('click', () => {
                const selectedTheme = modal.querySelector('#br-theme-select').value;
                const bgUrl = modal.querySelector('#br-bg-url').value.trim();
                
                // Сохраняем в localStorage
                localStorage.setItem(STORAGE_KEYS.theme, selectedTheme);
                localStorage.setItem(STORAGE_KEYS.background, bgUrl);
                
                // Применяем изменения
                applyTheme(selectedTheme);
                applyBackground(bgUrl);
                
                // Закрываем модальное окно
                closeModal();
                
                // Показываем уведомление
                showNotification('✅ Настройки сохранены!');
            });
            
            modal.querySelector('#br-reset-bg').addEventListener('click', () => {
                const bgUrlInput = modal.querySelector('#br-bg-url');
                bgUrlInput.value = '';
                const preview = modal.querySelector('#br-bg-preview');
                preview.style.display = 'none';
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
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, duration);
    }
    
    // Функция добавления кнопки в контейнер основного скрипта
    function addCustomizeButton() {
        // Ждем появления контейнера от основного скрипта
        const checkInterval = setInterval(() => {
            const container = document.querySelector('.bgButtonsContainer');
            if (container) {
                clearInterval(checkInterval);
                
                // Проверяем, не добавлена ли уже кнопка
                if (container.querySelector('.br-customize-btn')) return;
                
                // Создаем кнопку кастомизации
                const customizeBtn = document.createElement('button');
                customizeBtn.textContent = '🖼';
                customizeBtn.className = 'bgButton br-customize-btn';
                customizeBtn.style.borderBottom = '2px solid #FF69B4';
                customizeBtn.style.fontSize = '16px';
                customizeBtn.title = 'Кастомизация темы и фона';
                customizeBtn.addEventListener('click', openModal);
                
                // Добавляем кнопку в конец контейнера
                container.appendChild(customizeBtn);
            }
        }, 100);
        
        // Останавливаем проверку через 10 секунд, если контейнер не найден
        setTimeout(() => clearInterval(checkInterval), 10000);
    }
    
    // Добавляем стили для модального окна и уведомлений
    const style = document.createElement('style');
    style.textContent = `
        /* Модальное окно */
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
            backdrop-filter: blur(5px);
        }
        
        .br-modal-content {
            background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
            border: 1px solid #333;
            border-radius: 16px;
            width: 90%;
            max-width: 550px;
            max-height: 85vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
            from {
                transform: translateY(-50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        .br-modal-header {
            padding: 20px 24px;
            border-bottom: 1px solid #333;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(0, 0, 0, 0.3);
        }
        
        .br-modal-title {
            font-size: 20px;
            font-weight: bold;
            color: #fff;
        }
        
        .br-modal-close {
            background: none;
            border: none;
            color: #fff;
            font-size: 28px;
            cursor: pointer;
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s;
        }
        
        .br-modal-close:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: rotate(90deg);
        }
        
        .br-modal-body {
            padding: 24px;
        }
        
        .br-form-group {
            margin-bottom: 24px;
        }
        
        .br-label {
            display: block;
            margin-bottom: 12px;
            color: #fff;
            font-weight: bold;
            font-size: 14px;
        }
        
        .br-select {
            width: 100%;
            padding: 10px 12px;
            background: #1a1a1a;
            color: #fff;
            border: 1px solid #333;
            border-radius: 8px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .br-select:hover {
            border-color: #FF69B4;
        }
        
        .br-select:focus {
            outline: none;
            border-color: #FF69B4;
            box-shadow: 0 0 0 2px rgba(255, 105, 180, 0.2);
        }
        
        .br-input {
            width: 100%;
            padding: 10px 12px;
            background: #1a1a1a;
            color: #fff;
            border: 1px solid #333;
            border-radius: 8px;
            font-size: 14px;
            transition: all 0.2s;
        }
        
        .br-input:focus {
            outline: none;
            border-color: #FF69B4;
            box-shadow: 0 0 0 2px rgba(255, 105, 180, 0.2);
        }
        
        .br-hint {
            margin-top: 8px;
            font-size: 12px;
            color: #888;
        }
        
        .br-divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #333, transparent);
            margin: 20px 0;
        }
        
        .br-preview {
            margin-top: 16px;
            padding: 16px;
            background: #0a0a0a;
            border-radius: 8px;
            border: 1px solid #333;
        }
        
        .br-preview-title {
            color: #888;
            font-size: 12px;
            margin-bottom: 12px;
        }
        
        .br-preview-image {
            width: 100%;
            height: 150px;
            background-size: cover;
            background-position: center;
            border-radius: 8px;
            border: 1px solid #333;
        }
        
        .br-modal-footer {
            padding: 20px 24px;
            border-top: 1px solid #333;
            display: flex;
            justify-content: flex-end;
            gap: 12px;
        }
        
        .br-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .br-btn-primary {
            background: linear-gradient(135deg, #FF69B4, #FF1493);
            color: #fff;
        }
        
        .br-btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(255, 105, 180, 0.3);
        }
        
        .br-btn-secondary {
            background: #333;
            color: #fff;
        }
        
        .br-btn-secondary:hover {
            background: #444;
        }
        
        /* Уведомление */
        .br-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #FF69B4, #FF1493);
            color: #fff;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: bold;
            z-index: 2147483647;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        .br-notification.show {
            transform: translateX(0);
        }
        
        /* Стиль для кнопки 🖼 */
        .br-customize-btn {
            background: linear-gradient(135deg, #FF69B4, #FF1493) !important;
            border: none !important;
            font-weight: bold;
        }
        
        .br-customize-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(255, 105, 180, 0.4);
        }
    `;
    document.head.appendChild(style);
    
    // Загружаем сохраненные настройки при загрузке страницы
    loadSavedSettings();
    
    // Добавляем кнопку после загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addCustomizeButton);
    } else {
        addCustomizeButton();
    }
    
    // Следим за появлением контейнера при динамических изменениях
    const observer = new MutationObserver(() => {
        const container = document.querySelector('.bgButtonsContainer');
        if (container && !container.querySelector('.br-customize-btn')) {
            addCustomizeButton();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
})();
