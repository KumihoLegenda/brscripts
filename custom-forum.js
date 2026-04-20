// ==UserScript==
// @name         Crystal Dark Theme (Universal v3)
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Тёмная тема для ВСЕХ разделов форума (включая /forums/, /threads/, /categories/ и т.д.)
// @author       Request
// @match        https://forum.blackrussia.online/*
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Уникальный идентификатор
    if (window.__CRYSTAL_DARK_FINAL_LOADED) {
        return;
    }
    window.__CRYSTAL_DARK_FINAL_LOADED = true;

    const STORAGE_KEY = 'crystal_dark_final_enabled';
    let isEnabled = true;
    let styleElement = null;
    let buttonCreated = false;

    // === УНИВЕРСАЛЬНЫЕ СТИЛИ ДЛЯ ВСЕХ ТИПОВ СТРАНИЦ ===
    const getThemeCSS = () => `
        /* РАДИКАЛЬНОЕ РЕШЕНИЕ - перекрываем ВСЁ */
        * {
            transition: background-color 0.1s ease, border-color 0.1s ease !important;
        }
        
        /* Базовый фон для ВСЕХ страниц */
        html, 
        body,
        body > div,
        .p-pageWrapper,
        .p-body,
        .p-body-wrapper,
        .p-body-main,
        .p-body-content,
        .p-content,
        .pageContent,
        .pageContent-wrapper,
        [class*="page"],
        [class*="content"],
        [class*="wrapper"],
        [role="main"],
        main,
        .blockContainer,
        .block-container {
            background-color: #0a0a0c !important;
            background: #0a0a0c !important;
        }
        
        /* ===== БЛОКИ И КОНТЕЙНЕРЫ (для всех страниц) ===== */
        .block,
        .block-container,
        .block-body,
        .block-row,
        .block-header,
        .block-footer,
        .block-filterBar,
        .block--category,
        .block--category .block-container,
        .structItem,
        .structItem-container,
        .structItem-cell,
        .node,
        .node-body,
        .node-main,
        .node-info,
        .node-stats,
        .node-extra,
        .node-icon,
        .node-title,
        .node-description,
        .node-meta,
        .categoryList,
        .categoryListItem,
        .forumList,
        .forumListItem,
        .discussionList,
        .discussionListItem,
        .threadList,
        .threadListItem,
        .message,
        .message-inner,
        .message-cell,
        .message-content,
        .message-body,
        .message-user,
        .message-attribution,
        .message-signature,
        .message-name,
        .message-userTitle,
        .message-userExtras,
        .message-staffPost,
        .message-newIndicator,
        .message-notices,
        .message-notice,
        .message-lastEdit,
        .bbWrapper,
        .bbCodeBlock,
        .bbCodeBlock-title,
        .bbCodeBlock-content,
        .bbCodeQuote,
        .bbCodeSpoiler,
        .bbCodeSpoiler-button,
        .bbCodeSpoiler-content,
        .p-nav,
        .p-nav-inner,
        .p-nav-list,
        .p-navEl,
        .p-navgroup,
        .p-navgroup-link,
        .p-sectionLinks,
        .p-sectionLinks-inner,
        .p-breadcrumbs,
        .p-breadcrumbs-inner,
        .p-footer,
        .p-footer-inner,
        .footer-row,
        .footer-legal,
        .footer-copyright,
        .p-title,
        .p-title-value,
        .p-description,
        .sidebar,
        .sidebar-block,
        .block--sidebar,
        .menu,
        .menu-content,
        .menu-row,
        .menu-header,
        .menu-footer,
        .dialog,
        .dialog-content,
        .overlay,
        .overlay-container,
        .quickReply,
        .quickReply-content,
        .fr-box,
        .fr-toolbar,
        .fr-wrapper,
        .fr-element,
        .fr-view,
        .formRow,
        .formRow-title,
        .formRow-field,
        .input,
        .input-group,
        .button,
        .button--primary,
        .button--cta,
        .button--link,
        .actionBar,
        .actionBar-set,
        .actionBar-action,
        .reactionsBar,
        .reaction,
        .reaction-text,
        .tabs,
        .tabs-tab,
        .tabPanes,
        .tabPane,
        .filterBar,
        .filterBar-filter,
        .pageNav,
        .pageNav-page,
        .pageNav-jump,
        .pairs,
        .pairs--plain,
        .pairs--inline,
        .contentRow,
        .contentRow-main,
        .contentRow-figure,
        .contentRow-title,
        .contentRow-lesser,
        .contentRow-mute,
        .attachmentList,
        .attachment,
        .attachment-thumb,
        .attachment-name,
        .pollBlock,
        .pollBlock-row,
        .pollBlock-question,
        .tagList,
        .tag,
        .ratingStars,
        .alert,
        .notice,
        .notices,
        .staffBar,
        .offCanvasMenu,
        .offCanvasMenu-content,
        .tooltip,
        .tooltip-content,
        .selectMenu,
        .selectMenu-row,
        .buttonGroup,
        .buttonGroup-button,
        .sharePage,
        .sharePage-link {
            background: transparent !important;
            background-color: transparent !important;
        }
        
        /* ===== ПОЛУПРОЗРАЧНЫЕ БЛОКИ С РАЗМЫТИЕМ ===== */
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
        .staffBar,
        .pollBlock,
        .tag,
        .contentRow,
        .block-header {
            background: rgba(18, 18, 24, 0.85) !important;
            backdrop-filter: blur(4px) !important;
        }
        
        /* ===== КРИСТАЛЬНЫЕ ОБВОДКИ ===== */
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
        .tag,
        .contentRow,
        .pollBlock {
            border: 1px solid rgba(255, 255, 255, 0.12) !important;
            border-radius: 14px !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03) !important;
        }
        
        /* Убираем лишние двойные границы */
        .message-inner,
        .structItem-container,
        .node-body,
        .p-nav-inner,
        .p-sectionLinks-inner,
        .block-body,
        .block-row,
        .block-footer,
        .p-breadcrumbs-inner,
        .p-footer-inner {
            border: none !important;
            box-shadow: none !important;
            background: transparent !important;
        }
        
        /* ===== ЦВЕТА ТЕКСТА ===== */
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
        .selectMenu-row,
        .node-description,
        .node-stats,
        .node-extra,
        .structItem-startDate,
        .structItem-status,
        .categoryListItem-title {
            color: #e8e8ed !important;
        }
        
        /* ===== ССЫЛКИ ===== */
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
        .message-name a,
        .node-title a,
        .structItem-title a,
        .categoryListItem-title a {
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
        
        /* ===== ЗАГОЛОВКИ ===== */
        .p-title-value,
        .block-header,
        .message-name,
        .structItem-title,
        .node-title,
        .p-navEl.is-selected a,
        .categoryListItem-title {
            font-weight: 600 !important;
            color: #ffffff !important;
        }
        
        /* ===== ВТОРОСТЕПЕННЫЙ ТЕКСТ ===== */
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
        .pollBlock-row .pollBlock-result,
        .node-description {
            color: #9a9aa8 !important;
        }
        
        /* ===== ПОЛЯ ВВОДА ===== */
        .input,
        .fr-element.fr-view,
        .fr-box.fr-basic .fr-element,
        .selectMenu-row input,
        textarea,
        input[type="text"],
        input[type="password"],
        input[type="email"],
        input[type="search"],
        input[type="number"],
        select {
            background: rgba(30, 30, 38, 0.95) !important;
            border: 1px solid rgba(255, 255, 255, 0.15) !important;
            color: #e8e8ed !important;
            border-radius: 10px !important;
        }
        
        .input:focus,
        .fr-element.fr-view:focus,
        textarea:focus,
        input:focus,
        select:focus {
            border-color: #8bb9fe !important;
            box-shadow: 0 0 0 3px rgba(139, 185, 254, 0.2) !important;
            outline: none !important;
        }
        
        /* ===== КНОПКИ ===== */
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
        
        /* ===== ВЫДЕЛЕННЫЕ СООБЩЕНИЯ ===== */
        .message--highlighted .message-cell {
            background: rgba(139, 185, 254, 0.08) !important;
        }
        
        /* ===== НАВИГАЦИЯ ===== */
        .p-nav-list .p-navEl a {
            color: #e8e8ed !important;
        }
        
        .p-nav-list .p-navEl.is-selected a {
            color: #8bb9fe !important;
            border-bottom: 2px solid #8bb9fe !important;
        }
        
        /* ===== ВЫПАДАЮЩИЕ МЕНЮ ===== */
        .menu-content .menu-row:hover {
            background: rgba(60, 60, 72, 0.6) !important;
        }
        
        /* ===== ПОЛОСЫ ПРОКРУТКИ ===== */
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
        
        /* ===== ЦИТАТЫ И СПОЙЛЕРЫ ===== */
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
        }
        
        /* ===== РЕАКЦИИ ===== */
        .reactionsBar {
            background: rgba(25, 25, 32, 0.75) !important;
            border-radius: 20px !important;
        }
        
        /* ===== ТАБЛИЦЫ ===== */
        .bbTable table,
        .table,
        .table-responsive table {
            background: rgba(20, 20, 28, 0.7) !important;
        }
        
        .bbTable th,
        .bbTable td,
        .table th,
        .table td {
            border-color: rgba(255, 255, 255, 0.08) !important;
            color: #e8e8ed !important;
        }
        
        /* ===== ОШИБКИ И УВЕДОМЛЕНИЯ ===== */
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
        
        /* ===== КНОПКА ПЕРЕКЛЮЧЕНИЯ ===== */
        .crystal-dark-toggle-btn {
            position: fixed !important;
            bottom: 20px !important;
            left: 20px !important;
            width: 52px !important;
            height: 52px !important;
            border-radius: 50% !important;
            background: rgba(30, 30, 38, 0.95) !important;
            backdrop-filter: blur(12px) !important;
            border: 1px solid rgba(139, 185, 254, 0.6) !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4) !important;
            color: #8bb9fe !important;
            font-size: 26px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            z-index: 2147483647 !important;
            transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1) !important;
            font-family: system-ui, -apple-system, sans-serif !important;
        }
        
        .crystal-dark-toggle-btn:hover {
            transform: scale(1.08) !important;
            background: rgba(50, 50, 62, 0.98) !important;
            border-color: rgba(139, 185, 254, 0.8) !important;
        }
        
        .crystal-dark-toggle-btn.disabled {
            border-color: rgba(255, 255, 255, 0.2) !important;
            color: #e8e8ed !important;
        }
        
        .crystal-dark-toggle-btn.disabled:hover {
            border-color: rgba(255, 255, 255, 0.4) !important;
        }
    `;
    
    // === СОЗДАНИЕ КНОПКИ ===
    function createToggleButton() {
        if (document.getElementById('crystal-dark-toggle-btn')) return;
        
        const button = document.createElement('div');
        button.id = 'crystal-dark-toggle-btn';
        button.className = 'crystal-dark-toggle-btn' + (isEnabled ? '' : ' disabled');
        button.innerHTML = '🎨';
        button.setAttribute('aria-label', 'Toggle Crystal Dark Theme');
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleTheme();
        });
        
        document.body.appendChild(button);
        buttonCreated = true;
    }
    
    // === УПРАВЛЕНИЕ ТЕМОЙ ===
    function applyTheme() {
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'crystal-dark-universal-style';
            styleElement.textContent = getThemeCSS();
            document.head.appendChild(styleElement);
        }
        styleElement.disabled = !isEnabled;
        
        const button = document.getElementById('crystal-dark-toggle-btn');
        if (button) {
            if (isEnabled) {
                button.classList.remove('disabled');
            } else {
                button.classList.add('disabled');
            }
        }
        
        // Сохраняем класс на body
        if (isEnabled) {
            document.body.classList.add('crystal-dark-active');
        } else {
            document.body.classList.remove('crystal-dark-active');
        }
    }
    
    function toggleTheme() {
        isEnabled = !isEnabled;
        GM_setValue(STORAGE_KEY, isEnabled);
        applyTheme();
    }
    
    // === ПРИНУДИТЕЛЬНОЕ ПРИМЕНЕНИЕ СТИЛЕЙ ===
    function forceApplyStyles() {
        if (!styleElement || styleElement.disabled) return;
        
        // Перезаписываем стили, чтобы они точно применились
        const currentCSS = styleElement.textContent;
        styleElement.textContent = '';
        setTimeout(() => {
            styleElement.textContent = currentCSS;
        }, 5);
    }
    
    // === ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ ===
    function init() {
        // Загружаем сохранённое состояние
        const savedState = GM_getValue(STORAGE_KEY);
        isEnabled = savedState !== undefined ? savedState : true;
        
        // Применяем стили
        applyTheme();
        
        // Создаём кнопку
        createToggleButton();
        
        // Наблюдаем за изменениями в DOM
        const observer = new MutationObserver(() => {
            if (!buttonCreated) {
                createToggleButton();
            }
            forceApplyStyles();
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: false
        });
    }
    
    // Запускаем
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
