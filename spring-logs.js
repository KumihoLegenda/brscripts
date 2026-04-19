(function() {
    'use strict';

    const CONFIG = {
        storageKey: 'blacklog_spring_v1', // новый ключ для хранения состояния
        flowerCount: 70,
        flowersEnabled: true, // по умолчанию включены
    };

    const springStyles = `
        /* ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ */
        :root {
            --bs-body-bg: #1a2e1a !important;
            --bs-body-color: #d4e6c3 !important;
            --bs-card-bg: #2d4a2d !important;
            --bs-border-color: #5a7a3e !important;
        }

        /* ОСНОВНОЙ ФОН */
        body, html, .main-content {
            background-color: var(--bs-body-bg) !important;
            color: var(--bs-body-color) !important;
        }

        /* НАВИГАЦИЯ */
        #site-navbar {
            background-color: #0f2b0f !important;
            border-bottom: 1px solid #3a5a2a !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .navbar-brand { color: #d4e600 !important; text-shadow: 0 0 10px rgba(212, 230, 0, 0.5); }

        /* ЗАГРУЗОЧНЫЙ ЭКРАН */
        #loading-overlay, #loading-overlay[data-v-173ec149] {
            background-color: #1a2e1a !important;
            opacity: 1 !important;
        }
        #loading-overlay-heading, .loading-text {
            color: #d4e600 !important;
            text-shadow: 0 10px rgba(212, 230, 0, 0.5);
        }
        #loading-overlay .spinner, .spinner-border {
            border-color: #d4e600 !important;
            border-right-color: transparent !important;
        }

        /* ТАБЛИЦА ЛОГОВ */
        #log-table { color: #e2e8f0 !important; }
        #log-table thead { background: #2d4a2d !important; color: #fff !important; }
        #log-table th { border-bottom: 2px solid #d4e600 !important; }
        #log-table .first-row { background-color: #1a2e1a !important; border-color: #5a7a3e !important; }
        #log-table .second-row { background-color: #1f3a1f !important; border-color: #5a7a3e !important; }
        #log-table td { border-color: #5a7a3e !important; }

        /* Описание транзакции и ссылки */
        .td-transaction-desc { color: #b0c4a0 !important; font-style: italic; }
        a, .td-player-name a, .td-category a {
            color: #d4e600 !important;
            text-decoration: none !important;
            transition: text-shadow 0.3s;
        }
        a:hover { text-shadow: 0 0 8px #d4e600; color: #fff !important; }
        .td-index { background-color: #5a7a3e !important; color: #fff !important; }

        /* САЙДБАР (Фильтры) */
        #log-filter-section {
            background: #2d4a2d !important;
            border-left: 1px solid #5a7a3e !important;
        }
        #log-filter-heading { color: #fff !important; }
        .form-label { color: #b0c4a0 !important; }

        /* ОБЫЧНЫЕ ИНПУТЫ */
        input, select, textarea, .form-control, .form-select, .dp__input {
            background-color: #0f2b0f !important;
            border: 1px solid #6a8a4a !important;
            color: #fff !important;
        }
        input::placeholder { color: #8aa86a !important; }

        /* ФИКС ДЛЯ MULTISELECT */
        .multiselect {
            background: #0f2b0f !important;
            border: 1px solid #6a8a4a !important;
            color: #fff !important;
        }
        .multiselect-dropdown {
            background: #2d4a2d !important;
            border: 1px solid #5a7a3e !important;
            color: #fff !important;
        }
        .multiselect-option {
            background: transparent !important;
            color: #d4e6c3 !important;
        }
        .multiselect-option.is-pointed {
            background: #5a7a3e !important;
            color: #fff !important;
        }
        .multiselect-option.is-selected {
            background: #d4e600 !important;
            color: #000 !important;
        }
        .multiselect-single-label {
            color: #fff !important;
            background: transparent !important;
        }
        .multiselect-tag {
            background: #5a7a3e !important;
            color: #fff !important;
        }

        /* АВТОКОМПЛИТ */
        .autoComplete_wrapper > ul {
            background-color: #2d4a2d !important;
            border: 1px solid #5a7a3e !important;
            color: #fff !important;
        }
        .autoComplete_wrapper > ul > li {
            background-color: #2d4a2d !important;
            color: #d4e6c3 !important;
        }
        .autoComplete_wrapper > ul > li:hover {
            background-color: #5a7a3e !important;
            color: #fff !important;
        }
        .autoComplete_wrapper > ul > li mark {
            color: #d4e600 !important;
        }

        /* МОДАЛЬНЫЕ ОКНА */
        .modal-content {
            background-color: #2d4a2d !important;
            border: 1px solid #6a8a4a !important;
            box-shadow: 0 10px 40px rgba(0,0,0,0.7) !important;
        }
        .modal-header, .modal-footer { border-color: #5a7a3e !important; }
        .btn-close { filter: invert(1) grayscale(100%) brightness(200%); }
        
        .btn-primary, .submit-btn {
            background-color: #d4e600 !important;
            border-color: #d4e600 !important;
            color: #000 !important;
            font-weight: bold;
        }
        .btn-primary:hover, .submit-btn:hover {
            background-color: #c4d600 !important;
            box-shadow: 0 0 15px rgba(212, 230, 0, 0.4);
        }

        /* Холст для падающих цветов */
        #spring-flowers-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        }

        /* КНОПКА В МЕНЮ */
        #spring-toggle-btn {
            cursor: pointer;
            display: flex;
            align-items: center;
            font-weight: bold;
            color: #94a3b8;
            text-decoration: none;
            margin-left: auto; 
            margin-right: 15px;
            padding: 5px 10px;
            border: 1px solid transparent;
            border-radius: 5px;
            transition: all 0.3s ease;
            font-size: 1.2rem;
        }
        #spring-toggle-btn:hover {
            background: rgba(255,255,0.1);
            color: #fff;
        }
        #spring-toggle-btn.spring-mode-active {
            color: #d4e600 !important;
            text-shadow: 0 0 8px rgba(212, 230, 0, 0.6);
            border-color: rgba(212, 230, 0, 0.3);
        }
        @media (min-width: 992px) {
            #spring-toggle-btn {
                margin-left: 20px;
                margin-right: 0;
                order: 5;
            }
        }
    `;

    const styleElement = document.createElement('style');
    styleElement.id = 'spring-theme-styles';
    styleElement.innerText = springStyles;

    // Символы цветов для падения
    const FLOWER_SYMBOLS = ['🌷', '🌸', '🌼', '🌹', '💮', '💐', '🌺', '🏵'];

    let flowerCanvas, ctx, animationFrame;
    let flowers = [];

    function initFlowers() {
        flowerCanvas = document.createElement('canvas');
        flowerCanvas.id = 'spring-flowers-canvas';
        document.body.appendChild(flowerCanvas);
        ctx = flowerCanvas.getContext('2d');
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        flowers = [];
        for (let i = 0; i < CONFIG.flowerCount; i++) flowers.push(createFlower());
        animateFlowers();
    }

    function resizeCanvas() {
        if (flowerCanvas) {
            flowerCanvas.width = window.innerWidth;
            flowerCanvas.height = window.innerHeight;
        }
    }

    function createFlower() {
        return {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 20 + 12,
            speed: Math.random() * 1 + 0.5,
            wind: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.5 + 0.5,
            symbol: FLOWER_SYMBOLS[Math.floor(Math.random() * FLOWER_SYMBOLS.length)]
        };
    }

    function animateFlowers() {
        if (!ctx || !flowerCanvas) return;
        ctx.clearRect(0, 0, flowerCanvas.width, flowerCanvas.height);
        flowers.forEach(flower => {
            ctx.font = `${flower.size}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = "rgba(0,0,0,0.3)";
            ctx.fillStyle = `rgba(255, 255, 200, ${flower.opacity})`;
            ctx.fillText(flower.symbol, flower.x, flower.y);
            
            flower.y += flower.speed;
            flower.x += flower.wind;
            
            if (flower.y > window.innerHeight) {
                flower.y = -30;
                flower.x = Math.random() * window.innerWidth;
                flower.symbol = FLOWER_SYMBOLS[Math.floor(Math.random() * FLOWER_SYMBOLS.length)];
            }
            if (flower.x > window.innerWidth) flower.x = 0;
            if (flower.x < 0) flower.x = window.innerWidth;
        });
        animationFrame = requestAnimationFrame(animateFlowers);
    }

    function destroyFlowers() {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
        if (flowerCanvas) {
            flowerCanvas.remove();
            flowerCanvas = null;
            ctx = null;
        }
        window.removeEventListener('resize', resizeCanvas);
    }

    function enableFlowers() {
        // Всегда применяем стили при включении
        if (!document.getElementById('spring-theme-styles')) {
            document.head.appendChild(styleElement);
        }
        if (!flowerCanvas) {
            initFlowers();
        }
        updateBtnState(true);
        CONFIG.flowersEnabled = true;
        localStorage.setItem(CONFIG.storageKey, 'true');
    }

    function disableFlowers() {
        destroyFlowers();
        updateBtnState(false);
        CONFIG.flowersEnabled = false;
        localStorage.setItem(CONFIG.storageKey, 'false');
    }

    function toggleFlowers() {
        if (flowerCanvas && animationFrame) {
            disableFlowers();
        } else {
            enableFlowers();
        }
    }

    function updateBtnState(isActive) {
        const btn = document.getElementById('spring-toggle-btn');
        if (btn) {
            if (isActive) {
                btn.classList.add('spring-mode-active');
            } else {
                btn.classList.remove('spring-mode-active');
            }
        }
    }

    function injectUI() {
        const navContainer = document.querySelector('#site-navbar .container-fluid');
        if (!navContainer) { setTimeout(injectUI, 500); return; }
        if (document.getElementById('spring-toggle-btn')) return;

        // ВСЕГДА применяем стили темы при загрузке страницы
        if (!document.getElementById('spring-theme-styles')) {
            document.head.appendChild(styleElement);
        }

        const btn = document.createElement('a');
        btn.id = 'spring-toggle-btn';
        btn.href = '#';
        btn.innerHTML = '🌷';
        btn.addEventListener('click', (e) => { e.preventDefault(); toggleFlowers(); });

        const toggler = navContainer.querySelector('.navbar-toggler');
        const collapse = navContainer.querySelector('.navbar-collapse');

        if (toggler && getComputedStyle(toggler).display !== 'none') {
            navContainer.insertBefore(btn, toggler);
        } else if (collapse) {
            navContainer.insertBefore(btn, collapse);
        } else {
            navContainer.appendChild(btn);
        }

        // Проверяем сохраненное состояние
        const savedState = localStorage.getItem(CONFIG.storageKey);
        
        if (savedState === 'false') {
            // Цветы должны быть выключены
            CONFIG.flowersEnabled = false;
            updateBtnState(false);
            // Убеждаемся, что цветы не запущены (стили уже применены выше)
            destroyFlowers();
        } else {
            // Цветы включены (первый запуск или было true)
            enableFlowers();
        }
    }

    // Запускаем скрипт немедленно, как только страница готова
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectUI);
    } else {
        injectUI();
    }
})();
