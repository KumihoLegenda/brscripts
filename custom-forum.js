// ==UserScript==
// @name         Crystal Dark Theme (Universal)
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Тёмная тема с кристальными обводками для всех разделов форума
// @author       Request
// @match        https://forum.blackrussia.online/*
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Уникальный идентификатор для предотвращения конфликтов
    if (window.__CRYSTAL_DARK_UNIVERSAL_LOADED) {
        return;
    }
    window.__CRYSTAL_DARK_UNIVERSAL_LOADED = true;

    const STORAGE_KEY = 'crystal_dark_universal_enabled';
    let isEnabled = true;
    let styleElement = null;
    let observer = null;

    // --- МАКСИМАЛЬНО АГРЕССИВНЫЕ СТИЛИ С !important ДЛЯ ВСЕХ ЭЛЕМЕНТОВ ---
    const getThemeCSS = () => `
        /* Базовые стили для ВСЕХ страниц */
        html, body, 
        .p-body, .p-body-wrapper, .p-body-main, .p-body-content,
        .p-pageWrapper, .p-content, .p-main,
        .pageContent, .pageContent-main,
        .block, .block-container, .block-body, .block-row,
        .block--category, .block--category .block-container,
        .structItem, .structItem-container,
        .node, .node-body, .node-main,
        .message, .message-inner, .message-cell,
        .message-user, .message-content, .message-body,
        .bbWrapper, .bbCodeBlock, .bbCodeBlock-content,
        .p-nav, .p-nav-inner, .p-nav-list, .p-navgroup,
        .p-sectionLinks, .p-sectionLinks-inner,
        .p-breadcrumbs, .p-breadcrumbs-inner,
        .p-footer, .p-footer-inner,
        .sidebar, .sidebar-block,
        .block--sidebar, .block--sidebar .block-container,
        .menu, .menu-content, .menu-row,
        .dialog, .dialog-content, .overlay,
        .quickReply, .quickReply-content,
        .fr-box, .fr-toolbar, .fr-wrapper, .fr-element,
        .formRow, .formRow-title, .formRow-field,
        .input, .input-group,
        .button, .button--primary, .button--cta, .button--link,
        .actionBar, .actionBar-set, .actionBar-action,
        .reactionsBar, .reaction, .reaction-text,
        .tabs, .tabs-tab, .tabPanes, .tabPane,
        .filterBar, .filterBar-filter, .filterBar-text,
        .pageNav, .pageNav-page, .pageNav-jump,
        .pairs, .pairs--plain, .pairs--inline,
        .contentRow, .contentRow-main, .contentRow-figure,
        .structItem-cell, .structItem-title, .structItem-startDate,
        .node-stats, .node-extra, .node-icon, .node-info,
        .message-name, .message-userTitle, .message-userExtras,
        .message-attribution, .message-signature,
        .message-lastEdit, .message-notices, .message-notice,
        .bbCodeQuote, .bbCodeSpoiler, .bbCodeSpoiler-content,
        .attachmentList, .attachment, .attachment-thumb,
        .p-title, .p-title-value, .p-description,
        .pairs--plain dt, .pairs--plain dd,
        .offCanvasMenu, .offCanvasMenu-content,
        .tooltip, .tooltip-content,
        .alert, .notice, .notices,
        .staffBar, .staffBar-inner,
        .block-header, .block-footer, .block-filterBar,
        .message-newIndicator, .message-staffPost,
        .p-footer-default, .footer-row, .footer-legal, .footer-copyright,
        .breadcrumb, .breadcrumb-item, .breadcrumb-link,
        .buttonGroup, .buttonGroup-button,
        .selectMenu, .selectMenu-row,
        .sharePage, .sharePage-link,
        .tagList, .tag,
        .pollBlock, .pollBlock-row,
        .ratingStars, .ratingStars-star,
        .p-navEl, .p-navEl-link, .p-navEl-splitTrigger,
        .p-navgroup-link, .p-navgroup-link--bookmark,
        .p-navgroup-link--conversation, .p-navgroup-link--alerts,
        .p-navgroup-link--account,
        .uix_sidebarTrigger, .uix_sidebarTrigger--inline,
        .uix_extraTab, .uix_extraTab-trigger,
        .uix_quickReply--button,
        .uix_fixedSidebar, .uix_fixedSidebar-scroll {
            background: transparent !important;
            background-color: transparent !important;
            background-image: none !important;
        }

        /* Основной тёмный фон */
        html {
            background: #0a0a0c !important;
        }
        
        body,
        .p-body-wrapper,
        .p-body-main,
        .p-body-content,
        .pageContent {
            background: #0a0a0c !important;
        }

        /* Затемняем блоки с полупрозрачным фоном и размытием */
        .block-container,
        .structItem,
        .node,
        .message,
        .message-inner,
        .message-cell.message-cell--main,
        .p-nav,
        .p-sectionLinks,
        .menu-content,
        .dialog-content,
        .quickReply-content,
        .fr-toolbar,
        .fr-wrapper,
        .sidebar-block .block-container,
        .block--category .block-container,
        .block--category .block-header,
        .tabs,
        .filterBar,
        .pageNav,
        .reactionsBar,
        .alert,
        .notice,
        .overlay-container,
        .offCanvasMenu-content,
        .selectMenu,
        .staffBar {
            background: rgba(18, 18, 24, 0.88) !important;
            backdrop-filter: blur(3px) !important;
        }

        /* Кристальные обводки */
        .block-container,
        .structItem,
        .node,
        .message,
        .p-nav,
        .p-sectionLinks,
        .menu-content,
        .dialog-content,
        .quickReply-content,
        .fr-toolbar,
        .fr-wrapper,
        .sidebar-block .block-container,
        .block--category .block-container,
        .tabs-tab,
        .filterBar,
        .pageNav-page,
        .actionBar-action,
        .reactionsBar,
        .button,
        .input,
        .selectMenu,
        .alert,
        .notice,
        .offCanvasMenu-content,
        .staffBar,
        .tag {
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            border-radius: 14px !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03) !important;
        }

        /* Убираем внутренние границы */
        .message-inner,
        .structItem-container,
        .node-body,
        .p-nav-inner,
        .p-sectionLinks-inner,
        .block-body,
        .block-row,
        .block-header,
        .block-footer {
            border: none !important;
            box-shadow: none !important;
            background: transparent !important;
        }

        /* Основной текст */
        body, html,
        .p-body-content,
        .message-content,
        .bbWrapper,
        .structItem-title,
        .node-title,
        .p-title-value,
        .p-description,
        .pairs--plain dt,
        .pairs--plain dd,
        .message-name,
        .message-userTitle,
        .message-userExtras,
        .message-signature,
        .contentRow-title,
        .contentRow-lesser,
        .contentRow-mute,
        .menu-row,
        .dialog-content,
        .formRow-title,
        .input,
        .button,
        .button--link,
        .actionBar-action,
        .pageNav-page,
        .tabs-tab,
        .filterBar-filter,
        .p-navgroup-link,
        .p-breadcrumbs a,
        .breadcrumb-link,
        .footer-legal,
        .footer-copyright,
        .block-header,
        .tag,
        .pollBlock-question,
        .pollBlock-row label,
        .selectMenu-row {
            color: #e8e8ed !important;
        }

        /* Ссылки */
        a,
        .structItem-title a,
        .node-title a,
        .contentRow-title a,
        .p-navEl-link,
        .p-navgroup-link,
        .p-breadcrumbs a,
        .breadcrumb-link,
        .button--link,
        .tag a,
        .message-name a {
            color: #8bb9fe !important;
            transition: color 0.2s ease, text-shadow 0.2s ease !important;
        }

        a:hover,
        .structItem-title a:hover,
        .node-title a:hover,
        .contentRow-title a:hover,
        .p-navEl-link:hover,
        .p-navgroup-link:hover,
        .p-breadcrumbs a:hover,
        .breadcrumb-link:hover {
            color: #c0dbff !important;
            text-shadow: 0 0 6px rgba(139, 185, 254, 0.4) !important;
        }

        /* Заголовки */
        .p-title-value,
        .block-header,
        .message-name,
        .structItem-title,
        .node-title,
        .p-navEl.is-selected a {
            font-weight: 600 !important;
            color: #ffffff !important;
        }

        /* Второстепенный текст */
        .pairs--plain dd,
        .message-userExtras,
        .message-attribution,
        .structItem-startDate,
        .structItem-status,
        .node-stats,
        .node-extra,
        .footer-legal,
        .footer-copyright,
        .contentRow-lesser,
        .contentRow-mute,
        .message-lastEdit,
        .p-description,
        .filterBar-text,
        .pollBlock-row .pollBlock-result {
            color: #9a9aa8 !important;
        }

        /* Поля ввода */
        .input,
        .fr-element.fr-view,
        .fr-box.fr-basic .fr-element,
        .selectMenu-row input,
        textarea,
        input[type="text"],
        input[type="password"],
        input[type="email"],
        input[type="search"],
        input[type="number"] {
            background: rgba(30, 30, 38, 0.95) !important;
            border: 1px solid rgba(255, 255, 255, 0.15) !important;
            color: #e8e8ed !important;
            border-radius: 10px !important;
        }

        .input:focus,
        .fr-element.fr-view:focus,
        textarea:focus,
        input:focus {
            border-color: #8bb9fe !important;
            box-shadow: 0 0 0 3px rgba(139, 185, 254, 0.2) !important;
            outline: none !important;
        }

        /* Кнопки */
        .button,
        .button--primary,
        .button--cta,
        .button--icon--reply,
        .button--icon--write,
        .actionBar-action,
        .pageNav-page,
        .filterBar-filter,
        .tabs-tab,
        .buttonGroup-button {
            background: rgba(40, 40, 48, 0.92) !important;
            border: 1px solid rgba(255, 255, 255, 0.12) !important;
            transition: all 0.2s ease !important;
            border-radius: 10px !important;
        }

        .button:hover,
        .button--primary:hover,
        .button--cta:hover,
        .actionBar-action:hover,
        .pageNav-page:hover,
        .filterBar-filter:hover,
        .tabs-tab:hover {
            background: rgba(60, 60, 72, 0.95) !important;
            border-color: rgba(139, 185, 254, 0.5) !important;
            transform: translateY(-1px) !important;
        }

        .button:active {
            transform: translateY(1px) !important;
        }

        /* Реакции и лайки */
        .reactionsBar {
            background: rgba(25, 25, 32, 0.75) !important;
            border-radius: 20px !important;
        }

        .reaction {
            filter: brightness(0.9) !important;
            transition: filter 0.2s !important;
        }

        .reaction:hover {
            filter: brightness(1.1) !important;
        }

        /* Цитаты и спойлеры */
        .bbCodeQuote,
        .bbCodeSpoiler {
            background: rgba(25, 25, 35, 0.7) !important;
            border-left: 3px solid #8bb9fe !important;
            border-radius: 10px !important;
        }

        .bbCodeQuote .attribution,
        .bbCodeSpoiler-button {
            background: rgba(35, 35, 45, 0.85) !important;
            color: #c0dbff !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
        }

        /* Выделенные сообщения */
        .message--highlighted .message-cell {
            background: rgba(139, 185, 254, 0.08) !important;
        }

        /* Навигация */
        .p-nav-list .p-navEl a {
            color: #e8e8ed !important;
        }

        .p-nav-list .p-navEl.is-selected a {
            color: #8bb9fe !important;
            border-bottom: 2px solid #8bb9fe !important;
        }

        /* Выпадающие меню */
        .menu-content .menu-row:hover {
            background: rgba(60, 60, 72, 0.6) !important;
        }

        /* Полосы прокрутки */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        ::-webkit-scrollbar-track {
            background: rgba(20, 20, 28, 0.7) !important;
            border-radius: 4px !important;
        }

        ::-webkit-scrollbar-thumb {
            background: rgba(139, 185, 254, 0.4) !important;
            border-radius: 4px !important;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: rgba(139, 185, 254, 0.6) !important;
        }

        /* Скрываем стандартный белый фон у некоторых элементов */
        .fr-view .fr-element,
        .fr-box .fr-wrapper {
            background: transparent !important;
        }

        /* Таблицы */
        .bbTable table,
        .table,
        .table-responsive table {
            background: rgba(20, 20, 28, 0.7) !important;
            border-collapse: separate !important;
            border-spacing: 0 !important;
        }

        .bbTable th,
        .bbTable td,
        .table th,
        .table td {
            border-color: rgba(255, 255, 255, 0.08) !important;
            color: #e8e8ed !important;
        }

        /* Сообщения об ошибках и предупреждения */
        .blockMessage,
        .blockMessage--error,
        .blockMessage--warning {
            background: rgba(255, 80, 80, 0.15) !important;
            border: 1px solid rgba(255, 80, 80, 0.3) !important;
            color: #ffaaaa !important;
        }

        .blockMessage--success {
            background: rgba(80, 255, 80, 0.1) !important;
            border: 1px solid rgba(80, 255, 80, 0.3) !important;
            color: #aaffaa !important;
        }
    `;

    // --- СОЗДАНИЕ КНОПКИ ---
    function createToggleButton() {
        const button = document.createElement('div');
        button.id = 'crystal-dark-universal-toggle';
        button.innerHTML = '🎨';
        button.setAttribute('aria-label', 'Toggle Crystal Dark Theme');
        
        const updateButtonStyle = () => {
            button.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                width: 52px;
                height: 52px;
                border-radius: 50%;
                background: rgba(30, 30, 38, 0.95);
                backdrop-filter: blur(12px);
                border: 1px solid ${isEnabled ? 'rgba(139, 185, 254, 0.6)' : 'rgba(255, 255, 255, 0.2)'};
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
                color: ${isEnabled ? '#8bb9fe' : '#e8e8ed'};
                font-size: 26px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 2147483647;
                transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
                font-family: system-ui, -apple-system, sans-serif;
            `;
        };
        
        updateButtonStyle();
        
        // Эффекты при наведении
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.08)';
            button.style.background = 'rgba(50, 50, 62, 0.98)';
            button.style.borderColor = 'rgba(139, 185, 254, 0.7)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.background = 'rgba(30, 30, 38, 0.95)';
            button.style.borderColor = isEnabled ? 'rgba(139, 185, 254, 0.6)' : 'rgba(255, 255, 255, 0.2)';
        });
        
        // Обработчик клика
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleTheme();
            updateButtonStyle();
        });
        
        return button;
    }
    
    // --- УПРАВЛЕНИЕ ТЕМОЙ ---
    function applyTheme() {
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'crystal-dark-universal-style';
            styleElement.textContent = getThemeCSS();
            document.head.appendChild(styleElement);
        }
        styleElement.disabled = !isEnabled;
        
        // Обновляем класс на body
        if (isEnabled) {
            document.body.classList.add('crystal-dark-universal-active');
        } else {
            document.body.classList.remove('crystal-dark-universal-active');
        }
        
        // Обновляем цвет кнопки если она уже существует
        const toggleBtn = document.getElementById('crystal-dark-universal-toggle');
        if (toggleBtn) {
            toggleBtn.style.color = isEnabled ? '#8bb9fe' : '#e8e8ed';
            toggleBtn.style.borderColor = isEnabled ? 'rgba(139, 185, 254, 0.6)' : 'rgba(255, 255, 255, 0.2)';
        }
    }
    
    function toggleTheme() {
        isEnabled = !isEnabled;
        GM_setValue(STORAGE_KEY, isEnabled);
        applyTheme();
    }
    
    // --- ДИНАМИЧЕСКОЕ ОТСЛЕЖИВАНИЕ НОВЫХ ЭЛЕМЕНТОВ ---
    function watchForNewContent() {
        if (observer) {
            observer.disconnect();
        }
        
        observer = new MutationObserver(() => {
            // Просто переприменяем стили (они уже есть в head)
            // Это нужно чтобы стили применялись к динамически добавленным элементам
            if (styleElement && !styleElement.disabled) {
                // Небольшой трюк: перезаписываем стили, чтобы браузер пересчитал их
                const currentCSS = styleElement.textContent;
                styleElement.textContent = '';
                setTimeout(() => {
                    styleElement.textContent = currentCSS;
                }, 10);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: false
        });
    }
    
    // --- ИНИЦИАЛИЗАЦИЯ ---
    function init() {
        // Загружаем сохранённое состояние
        const savedState = GM_getValue(STORAGE_KEY);
        isEnabled = savedState !== undefined ? savedState : true;
        
        // Ждём загрузки head и body
        const applyAfterLoad = () => {
            applyTheme();
            
            // Добавляем кнопку
            const button = createToggleButton();
            document.body.appendChild(button);
            
            // Запускаем отслеживание новых элементов
            watchForNewContent();
        };
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', applyAfterLoad);
        } else {
            applyAfterLoad();
        }
    }
    
    // Запускаем как можно раньше
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
