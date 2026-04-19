(function() {
    'use strict';

    const CONFIG = {
        storageKey: 'spring_flowers_v3',
        flowerCount: 50,
    };

    const springStyles = `
        /* ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ - ВЕСЕННЯЯ ТЕМА С ЖЕЛТЫМ ТЕКСТОМ */
        :root {
            --bs-body-bg: #1a3a1a !important;
            --bs-body-color: #fff3b0 !important;
            --bs-card-bg: #1e4a1e !important;
            --bs-border-color: #8bc34a !important;
        }

        /* ОСНОВНОЙ ФОН И ТЕКСТ */
        body, html, .main-content, #app, .container, .container-fluid {
            background-color: #1a3a1a !important;
            color: #ffeb99 !important;
        }

        /* ЖЕЛТЫЕ ОТТЕНКИ ДЛЯ ТЕКСТА */
        body, p, span, div, li, td, th, label, .text-muted, small, .small {
            color: #ffeb99 !important;
        }

        /* БОЛЕЕ НАСЫЩЕННЫЙ ЖЕЛТЫЙ ДЛЯ ВАЖНЫХ ЭЛЕМЕНТОВ */
        h1, h2, h3, h4, h5, h6, .heading, .title, .header {
            color: #ffe066 !important;
        }

        /* НАВИГАЦИЯ */
        #site-navbar, .navbar, nav {
            background-color: #0d2b0d !important;
            border-bottom: 2px solid #9ccc65 !important;
        }
        .navbar-brand, .nav-link { 
            color: #ffe066 !important; 
        }
        .nav-link:hover {
            color: #fff3b0 !important;
        }

        /* ЗАГРУЗОЧНЫЙ ЭКРАН */
        #loading-overlay, #loading-overlay[data-v-173ec149] {
            background-color: #1a3a1a !important;
        }
        #loading-overlay-heading, .loading-text {
            color: #ffe066 !important;
        }
        #loading-overlay .spinner, .spinner-border {
            border-color: #9ccc65 !important;
            border-right-color: transparent !important;
        }

        /* ТАБЛИЦА ЛОГОВ */
        table, .table {
            background-color: #1e4a1e !important;
        }
        #log-table { 
            color: #ffeb99 !important; 
            background-color: #1a3a1a !important;
        }
        #log-table thead { 
            background: #0d2b0d !important; 
            color: #ffe066 !important; 
        }
        #log-table th { 
            border-bottom: 2px solid #9ccc65 !important; 
            background: #0d2b0d !important;
        }
        #log-table tr, #log-table td {
            background-color: transparent !important;
            border-color: #6b8c3a !important;
            color: #ffeb99 !important;
        }
        #log-table .first-row { 
            background-color: #1a3a1a !important; 
            border-color: #8bc34a !important; 
        }
        #log-table .second-row { 
            background-color: #1e4a1e !important; 
            border-color: #8bc34a !important; 
        }
        #log-table tbody tr:hover {
            background-color: #2a5a2a !important;
        }

        /* ССЫЛКИ */
        a, .td-player-name a, .td-category a, .link {
            color: #d4e157 !important;
            text-decoration: none !important;
        }
        a:hover, .td-player-name a:hover {
            color: #fff3b0 !important;
            text-shadow: 0 0 4px rgba(255, 235, 102, 0.5);
        }

        /* ИНДЕКСЫ И БЕЙДЖИ */
        .td-index, .badge, .label {
            background-color: #7cb342 !important;
            color: #1a3a1a !important;
            font-weight: bold !important;
        }

        /* САЙДБАР И ФИЛЬТРЫ */
        #log-filter-section, .sidebar, .filter-panel {
            background: #0d2b0d !important;
            border-left: 2px solid #9ccc65 !important;
            border-right: 2px solid #9ccc65 !important;
        }
        #log-filter-heading, .filter-title {
            color: #ffe066 !important;
        }
        .form-label, label {
            color: #d4e157 !important;
        }

        /* ИНПУТЫ И ФОРМЫ */
        input, select, textarea, .form-control, .form-select, .dp__input {
            background-color: #0d2b0d !important;
            border: 1px solid #9ccc65 !important;
            color: #ffeb99 !important;
        }
        input:focus, select:focus, textarea:focus {
            border-color: #d4e157 !important;
            box-shadow: 0 0 5px rgba(212, 225, 87, 0.5) !important;
            outline: none !important;
        }
        input::placeholder, textarea::placeholder {
            color: #8bc34a !important;
        }

        /* ЧЕКБОКСЫ И РАДИО */
        input[type="checkbox"], input[type="radio"] {
            accent-color: #9ccc65 !important;
        }

        /* MULTISELECT */
        .multiselect {
            background: #0d2b0d !important;
            border: 1px solid #9ccc65 !important;
        }
        .multiselect-dropdown {
            background: #1a3a1a !important;
            border: 1px solid #9ccc65 !important;
        }
        .multiselect-option {
            background: transparent !important;
            color: #ffeb99 !important;
        }
        .multiselect-option.is-pointed {
            background: #7cb342 !important;
            color: #0d2b0d !important;
        }
        .multiselect-option.is-selected {
            background: #d4e157 !important;
            color: #0d2b0d !important;
        }
        .multiselect-single-label {
            color: #ffeb99 !important;
        }
        .multiselect-tag {
            background: #7cb342 !important;
            color: #0d2b0d !important;
        }

        /* АВТОКОМПЛИТ */
        .autoComplete_wrapper > ul {
            background-color: #1a3a1a !important;
            border: 1px solid #9ccc65 !important;
        }
        .autoComplete_wrapper > ul > li {
            background-color: #1a3a1a !important;
            color: #ffeb99 !important;
        }
        .autoComplete_wrapper > ul > li:hover {
            background-color: #7cb342 !important;
            color: #0d2b0d !important;
        }
        .autoComplete_wrapper > ul > li mark {
            color: #ffe066 !important;
            background: transparent !important;
        }

        /* МОДАЛЬНЫЕ ОКНА */
        .modal-content {
            background-color: #1a3a1a !important;
            border: 1px solid #9ccc65 !important;
        }
        .modal-header, .modal-footer { 
            border-color: #6b8c3a !important; 
        }
        .modal-header .modal-title {
            color: #ffe066 !important;
        }
        .btn-close { 
            filter: brightness(0) invert(1) sepia(1) hue-rotate(45deg) saturate(5) !important;
        }
        
        /* КНОПКИ */
        .btn-primary, .submit-btn, .btn-success {
            background-color: #9ccc65 !important;
            border-color: #8bc34a !important;
            color: #0d2b0d !important;
            font-weight: bold !important;
        }
        .btn-primary:hover, .submit-btn:hover, .btn-success:hover {
            background-color: #d4e157 !important;
            border-color: #c0ca33 !important;
            color: #0d2b0d !important;
        }
        .btn-secondary {
            background-color: #558b2f !important;
            border-color: #689f38 !important;
            color: #ffeb99 !important;
        }
        .btn-secondary:hover {
            background-color: #689f38 !important;
            color: #fff3b0 !important;
        }

        /* ПАНЕЛИ И КАРТОЧКИ */
        .card, .panel, .widget {
            background-color: #1e4a1e !important;
            border: 1px solid #8bc34a !important;
        }
        .card-header, .panel-heading {
            background-color: #0d2b0d !important;
            border-bottom: 1px solid #9ccc65 !important;
            color: #ffe066 !important;
        }
        .card-body, .panel-body {
            background-color: #1e4a1e !important;
            color: #ffeb99 !important;
        }

        /* ДРОПДАУНЫ И МЕНЮ */
        .dropdown-menu {
            background-color: #1a3a1a !important;
            border: 1px solid #9ccc65 !important;
        }
        .dropdown-item {
            color: #ffeb99 !important;
        }
        .dropdown-item:hover {
            background-color: #7cb342 !important;
            color: #0d2b0d !important;
        }

        /* ПОЛОТНО ДЛЯ ЦВЕТОВ */
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
            color: #ffe066 !important;
            text-decoration: none;
            margin-left: auto; 
            margin-right: 15px;
            padding: 5px 10px;
            border: 1px solid #9ccc65;
            border-radius: 5px;
            transition: all 0.3s ease;
            font-size: 1.2rem;
            background: #0d2b0d;
        }
        #spring-toggle-btn:hover {
            background: #7cb342;
            color: #0d2b0d !important;
            border-color: #d4e157;
        }
        #spring-toggle-btn.spring-mode-active {
            background: #9ccc65;
            color: #0d2b0d !important;
            text-shadow: none;
            border-color: #ffe066;
        }
    `;

    const styleElement = document.createElement('style');
    styleElement.id = 'spring-theme-styles';
    styleElement.innerText = springStyles;

    let flowersCanvas, ctx, animationFrame;
    let flowers = [];

    // Яркие весенние цвета для цветов
    const flowerColors = [
        '#FF4444', // Красный
        '#FF8844', // Оранжевый
        '#FFDD44', // Желтый
        '#44FF44', // Зеленый
        '#44AAFF', // Голубой
        '#FF66CC', // Розовый
        '#DD44FF', // Фиолетовый
        '#FFAA44'  // Золотистый
    ];

    function initFlowers() {
        if (flowersCanvas) return;
        flowersCanvas = document.createElement('canvas');
        flowersCanvas.id = 'spring-flowers-canvas';
        document.body.appendChild(flowersCanvas);
        ctx = flowersCanvas.getContext('2d');
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        flowers = [];
        for (let i = 0; i < CONFIG.flowerCount; i++) flowers.push(createFlower());
        animateFlowers();
    }

    function resizeCanvas() {
        if (flowersCanvas) {
            flowersCanvas.width = window.innerWidth;
            flowersCanvas.height = window.innerHeight;
        }
    }

    function createFlower() {
        const type = Math.floor(Math.random() * 4);
        return {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 8 + 6,
            speed: Math.random() * 0.8 + 0.4,
            wind: Math.random() * 0.4 - 0.2,
            opacity: Math.random() * 0.4 + 0.5,
            color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
            type: type,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02
        };
    }

    function drawFlower(ctx, x, y, size, color, opacity, type, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.globalAlpha = opacity;
        ctx.shadowBlur = 3;
        ctx.shadowColor = "rgba(0,0,0,0.2)";
        
        const radius = size / 2;
        
        if (type === 0) {
            // Ромашка
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2;
                const petalX = Math.cos(angle) * radius * 0.7;
                const petalY = Math.sin(angle) * radius * 0.7;
                ctx.beginPath();
                ctx.ellipse(petalX, petalY, radius * 0.45, radius * 0.75, angle, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            }
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.35, 0, Math.PI * 2);
            ctx.fillStyle = '#FFDD66';
            ctx.fill();
        } 
        else if (type === 1) {
            // Тюльпан
            ctx.beginPath();
            ctx.moveTo(0, -radius);
            ctx.quadraticCurveTo(radius * 0.7, -radius * 0.3, radius * 0.5, radius * 0.4);
            ctx.quadraticCurveTo(0, radius * 0.2, -radius * 0.5, radius * 0.4);
            ctx.quadraticCurveTo(-radius * 0.7, -radius * 0.3, 0, -radius);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(0, radius * 0.3);
            ctx.lineTo(radius * 0.12, radius * 0.65);
            ctx.lineTo(-radius * 0.12, radius * 0.65);
            ctx.fillStyle = '#44FF44';
            ctx.fill();
        }
        else if (type === 2) {
            // Звездчатый цветок
            const spikes = 5;
            ctx.beginPath();
            for (let i = 0; i < spikes * 2; i++) {
                const rad = i % 2 === 0 ? radius : radius * 0.45;
                const angle = (i / (spikes * 2)) * Math.PI * 2;
                const px = Math.cos(angle) * rad;
                const py = Math.sin(angle) * rad;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFF88';
            ctx.fill();
        }
        else {
            // Пышный цветок
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const petalX = Math.cos(angle) * radius * 0.55;
                const petalY = Math.sin(angle) * radius * 0.55;
                ctx.beginPath();
                ctx.ellipse(petalX, petalY, radius * 0.4, radius * 0.65, angle, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            }
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.35, 0, Math.PI * 2);
            ctx.fillStyle = '#FFEE88';
            ctx.fill();
        }
        
        ctx.restore();
    }

    function animateFlowers() {
        if (!ctx || !flowersCanvas) return;
        ctx.clearRect(0, 0, flowersCanvas.width, flowersCanvas.height);
        
        flowers.forEach(flower => {
            drawFlower(ctx, flower.x, flower.y, flower.size, flower.color, flower.opacity, flower.type, flower.rotation);
            flower.y += flower.speed;
            flower.x += flower.wind;
            flower.rotation += flower.rotationSpeed;
            
            if (flower.y > window.innerHeight + 30) {
                flower.y = -30;
                flower.x = Math.random() * window.innerWidth;
                flower.type = Math.floor(Math.random() * 4);
                flower.color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
            }
            if (flower.x > window.innerWidth + 30) flower.x = -30;
            if (flower.x < -30) flower.x = window.innerWidth + 30;
        });
        
        animationFrame = requestAnimationFrame(animateFlowers);
    }

    function destroyFlowers() {
        if (animationFrame) cancelAnimationFrame(animationFrame);
        if (flowersCanvas) flowersCanvas.remove();
        flowersCanvas = null;
        ctx = null;
        window.removeEventListener('resize', resizeCanvas);
    }

    function enableSpringTheme() {
        if (!document.getElementById('spring-theme-styles')) {
            document.head.appendChild(styleElement);
        }
        const flowersEnabled = localStorage.getItem(CONFIG.storageKey);
        if (flowersEnabled !== 'false') {
            initFlowers();
        }
        updateBtnState(flowersEnabled !== 'false');
    }

    function disableFlowers() {
        destroyFlowers();
        updateBtnState(false);
        localStorage.setItem(CONFIG.storageKey, 'false');
    }

    function enableFlowers() {
        initFlowers();
        updateBtnState(true);
        localStorage.setItem(CONFIG.storageKey, 'true');
    }

    function toggleFlowers() {
        const areFlowersEnabled = localStorage.getItem(CONFIG.storageKey) !== 'false';
        if (areFlowersEnabled) {
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
                btn.innerHTML = '🌸';
            } else {
                btn.classList.remove('spring-mode-active');
                btn.innerHTML = '🌷';
            }
        }
    }

    function injectUI() {
        const navContainer = document.querySelector('#site-navbar .container-fluid') || 
                           document.querySelector('nav .container-fluid') ||
                           document.querySelector('.navbar .container');
        if (!navContainer) { 
            setTimeout(injectUI, 500); 
            return; 
        }
        if (document.getElementById('spring-toggle-btn')) return;

        const btn = document.createElement('a');
        btn.id = 'spring-toggle-btn';
        btn.href = '#';
        btn.innerHTML = localStorage.getItem(CONFIG.storageKey) !== 'false' ? '🌸' : '🌷';
        btn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            toggleFlowers(); 
        });

        navContainer.appendChild(btn);

        if (!document.getElementById('spring-theme-styles')) {
            document.head.appendChild(styleElement);
        }
        
        if (localStorage.getItem(CONFIG.storageKey) !== 'false') {
            enableSpringTheme();
        } else {
            updateBtnState(false);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectUI);
    } else {
        injectUI();
    }
})();
