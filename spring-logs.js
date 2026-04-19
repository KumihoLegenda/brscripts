(function() {
    'use strict';

    const CONFIG = {
        storageKey: 'spring_theme_v4',
        flowerCount: 60,
    };

    const springStyles = `
        /* ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ - ЗЕЛЕНО-ЖЕЛТАЯ ТЕМА */
        :root {
            --bs-body-bg: #0a1a05 !important;
            --bs-body-color: #d4ff7a !important;
            --bs-card-bg: #1a3a0f !important;
            --bs-border-color: #4caf2a !important;
        }

        /* ОСНОВНОЙ ФОН */
        body, html, .main-content {
            background: linear-gradient(135deg, #0a1a05 0%, #0f2508 100%) !important;
            color: #d4ff7a !important;
        }

        /* НАВИГАЦИЯ */
        #site-navbar {
            background: linear-gradient(135deg, #051002 0%, #0a1a05 100%) !important;
            border-bottom: 2px solid #6cd43a !important;
            box-shadow: 0 4px 25px rgba(108, 212, 58, 0.25) !important;
        }
        .navbar-brand { 
            color: #a8ff3a !important; 
            text-shadow: 0 0 12px rgba(108, 212, 58, 0.8), 0 0 4px rgba(168, 255, 58, 0.5) !important;
            font-weight: 600 !important;
        }

        /* ЗАГРУЗОЧНЫЙ ЭКРАН */
        #loading-overlay, #loading-overlay[data-v-173ec149] {
            background: linear-gradient(135deg, #0a1a05 0%, #0f2508 100%) !important;
            opacity: 1 !important;
        }
        #loading-overlay-heading, .loading-text {
            color: #a8ff3a !important;
            text-shadow: 0 0 20px #6cd43a, 0 0 8px #4caf2a !important;
            letter-spacing: 1px !important;
        }
        #loading-overlay .spinner, .spinner-border {
            border-color: #6cd43a !important;
            border-right-color: transparent !important;
            filter: drop-shadow(0 0 6px #6cd43a) !important;
        }

        /* ТАБЛИЦА ЛОГОВ */
        #log-table { color: #c8ff70 !important; }
        #log-table thead { 
            background: linear-gradient(135deg, #1a3a0f 0%, #14300a 100%) !important;
            color: #b8ff4a !important;
            text-shadow: 0 0 4px rgba(108, 212, 58, 0.5) !important;
        }
        #log-table th { 
            border-bottom: 2px solid #6cd43a !important;
        }
        #log-table .first-row { 
            background: linear-gradient(135deg, #0a1a05 0%, #0f2508 100%) !important;
            border-color: #2d6b1a !important;
        }
        #log-table .second-row { 
            background: linear-gradient(135deg, #0f2508 0%, #0a1a05 100%) !important;
            border-color: #2d6b1a !important;
        }
        #log-table td { 
            border-color: #2d5a15 !important;
        }

        /* Описание транзакции и ссылки */
        .td-transaction-desc { color: #9cee4a !important; font-style: italic; }
        a, .td-player-name a, .td-category a {
            color: #b8ff4a !important;
            text-decoration: none !important;
            transition: all 0.3s ease;
            font-weight: 500 !important;
        }
        a:hover { 
            text-shadow: 0 0 10px #6cd43a, 0 0 4px #a8ff3a !important;
            color: #d4ff7a !important;
        }
        .td-index { 
            background: linear-gradient(135deg, #2d6b1a 0%, #1a4a0f 100%) !important;
            color: #e8ffb0 !important;
            font-weight: bold !important;
            text-shadow: 0 0 3px rgba(0,0,0,0.3) !important;
            box-shadow: inset 0 1px 2px rgba(168, 255, 58, 0.2), 0 2px 4px rgba(0,0,0,0.2) !important;
        }

        /* САЙДБАР (Фильтры) */
        #log-filter-section {
            background: linear-gradient(135deg, #1a3a0f 0%, #14300a 100%) !important;
            border-left: 2px solid #6cd43a !important;
            box-shadow: -5px 0 20px rgba(0,0,0,0.3) !important;
        }
        #log-filter-heading { 
            color: #b8ff4a !important;
            text-shadow: 0 0 6px #4caf2a !important;
            letter-spacing: 0.5px !important;
        }
        .form-label { 
            color: #a8ff3a !important;
            font-weight: 500 !important;
        }

        /* ОБЫЧНЫЕ ИНПУТЫ */
        input, select, textarea, .form-control, .form-select, .dp__input {
            background: linear-gradient(135deg, #051002 0%, #0a1a05 100%) !important;
            border: 1px solid #4caf2a !important;
            color: #d4ff7a !important;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.4), 0 0 6px rgba(108, 212, 58, 0.2) !important;
            transition: all 0.3s ease !important;
        }
        input:focus, select:focus, textarea:focus {
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.4), 0 0 12px #6cd43a !important;
            border-color: #8efc4a !important;
            outline: none !important;
        }
        input::placeholder { color: #3d7a1f !important; }

        /* ФИКС ДЛЯ MULTISELECT */
        .multiselect {
            background: linear-gradient(135deg, #051002 0%, #0a1a05 100%) !important;
            border: 1px solid #4caf2a !important;
            color: #d4ff7a !important;
        }
        .multiselect-dropdown {
            background: linear-gradient(135deg, #1a3a0f 0%, #14300a 100%) !important;
            border: 1px solid #4caf2a !important;
            color: #c8ff70 !important;
        }
        .multiselect-option {
            background: transparent !important;
            color: #c8ff70 !important;
        }
        .multiselect-option.is-pointed {
            background: linear-gradient(135deg, #2d6b1a 0%, #1a4a0f 100%) !important;
            color: #e8ffb0 !important;
        }
        .multiselect-option.is-selected {
            background: linear-gradient(135deg, #5cb82a 0%, #4c9a20 100%) !important;
            color: #ffffcc !important;
        }
        .multiselect-single-label {
            color: #d4ff7a !important;
            background: transparent !important;
        }
        .multiselect-tag {
            background: linear-gradient(135deg, #2d6b1a 0%, #1a4a0f 100%) !important;
            color: #e8ffb0 !important;
            border-radius: 4px !important;
        }

        /* АВТОКОМПЛИТ */
        .autoComplete_wrapper > ul {
            background: linear-gradient(135deg, #1a3a0f 0%, #14300a 100%) !important;
            border: 1px solid #4caf2a !important;
            color: #c8ff70 !important;
        }
        .autoComplete_wrapper > ul > li {
            background: transparent !important;
            color: #c8ff70 !important;
        }
        .autoComplete_wrapper > ul > li:hover {
            background: linear-gradient(135deg, #2d6b1a 0%, #1a4a0f 100%) !important;
            color: #e8ffb0 !important;
        }
        .autoComplete_wrapper > ul > li mark {
            color: #a8ff3a !important;
            background: transparent !important;
        }

        /* МОДАЛЬНЫЕ ОКНА */
        .modal-content {
            background: linear-gradient(135deg, #1a3a0f 0%, #14300a 100%) !important;
            border: 1px solid #5cb82a !important;
            box-shadow: 0 10px 40px rgba(108, 212, 58, 0.3) !important;
        }
        .modal-header, .modal-footer { 
            border-color: #3d8a1a !important;
        }
        .modal-title {
            color: #b8ff4a !important;
            text-shadow: 0 0 6px #4caf2a !important;
        }
        .btn-close { 
            filter: brightness(0) saturate(100%) invert(83%) sepia(74%) saturate(800%) hue-rotate(28deg) brightness(105%) contrast(105%);
            opacity: 0.8 !important;
        }
        .btn-close:hover {
            opacity: 1 !important;
        }
        
        .btn-primary, .submit-btn {
            background: linear-gradient(135deg, #5cb82a 0%, #4c9a20 100%) !important;
            border: none !important;
            color: #ffffcc !important;
            font-weight: bold !important;
            text-shadow: 0 0 4px rgba(0,0,0,0.2) !important;
            box-shadow: 0 2px 8px rgba(92, 184, 42, 0.4) !important;
            transition: all 0.3s ease !important;
            border-radius: 6px !important;
        }
        .btn-primary:hover, .submit-btn:hover {
            background: linear-gradient(135deg, #6cd43a 0%, #5cb82a 100%) !important;
            box-shadow: 0 4px 15px rgba(108, 212, 58, 0.5) !important;
            transform: translateY(-1px);
            color: #ffffff !important;
        }
        .btn-primary:active {
            transform: translateY(0px);
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
            color: #9cee4a;
            text-decoration: none;
            margin-left: auto; 
            margin-right: 15px;
            padding: 6px 12px;
            border: 1px solid #5cb82a;
            border-radius: 8px;
            transition: all 0.3s ease;
            font-size: 1.2rem;
            background: rgba(26, 58, 15, 0.6);
            backdrop-filter: blur(4px);
        }
        #spring-toggle-btn:hover {
            background: rgba(92, 184, 42, 0.3);
            color: #d4ff7a;
            box-shadow: 0 0 15px rgba(108, 212, 58, 0.4);
            border-color: #8efc4a;
            transform: scale(1.02);
        }
        #spring-toggle-btn.spring-mode-active {
            color: #a8ff3a !important;
            text-shadow: 0 0 10px #6cd43a !important;
            border-color: #a8ff3a !important;
            background: rgba(108, 212, 58, 0.25);
        }
        @media (min-width: 992px) {
            #spring-toggle-btn {
                margin-left: 20px;
                margin-right: 0;
                order: 5;
            }
        }

        /* ДОПОЛНИТЕЛЬНЫЕ ЭЛЕМЕНТЫ */
        .card, .card-body, .list-group-item {
            background: linear-gradient(135deg, #1a3a0f 0%, #14300a 100%) !important;
            border-color: #3d8a1a !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3), 0 0 6px rgba(108, 212, 58, 0.15) !important;
        }
        
        .dropdown-menu {
            background: linear-gradient(135deg, #1a3a0f 0%, #14300a 100%) !important;
            border-color: #4caf2a !important;
        }
        .dropdown-item {
            color: #c8ff70 !important;
        }
        .dropdown-item:hover {
            background: linear-gradient(135deg, #2d6b1a 0%, #1a4a0f 100%) !important;
            color: #e8ffb0 !important;
        }
        
        .pagination .page-link {
            background: linear-gradient(135deg, #0a1a05 0%, #0f2508 100%) !important;
            border-color: #3d8a1a !important;
            color: #b8ff4a !important;
        }
        .pagination .page-link:hover {
            background: linear-gradient(135deg, #1a3a0f 0%, #14300a 100%) !important;
            border-color: #6cd43a !important;
            color: #e8ffb0 !important;
            box-shadow: 0 0 8px #6cd43a !important;
        }
        .pagination .active .page-link {
            background: linear-gradient(135deg, #5cb82a 0%, #4c9a20 100%) !important;
            border-color: #6cd43a !important;
            color: #ffffcc !important;
        }
    `;

    const styleElement = document.createElement('style');
    styleElement.id = 'spring-theme-styles';
    styleElement.innerText = springStyles;

    let flowersCanvas, ctx, animationFrame;
    let flowers = [];

    // Зеленые и желтые оттенки для цветов (зеленый преобладает)
    const flowerColors = [
        '#6cd43a', // Яркий зеленый
        '#5cb82a', // Средний зеленый
        '#8efc4a', // Светлый зеленый
        '#a8ff3a', // Желто-зеленый
        '#4c9a20', // Темный зеленый
        '#7ae43a', // Свежий зеленый
        '#b8ff4a', // Салатовый
        '#9cee4a', // Травяной
        '#d4ff3a', // Лимонный
        '#6ae82a'  // Яркий салатовый
    ];

    function initFlowers() {
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
        flowersCanvas.width = window.innerWidth;
        flowersCanvas.height = window.innerHeight;
    }

    function createFlower() {
        const type = Math.floor(Math.random() * 4);
        return {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 9 + 5,
            speed: Math.random() * 0.9 + 0.3,
            wind: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.3 + 0.7,
            color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
            type: type,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.025,
        };
    }

    function drawFlower(ctx, x, y, size, color, opacity, type, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.globalAlpha = opacity;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(108, 212, 58, 0.5)`;
        
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
            ctx.fillStyle = '#d4ff3a';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.2, 0, Math.PI * 2);
            ctx.fillStyle = '#b8ff1a';
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
            ctx.fillStyle = '#8efc4a';
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
            ctx.fillStyle = '#d4ff3a';
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
            ctx.fillStyle = '#b8ff3a';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.2, 0, Math.PI * 2);
            ctx.fillStyle = '#9cee2a';
            ctx.fill();
        }
        
        ctx.restore();
    }

    function animateFlowers() {
        if (!ctx) return;
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
        window.removeEventListener('resize', resizeCanvas);
    }

    function enableSpringTheme() {
        if (!document.getElementById('spring-theme-styles')) {
            document.head.appendChild(styleElement);
        }
        if (localStorage.getItem(CONFIG.storageKey) !== 'false') {
            initFlowers();
        }
        updateBtnState(localStorage.getItem(CONFIG.storageKey) !== 'false');
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
                btn.innerHTML = '🌿';
            } else {
                btn.classList.remove('spring-mode-active');
                btn.innerHTML = '🌿';
            }
        }
    }

    function injectUI() {
        const navContainer = document.querySelector('#site-navbar .container-fluid');
        if (!navContainer) { setTimeout(injectUI, 500); return; }
        if (document.getElementById('spring-toggle-btn')) return;

        const btn = document.createElement('a');
        btn.id = 'spring-toggle-btn';
        btn.href = '#';
        btn.innerHTML = '🌿';
        btn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            toggleFlowers(); 
        });

        const toggler = navContainer.querySelector('.navbar-toggler');
        const collapse = navContainer.querySelector('.navbar-collapse');

        if (toggler && getComputedStyle(toggler).display !== 'none') {
            navContainer.insertBefore(btn, toggler);
        } else if (collapse) {
            navContainer.insertBefore(btn, collapse);
        } else {
            navContainer.appendChild(btn);
        }

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
