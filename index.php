<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Главная страница</title>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Rubik:wght@400;600&display=swap" rel="stylesheet">
    <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <link rel="stylesheet" href="styles.css">
    <script src="https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.0/firebase-database-compat.js"></script>
    <style>
        /* Стили для прелоадера */
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }

        .preloader.hidden {
            opacity: 0;
            visibility: hidden;
        }

        .loader {
            width: 60px;
            height: 60px;
            border: 5px solid rgba(0, 247, 255, 0.2);
            border-radius: 50%;
            border-top-color: var(--accent);
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }

        .day-theme .loader {
            border: 5px solid rgba(230, 115, 0, 0.2);
            border-top-color: var(--accent);
        }

        .preloader-text {
            font-size: 16px;
            color: var(--text);
            font-weight: 500;
            margin-top: 10px;
            text-align: center;
        }

        .preloader-subtext {
            font-size: 12px;
            color: var(--text);
            opacity: 0.7;
            margin-top: 5px;
            text-align: center;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Основные стили */
        body {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            opacity: 0;
            transition: opacity 0.5s ease;
        }

        body.loaded {
            opacity: 1;
        }

        .main-content {
            text-align: center;
            padding: 30px 20px;
            animation: fadeIn 1s ease;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .main-content.loaded {
            opacity: 1;
            transform: translateY(0);
        }

        h1 {
            font-size: 28px;
            margin-bottom: 20px;
            color: var(--accent);
            position: relative;
            display: inline-block;
        }

        h1::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 3px;
            background: var(--accent);
            transition: all 0.3s ease;
        }
        
        .title-spacing {
            height: 15px;
        }

        .welcome-text {
            max-width: 800px;
            margin: 0 auto 30px;
            line-height: 1.6;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .welcome-text.loaded {
            opacity: 1;
            transform: translateY(0);
        }

        .features {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 25px;
            margin-top: 40px;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .features.loaded {
            opacity: 1;
            transform: translateY(0);
        }

        .feature-card {
            border-radius: 12px;
            padding: 25px;
            width: 280px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            cursor: pointer;
            background: var(--card);
            border: 1px solid rgba(0, 255, 231, 0.2);
            position: relative;
            overflow: hidden;
            opacity: 0;
            transform: translateY(20px);
        }

        .feature-card.loaded {
            opacity: 1;
            transform: translateY(0);
        }

        .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 255, 231, 0.1), transparent);
            transition: 0.5s;
        }

        .feature-card:hover::before {
            left: 100%;
        }

        .feature-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 15px 35px rgba(0, 255, 231, 0.3);
        }

        .feature-card:active {
            transform: translateY(-4px) scale(0.98);
        }

        .day-theme .feature-card {
            border: 1px solid rgba(230, 115, 0, 0.2);
        }

        .day-theme .feature-card:hover {
            box-shadow: 0 15px 35px rgba(230, 115, 0, 0.3);
        }

        .day-theme .feature-card::before {
            background: linear-gradient(90deg, transparent, rgba(230, 115, 0, 0.1), transparent);
        }

        .feature-icon {
            font-size: 36px;
            margin-bottom: 15px;
            color: var(--accent);
            transition: all 0.3s ease;
        }

        .feature-card:hover .feature-icon {
            transform: scale(1.2) rotate(5deg);
        }

        .feature-title {
            font-size: 20px;
            margin-bottom: 12px;
            transition: all 0.3s ease;
            text-align: center;
        }

        .feature-card:hover .feature-title {
            color: var(--accent);
        }

        .info-section {
            max-width: 800px;
            margin: 40px auto 0;
            padding: 20px;
            border-top: 1px solid rgba(0, 255, 231, 0.3);
            text-align: center;
            line-height: 1.6;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .info-section.loaded {
            opacity: 1;
            transform: translateY(0);
        }

        .day-theme .info-section {
            border-top: 1px solid rgba(230, 115, 0, 0.3);
        }

        footer {
            text-align: center;
            padding: 20px;
            margin-top: 40px;
            color: var(--text);
            opacity: 0.8;
            font-size: 14px;
            opacity: 0;
            transition: opacity 0.5s ease;
        }

        footer.loaded {
            opacity: 1;
        }

        /* Стили для таймера обратного отсчета */
        .countdown-timer {
            background: var(--card);
            padding: 15px 25px;
            border-radius: 12px;
            margin: 20px auto;
            max-width: 500px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border-left: 4px solid var(--accent);
            animation: pulse 2s infinite;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .countdown-timer.loaded {
            opacity: 1;
            transform: translateY(0);
        }

        .countdown-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
            color: var(--accent);
        }

        .countdown-time {
            font-size: 24px;
            font-family: 'Fira Code', monospace;
            font-weight: bold;
            color: var(--text);
        }

        .countdown-expired {
            color: #ff4444;
            animation: blink 1s infinite;
            font-weight: bold;
        }

        .additional-days-info {
            font-size: 14px;
            margin-top: 8px;
            color: var(--text);
            opacity: 0.8;
        }

        .additional-days-info span {
            color: var(--accent);
            font-weight: 600;
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }

        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        /* Защита от скриншотов в Telegram */
        .telegram-screenshot-protection {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: black;
            z-index: 9999;
        }

        @media (prefers-color-scheme: dark) {
            .telegram-screenshot-protection {
                background-color: black;
            }
        }

        @media (prefers-color-scheme: light) {
            .telegram-screenshot-protection {
                background-color: white;
            }
        }

        /* Стили для критического состояния */
        .countdown-critical {
            border-left-color: #ff4444;
            animation: critical-pulse 0.5s infinite;
        }

        @keyframes critical-pulse {
            0% { box-shadow: 0 5px 15px rgba(255, 68, 68, 0.3); }
            50% { box-shadow: 0 5px 25px rgba(255, 68, 68, 0.6); }
            100% { box-shadow: 0 5px 15px rgba(255, 68, 68, 0.3); }
        }

        /* ============================== */
        /* МОБИЛЬНЫЕ СТИЛИ - ОПТИМИЗАЦИЯ */
        /* ============================== */
        
        @media (max-width: 768px) {
            /* Основные элементы контента */
            .main-content {
                padding: 20px 15px;
            }
            
            /* Заголовок */
            h1 {
                font-size: 22px;
                margin-bottom: 15px;
                line-height: 1.3;
                padding: 0 10px;
            }
            
            h1::after {
                width: 60px;
                bottom: -8px;
                height: 2px;
            }
            
            /* Приветственный текст */
            .welcome-text {
                font-size: 14px;
                line-height: 1.5;
                margin-bottom: 25px;
                padding: 0 10px;
                opacity: 0.9;
            }
            
            /* Контейнер карточек */
            .features {
                gap: 15px;
                margin-top: 30px;
            }
            
            /* Карточки функций */
            .feature-card {
                width: calc(50% - 10px);
                min-width: 160px;
                padding: 18px 12px;
                border-radius: 10px;
            }
            
            .feature-icon {
                font-size: 28px;
                margin-bottom: 12px;
            }
            
            .feature-title {
                font-size: 16px;
                margin-bottom: 8px;
                font-weight: 600;
            }
            
            /* Информационная секция */
            .info-section {
                margin-top: 30px;
                padding: 15px;
                font-size: 14px;
                line-height: 1.5;
            }
            
            .info-section p {
                margin-bottom: 12px;
                opacity: 0.85;
            }
            
            /* Таймер обратного отсчета */
            .countdown-timer {
                padding: 12px 18px;
                margin: 15px auto;
                border-radius: 10px;
            }
            
            .countdown-title {
                font-size: 16px;
                margin-bottom: 8px;
            }
            
            .countdown-time {
                font-size: 18px;
            }
            
            .additional-days-info {
                font-size: 12px;
                margin-top: 6px;
            }
            
            /* Футер */
            footer {
                padding: 15px;
                margin-top: 30px;
                font-size: 12px;
                opacity: 0.7;
            }
            
            /* Прелоадер для мобильных */
            .preloader-text {
                font-size: 14px;
                padding: 0 20px;
            }
            
            .preloader-subtext {
                font-size: 11px;
                padding: 0 20px;
            }
        }
        
        @media (max-width: 480px) {
            /* Дополнительная оптимизация для маленьких экранов */
            .main-content {
                padding: 15px 10px;
            }
            
            h1 {
                font-size: 20px;
                margin-bottom: 12px;
            }
            
            .welcome-text {
                font-size: 13px;
                line-height: 1.4;
                margin-bottom: 20px;
            }
            
            .features {
                flex-direction: column;
                align-items: center;
                gap: 12px;
            }
            
            .feature-card {
                width: 100%;
                max-width: 280px;
                padding: 16px 15px;
            }
            
            .feature-icon {
                font-size: 32px;
            }
            
            .feature-title {
                font-size: 17px;
            }
            
            .info-section {
                padding: 12px;
                font-size: 13px;
                line-height: 1.45;
            }
            
            .countdown-timer {
                padding: 10px 15px;
            }
            
            .countdown-title {
                font-size: 15px;
            }
            
            .countdown-time {
                font-size: 16px;
                font-family: 'Rubik', sans-serif;
            }
            
            /* Уменьшаем отступы для очень маленьких экранов */
            .container {
                padding: 0 8px;
            }
            
            /* Оптимизация хедера для мобильных */
            header {
                padding: 10px 12px;
            }
            
            .logo {
                font-size: 16px;
            }
            
            .user-profile {
                font-size: 14px;
            }
            
            /* Стили для кнопки переключения темы на мобильных */
            .theme-toggle {
                padding: 0 !important;
                width: 40px !important;
                height: 40px !important;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                min-width: 40px !important;
            }
            
            .theme-toggle #themeText {
                display: none !important;
            }
            
            .theme-toggle #themeIcon {
                margin: 0 !important;
                font-size: 20px;
                display: block !important;
            }
            
            /* Сдвигаем блок пользователя вправо */
            .user-info {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .user-profile {
                margin-right: 4px;
            }
        }
        
        /* Оптимизация для средних планшетов */
        @media (min-width: 481px) and (max-width: 768px) {
            .feature-card {
                width: calc(50% - 8px);
                padding: 20px 15px;
            }
            
            .feature-title {
                font-size: 16px;
            }
            
            .info-section {
                font-size: 14.5px;
                line-height: 1.55;
            }
        }
        
        /* Плавное масштабирование шрифтов */
        @media (max-width: 768px) {
            html {
                font-size: 14px;
            }
        }
        
        @media (max-width: 480px) {
            html {
                font-size: 13px;
            }
        }
    </style>
