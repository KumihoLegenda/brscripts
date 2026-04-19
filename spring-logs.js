(function() {
    'use strict';

    const CONFIG = {
        storageKey: 'spring_theme_v5',
        flowerCount: 55,
    };

    const springStyles = `
        /* ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ - ЕСТЕСТВЕННАЯ ЗЕЛЕНАЯ ТЕМА */
        :root {
            --bs-body-bg: #1a2a1a !important;
            --bs-body-color: #c5e0b4 !important;
            --bs-card-bg: #243624 !important;
            --bs-border-color: #4a6741 !important;
        }

        /* ОСНОВНОЙ ФОН */
        body, html, .main-content {
            background: linear-gradient(135deg, #1a2a1a 0%, #1e301e 100%) !important;
            color: #c5e0b4 !important;
        }

        /* НАВИГАЦИЯ */
        #site-navbar {
            background: linear-gradient(135deg, #0f1a0f 0%, #152515 100%) !important;
            border-bottom: 1px solid #4a6741 !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important;
        }
        .navbar-brand { 
            color: #9bc46e !important; 
            text-shadow: 0 0 8px rgba(100, 130, 70, 0.4) !important;
        }

        /* ЗАГРУЗОЧНЫЙ ЭКРАН */
        #loading-overlay, #loading-overlay[data-v-173ec149] {
            background: linear-gradient(135deg, #1a2a1a 0%, #1e301e 100%) !important;
            opacity: 1 !important;
        }
        #loading-overlay-heading, .loading-text {
            color: #9bc46e !important;
            text-shadow: 0 0 12px rgba(100, 130, 70, 0.5) !important;
        }
        #loading-overlay .spinner, .spinner-border {
            border-color: #7aab55 !important;
            border-right-color: transparent !important;
        }

        /* ТАБЛИЦА ЛОГОВ */
        #log-table { color: #b8d4a0 !important; }
        #log-table thead { 
            background: linear-gradient(135deg, #243624 0%, #1e301e 100%) !important;
            color: #a8cc88 !important;
        }
        #log-table th { 
            border-bottom: 1px solid #5a7a4a !important;
        }
        #log-table .first-row { 
            background: linear-gradient(135deg, #1a2a1a 0%, #1e301e 100%) !important;
            border-color: #3a5530 !important;
        }
        #log-table .second-row { 
            background: linear-gradient(135deg, #1e301e 0%, #1a2a1a 100%) !important;
            border-color: #3a5530 !important;
        }
        #log-table td { 
            border-color: #3a5030 !important;
        }

        /* Описание транзакции и ссылки */
        .td-transaction-desc { color: #9aba82 !important; font-style: italic; }
        a, .td-player-name a, .td-category a {
            color: #9bc46e !important;
            text-decoration: none !important;
            transition: all 0.25s ease;
        }
        a:hover { 
            text-shadow: 0 0 8px #6e9648 !important;
            color: #b8d4a0 !important;
        }
        .td-index { 
            background: linear-gradient(135deg, #3a5530 0%, #2d4225 100%) !important;
            color: #d4e8c0 !important;
            box-shadow: inset 0 1px 2px rgba(155, 196, 110, 0.15), 0 1px 3px rgba(0,0,0,0.2) !important;
        }

        /* САЙДБАР (Фильтры) */
        #log-filter-section {
            background: linear-gradient(135deg, #243624 0%, #1e301e 100%) !important;
            border-left: 1px solid #4a6741 !important;
            box-shadow: -3px 0 15px rgba(0,0,0,0.2) !important;
        }
        #log-filter-heading { 
            color: #a8cc88 !important;
        }
        .form-label { 
            color: #9aba82 !important;
        }

        /* ОБЫЧНЫЕ ИНПУТЫ */
        input, select, textarea, .form-control, .form-select, .dp__input {
            background: linear-gradient(135deg, #0f1a0f 0%, #152515 100%) !important;
            border: 1px solid #4a6741 !important;
            color: #c5e0b4 !important;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.3) !important;
            transition: all 0.25s ease !important;
        }
        input:focus, select:focus, textarea:focus {
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.3), 0 0 8px #7aab55 !important;
            border-color: #7aab55 !important;
            outline: none !important;
        }
        input::placeholder { color: #5a7845 !important; }

        /* ФИКС ДЛЯ MULTISELECT */
        .multiselect {
            background: linear-gradient(135deg, #0f1a0f 0%, #152515 100%) !important;
            border: 1px solid #4a6741 !important;
            color: #c5e0b4 !important;
        }
        .multiselect-dropdown {
            background: linear-gradient(135deg, #243624 0%, #1e301e 100%) !important;
            border: 1px solid #4a6741 !important;
            color: #b8d4a0 !important;
        }
        .multiselect-option {
            background: transparent !important;
            color: #b8d4a0 !important;
        }
        .multiselect-option.is-pointed {
            background: linear-gradient(135deg, #3a5530 0%, #2d4225 100%) !important;
            color: #d4e8c0 !important;
        }
        .multiselect-option.is-selected {
            background: linear-gradient(135deg, #5a8245 0%, #4a6a38 100%) !important;
            color: #e0f0cc !important;
        }
        .multiselect-single-label {
            color: #c5e0b4 !important;
            background: transparent !important;
        }
        .multiselect-tag {
            background: linear-gradient(135deg, #3a5530 0%, #2d4225 100%) !important;
            color: #d4e8c0 !important;
        }

        /* АВТОКОМПЛИТ */
        .autoComplete_wrapper > ul {
            background: linear-gradient(135deg, #243624 0%, #1e301e 100%) !important;
            border: 1px solid #4a6741 !important;
            color: #b8d4a0 !important;
        }
        .autoComplete_wrapper > ul > li {
            background: transparent !important;
            color: #b8d4a0 !important;
        }
        .autoComplete_wrapper > ul > li:hover {
            background: linear-gradient(135deg, #3a5530 0%, #2d4225 100%) !important;
            color: #d4e8c0 !important;
        }
        .autoComplete_wrapper > ul > li mark {
            color: #9bc46e !important;
            background: transparent !important;
        }

        /* МОДАЛЬНЫЕ ОКНА */
        .modal-content {
            background: linear-gradient(135deg, #243624 0%, #1e301e 100%) !important;
            border: 1px solid #5a7a4a !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4) !important;
        }
        .modal-header, .modal-footer { 
            border-color: #3a5530 !important;
        }
        .modal-title {
            color: #a8cc88 !important;
        }
        .btn-close { 
            filter: brightness(0.8) sepia(1) hue-rotate(60deg) saturate(0.5);
            opacity: 0.7 !important;
        }
        .btn-close:hover {
            opacity: 1 !important;
        }
        
        .btn-primary, .submit-btn {
            background: linear-gradient(135deg, #5a8245 0%, #4a6a38 100%) !important;
            border: none !important;
            color: #e0f0cc !important;
            font-weight: 500 !important;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3) !important;
            transition: all 0.25s ease !important;
            border-radius: 6px !important;
        }
        .btn-primary:hover, .submit-btn:hover {
            background: linear-gradient(135deg, #6a9652 0%, #5a8245 100%) !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
            transform: translateY(-1px);
            color: #f0fce4 !important;
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
            font-weight: 500;
            color: #9aba82;
            text-decoration: none;
            margin-left: auto; 
            margin-right: 15px;
            padding: 5px 10px;
            border: 1px solid #4a6741;
            border-radius: 8px;
            transition: all 0.25s ease;
            font-size: 1.15rem;
            background: rgba(30, 50, 25, 0.6);
            backdrop-filter: blur(4px);
        }
        #spring-toggle-btn:hover {
            background: rgba(90, 130, 70, 0.25);
            color: #c5e0b4;
            box-shadow: 0 0 10px rgba(100, 130, 70, 0.3);
            border-color: #6e9648;
        }
        #spring-toggle-btn.spring-mode-active {
            color: #a8cc88 !important;
            text-shadow: 0 0 6px #6e9648 !important;
            border-color: #7aab55 !important;
            background: rgba(90, 130, 70, 0.2);
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
            background: linear-gradient(135deg, #243624 0%, #1e301e 100%) !important;
            border-color: #3a5530 !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2) !important;
        }
        
        .dropdown-menu {
            background: linear-gradient(135deg, #243624 0%, #1e301e 100%) !important;
            border-color: #4a6741 !important;
        }
        .dropdown-item {
            color: #b8d4a0 !important;
        }
        .dropdown-item:hover {
            background: linear-gradient(135deg, #3a5530 0%, #2d4225 100%) !important;
            color: #d4e8c0 !important;
        }
        
        .pagination .page-link {
            background: linear-gradient(135deg, #1a2a1a 0%, #1e301e 100%) !important;
            border-color: #3a5530 !important;
            color: #9bc46e !important;
        }
        .pagination .page-link:hover {
            background: linear-gradient(135deg, #243624 0%, #1e301e 100%) !important;
            border-color: #5a7a4a !important;
            color: #c5e0b4 !important;
        }
        .pagination .active .page-link {
            background: linear-gradient(135deg, #5a8245 0%, #4a6a38 100%) !important;
            border-color: #6e9648 !important;
            color: #e0f0cc !important;
        }
    `;

    const styleElement = document.createElement('style');
    styleElement.id = 'spring-theme-styles';
    styleElement.innerText = springStyles;

    let flowersCanvas, ctx, animationFrame;
    let flowers = [];

    // Естественные зеленые оттенки для цветов (как лесная весенняя зелень)
    const flowerColors = [
        '#6e9648', // Лесной зеленый
        '#7aab55', // Яблочный
        '#5a8245', // Оливково-зеленый
        '#8bbf66', // Салатовый
        '#4a6a38', // Темно-зеленый
        '#9bc46e', // Светлый травяной
        '#658c44', // Средний лесной
        '#88b860', // Мятно-зеленый
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
            size: Math.random() * 8 + 4,
            speed: Math.random() * 0.7 + 0.3,
            wind: Math.random() * 0.4 - 0.2,
            opacity: Math.random() * 0.3 + 0.6,
            color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
            type: type,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
        };
    }

    function drawFlower(ctx, x, y, size, color, opacity, type, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.globalAlpha = opacity;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(60, 80, 40, 0.3)';
        
        const radius = size / 2;
        
        if (type === 0) {
            // Ромашка
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2;
                const petalX = Math.cos(angle) * radius * 0.7;
                const petalY = Math.sin(angle) * radius * 0.7;
                ctx.beginPath();
                ctx.ellipse(petalX, petalY, radius * 0.4, radius * 0.7, angle, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            }
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = '#c5b84a';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.15, 0, Math.PI * 2);
            ctx.fillStyle = '#a89838';
            ctx.fill();
        } 
        else if (type === 1) {
            // Тюльпан
            ctx.beginPath();
            ctx.moveTo(0, -radius);
            ctx.quadraticCurveTo(radius * 0.6, -radius * 0.2, radius * 0.45, radius * 0.35);
            ctx.quadraticCurveTo(0, radius * 0.15, -radius * 0.45, radius * 0.35);
            ctx.quadraticCurveTo(-radius * 0.6, -radius * 0.2, 0, -radius);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(0, radius * 0.25);
            ctx.lineTo(radius * 0.1, radius * 0.55);
            ctx.lineTo(-radius * 0.1, radius * 0.55);
            ctx.fillStyle = '#7aab55';
            ctx.fill();
        }
        else if (type === 2) {
            // Звездчатый цветок
            const spikes = 5;
            ctx.beginPath();
            for (let i = 0; i < spikes * 2; i++) {
                const rad = i % 2 === 0 ? radius : radius * 0.4;
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
            ctx.arc(0, 0, radius * 0.25, 0, Math.PI * 2);
            ctx.fillStyle = '#b8c46a';
            ctx.fill();
        }
        else {
            // Пышный цветок
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const petalX = Math.cos(angle) * radius * 0.5;
                const petalY = Math.sin(angle) * radius * 0.5;
                ctx.beginPath();
                ctx.ellipse(petalX, petalY, radius * 0.35, radius * 0.6, angle, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            }
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = '#b8aa50';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.15, 0, Math.PI * 2);
            ctx.fillStyle = '#a09040';
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
                btn.innerHTML = '🌱';
            } else {
                btn.classList.remove('spring-mode-active');
                btn.innerHTML = '🌱';
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
        btn.innerHTML = '🌱';
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
