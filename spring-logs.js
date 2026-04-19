(function() {
    'use strict';

    const CONFIG = {
        storageKey: 'spring_flowers_v1',
        flowerCount: 50,  // Немного меньше цветов, чем снежинок, для элегантности
    };

    const springStyles = `
        /* ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ - ВЕСЕННЯЯ ТЕМНАЯ ТЕМА */
        :root {
            --bs-body-bg: #0a1f0e !important;
            --bs-body-color: #c8e6c9 !important;
            --bs-card-bg: #1b2e1f !important;
            --bs-border-color: #2e7d32 !important;
        }

        /* ОСНОВНОЙ ФОН */
        body, html, .main-content {
            background-color: var(--bs-body-bg) !important;
            color: var(--bs-body-color) !important;
        }

        /* НАВИГАЦИЯ */
        #site-navbar {
            background-color: #051a08 !important;
            border-bottom: 1px solid #2e7d32;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .navbar-brand { 
            color: #81c784 !important; 
            text-shadow: 0 0 10px rgba(129, 199, 132, 0.5); 
        }

        /* ЗАГРУЗОЧНЫЙ ЭКРАН */
        #loading-overlay, #loading-overlay[data-v-173ec149] {
            background-color: #0a1f0e !important;
            opacity: 1 !important;
        }
        #loading-overlay-heading, .loading-text {
            color: #81c784 !important;
            text-shadow: 0 10px rgba(129, 199, 132, 0.5);
        }
        #loading-overlay .spinner, .spinner-border {
            border-color: #81c784 !important;
            border-right-color: transparent !important;
        }

        /* ТАБЛИЦА ЛОГОВ */
        #log-table { color: #dcedc8 !important; }
        #log-table thead { background: #1b2e1f !important; color: #a5d6a7 !important; }
        #log-table th { border-bottom: 2px solid #66bb6a !important; }
        #log-table .first-row { background-color: #0a1f0e !important; border-color: #2e7d32 !important; }
        #log-table .second-row { background-color: #112817 !important; border-color: #2e7d32 !important; }
        #log-table td { border-color: #2e7d32 !important; }

        /* Описание транзакции и ссылки */
        .td-transaction-desc { color: #9ccc9c !important; font-style: italic; }
        a, .td-player-name a, .td-category a {
            color: #81c784 !important;
            text-decoration: none !important;
            transition: text-shadow 0.3s;
        }
        a:hover { text-shadow: 0 0 8px #66bb6a; color: #e8f5e9 !important; }
        .td-index { background-color: #2e7d32 !important; color: #e8f5e9 !important; }

        /* САЙДБАР (Фильтры) */
        #log-filter-section {
            background: #1b2e1f !important;
            border-left: 1px solid #2e7d32 !important;
        }
        #log-filter-heading { color: #a5d6a7 !important; }
        .form-label { color: #9ccc9c !important; }

        /* ОБЫЧНЫЕ ИНПУТЫ */
        input, select, textarea, .form-control, .form-select, .dp__input {
            background-color: #051a08 !important;
            border: 1px solid #388e3c !important;
            color: #e8f5e9 !important;
        }
        input::placeholder { color: #558b2f !important; }

        /* ФИКС ДЛЯ MULTISELECT */
        .multiselect {
            background: #051a08 !important;
            border: 1px solid #388e3c !important;
            color: #e8f5e9 !important;
        }
        .multiselect-dropdown {
            background: #1b2e1f !important;
            border: 1px solid #2e7d32 !important;
            color: #dcedc8 !important;
        }
        .multiselect-option {
            background: transparent !important;
            color: #c8e6c9 !important;
        }
        .multiselect-option.is-pointed {
            background: #2e7d32 !important;
            color: #e8f5e9 !important;
        }
        .multiselect-option.is-selected {
            background: #66bb6a !important;
            color: #051a08 !important;
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
            background-color: #1b2e1f !important;
            border: 1px solid #2e7d32 !important;
            color: #dcedc8 !important;
        }
        .autoComplete_wrapper > ul > li {
            background-color: #1b2e1f !important;
            color: #c8e6c9 !important;
        }
        .autoComplete_wrapper > ul > li:hover {
            background-color: #2e7d32 !important;
            color: #e8f5e9 !important;
        }
        .autoComplete_wrapper > ul > li mark {
            color: #81c784 !important;
        }

        /* МОДАЛЬНЫЕ ОКНА */
        .modal-content {
            background-color: #1b2e1f !important;
            border: 1px solid #388e3c !important;
            box-shadow: 0 10px 40px rgba(0,0,0,0.7) !important;
        }
        .modal-header, .modal-footer { border-color: #2e7d32 !important; }
        .btn-close { filter: invert(1) grayscale(100%) brightness(200%); }
        
        .btn-primary, .submit-btn {
            background-color: #66bb6a !important;
            border-color: #66bb6a !important;
            color: #051a08 !important;
            font-weight: bold;
        }
        .btn-primary:hover, .submit-btn:hover {
            background-color: #4caf50 !important;
            box-shadow: 0 0 15px rgba(76, 175, 80, 0.4);
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
            color: #9ccc9c;
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
            background: rgba(129, 199, 132, 0.2);
            color: #e8f5e9;
        }
        #spring-toggle-btn.spring-mode-active {
            color: #81c784 !important;
            text-shadow: 0 0 8px rgba(129, 199, 132, 0.6);
            border-color: rgba(129, 199, 132, 0.3);
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

    // Реалистичные SVG-подобные цветы (рисуются через canvas)
    // Используем разные типы цветов
    const flowerColors = [
        '#FF6B6B', // Красный
        '#FF8E53', // Оранжевый
        '#FFD93D', // Желтый
        '#6BCB77', // Зеленый
        '#4D96FF', // Синий
        '#C084FC', // Фиолетовый
        '#FFB7B2', // Розовый
        '#FF6B8B'  // Малиновый
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
        // Случайный тип цветка для разнообразия форм
        const type = Math.floor(Math.random() * 4); // 0-3 разных стиля
        return {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 8 + 5, // Размер 5-13px
            speed: Math.random() * 0.8 + 0.3,
            wind: Math.random() * 0.4 - 0.2,
            opacity: Math.random() * 0.5 + 0.4,
            color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
            type: type,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02
        };
    }

    // Рисуем разные типы цветов
    function drawFlower(ctx, x, y, size, color, opacity, type, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.globalAlpha = opacity;
        ctx.shadowBlur = 3;
        ctx.shadowColor = "rgba(0,0,0,0.2)";
        
        const petalCount = type === 0 ? 5 : type === 1 ? 6 : type === 2 ? 4 : 8;
        const radius = size / 2;
        
        if (type === 0) {
            // Ромашка/обычный цветок
            for (let i = 0; i < petalCount; i++) {
                const angle = (i / petalCount) * Math.PI * 2;
                const petalX = Math.cos(angle) * radius * 0.7;
                const petalY = Math.sin(angle) * radius * 0.7;
                ctx.beginPath();
                ctx.ellipse(petalX, petalY, radius * 0.5, radius * 0.8, angle, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            }
            // Сердцевина
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.35, 0, Math.PI * 2);
            ctx.fillStyle = '#FFD700';
            ctx.fill();
        } 
        else if (type === 1) {
            // Тюльпанообразный
            ctx.beginPath();
            ctx.moveTo(0, -radius);
            ctx.quadraticCurveTo(radius * 0.6, -radius * 0.3, radius * 0.4, radius * 0.4);
            ctx.quadraticCurveTo(0, radius * 0.2, -radius * 0.4, radius * 0.4);
            ctx.quadraticCurveTo(-radius * 0.6, -radius * 0.3, 0, -radius);
            ctx.fillStyle = color;
            ctx.fill();
            // Стебелек
            ctx.beginPath();
            ctx.moveTo(0, radius * 0.3);
            ctx.lineTo(radius * 0.15, radius * 0.7);
            ctx.lineTo(-radius * 0.15, radius * 0.7);
            ctx.fillStyle = '#4CAF50';
            ctx.fill();
        }
        else if (type === 2) {
            // Звездочка/дикий цветок
            const spikes = 5;
            for (let i = 0; i < spikes * 2; i++) {
                const rad = i % 2 === 0 ? radius : radius * 0.4;
                const angle = (i / (spikes * 2)) * Math.PI * 2;
                const px = Math.cos(angle) * rad;
                const py = Math.sin(angle) * rad;
                if (i === 0) ctx.beginPath();
                else ctx.lineTo(px, py);
                if (i === 0) ctx.moveTo(px, py);
            }
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.25, 0, Math.PI * 2);
            ctx.fillStyle = '#FFF9C4';
            ctx.fill();
        }
        else {
            // Много лепестков (пышный цветок)
            for (let i = 0; i < petalCount; i++) {
                const angle = (i / petalCount) * Math.PI * 2;
                const petalX = Math.cos(angle) * radius * 0.5;
                const petalY = Math.sin(angle) * radius * 0.5;
                ctx.beginPath();
                ctx.ellipse(petalX, petalY, radius * 0.4, radius * 0.6, angle, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            }
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = '#FFE082';
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
            
            if (flower.y > window.innerHeight + 20) {
                flower.y = -20;
                flower.x = Math.random() * window.innerWidth;
                flower.type = Math.floor(Math.random() * 4);
                flower.color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
            }
            if (flower.x > window.innerWidth + 20) flower.x = -20;
            if (flower.x < -20) flower.x = window.innerWidth + 20;
        });
        
        animationFrame = requestAnimationFrame(animateFlowers);
    }

    function destroyFlowers() {
        if (animationFrame) cancelAnimationFrame(animationFrame);
        if (flowersCanvas) flowersCanvas.remove();
        window.removeEventListener('resize', resizeCanvas);
    }

    // Темная тема всегда включена, управляем только цветами
    function enableSpringTheme() {
        if (!document.getElementById('spring-theme-styles')) {
            document.head.appendChild(styleElement);
        }
        // Цветы включаются только если они были включены в localStorage
        if (localStorage.getItem(CONFIG.storageKey) !== 'false') {
            initFlowers();
        }
        updateBtnState(true);
    }

    // Отключаем ТОЛЬКО цветы, тема остается
    function disableFlowers() {
        destroyFlowers();
        updateBtnState(false);
        localStorage.setItem(CONFIG.storageKey, 'false');
    }

    // Включаем цветы, тема уже есть
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

        // Применяем тему сразу и всегда
        if (!document.getElementById('spring-theme-styles')) {
            document.head.appendChild(styleElement);
        }
        
        // Включаем цветы, если не отключены
        if (localStorage.getItem(CONFIG.storageKey) !== 'false') {
            enableSpringTheme();
        } else {
            // Тема применяется, но цветы не включаются
            if (!document.getElementById('spring-theme-styles')) {
                document.head.appendChild(styleElement);
            }
            updateBtnState(false);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectUI);
    } else {
        injectUI();
    }
})();
