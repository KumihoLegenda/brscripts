(function() {
    'use strict';

    const CONFIG = {
        storageKey: 'spring_flowers_v2',
        flowerCount: 50,
    };

    const springStyles = `
        /* ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ - ЯРКАЯ ВЕСЕННЯЯ ТЕМНАЯ ТЕМА */
        :root {
            --bs-body-bg: #0a1a0a !important;
            --bs-body-color: #e8f5e9 !important;
            --bs-card-bg: #1a3a1a !important;
            --bs-border-color: #4caf50 !important;
        }

        /* ОСНОВНОЙ ФОН */
        body, html, .main-content {
            background-color: var(--bs-body-bg) !important;
            color: var(--bs-body-color) !important;
        }

        /* НАВИГАЦИЯ */
        #site-navbar {
            background-color: #051005 !important;
            border-bottom: 2px solid #4caf50 !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .navbar-brand { 
            color: #66ff66 !important; 
            text-shadow: 0 0 10px rgba(102, 255, 102, 0.5); 
        }

        /* ЗАГРУЗОЧНЫЙ ЭКРАН */
        #loading-overlay, #loading-overlay[data-v-173ec149] {
            background-color: #0a1a0a !important;
            opacity: 1 !important;
        }
        #loading-overlay-heading, .loading-text {
            color: #66ff66 !important;
            text-shadow: 0 10px rgba(102, 255, 102, 0.5);
        }
        #loading-overlay .spinner, .spinner-border {
            border-color: #66ff66 !important;
            border-right-color: transparent !important;
        }

        /* ТАБЛИЦА ЛОГОВ */
        #log-table { color: #dcedc8 !important; }
        #log-table thead { background: #1a3a1a !important; color: #88ff88 !important; }
        #log-table th { border-bottom: 2px solid #66ff66 !important; }
        #log-table .first-row { background-color: #0a1a0a !important; border-color: #4caf50 !important; }
        #log-table .second-row { background-color: #0f2a0f !important; border-color: #4caf50 !important; }
        #log-table td { border-color: #4caf50 !important; }

        /* Описание транзакции и ссылки */
        .td-transaction-desc { color: #a5d6a7 !important; font-style: italic; }
        a, .td-player-name a, .td-category a {
            color: #66ff66 !important;
            text-decoration: none !important;
            transition: text-shadow 0.3s;
        }
        a:hover { text-shadow: 0 0 8px #66ff66; color: #ccffcc !important; }
        .td-index { background-color: #2e7d32 !important; color: #ffffff !important; }

        /* САЙДБАР (Фильтры) */
        #log-filter-section {
            background: #1a3a1a !important;
            border-left: 2px solid #4caf50 !important;
        }
        #log-filter-heading { color: #88ff88 !important; }
        .form-label { color: #a5d6a7 !important; }

        /* ОБЫЧНЫЕ ИНПУТЫ */
        input, select, textarea, .form-control, .form-select, .dp__input {
            background-color: #051005 !important;
            border: 1px solid #4caf50 !important;
            color: #e8f5e9 !important;
        }
        input::placeholder { color: #66bb6a !important; }

        /* ФИКС ДЛЯ MULTISELECT */
        .multiselect {
            background: #051005 !important;
            border: 1px solid #4caf50 !important;
            color: #e8f5e9 !important;
        }
        .multiselect-dropdown {
            background: #1a3a1a !important;
            border: 1px solid #4caf50 !important;
            color: #dcedc8 !important;
        }
        .multiselect-option {
            background: transparent !important;
            color: #c8e6c9 !important;
        }
        .multiselect-option.is-pointed {
            background: #2e7d32 !important;
            color: #ffffff !important;
        }
        .multiselect-option.is-selected {
            background: #66ff66 !important;
            color: #051005 !important;
        }
        .multiselect-single-label {
            color: #e8f5e9 !important;
            background: transparent !important;
        }
        .multiselect-tag {
            background: #2e7d32 !important;
            color: #dcedc8 !important;
        }

        /* АВТОКОМПЛИТ */
        .autoComplete_wrapper > ul {
            background-color: #1a3a1a !important;
            border: 1px solid #4caf50 !important;
            color: #dcedc8 !important;
        }
        .autoComplete_wrapper > ul > li {
            background-color: #1a3a1a !important;
            color: #c8e6c9 !important;
        }
        .autoComplete_wrapper > ul > li:hover {
            background-color: #2e7d32 !important;
            color: #ffffff !important;
        }
        .autoComplete_wrapper > ul > li mark {
            color: #66ff66 !important;
        }

        /* МОДАЛЬНЫЕ ОКНА */
        .modal-content {
            background-color: #1a3a1a !important;
            border: 1px solid #4caf50 !important;
            box-shadow: 0 10px 40px rgba(0,0,0,0.7) !important;
        }
        .modal-header, .modal-footer { border-color: #4caf50 !important; }
        .btn-close { filter: invert(1) grayscale(100%) brightness(200%); }
        
        .btn-primary, .submit-btn {
            background-color: #66ff66 !important;
            border-color: #66ff66 !important;
            color: #051005 !important;
            font-weight: bold;
        }
        .btn-primary:hover, .submit-btn:hover {
            background-color: #44cc44 !important;
            box-shadow: 0 0 15px rgba(102, 255, 102, 0.4);
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
            color: #a5d6a7;
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
            background: rgba(102, 255, 102, 0.2);
            color: #ccffcc;
        }
        #spring-toggle-btn.spring-mode-active {
            color: #66ff66 !important;
            text-shadow: 0 0 8px rgba(102, 255, 102, 0.6);
            border-color: rgba(102, 255, 102, 0.3);
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

    let flowersCanvas, ctx, animationFrame;
    let flowers = [];

    // Яркие весенние цвета
    const flowerColors = [
        '#FF4444', // Ярко-красный
        '#FF8844', // Ярко-оранжевый
        '#FFDD44', // Ярко-желтый
        '#44FF44', // Ярко-зеленый
        '#4488FF', // Ярко-синий
        '#DD44FF', // Ярко-фиолетовый
        '#FF66BB', // Ярко-розовый
        '#FF4488'  // Малиновый
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
            size: Math.random() * 8 + 6,
            speed: Math.random() * 0.8 + 0.4,
            wind: Math.random() * 0.4 - 0.2,
            opacity: Math.random() * 0.4 + 0.6,
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
        ctx.shadowBlur = 4;
        ctx.shadowColor = "rgba(0,0,0,0.3)";
        
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
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.2, 0, Math.PI * 2);
            ctx.fillStyle = '#FFAA33';
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
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.2, 0, Math.PI * 2);
            ctx.fillStyle = '#FFCC44';
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
                btn.innerHTML = '🌷';
            } else {
                btn.classList.remove('spring-mode-active');
                btn.innerHTML = '🌷';
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
        btn.innerHTML = '🌷';
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
