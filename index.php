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

        body {
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

        /* Мобильные стили */
        @media (max-width: 768px) {
            .main-content { padding: 20px 15px; }
            h1 { font-size: 22px; }
            .feature-card { width: calc(50% - 10px); min-width: 160px; padding: 18px 12px; }
            .feature-icon { font-size: 28px; }
            .feature-title { font-size: 16px; }
            .countdown-time { font-size: 18px; }
        }
        
        @media (max-width: 480px) {
            .features { flex-direction: column; align-items: center; }
            .feature-card { width: 100%; max-width: 280px; }
            .theme-toggle #themeText { display: none; }
            .theme-toggle #themeIcon { margin: 0; font-size: 20px; display: block; }
        }
    </style>
</head>
<body class="night-theme">
    <div class="preloader" id="preloader">
        <div class="loader"></div>
        <div class="preloader-text">Загрузка данных...</div>
        <div class="preloader-subtext">Пожалуйста, подождите</div>
    </div>

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
            <div class="title-spacing"></div>
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
        AOS.init({ duration: 800, easing: 'ease-in-out', once: true });

        const firebaseConfig = <?php
            require_once 'firebase-config.php';
            $config = getFirebaseConfig();
            echo json_encode($config, JSON_UNESCAPED_SLASHES);
        ?>;

        const app = firebase.initializeApp(firebaseConfig);
        const database = firebase.database();
        let currentUserId = null;
        let countdownInterval = null;

        function hashPassword(password) {
            const salt = "teach-center-salt-2023";
            return sha256(password + salt);
        }

        async function checkUserExists(userId) {
            try {
                const snapshot = await database.ref('users/' + userId).once('value');
                if (!snapshot.exists()) return false;
                const userData = snapshot.val();
                if (userData.isDeleted) return false;
                return userData;
            } catch (error) {
                console.error('Ошибка проверки пользователя:', error);
                return false;
            }
        }

        async function saveUserActivity(userId, pageName) {
            try {
                await database.ref('users/' + userId).update({
                    lastActivity: { timestamp: Date.now(), page: pageName, pageUrl: window.location.pathname }
                });
            } catch (error) {
                console.error('Ошибка сохранения активности:', error);
            }
        }

        function getPageNameFromUrl() {
            const path = window.location.pathname;
            const pageNames = {
                'index.php': 'Главная страница', 'profile.php': 'Профиль пользователя',
                'admpanel.php': 'Панель управления', 'vazhno.php': 'Важная информация отдела',
                'курсылоги.php': 'Курсы для тех. специалистов'
            };
            const fileName = path.split('/').pop();
            return pageNames[fileName] || fileName;
        }

        function calculateAccountLifetime(userData) {
            const baseLifetimeDays = 10;
            const baseLifetimeMs = baseLifetimeDays * 24 * 60 * 60 * 1000;
            const additionalDays = userData.additionalDays || 0;
            const additionalLifetimeMs = additionalDays * 24 * 60 * 60 * 1000;
            const totalLifetimeMs = baseLifetimeMs + additionalLifetimeMs;
            const startDate = new Date(userData.createdAt);
            const endDate = new Date(startDate.getTime() + totalLifetimeMs);
            return { totalLifetimeMs, baseLifetimeMs, additionalDays, endDate, startDate };
        }

        function checkAccountStatus(userData) {
            if (!userData || userData.role !== "Технический специалист") {
                return { isExpired: false, hasAccessToCourses: true };
            }
            if (!userData.createdAt) return { isExpired: false, hasAccessToCourses: true };
            const baseLifetimeDays = 10;
            const baseLifetimeMs = baseLifetimeDays * 24 * 60 * 60 * 1000;
            const additionalDays = userData.additionalDays || 0;
            const totalLifetimeMs = baseLifetimeMs + (additionalDays * 24 * 60 * 60 * 1000);
            const startDate = new Date(userData.createdAt);
            const endDate = new Date(startDate.getTime() + totalLifetimeMs);
            const now = new Date();
            const isExpired = now > endDate;
            return { isExpired, hasAccessToCourses: !isExpired, endDate };
        }

        function startCountdown(userData) {
            const container = document.getElementById('countdownContainer');
            const timerEl = document.getElementById('countdownTimer');
            const infoEl = document.getElementById('additionalDaysInfo');
            if (!userData || !userData.createdAt) { container.style.display = 'none'; return; }
            const status = checkAccountStatus(userData);
            if (status.isExpired) {
                timerEl.innerHTML = '<span class="countdown-expired">Время обучения истекло!</span>';
                container.style.display = 'block';
                if (userData.additionalDays > 0) infoEl.innerHTML = `Дополнительных дней: <span>${userData.additionalDays}</span> (использованы)`;
                infoEl.style.display = 'block';
                document.getElementById('coursesCard').style.display = 'none';
                clearInterval(countdownInterval);
                return;
            }
            const lifetime = calculateAccountLifetime(userData);
            const endDate = lifetime.endDate;
            function update() {
                const now = new Date();
                const left = endDate - now;
                if (left <= 0) {
                    timerEl.innerHTML = '<span class="countdown-expired">Время истекло!</span>';
                    container.classList.add('countdown-critical');
                    document.getElementById('coursesCard').style.display = 'none';
                    if (lifetime.additionalDays > 0) infoEl.innerHTML = `Дополнительных дней: <span>${lifetime.additionalDays}</span> (использованы)`;
                    clearInterval(countdownInterval);
                    return;
                }
                const sec = Math.floor(left / 1000);
                const days = Math.floor(sec / 86400);
                const hours = Math.floor((sec % 86400) / 3600);
                const mins = Math.floor((sec % 3600) / 60);
                const secs = sec % 60;
                timerEl.textContent = `${days}д ${hours.toString().padStart(2,'0')}ч ${mins.toString().padStart(2,'0')}м ${secs.toString().padStart(2,'0')}с`;
                if (lifetime.additionalDays > 0) {
                    const baseEnd = new Date(lifetime.startDate.getTime() + lifetime.baseLifetimeMs);
                    const usingAdditional = now > baseEnd;
                    if (usingAdditional) {
                        const used = Math.floor((now - baseEnd) / (24*3600*1000));
                        const remaining = Math.max(0, lifetime.additionalDays - used);
                        infoEl.innerHTML = `Дополнительных дней: <span>${lifetime.additionalDays}</span> (осталось: ${remaining})`;
                        if (remaining <= 3) container.classList.add('countdown-critical');
                    } else {
                        infoEl.innerHTML = `Дополнительных дней: <span>${lifetime.additionalDays}</span> (еще не начаты)`;
                    }
                    infoEl.style.display = 'block';
                }
                if (days <= 3 && days > 0) container.classList.add('countdown-critical');
                else container.classList.remove('countdown-critical');
            }
            update();
            countdownInterval = setInterval(update, 1000);
            container.style.display = 'block';
        }

        function showMainContent() {
            const preloader = document.getElementById('preloader');
            preloader.classList.add('hidden');
            setTimeout(() => {
                document.body.classList.add('loaded');
                document.querySelector('.main-content').classList.add('loaded');
                document.querySelector('.welcome-text').classList.add('loaded');
                document.querySelector('.features').classList.add('loaded');
                document.querySelector('.info-section').classList.add('loaded');
                document.querySelector('.footer').classList.add('loaded');
                const cards = document.querySelectorAll('.feature-card');
                cards.forEach((c, i) => setTimeout(() => c.classList.add('loaded'), i * 200));
                const timerDiv = document.getElementById('countdownContainer');
                if (timerDiv && timerDiv.style.display !== 'none') setTimeout(() => timerDiv.classList.add('loaded'), cards.length * 200 + 200);
            }, 500);
        }

        function updateInterfaceBasedOnRole(userExists) {
            const adminRoles = ["Куратор тех. специалистов", "Куратор учебного центра", "Руководство отдела", "Разработчик"];
            if (!adminRoles.includes(userExists.role)) document.getElementById('adminPanelCard').style.display = 'none';
            const techRoles = ["Технический специалист"];
            if (techRoles.includes(userExists.role)) {
                document.getElementById('accountCard').style.display = 'block';
                document.getElementById('accountCard').setAttribute('onclick', `window.location.href='profile.php?userId=${currentUserId}'`);
                database.ref('users/' + currentUserId).once('value').then(snap => {
                    const data = snap.val();
                    if (data) {
                        const status = checkAccountStatus(data);
                        if (!status.hasAccessToCourses) document.getElementById('coursesCard').style.display = 'none';
                        if (data.createdAt) startCountdown(data);
                    }
                });
            } else {
                document.getElementById('accountCard').style.display = 'none';
            }
        }

        async function initializePage() {
            const themeToggle = document.getElementById('themeToggle');
            const themeIcon = document.getElementById('themeIcon');
            const themeText = document.getElementById('themeText');
            
            let currentUser = null;
            const localUser = localStorage.getItem('currentUser');
            const sessionUser = sessionStorage.getItem('currentUser');
            if (localUser) try { currentUser = JSON.parse(localUser); } catch(e) { localStorage.removeItem('currentUser'); }
            else if (sessionUser) try { currentUser = JSON.parse(sessionUser); localStorage.setItem('currentUser', sessionUser); } catch(e) { sessionStorage.removeItem('currentUser'); }
            
            if (!currentUser) { window.location.href = 'login.php'; return; }
            
            const userExists = await checkUserExists(currentUser.id);
            if (!userExists) {
                localStorage.removeItem('currentUser');
                sessionStorage.removeItem('currentUser');
                window.location.href = 'login.php';
                return;
            }
            
            currentUserId = currentUser.id;
            document.getElementById('username').textContent = userExists.username;
            await saveUserActivity(currentUserId, getPageNameFromUrl());
            
            themeToggle.addEventListener('click', () => {
                const isNight = document.body.classList.contains('night-theme');
                if (isNight) {
                    document.body.classList.remove('night-theme');
                    document.body.classList.add('day-theme');
                    themeIcon.textContent = '☀️';
                    themeText.textContent = 'День';
                    localStorage.setItem('theme', 'day');
                } else {
                    document.body.classList.remove('day-theme');
                    document.body.classList.add('night-theme');
                    themeIcon.textContent = '🌙';
                    themeText.textContent = 'Ночь';
                    localStorage.setItem('theme', 'night');
                }
            });
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
            
            updateInterfaceBasedOnRole(userExists);
            document.getElementById('logoutBtn').addEventListener('click', () => {
                if (countdownInterval) clearInterval(countdownInterval);
                localStorage.removeItem('currentUser');
                sessionStorage.removeItem('currentUser');
                window.location.href = 'login.php';
            });
            
            // Мягкая защита только от контекстного меню (можно убрать)
            document.addEventListener('contextmenu', (e) => { e.preventDefault(); return false; });
            
            showMainContent();
        }

        document.addEventListener('DOMContentLoaded', initializePage);
    </script>
</body>
</html>
