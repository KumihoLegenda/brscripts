// ==UserScript==
// @name         Black Russia Winter
// @namespace    http://tampermonkey.net/
// @version      10.1
// @description  Идеальное стекло: исправлены заголовки разделов, убраны резкие границы, полная гармония.
// @match        *://forum.blackrussia.online/*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent) || window.innerWidth < 768;
    const SNOW_COUNT = isMobile ? 35 : 85;

    const css = `
        :root {
            --glass-dark: rgba(11, 17, 26, 0.95);
            --glass-light: rgba(20, 30, 45, 0.6);
            --border-color: rgba(60, 160, 240, 0.3);
            --accent-blue: #3498db;
            --text-main: #dbe4eb;
            --hover-bg: rgba(52, 152, 219, 0.08);
        }

        /* ===== 1. ФОН И БАЗА ===== */
        html, body {
            background-color: #05080c !important;
            color: var(--text-main) !important;
        }
        body::before {
            content: ''; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: radial-gradient(circle at top, #15202b 0%, #05080c 100%);
            z-index: -5;
        }

        /* Основные контейнеры */
        .p-body,
        .p-body-inner,
        .p-body-content,
        .p-body-main,
        .p-body-sidebar,
        .p-body-sideNavContent {
            background: transparent !important;
        }

        /* ===== 2. БЛОКИ И КОНТЕЙНЕРЫ ===== */

        /* Внешняя обёртка блоков */
        .block,
        .block-outer {
            background: transparent !important;
            border: none !important;
        }

        /* Сам стеклянный блок */
        .block-container {
            background: var(--glass-dark) !important;
            border: 1px solid var(--border-color) !important;
            border-radius: 12px !important;
            box-shadow: 0 5px 25px rgba(0,0,0,0.4) !important;
            overflow: hidden !important;
        }

        /* Заголовок внутри блока */
        .block-header,
        .block-minorHeader {
            background: transparent !important;
            border-bottom: 1px solid rgba(255,255,255,0.05) !important;
            color: #fff !important;
            padding: 15px !important;
            text-shadow: 0 0 10px rgba(52, 152, 219, 0.4);
        }
        .block-header a,
        .block-minorHeader a { color: #fff !important; }

        /* Фильтры под заголовком */
        .block-filterBar {
            background: rgba(0,0,0,0.2) !important;
            border-bottom: none !important;
        }

        /* Тело блока */
        .block-body {
            background: transparent !important;
        }

        /* Подвал блока */
        .block-footer {
            background: rgba(0,0,0,0.15) !important;
            border-top: 1px solid rgba(255,255,255,0.05) !important;
        }

        /* ===== 3. СПИСКИ И СТРОКИ ===== */

        /* Ноды (разделы форума) */
        .node,
        .node-body,
        .node-extra,
        .node-stats,
        .node-meta {
            background: transparent !important;
        }
        .node-body:hover,
        .node:hover > .node-body {
            background: var(--hover-bg) !important;
        }

        /* structItem - темы, посты в списках */
        .structItem,
        .structItem-cell {
            background: transparent !important;
        }
        .structItem {
            border-bottom: 1px solid rgba(255,255,255,0.05) !important;
        }
        .structItem:hover {
            background: var(--hover-bg) !important;
        }

        /* dataList - списки данных */
        .dataList,
        .dataList-row,
        .dataList-cell {
            background: transparent !important;
        }
        .dataList-row {
            border-bottom: 1px solid rgba(255,255,255,0.05) !important;
        }
        .dataList-row:hover {
            background: var(--hover-bg) !important;
        }

        /* ===== 4. ШАПКА И НАВИГАЦИЯ ===== */

        .p-header,
        .p-header-inner,
        .p-header-content {
            background: transparent !important;
        }

        .p-nav {
            background: rgba(10, 14, 20, 0.95) !important;
            border-bottom: 1px solid var(--border-color) !important;
        }
        .p-nav-inner { background: transparent !important; }

        .p-sectionLinks {
            background: rgba(15, 20, 30, 0.8) !important;
            border-bottom: 1px solid rgba(255,255,255,0.05) !important;
        }

        /* Хлебные крошки */
        .p-breadcrumbs,
        .p-breadcrumbs-inner {
            background: transparent !important;
        }

        /* Заголовок страницы */
        .p-title,
        .p-title-value,
        .p-description {
            background: transparent !important;
            color: #fff !important;
        }

        /* ===== 5. СООБЩЕНИЯ И ПОСТЫ ===== */

        .message {
            background: rgba(20, 25, 35, 0.5) !important;
            border: 1px solid rgba(255,255,255,0.05) !important;
            border-radius: 8px !important;
            margin-bottom: 10px !important;
        }
        .message-inner,
        .message-cell,
        .message-content,
        .message-userContent,
        .message-user,
        .message-userDetails,
        .message-attribution {
            background: transparent !important;
        }
        .message-userArrow { display: none !important; }

        /* Быстрый ответ */
        .formButtonGroup,
        .formSubmitRow {
            background: transparent !important;
        }

        /* ===== 6. ФОРМЫ И ПОЛЯ ВВОДА ===== */

        .formRow {
            background: transparent !important;
            border-bottom: 1px solid rgba(255,255,255,0.05) !important;
        }

        input[type="text"],
        input[type="password"],
        input[type="email"],
        input[type="search"],
        input[type="number"],
        input[type="url"],
        textarea,
        select,
        .input {
            background: rgba(15, 20, 30, 0.8) !important;
            border: 1px solid var(--border-color) !important;
            color: var(--text-main) !important;
            border-radius: 6px !important;
        }
        input:focus,
        textarea:focus,
        select:focus {
            border-color: var(--accent-blue) !important;
            box-shadow: 0 0 8px rgba(52, 152, 219, 0.3) !important;
        }

        /* Кнопки */
        .button,
        button,
        input[type="submit"],
        input[type="button"] {
            background: rgba(52, 152, 219, 0.3) !important;
            border: 1px solid var(--border-color) !important;
            color: #fff !important;
            border-radius: 6px !important;
        }
        .button:hover,
        button:hover {
            background: rgba(52, 152, 219, 0.5) !important;
        }
        .button--primary,
        .button.button--primary {
            background: rgba(52, 152, 219, 0.6) !important;
        }

        /* ===== 7. ВЫПАДАЮЩИЕ МЕНЮ И ОВЕРЛЕИ ===== */

        .menu,
        .menu-content {
            background: var(--glass-dark) !important;
            border: 1px solid var(--border-color) !important;
            border-radius: 8px !important;
            box-shadow: 0 5px 20px rgba(0,0,0,0.5) !important;
        }
        .menu-row,
        .menu-linkRow {
            background: transparent !important;
        }
        .menu-row:hover,
        .menu-linkRow:hover {
            background: var(--hover-bg) !important;
        }
        .menu-header,
        .menu-footer {
            background: rgba(0,0,0,0.2) !important;
            border-color: rgba(255,255,255,0.05) !important;
        }

        /* Оверлеи (всплывающие окна) */
        .overlay,
        .overlay-container {
            background: var(--glass-dark) !important;
            border: 1px solid var(--border-color) !important;
            border-radius: 12px !important;
            box-shadow: 0 10px 40px rgba(0,0,0,0.6) !important;
        }
        .overlay-title {
            background: transparent !important;
            border-bottom: 1px solid rgba(255,255,255,0.05) !important;
        }
        .overlay-content {
            background: transparent !important;
        }

        /* Tooltip */
        .tooltip,
        .tooltip-content {
            background: var(--glass-dark) !important;
            border: 1px solid var(--border-color) !important;
            color: var(--text-main) !important;
            border-radius: 6px !important;
        }

        /* ===== 8. ПАГИНАЦИЯ ===== */

        .pageNav,
        .pageNav-main {
            background: transparent !important;
        }
        .pageNav-page,
        .pageNav-jump {
            background: rgba(20, 30, 45, 0.5) !important;
            border: 1px solid rgba(255,255,255,0.1) !important;
            border-radius: 4px !important;
        }
        .pageNav-page:hover,
        .pageNav-jump:hover {
            background: rgba(52, 152, 219, 0.3) !important;
        }
        .pageNav-page.pageNav-page--current {
            background: rgba(52, 152, 219, 0.5) !important;
            border-color: var(--accent-blue) !important;
        }

        /* ===== 9. ПРОФИЛИ И КАРТОЧКИ ===== */

        .memberCard,
        .memberProfileBanner {
            background: var(--glass-dark) !important;
            border: 1px solid var(--border-color) !important;
            border-radius: 12px !important;
        }
        .memberHeader,
        .memberHeader-content,
        .memberHeader-main {
            background: transparent !important;
        }

        /* ===== 10. ЦИТАТЫ И BB-КОД ===== */

        .bbCodeBlock {
            background: rgba(10, 15, 25, 0.6) !important;
            border: 1px solid rgba(255,255,255,0.1) !important;
            border-radius: 8px !important;
        }
        .bbCodeBlock-title {
            background: transparent !important;
            border-bottom: 1px solid rgba(255,255,255,0.05) !important;
        }
        .bbCodeBlock-content {
            background: transparent !important;
        }
        .bbCodeBlock-expandLink {
            background: linear-gradient(to bottom, transparent, rgba(10, 15, 25, 0.9)) !important;
        }

        /* Код */
        .bbCodeCode,
        code,
        pre {
            background: rgba(10, 15, 25, 0.8) !important;
            border: 1px solid rgba(255,255,255,0.1) !important;
            color: #9cdcfe !important;
        }

        /* ===== 11. УВЕДОМЛЕНИЯ ===== */

        .alert,
        .notice {
            background: var(--glass-light) !important;
            border: 1px solid var(--border-color) !important;
            border-radius: 8px !important;
        }
        .alertItem,
        .alert-row {
            background: transparent !important;
            border-bottom: 1px solid rgba(255,255,255,0.05) !important;
        }

        /* ===== 12. РЕДАКТОР ===== */

        .fr-box,
        .fr-wrapper,
        .fr-toolbar,
        .fr-second-toolbar {
            background: rgba(15, 20, 30, 0.9) !important;
            border-color: var(--border-color) !important;
        }
        .fr-view,
        .fr-element {
            background: rgba(15, 20, 30, 0.8) !important;
            color: var(--text-main) !important;
        }

        /* ===== 13. ФУТЕР ===== */

        .p-footer {
            background: transparent !important;
            border: none !important;
        }
        .p-footer-inner {
            background: rgba(8, 12, 18, 0.95) !important;
            border-top: 1px solid var(--border-color) !important;
        }
        .p-footer a { color: #7ab2d6 !important; }

        /* ===== 14. ДОПОЛНИТЕЛЬНЫЕ ИСПРАВЛЕНИЯ ===== */

        /* Вкладки */
        .tabs,
        .tabs-tab {
            background: transparent !important;
        }
        .tabs-tab.is-active {
            background: rgba(52, 152, 219, 0.2) !important;
            border-bottom-color: var(--accent-blue) !important;
        }

        /* Спойлеры */
        .bbCodeSpoiler-button {
            background: rgba(52, 152, 219, 0.3) !important;
            border: 1px solid var(--border-color) !important;
        }
        .bbCodeSpoiler-content {
            background: rgba(10, 15, 25, 0.5) !important;
        }

        /* Реакции */
        .reactionsBar,
        .reactionSummary {
            background: transparent !important;
        }

        /* Боковая панель */
        .p-body-sidebar .block-container {
            background: var(--glass-dark) !important;
        }

        /* Поиск */
        .p-nav-search,
        .p-nav-search input {
            background: rgba(15, 20, 30, 0.8) !important;
        }

        /* ===== 15. ТАЙМЕР И СНЕГ ===== */

        #brTimer {
            position: fixed; bottom: 20px; left: 20px;
            background: rgba(5, 10, 15, 0.9);
            border: 1px solid #3498db;
            color: #fff;
            padding: 8px 15px;
            border-radius: 50px;
            font-family: monospace;
            font-size: 13px;
            z-index: 9999;
            box-shadow: 0 0 15px rgba(52, 152, 219, 0.3);
            pointer-events: none;
        }

        #snowCanvas {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none; z-index: 9000;
        }

        /* ===== 16. МОБИЛЬНАЯ АДАПТАЦИЯ ===== */

        @media (max-width: 768px) {
            #brTimer { bottom: 10px; left: 10px; font-size: 11px; padding: 5px 10px; }
            .p-footer-inner { padding-bottom: 60px; }
            .block-container {
                margin-bottom: 15px !important;
                border-radius: 8px !important;
            }
            .message { border-radius: 6px !important; }
        }
    `;

    GM_addStyle(css);

    // Логика снега
    class SnowSystem {
        constructor() {
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'snowCanvas';
            this.ctx = this.canvas.getContext('2d');
            this.flakes = [];
        }
        init() {
            document.body.appendChild(this.canvas);
            this.resize();
            window.addEventListener('resize', () => this.resize());
            this.createFlakes();
            this.animate();
        }
        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        createFlakes() {
            this.flakes = [];
            for (let i = 0; i < SNOW_COUNT; i++) {
                this.flakes.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    s: Math.random() * 2 + 1,
                    sp: Math.random() * 1 + 0.5,
                    op: Math.random() * 0.5 + 0.3
                });
            }
        }
        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#FFF';
            this.flakes.forEach(f => {
                f.y += f.sp;
                if (f.y > this.canvas.height) {
                    f.y = -5;
                    f.x = Math.random() * this.canvas.width;
                }
                this.ctx.globalAlpha = f.op;
                this.ctx.beginPath();
                this.ctx.arc(f.x, f.y, f.s, 0, Math.PI * 2);
                this.ctx.fill();
            });
            requestAnimationFrame(() => this.animate());
        }
    }

    // Логика таймера
    function startTimer() {
        const t = document.createElement('div');
        t.id = 'brTimer';
        document.body.appendChild(t);

        function update() {
            const now = new Date();
            const nextYear = new Date(now.getFullYear() + 1, 0, 1);
            const diff = nextYear - now;

            if (diff < 0) {
                t.innerHTML = '🎄 ' + (now.getFullYear() + 1) + '!';
                return;
            }

            const d = Math.floor(diff / 86400000);
            const h = Math.floor((diff / 3600000) % 24);
            const m = Math.floor((diff / 60000) % 60);
            t.innerHTML = '❄️ ' + d + 'д ' + h + 'ч ' + m + 'м';
        }

        update();
        setInterval(update, 1000);
    }

    // Инициализация
    function init() {
        new SnowSystem().init();
        startTimer();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
