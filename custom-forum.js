// ==UserScript==
// @name         Crystal Dark Theme Toggle
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Включает/выключает тёмную тему с прозрачными обводками на всём форуме
// @author       Based on request
// @match        https://forum.blackrussia.online/*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';

    // --- Предотвращение конфликтов с другими скриптами ---
    if (window.__crystalDarkThemeLoaded) {
        return;
    }
    window.__crystalDarkThemeLoaded = true;

    const STORAGE_KEY = 'crystalDarkThemeEnabled';
    let isEnabled = false;

    // --- Стили тёмной темы (кристально-прозрачные обводки) ---
    const darkThemeCSS = `
        /* Глобальный фон и основной контент */
        body,
        .p-body,
        .p-body-inner,
        .p-body-main,
        .p-body-content,
        .block-container,
        .block,
        .block-body,
        .block-row,
        .block-footer,
        .block-header,
        .block-filterBar,
        .message,
        .message-inner,
        .message-cell,
        .message-user,
        .message-content,
        .message-attribution,
        .message-body,
        .bbWrapper,
        .bbCodeBlock,
        .bbCodeBlock-title,
        .bbCodeBlock-content,
        .bbTable,
        .table,
        .table-responsive,
        .contentRow,
        .contentRow-main,
        .contentRow-figure,
        .contentRow-lesser,
        .contentRow-mute,
        .structItem,
        .structItem-container,
        .structItem-cell,
        .structItem-title,
        .structItem-startDate,
        .structItem-status,
        .structItem-pageJump,
        .node,
        .node-body,
        .node-title,
        .node-description,
        .node-stats,
        .node-extra,
        .node-meta,
        .node-icon,
        .node-main,
        .node-info,
        .p-nav,
        .p-nav-inner,
        .p-nav-list,
        .p-navgroup,
        .p-navgroup-link,
        .p-sectionLinks,
        .p-sectionLinks-inner,
        .p-breadcrumbs,
        .p-breadcrumbs li,
        .p-breadcrumbs a,
        .p-footer,
        .p-footer-inner,
        .footer-row,
        .footer-legal,
        .footer-copyright,
        .offCanvasMenu,
        .offCanvasMenu-content,
        .menu,
        .menu-content,
        .menu-row,
        .menu-header,
        .menu-footer,
        .tooltip,
        .tooltip-content,
        .overlay,
        .overlay-container,
        .dialog,
        .dialog-content,
        .formRow,
        .formRow-title,
        .formRow-field,
        .formRow-controls,
        .input,
        .input-group,
        .button,
        .button--link,
        .button--cta,
        .button--primary,
        .button--icon,
        .button--icon--reply,
        .button--icon--write,
        .button--icon--share,
        .button--icon--bookmark,
        .button--icon--report,
        .button--icon--edit,
        .button--icon--delete,
        .button--icon--ip,
        .button--icon--warning,
        .button--icon--spam,
        .button--icon--lock,
        .button--icon--unlock,
        .button--icon--sticky,
        .button--icon--unsticky,
        .button--icon--move,
        .button--icon--merge,
        .button--icon--approve,
        .button--icon--unapprove,
        .quickReply,
        .quickReply-content,
        .fr-box,
        .fr-toolbar,
        .fr-wrapper,
        .fr-element,
        .fr-view,
        .p-title,
        .p-title-value,
        .p-description,
        .pairs,
        .pairs--plain,
        .pairs--inline,
        .pairs--justified,
        .reactionsBar,
        .reaction,
        .reaction-text,
        .actionBar,
        .actionBar-set,
        .actionBar-action,
        .pageNav,
        .pageNav-jump,
        .pageNav-page,
        .filterBar,
        .filterBar-filter,
        .selectMenu,
        .selectMenu-row,
        .tabs,
        .tabs-tab,
        .tabPanes,
        .tabPane,
        .sidebar,
        .block--category,
        .block--category .block-container,
        .block--category .block-header,
        .block--category .block-body,
        .p-footer-default,
        .pairs--plain dt,
        .pairs--plain dd,
        .message-name,
        .message-userTitle,
        .message-userExtras,
        .message-userExtra,
        .message-staffPost,
        .message-signature,
        .message-lastEdit,
        .message-lastEdit,
        .message-newIndicator,
        .message-notices,
        .message-notice,
        .bbCodeQuote,
        .bbCodeQuote .attribution,
        .bbCodeQuote .quote-container,
        .bbCodeSpoiler,
        .bbCodeSpoiler-button,
        .bbCodeSpoiler-content,
        .bbImage,
        .bbMediaWrapper,
        .bbMediaJustifier,
        .attachmentList,
        .attachment,
        .attachment-thumb,
        .attachment-name,
        .attachment-icon {
            background: transparent !important;
            background-color: transparent !important;
        }

        /* Основные цвета текста и фона */
        html,
        body,
        .p-body-wrapper,
        .p-body-main,
        .p-body-content {
            background: #0a0a0c !important;
        }

        /* Затемняем основные блоки с лёгким фоном */
        .block-container,
        .message,
        .message-inner,
        .message-cell.message-cell--main,
        .structItem,
        .node,
        .p-nav,
        .p-sectionLinks,
        .menu-content,
        .dialog-content,
        .quickReply-content,
        .fr-toolbar,
        .fr-wrapper {
            background: rgba(18, 18, 22, 0.85) !important;
            backdrop-filter: blur(2px) !important;
        }

        /* Кристальные обводки */
        .block-container,
        .message,
        .structItem,
        .node,
        .p-nav,
        .p-sectionLinks,
        .menu-content,
        .dialog-content,
        .quickReply-content,
        .fr-toolbar,
        .fr-wrapper,
        .button,
        .input,
        .filterBar,
        .tabs-tab,
        .pageNav-page,
        .actionBar-action,
        .reactionsBar {
            border: 1px solid rgba(255, 255, 255, 0.12) !important;
            border-radius: 12px !important;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
        }

        /* Убираем лишние двойные границы */
        .message-inner,
        .structItem-container,
        .node-body,
        .p-nav-inner,
        .p-sectionLinks-inner {
            border: none !important;
            box-shadow: none !important;
            background: transparent !important;
        }

        /* Цвета текста и ссылок */
        body,
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
        .footer-legal,
        .footer-copyright {
            color: #e8e8ed !important;
        }

        /* Ссылки */
        a,
        .structItem-title a,
        .node-title a,
        .contentRow-title a,
        .p-navgroup-link,
        .p-breadcrumbs a,
        .button--link {
            color: #8bb9fe !important;
            transition: color 0.2s ease;
        }

        a:hover,
        .structItem-title a:hover,
        .node-title a:hover,
        .contentRow-title a:hover,
        .p-navgroup-link:hover,
        .p-breadcrumbs a:hover {
            color: #c0dbff !important;
            text-shadow: 0 0 8px rgba(139, 185, 254, 0.3);
        }

        /* Заголовки и важные элементы */
        .p-title-value,
        .block-header,
        .message-name,
        .structItem-title,
        .node-title {
            font-weight: 600 !important;
            color: #ffffff !important;
        }

        /* Вторичный текст */
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
        .contentRow-mute {
            color: #9a9aa8 !important;
        }

        /* Поля ввода */
        .input,
        .fr-element.fr-view,
        .fr-box.fr-basic .fr-element {
            background: rgba(30, 30, 35, 0.9) !important;
            border: 1px solid rgba(255, 255, 255, 0.15) !important;
            color: #e8e8ed !important;
        }

        .input:focus,
        .fr-element.fr-view:focus {
            border-color: #8bb9fe !important;
            box-shadow: 0 0 0 2px rgba(139, 185, 254, 0.2) !important;
            outline: none;
        }

        /* Кнопки */
        .button,
        .button--primary,
        .button--cta,
        .button--icon--reply,
        .button--icon--write,
        .actionBar-action,
        .pageNav-page {
            background: rgba(40, 40, 48, 0.9) !important;
            border: 1px solid rgba(255, 255, 255, 0.12) !important;
            transition: all 0.2s ease;
        }

        .button:hover,
        .button--primary:hover,
        .button--cta:hover,
        .actionBar-action:hover,
        .pageNav-page:hover {
            background: rgba(60, 60, 72, 0.9) !important;
            border-color: rgba(139, 185, 254, 0.5) !important;
            transform: translateY(-1px);
        }

        /* Реакции и лайки */
        .reactionsBar {
            background: rgba(25, 25, 30, 0.7) !important;
        }

        .reaction {
            filter: brightness(0.9);
        }

        /* Цитаты и спойлеры */
        .bbCodeQuote,
        .bbCodeSpoiler {
            background: rgba(25, 25, 32, 0.7) !important;
            border-left: 3px solid #8bb9fe !important;
            border-radius: 8px !important;
        }

        .bbCodeQuote .attribution,
        .bbCodeSpoiler-button {
            background: rgba(35, 35, 42, 0.8) !important;
            color: #c0dbff !important;
        }

        /* Полосы прокрутки (для современных браузеров) */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        ::-webkit-scrollbar-track {
            background: rgba(20, 20, 25, 0.6);
            border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
            background: rgba(139, 185, 254, 0.4);
            border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: rgba(139, 185, 254, 0.6);
        }

        /* Специфические элементы XenForo */
        .p-nav-list .p-navEl a,
        .p-navgroup .p-navgroup-link {
            color: #e8e8ed !important;
        }

        .p-nav-list .p-navEl.is-selected a {
            color: #8bb9fe !important;
            border-bottom-color: #8bb9fe !important;
        }

        /* Сообщения автора темы */
        .message--highlighted .message-cell {
            background: rgba(139, 185, 254, 0.08) !important;
        }

        /* Уведомления */
        .alert,
        .notices,
        .notice {
            background: rgba(30, 30, 38, 0.95) !important;
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            border-radius: 12px !important;
        }
    `;

    // --- Создание кнопки-переключателя ---
    function createToggleButton() {
        const button = document.createElement('div');
        button.id = 'crystal-dark-toggle';
        button.innerHTML = '🎨';
        button.setAttribute('aria-label', 'Toggle Crystal Dark Theme');
        button.title = isEnabled ? 'Выключить тёмную тему' : 'Включить тёмную тему';
        
        // Стили кнопки
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: rgba(30, 30, 35, 0.9);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
            color: ${isEnabled ? '#8bb9fe' : '#e8e8ed'};
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 2147483647;
            transition: all 0.3s ease;
            font-family: system-ui, -apple-system, sans-serif;
        `;
        
        // Эффекты при наведении
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
            button.style.background = 'rgba(50, 50, 60, 0.95)';
            button.style.borderColor = 'rgba(139, 185, 254, 0.5)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.background = 'rgba(30, 30, 35, 0.9)';
            button.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });
        
        // Обработчик клика
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleTheme();
        });
        
        return button;
    }
    
    // --- Включение/выключение темы ---
    let styleElement = null;
    
    function applyTheme() {
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'crystal-dark-theme-style';
            styleElement.textContent = darkThemeCSS;
            document.head.appendChild(styleElement);
        }
        styleElement.disabled = !isEnabled;
        
        // Обновляем цвет кнопки
        const toggleBtn = document.getElementById('crystal-dark-toggle');
        if (toggleBtn) {
            toggleBtn.style.color = isEnabled ? '#8bb9fe' : '#e8e8ed';
            toggleBtn.title = isEnabled ? 'Выключить тёмную тему' : 'Включить тёмную тему';
        }
        
        // Добавляем класс к body для дополнительных стилей (если нужно)
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
    
    // --- Инициализация ---
    function init() {
        // Загружаем сохранённое состояние
        const savedState = GM_getValue(STORAGE_KEY);
        isEnabled = savedState !== undefined ? savedState : true; // По умолчанию включено
        
        // Применяем тему
        applyTheme();
        
        // Добавляем кнопку на страницу
        const button = createToggleButton();
        document.body.appendChild(button);
    }
    
    // Запускаем скрипт после полной загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
