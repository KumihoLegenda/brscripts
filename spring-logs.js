(function() {
    'use strict';

    const CONFIG = {
        storageKey: 'spring_flowers_v3',
        flowerCount: 55,
    };

    const springStyles = `
        /* ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ - ЖЕЛТО-ЗЕЛЕНАЯ ТЕМА */
        :root {
            --bs-body-bg: #1a2a0a !important;
            --bs-body-color: #eaff80 !important;
            --bs-card-bg: #2a3d12 !important;
            --bs-border-color: #ccff33 !important;
        }

        /* ОСНОВНОЙ ФОН */
        body, html, .main-content {
            background: linear-gradient(135deg, #1a2a0a 0%, #1f3a0a 100%) !important;
            color: #eaff80 !important;
        }

        /* НАВИГАЦИЯ */
        #site-navbar {
            background: linear-gradient(135deg, #0f1a05 0%, #1a2a0a 100%) !important;
            border-bottom: 2px solid #ccff33 !important;
            box-shadow: 0 4px 20px rgba(204, 255, 51, 0.2) !important;
        }
        .navbar-brand { 
            color: #ffff66 !important; 
            text-shadow: 0 0 15px #ccff33, 0 0 5px #99ff00 !important;
        }

        /* ЗАГРУЗОЧНЫЙ ЭКРАН */
        #loading-overlay, #loading-overlay[data-v-173ec149] {
            background: linear-gradient(135deg, #1a2a0a 0%, #1f3a0a 100%) !important;
            opacity: 1 !important;
        }
        #loading-overlay-heading, .loading-text {
            color: #ffff66 !important;
            text-shadow: 0 0 20px #ccff33, 0 0 5px #99ff00 !important;
        }
        #loading-overlay .spinner, .spinner-border {
            border-color: #ccff33 !important;
            border-right-color: transparent !important;
            filter: drop-shadow(0 0 5px #ccff33) !important;
        }

        /* ТАБЛИЦА ЛОГОВ */
        #log-table { color: #d4ff4d !important; }
        #log-table thead { 
            background: linear-gradient(135deg, #2a3d12 0%, #1f3010 100%) !important;
            color: #ffff66 !important;
            text-shadow: 0 0 5px #99ff00 !important;
        }
        #log-table th { 
            border-bottom: 2px solid #ccff33 !important;
            box-shadow: 0 2px 5px rgba(204, 255, 51, 0.2) !important;
        }
        #log-table .first-row { 
            background: linear-gradient(135deg, #1a2a0a 0%, #1f3010 100%) !important;
            border-color: #ccff33 !important;
        }
        #log-table .second-row { 
            background: linear-gradient(135deg, #1f3010 0%, #1a2a0a 100%) !important;
            border-color: #ccff33 !important;
        }
        #log-table td { 
            border-color: #3d5a1a !important;
            box-shadow: inset 0 1px 0 rgba(204, 255, 51, 0.1) !important;
        }

        /* Описание транзакции и ссылки */
        .td-transaction-desc { color: #b3ff66 !important; font-style: italic; }
        a, .td-player-name a, .td-category a {
            color: #ffff66 !important;
            text-decoration: none !important;
            text-shadow: 0 0 8px #ccff33 !important;
            transition: all 0.3s ease;
        }
        a:hover { 
            text-shadow: 0 0 15px #ffff66, 0 0 5px #ccff33 !important;
            color: #ffffaa !important;
        }
        .td-index { 
            background: linear-gradient(135deg, #4a7a1a 0%, #3a5a10 100%) !important;
            color: #ffff66 !important;
            text-shadow: 0 0 5px #99ff00 !important;
            box-shadow: inset 0 1px 2px rgba(255, 255, 102, 0.2), 0 2px 4px rgba(0,0,0,0.2) !important;
        }

        /* САЙДБАР (Фильтры) */
        #log-filter-section {
            background: linear-gradient(135deg, #2a3d12 0%, #1f3010 100%) !important;
            border-left: 2px solid #ccff33 !important;
            box-shadow: -5px 0 15px rgba(0,0,0,0.3) !important;
        }
        #log-filter-heading { 
            color: #ffff66 !important;
            text-shadow: 0 0 8px #ccff33 !important;
        }
        .form-label { 
            color: #b3ff66 !important;
            text-shadow: 0 0 3px #99ff00 !important;
        }

        /* ОБЫЧНЫЕ ИНПУТЫ */
        input, select, textarea, .form-control, .form-select, .dp__input {
            background: linear-gradient(135deg, #0f1a05 0%, #1a2a0a 100%) !important;
            border: 1px solid #ccff33 !important;
            color: #ffff99 !important;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.3), 0 0 5px rgba(204, 255, 51, 0.3) !important;
        }
        input:focus, select:focus, textarea:focus {
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.3), 0 0 10px #ccff33 !important;
            border-color: #ffff66 !important;
        }
        input::placeholder { color: #6b8a2a !important; }

        /* ФИКС ДЛЯ MULTISELECT */
        .multiselect {
            background: linear-gradient(135deg, #0f1a05 0%, #1a2a0a 100%) !important;
            border: 1px solid #ccff33 !important;
            color: #ffff99 !important;
        }
        .multiselect-dropdown {
            background: linear-gradient(135deg, #2a3d12 0%, #1f3010 100%) !important;
            border: 1px solid #ccff33 !important;
            color: #d4ff4d !important;
        }
        .multiselect-option {
            background: transparent !important;
            color: #d4ff4d !important;
        }
        .multiselect-option.is-pointed {
            background: linear-gradient(135deg, #3d5a1a 0%, #2d4a10 100%) !important;
            color: #ffff66 !important;
        }
        .multiselect-option.is-selected {
            background: linear-gradient(135deg, #7ab820 0%, #6aa810 100%) !important;
            color: #ffff66 !important;
        }
        .multiselect-single-label {
            color: #ffff99 !important;
            background: transparent !important;
        }
        .multiselect-tag {
            background: linear-gradient(135deg, #3d5a1a 0%, #2d4a10 100%) !important;
            color: #ffff66 !important;
        }

        /* АВТОКОМПЛИТ */
        .autoComplete_wrapper > ul {
            background: linear-gradient(135deg, #2a3d12 0%, #1f3010 100%) !important;
            border: 1px solid #ccff33 !important;
            color: #d4ff4d !important;
        }
        .autoComplete_wrapper > ul > li {
            background: transparent !important;
            color: #d4ff4d !important;
        }
        .autoComplete_wrapper > ul > li:hover {
            background: linear-gradient(135deg, #3d5a1a 0%, #2d4a10 100%) !important;
            color: #ffff66 !important;
        }
        .autoComplete_wrapper > ul > li mark {
            color: #ffff66 !important;
            background: transparent !important;
        }

        /* МОДАЛЬНЫЕ ОКНА */
        .modal-content {
            background: linear-gradient(135deg, #2a3d12 0%, #1f3010 100%) !important;
            border: 1px solid #ccff33 !important;
            box-shadow: 0 10px 40px rgba(204, 255, 51, 0.3) !important;
        }
        .modal-header, .modal-footer { 
            border-color: #ccff33 !important;
        }
        .modal-title {
            color: #ffff66 !important;
            text-shadow: 0 0 8px #ccff33 !important;
        }
        .btn-close { 
            filter: brightness(0) saturate(100%) invert(83%) sepia(74%) saturate(800%) hue-rotate(28deg) brightness(105%) contrast(105%);
        }
        
        .btn-primary, .submit-btn {
            background: linear-gradient(135deg, #7ab820 0%, #6aa810 100%) !important;
            border-color: #ccff33 !important;
            color: #ffff66 !important;
            font-weight: bold;
            text-shadow: 0 0 5px #99ff00 !important;
            box-shadow: 0 2px 8px rgba(204, 255, 51, 0.3) !important;
            transition: all 0.3s ease;
        }
        .btn-primary:hover, .submit-btn:hover {
            background: linear-gradient(135deg, #8ad830 0%, #7ab820 100%) !important;
            box-shadow: 0 4px 15px rgba(204, 255, 51, 0.5) !important;
            transform: translateY(-1px);
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
            color: #b3ff66;
            text-decoration: none;
            margin-left: auto; 
            margin-right: 15px;
            padding: 5px 10px;
            border: 1px solid #ccff33;
            border-radius: 8px;
            transition: all 0.3s ease;
            font-size: 1.2rem;
            background: rgba(30, 50, 10, 0.5);
            backdrop-filter: blur(4px);
            text-shadow: 0 0 5px #99ff00;
        }
        #spring-toggle-btn:hover {
            background: rgba(100, 180, 30, 0.3);
            color: #ffff66;
            box-shadow: 0 0 15px rgba(204, 255, 51, 0.4);
            border-color: #ffff66;
        }
        #spring-toggle-btn.spring-mode-active {
            color: #ffff66 !important;
            text-shadow: 0 0 12px #ccff33 !important;
            border-color: #ffff66 !important;
            background: rgba(100, 180, 30, 0.4);
        }
        @media (min-width: 992px) {
            #spring-toggle-btn {
                margin-left: 20px;
                margin-right: 0;
                order: 5;
            }
        }

        /* ДОПОЛНИТЕЛЬНЫЕ ЭФФЕКТЫ ДЛЯ КАРТОЧЕК */
        .card, .card-body {
            background: linear-gradient(135deg, #2a3d12 0%, #1f3010 100%) !important;
            border-color: #ccff33 !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3), 0 0 8px rgba(204, 255, 51, 0.2) !important;
        }
    `;

    const styleElement = document.createElement('style');
    styleElement.id = 'spring-theme-styles';
    styleElement.innerText = springStyles;

    let flowersCanvas, ctx, animationFrame;
    let flowers = [];

    // Желто-зеленые оттенки для цветов
    const flowerColors = [
        '#ffff44', // Желтый
        '#eaff44', // Желто-зеленый
        '#ccff33', // Лайм
        '#aaff22', // Салатовый
        '#88ff11', // Ярко-зеленый
        '#ffee33', // Лимонный
        '#ffdd44', // Золотистый
        '#d4ff1a'  // Зеленовато-желтый
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
            glowIntensity: Math.random() * 0.3 + 0.2
        };
    }

    function drawFlower(ctx, x, y, size, color, opacity, type, rotation, glowIntensity) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.globalAlpha = opacity;
        
        // Добавляем свечение
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(204, 255, 51, ${glowIntensity})`;
        
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
            ctx.fillStyle = '#ffee44';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.2, 0, Math.PI * 2);
            ctx.fillStyle = '#ffdd22';
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
            ctx.fillStyle = '#88ff22';
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
            ctx.fillStyle = '#ffff55';
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
            ctx.fillStyle = '#ffee55';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.2, 0, Math.PI * 2);
            ctx.fillStyle = '#ffdd33';
            ctx.fill();
        }
        
        ctx.restore();
    }

    function animateFlowers() {
        if (!ctx) return;
        ctx.clearRect(0, 0, flowersCanvas.width, flowersCanvas.height);
        
        flowers.forEach(flower => {
            drawFlower(ctx, flower.x, flower.y, flower.size, flower.color, flower.opacity, flower.type, flower.rotation, flower.glowIntensity);
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