</head>
<body class="night-theme">
    <!-- Прелоадер -->
    <div class="preloader" id="preloader">
        <div class="loader"></div>
        <div class="preloader-text">Загрузка данных...</div>
        <div class="preloader-subtext">Пожалуйста, подождите</div>
    </div>

    <!-- Защита от скриншотов для Telegram -->
    <div class="telegram-screenshot-protection" id="screenshotProtection"></div>

    <header>
        <div class="logo">Учебный центр</div>
        <div class="user-info">
            <div class="user-profile">
                <span class="username" id="username"></span>
                <button class="logout-btn" id="logoutBtn">Выйти</button>
            </div>
            <button class="theme-toggle" id="themeToggle">
                <span id="themeIcon">🌙</span> <span id="themeText">Ночь</span>
            </button>
        </div>
    </header>

    <div class="container">
        <div class="main-content">
            <h1>Добро пожаловать в учебный центр технического отдела</h1>
            
            <!-- Пустая строчка для отступа от заголовка -->
            <div class="title-spacing"></div>
            
            <!-- Контейнер для таймера обратного отсчета -->
            <div id="countdownContainer" class="countdown-timer" style="display: none;">
                <div class="countdown-title">До завершения обучения осталось:</div>
                <div class="countdown-time" id="countdownTimer"></div>
                <div class="additional-days-info" id="additionalDaysInfo" style="display: none;"></div>
            </div>
            
            <p class="welcome-text">Здесь мы обучим тебя в формате интерактивных курсов, которые помогут тебе хорошо усвоить информацию.</p>
            
            <div class="features">
                <div class="feature-card" onclick="window.location.href='vazhno.php'" data-aos="fade-up">
                    <div class="feature-icon">📢</div>
                    <h3 class="feature-title">Важная информация отдела</h3>
                </div>
                <div class="feature-card" onclick="window.location.href='курсылоги.php'" id="coursesCard" data-aos="fade-up" data-aos-delay="100">
                    <div class="feature-icon">📚</div>
                    <h3 class="feature-title">Курсы для тех. специалистов</h3>
                </div>
                <div class="feature-card" onclick="window.location.href='admpanel.php'" id="adminPanelCard" data-aos="fade-up" data-aos-delay="200">
                    <div class="feature-icon">⚙️</div>
                    <h3 class="feature-title">Панель управления</h3>
                </div>
                <div class="feature-card" onclick="window.location.href='profile.php?userId=' + currentUserId + '&viewerId=' + currentUserId" id="accountCard" data-aos="fade-up" data-aos-delay="300">
                    <div class="feature-icon">👤</div>
                    <h3 class="feature-title">Мой аккаунт</h3>
                </div>
            </div>

            <div class="info-section">
                <p>Учебный центр – это ваш надежный проводник в процессе адаптации к новой должности. Здесь вы получите все необходимые знания о работе отдела, своих обязанностях и используемых системах.</p>

                <p>Обучение проходит поэтапно: завершив один модуль, вы сразу получаете доступ к следующему. Это позволяет осваивать знания последовательно и эффективно.</p>

                <p>После успешного прохождения курса ваши руководители автоматически получат уведомление о ваших результатах.</p>

                <p>Если в процессе обучения у вас возникнут вопросы или сложности, вы всегда можете обратиться за помощью к куратору или его заместителю.</p>

                <p>Мы создали этот центр, чтобы ваш переход на новую должность был максимально комфортным и продуктивным! 🚀</p>
            </div>
        </div>
    </div>

    <footer class="footer">
        <p>© Все права защищены "Техническая империя"</p>
    </footer>

    <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/js-sha256/0.9.0/sha256.min.js"></script>
    <script>
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });

        // Загружаем конфигурацию Firebase из PHP
        const firebaseConfig = <?php
            // Подключаем файл с конфигурацией Firebase
            require_once 'firebase-config.php';
            
            // Получаем конфигурацию из файла
            $config = getFirebaseConfig();
            
            // Преобразуем PHP массив в JSON для JavaScript
            echo json_encode($config, JSON_UNESCAPED_SLASHES);
        ?>;

        const app = firebase.initializeApp(firebaseConfig);
        const database = firebase.database();
        let currentUserId = null;
        let countdownInterval = null;

        // Функция для хеширования пароля
        function hashPassword(password) {
            const salt = "teach-center-salt-2023";
            return sha256(password + salt);
        }

        // Функция для проверки существования пользователя
        async function checkUserExists(userId) {
            try {
                const snapshot = await database.ref('users/' + userId).once('value');
                if (!snapshot.exists()) {
                    return false;
                }
                
                const userData = snapshot.val();
                // Проверяем, не удален ли пользователь
                if (userData.isDeleted) {
                    return false;
                }
                
                return userData;
            } catch (error) {
                console.error('Ошибка проверки пользователя:', error);
                return false;
            }
        }

        // Функция для сохранения активности пользователя
        async function saveUserActivity(userId, pageName) {
            try {
                const updates = {
                    lastActivity: {
                        timestamp: Date.now(),
                        page: pageName,
                        pageUrl: window.location.pathname + window.location.search
                    }
                };
                
                await database.ref('users/' + userId).update(updates);
            } catch (error) {
                console.error('Ошибка сохранения активности:', error);
            }
        }

        // Функция для получения названия страницы по URL
        function getPageNameFromUrl() {
            const path = window.location.pathname;
            const pageNames = {
                'index.php': 'Главная страница',
                'profile.php': 'Профиль пользователя',
                'admpanel.php': 'Панель управления',
                'vazhno.php': 'Важная информация отдела',
                'курсылоги.php': 'Курсы для тех. специалистов'
            };
            
            const fileName = path.split('/').pop();
            return pageNames[fileName] || fileName;
        }

        // Функция для расчета времени жизни аккаунта
        function calculateAccountLifetime(userData) {
            if (!userData.createdAt) {
                return {
                    totalLifetimeMs: 10 * 24 * 60 * 60 * 1000,
                    baseLifetimeMs: 10 * 24 * 60 * 60 * 1000,
                    additionalDays: 0,
                    endDate: new Date(Date.now() + (10 * 24 * 60 * 60 * 1000))
                };
            }
            
            const baseLifetimeDays = 10;
            const baseLifetimeMs = baseLifetimeDays * 24 * 60 * 60 * 1000;
            const additionalDays = userData.additionalDays || 0;
            const additionalLifetimeMs = additionalDays * 24 * 60 * 60 * 1000;
            const totalLifetimeMs = baseLifetimeMs + additionalLifetimeMs;
            
            const startDate = new Date(userData.createdAt);
            const endDate = new Date(startDate.getTime() + totalLifetimeMs);
            
            return {
                totalLifetimeMs,
                baseLifetimeMs,
                additionalDays,
                endDate,
                startDate
            };
        }

        // Функция для проверки статуса аккаунта
        function checkAccountStatus(userData) {
            if (!userData || userData.role !== "Технический специалист") {
                return {
                    isExpired: false,
                    hasAccessToCourses: true
                };
            }
            
            if (!userData.createdAt) {
                return {
                    isExpired: false,
                    hasAccessToCourses: true
                };
            }
            
            const baseLifetimeDays = 10;
            const baseLifetimeMs = baseLifetimeDays * 24 * 60 * 60 * 1000;
            const additionalDays = userData.additionalDays || 0;
            const totalLifetimeMs = baseLifetimeMs + (additionalDays * 24 * 60 * 60 * 1000);
            
            const startDate = new Date(userData.createdAt);
            const endDate = new Date(startDate.getTime() + totalLifetimeMs);
            const now = new Date();
            
            const isExpired = now > endDate;
            const hasAccessToCourses = !isExpired;
            
            return {
                isExpired,
                hasAccessToCourses,
                endDate
            };
        }

        // Функция для отображения обратного отсчета
        function startCountdown(userData) {
            const countdownContainer = document.getElementById('countdownContainer');
            const countdownTimer = document.getElementById('countdownTimer');
            const additionalDaysInfo = document.getElementById('additionalDaysInfo');
            
            if (!userData || !userData.createdAt) {
                countdownContainer.style.display = 'none';
                return;
            }
            
            const accountStatus = checkAccountStatus(userData);
            
            if (accountStatus.isExpired) {
                // Если время истекло
                countdownTimer.innerHTML = '<span class="countdown-expired">Время обучения истекло!</span>';
                countdownTimer.classList.add('countdown-expired');
                countdownContainer.classList.add('countdown-critical');
                countdownContainer.style.display = 'block';
                
                if (userData.additionalDays > 0) {
                    additionalDaysInfo.innerHTML = `Дополнительных дней: <span>${userData.additionalDays}</span> (использованы)`;
                    additionalDaysInfo.style.display = 'block';
                }
                
                // Скрываем кнопку курсов
                const coursesCard = document.getElementById('coursesCard');
                if (coursesCard) {
                    coursesCard.style.display = 'none';
                }
                
                clearInterval(countdownInterval);
                return;
            }
            
            const accountLifetime = calculateAccountLifetime(userData);
            const endDate = accountLifetime.endDate;
            
            function updateCountdown() {
                const now = new Date();
                const timeLeft = endDate - now;
                
                if (timeLeft <= 0) {
                    countdownTimer.innerHTML = '<span class="countdown-expired">Время истекло!</span>';
                    countdownTimer.classList.add('countdown-expired');
                    countdownContainer.classList.add('countdown-critical');
                    
                    // Скрываем кнопку курсов
                    const coursesCard = document.getElementById('coursesCard');
                    if (coursesCard) {
                        coursesCard.style.display = 'none';
                    }
                    
                    if (accountLifetime.additionalDays > 0) {
                        additionalDaysInfo.innerHTML = `Дополнительных дней: <span>${accountLifetime.additionalDays}</span> (использованы)`;
                        additionalDaysInfo.style.display = 'block';
                    }
                    
                    clearInterval(countdownInterval);
                    return;
                }
                
                const totalSeconds = Math.floor(timeLeft / 1000);
                const days = Math.floor(totalSeconds / (3600 * 24));
                const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = Math.floor(totalSeconds % 60);
                
                // Форматирование времени с ведущими нулями
                const formatTime = (value) => value.toString().padStart(2, '0');
                
                countdownTimer.textContent = `${days}д ${formatTime(hours)}ч ${formatTime(minutes)}м ${formatTime(seconds)}с`;
                
                // Проверяем, использует ли пользователь дополнительные дни
                const baseEndDate = new Date(accountLifetime.startDate.getTime() + accountLifetime.baseLifetimeMs);
                const isUsingAdditionalDays = now > baseEndDate;
                
                // Обновляем информацию о дополнительных днях
                if (accountLifetime.additionalDays > 0) {
                    if (isUsingAdditionalDays) {
                        // Рассчитываем использованные дополнительные дни
                        const additionalMsUsed = now - baseEndDate;
                        const additionalDaysUsed = Math.floor(additionalMsUsed / (24 * 60 * 60 * 1000));
                        const remainingAdditionalDays = Math.max(0, accountLifetime.additionalDays - additionalDaysUsed);
                        
                        additionalDaysInfo.innerHTML = `Дополнительных дней: <span>${accountLifetime.additionalDays}</span> (осталось: ${remainingAdditionalDays})`;
                        
                        // Если осталось мало дополнительных дней, показываем предупреждение
                        if (remainingAdditionalDays <= 3) {
                            countdownContainer.classList.add('countdown-critical');
                        } else {
                            countdownContainer.classList.remove('countdown-critical');
                        }
                    } else {
                        additionalDaysInfo.innerHTML = `Дополнительных дней: <span>${accountLifetime.additionalDays}</span> (еще не начаты)`;
                        countdownContainer.classList.remove('countdown-critical');
                    }
                    additionalDaysInfo.style.display = 'block';
                } else {
                    additionalDaysInfo.style.display = 'none';
                }
                
                // Если осталось меньше 3 дней, показываем предупреждение
                if (days <= 3 && days > 0) {
                    countdownContainer.classList.add('countdown-critical');
                } else if (days > 3) {
                    countdownContainer.classList.remove('countdown-critical');
                }
            }
            
            updateCountdown();
            countdownInterval = setInterval(updateCountdown, 1000);
            countdownContainer.style.display = 'block';
        }

        // Защита от скриншотов в Telegram WebView
        function setupTelegramScreenshotProtection() {
            const isTelegramWebView = window.navigator.userAgent.includes('TelegramWebApp');
            const screenshotProtection = document.getElementById('screenshotProtection');
            
            if (isTelegramWebView) {
                // Показываем защитный слой при попытке сделать скриншот
                document.addEventListener('visibilitychange', function() {
                    if (document.visibilityState === 'hidden') {
                        screenshotProtection.style.display = 'block';
                    } else {
                        screenshotProtection.style.display = 'none';
                    }
                });
                
                // Дополнительная защита на случай изменения размера окна (может срабатывать при скриншоте)
                let lastWidth = window.innerWidth;
                let lastHeight = window.innerHeight;
                
                window.addEventListener('resize', function() {
                    if (window.innerWidth !== lastWidth || window.innerHeight !== lastHeight) {
                        screenshotProtection.style.display = 'block';
                        setTimeout(() => {
                            screenshotProtection.style.display = 'none';
                        }, 1000);
                    }
                    lastWidth = window.innerWidth;
                    lastHeight = window.innerHeight;
                });
            }
        }

        // Защита от копирования и скриншотов
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });

        document.addEventListener('keydown', function(e) {
            // Блокировка Print Screen, Ctrl+P, Ctrl+S
            if (e.key === 'PrintScreen' || 
                (e.ctrlKey && (e.key === 'p' || e.key === 'P' || e.key === 's' || e.key === 'S'))) {
                e.preventDefault();
                return false;
            }
            // Блокировка Ctrl+C, Ctrl+X, Ctrl+A, Ctrl+Shift+I, F12
            if (e.ctrlKey && (e.key === 'c' || e.key === 'x' || e.key === 'a' || e.key === 'i' || e.key === 'I') || 
                e.key === 'F12') {
                e.preventDefault();
                return false;
            }
        });

        // Защита от перетаскивания изображений
        document.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });

        // Запрет выделения текста
        document.addEventListener('selectstart', function(e) {
            e.preventDefault();
            return false;
        });

        // Функция для скрытия прелоадера и показа основного контента
        function showMainContent() {
            const preloader = document.getElementById('preloader');
            const body = document.body;
            
            // Скрываем прелоадер
            preloader.classList.add('hidden');
            
            // Показываем основной контент
            setTimeout(() => {
                body.classList.add('loaded');
                document.querySelector('.main-content').classList.add('loaded');
                document.querySelector('.welcome-text').classList.add('loaded');
                document.querySelector('.features').classList.add('loaded');
                document.querySelector('.info-section').classList.add('loaded');
                document.querySelector('.footer').classList.add('loaded');
                
                // Анимируем появление карточек
                const featureCards = document.querySelectorAll('.feature-card');
                featureCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('loaded');
                    }, index * 200);
                });
                
                // Показываем таймер, если он есть
                const countdownTimer = document.getElementById('countdownContainer');
                if (countdownTimer && countdownTimer.style.display !== 'none') {
                    setTimeout(() => {
                        countdownTimer.classList.add('loaded');
                    }, featureCards.length * 200 + 200);
                }
            }, 500);
        }

        // Функция для обновления интерфейса на основе роли пользователя
        function updateInterfaceBasedOnRole(userExists) {
            const adminRoles = [
                "Куратор тех. специалистов",
                "Куратор учебного центра",
                "Руководство отдела",
                "Разработчик"
            ];
            
            // Проверяем роль для отображения панели управления
            if (!adminRoles.includes(userExists.role)) {
                document.getElementById('adminPanelCard').style.display = 'none';
            }
            
            // Проверяем роль для отображения кнопки "Мой аккаунт"
            const techSpecialistRoles = [
                "Технический специалист"
            ];
            
            if (techSpecialistRoles.includes(userExists.role)) {
                document.getElementById('accountCard').style.display = 'block';
                // Обновляем ссылку с ID пользователя
                document.getElementById('accountCard').setAttribute('onclick', `window.location.href='profile.php?userId=${currentUserId}'`);
                
                // Загружаем данные пользователя для получения даты создания
                database.ref('users/' + currentUserId).once('value').then(snapshot => {
                    const userData = snapshot.val();
                    if (userData) {
                        // Проверяем статус аккаунта
                        const accountStatus = checkAccountStatus(userData);
                        
                        // Если время истекло, скрываем кнопку курсов
                        if (!accountStatus.hasAccessToCourses) {
                            const coursesCard = document.getElementById('coursesCard');
                            if (coursesCard) {
                                coursesCard.style.display = 'none';
                            }
                        }
                        
                        if (userData.createdAt) {
                            startCountdown(userData);
                        }
                    }
                });
            } else {
                document.getElementById('accountCard').style.display = 'none';
            }
        }

        // Основная функция инициализации
        async function initializePage() {
            const themeToggle = document.getElementById('themeToggle');
            const themeIcon = document.getElementById('themeIcon');
            const themeText = document.getElementById('themeText');
            
            // Обновляем текст прелоадера
            document.querySelector('.preloader-text').textContent = 'Проверка авторизации...';
            
            // Проверяем пользователя сначала в localStorage, потом в sessionStorage
            let currentUser = null;
            const localStorageUser = localStorage.getItem('currentUser');
            const sessionStorageUser = sessionStorage.getItem('currentUser');
            
            if (localStorageUser) {
                try {
                    currentUser = JSON.parse(localStorageUser);
                } catch (e) {
                    console.error('Ошибка парсинга пользователя из localStorage:', e);
                    localStorage.removeItem('currentUser');
                }
            } else if (sessionStorageUser) {
                try {
                    currentUser = JSON.parse(sessionStorageUser);
                    // Также сохраняем в localStorage для постоянного хранения
                    localStorage.setItem('currentUser', sessionStorageUser);
                } catch (e) {
                    console.error('Ошибка парсинга пользователя из sessionStorage:', e);
                    sessionStorage.removeItem('currentUser');
                }
            }
            
            // Если пользователь не найден, перенаправляем на страницу входа
            if (!currentUser) {
                window.location.href = 'login.php';
                return;
            }
            
            // Обновляем текст прелоадера
            document.querySelector('.preloader-text').textContent = 'Загрузка данных пользователя...';
            
            // Проверяем, существует ли пользователь в базе данных
            const userExists = await checkUserExists(currentUser.id);
            
            if (!userExists) {
                // Пользователь удален или не существует, очищаем сохраненные данные
                localStorage.removeItem('currentUser');
                sessionStorage.removeItem('currentUser');
                window.location.href = 'login.php';
                return;
            }
            
            // Обновляем информацию о пользователе
            currentUserId = currentUser.id;
            const usernameElement = document.getElementById('username');
            usernameElement.textContent = userExists.username;
            
            // Обновляем текст прелоадера
            document.querySelector('.preloader-text').textContent = 'Сохранение активности...';
            
            // Сохраняем активность пользователя
            const pageName = getPageNameFromUrl();
            await saveUserActivity(currentUserId, pageName);
            
            // Theme toggle
            themeToggle.addEventListener('click', () => {
                const isNightTheme = document.body.classList.contains('night-theme');
                
                if (isNightTheme) {
                    // Переключаем на дневную тему
                    document.body.classList.remove('night-theme');
                    document.body.classList.add('day-theme');
                    themeIcon.textContent = '☀️';
                    themeText.textContent = 'День';
                    localStorage.setItem('theme', 'day');
                } else {
                    // Переключаем на ночную тему
                    document.body.classList.remove('day-theme');
                    document.body.classList.add('night-theme');
                    themeIcon.textContent = '🌙';
                    themeText.textContent = 'Ночь';
                    localStorage.setItem('theme', 'night');
                }
            });
            
            // Проверяем сохраненную тему
            if (localStorage.getItem('theme') === 'day') {
                document.body.classList.remove('night-theme');
                document.body.classList.add('day-theme');
                themeIcon.textContent = '☀️';
                themeText.textContent = 'День';
            } else {
                document.body.classList.remove('day-theme');
                document.body.classList.add('night-theme');
                themeIcon.textContent = '🌙';
                themeText.textContent = 'Ночь';
            }
            
            // Обновляем текст прелоадера
            document.querySelector('.preloader-text').textContent = 'Настройка интерфейса...';
            
            // Обновляем интерфейс на основе роли пользователя
            updateInterfaceBasedOnRole(userExists);
            
            // Обработка выхода
            document.getElementById('logoutBtn').addEventListener('click', () => {
                if (countdownInterval) {
                    clearInterval(countdownInterval);
                }
                // Очищаем оба хранилища
                localStorage.removeItem('currentUser');
                sessionStorage.removeItem('currentUser');
                window.location.href = 'login.php';
            });

            // Инициализация защиты от скриншотов для Telegram
            setupTelegramScreenshotProtection();
            
            // Показываем основной контент
            setTimeout(showMainContent, 300);
        }

        // Запускаем инициализацию при загрузке DOM
        document.addEventListener('DOMContentLoaded', initializePage);
    </script>
</body>
</html>