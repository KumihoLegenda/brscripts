// ==UserScript==
// @name         BR Theme & Background Manager (Full)
// @namespace    http://tampermonkey.net/
// @version      5.0
// @description  Полноценные темы оформления форума + смена фона (РАБОТАЕТ ВЕЗДЕ)
// @match        https://forum.blackrussia.online/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Уникальный идентификатор
    const SCRIPT_ID = 'br_theme_v5';
    
    // Ждём полной загрузки body максимально упрощённым способом
    function waitForElement(selector, callback, maxAttempts = 50) {
        let attempts = 0;
        const interval = setInterval(() => {
            attempts++;
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(interval);
                callback(element);
            } else if (attempts >= maxAttempts) {
                clearInterval(interval);
                if (document.body) callback(document.body);
            }
        }, 100);
    }

    const STORAGE_THEME = 'br_selected_theme_v5';
    const STORAGE_BG = 'br_custom_background_v5';

    // Темы
    const themes = [
        { id: 'none', name: '🌙 Стандартная тема', css: '' },
        { id: 'neon-orange', name: '🔥 Неоновый Оранжевый', accent: '#FF4500', accentGlow: '#ff6a2e', accentRgb: '255,69,0' },
        { id: 'cyber-blue', name: '💙 Кибер-Синий', accent: '#00BFFF', accentGlow: '#4dc3ff', accentRgb: '0,191,255' },
        { id: 'neon-green', name: '💚 Неоново-Зеленый', accent: '#39FF14', accentGlow: '#6eff4d', accentRgb: '57,255,20' },
        { id: 'royal-purple', name: '👑 Королевский Пурпурный', accent: '#9b59b6', accentGlow: '#c27bd6', accentRgb: '155,89,182' },
        { id: 'hot-pink', name: '💖 Горячий Розовый', accent: '#FF69B4', accentGlow: '#ff8dc9', accentRgb: '255,105,180' },
        { id: 'golden', name: '⭐ Золотой', accent: '#FFD700', accentGlow: '#ffe44d', accentRgb: '255,215,0' },
        { id: 'crimson-red', name: '❤️ Багровый Красный', accent: '#DC143C', accentGlow: '#ff3355', accentRgb: '220,20,60' },
        { id: 'teal', name: '🐚 Бирюзовый', accent: '#00CED1', accentGlow: '#33e5e8', accentRgb: '0,206,209' },
        { id: 'dark-knight', name: '🦇 Тёмный рыцарь', accent: '#1a1a2e', accentGlow: '#2d2d44', accentRgb: '26,26,46' }
    ];

    function generateThemeCSS(accent, accentGlow, accentRgb) {
        return `:root{--theme-accent:${accent};--theme-accent-glow:${accentGlow};--theme-accent-rgb:${accentRgb};--glass-dark:rgba(11,17,26,0.95);--border-color:rgba(${accentRgb},0.3)}html,body{background:#05080c!important;color:#dbe4eb!important}body::before{content:'';position:fixed;top:0;left:0;width:100%;height:100%;background:radial-gradient(circle at top,#15202b,#05080c);z-index:-5}.p-body,.p-body-inner,.p-body-content,.p-body-main{background:transparent!important}.block-container{background:var(--glass-dark)!important;border:1px solid var(--border-color)!important;border-radius:12px!important}.p-nav{background:rgba(10,14,20,.95)!important;border-bottom:1px solid var(--border-color)!important}.p-nav-list .p-navEl.is-selected,.p-nav-list .p-navEl:hover{color:var(--theme-accent)!important}.structItem:hover,.node-body:hover{background:rgba(${accentRgb},0.08)!important}.message{background:rgba(20,25,35,.5)!important;border:1px solid rgba(255,255,255,.05)!important;border-radius:8px!important}input,textarea,select{background:rgba(15,20,30,.8)!important;border:1px solid var(--border-color)!important;color:#dbe4eb!important}.button,button{background:rgba(${accentRgb},0.3)!important;border:1px solid var(--border-color)!important;color:#fff!important}.button:hover,button:hover{background:rgba(${accentRgb},0.5)!important}.menu{background:var(--glass-dark)!important;border:1px solid var(--border-color)!important}.tabs-tab.is-active{background:rgba(${accentRgb},0.2)!important;border-bottom-color:var(--theme-accent)!important;color:var(--theme-accent)!important}.bbCodeBlock{border-left:2px solid var(--theme-accent)!important}.pageNav-page.pageNav-page--current{background:rgba(${accentRgb},0.5)!important}.p-footer a{color:var(--theme-accent)!important}.memberHeader-avatar .avatar{border:2px solid var(--theme-accent)!important}`;
    }

    function generateDarkKnightCSS() {
        return `:root{--theme-accent:#1a1a2e;--theme-accent-glow:#2d2d44;--glass-dark:rgba(8,8,12,.98);--border-color:rgba(45,45,68,.5)}html,body{background:#0a0a0f!important;color:#b8b8c8!important}.block-container{background:var(--glass-dark)!important;border:1px solid var(--border-color)!important}.p-nav{background:rgba(8,8,12,.98)!important}.message{background:rgba(15,15,22,.6)!important}.button,button{background:rgba(45,45,68,.5)!important}.menu{background:rgba(10,10,15,.98)!important}`;
    }

    function getThemeCSS(theme) {
        if (theme.id === 'none') return '';
        if (theme.id === 'dark-knight') return generateDarkKnightCSS();
        return generateThemeCSS(theme.accent, theme.accentGlow, theme.accentRgb);
    }

    function applyTheme(themeId) {
        let el = document.getElementById('br_theme_style');
        if (!el) { el = document.createElement('style'); el.id = 'br_theme_style'; document.head.appendChild(el); }
        const theme = themes.find(t => t.id === themeId);
        el.textContent = theme ? getThemeCSS(theme) : '';
        localStorage.setItem(STORAGE_THEME, themeId);
    }

    function applyBackground(bgUrl) {
        let el = document.getElementById('br_bg_style');
        if (!el) { el = document.createElement('style'); el.id = 'br_bg_style'; document.head.appendChild(el); }
        if (bgUrl && bgUrl.trim()) {
            el.textContent = `body{background-image:url("${bgUrl}");background-attachment:fixed;background-size:cover;background-position:center}body::before{background:rgba(0,0,0,0.6)!important}`;
            localStorage.setItem(STORAGE_BG, bgUrl);
        } else {
            el.textContent = '';
            localStorage.removeItem(STORAGE_BG);
        }
    }

    function loadSettings() {
        const savedTheme = localStorage.getItem(STORAGE_THEME);
        if (savedTheme && savedTheme !== 'none') applyTheme(savedTheme);
        const savedBg = localStorage.getItem(STORAGE_BG);
        if (savedBg) applyBackground(savedBg);
    }

    // Модальное окно
    function openModal() {
        let modal = document.getElementById('br_theme_modal');
        if (modal) { modal.classList.add('open'); return; }

        modal = document.createElement('div');
        modal.id = 'br_theme_modal';
        modal.innerHTML = `
            <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:2147483648;display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:0.3s" id="br_modal_inner">
                <div style="background:linear-gradient(135deg,#1a1a2e,#16213e);border:1px solid rgba(255,255,255,0.1);border-radius:16px;width:90%;max-width:500px;box-shadow:0 25px 50px rgba(0,0,0,0.5)">
                    <div style="padding:20px 24px;border-bottom:1px solid rgba(255,255,255,0.1);display:flex;justify-content:space-between">
                        <span style="font-size:20px;font-weight:bold;color:#fff">🎨 Оформление форума</span>
                        <button id="br_modal_close" style="background:none;border:none;color:#fff;font-size:28px;cursor:pointer;width:36px;height:36px">&times;</button>
                    </div>
                    <div style="padding:24px">
                        <div style="margin-bottom:24px">
                            <label style="display:block;margin-bottom:8px;color:#fff;font-weight:600">Выберите тему:</label>
                            <select id="br_theme_select" style="width:100%;padding:10px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#fff">${themes.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}</select>
                        </div>
                        <div>
                            <label style="display:block;margin-bottom:8px;color:#fff;font-weight:600">Фоновое изображение:</label>
                            <input type="text" id="br_bg_input" style="width:100%;padding:10px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#fff" placeholder="https://example.com/image.jpg">
                            <small style="display:block;margin-top:6px;color:rgba(255,255,255,0.5)">Прямая ссылка на изображение</small>
                        </div>
                    </div>
                    <div style="padding:16px 24px;border-top:1px solid rgba(255,255,255,0.1);display:flex;justify-content:flex-end;gap:12px">
                        <button id="br_modal_cancel" style="padding:8px 20px;background:rgba(255,255,255,0.1);border:none;border-radius:8px;color:#fff;cursor:pointer">Отмена</button>
                        <button id="br_modal_save" style="padding:8px 20px;background:linear-gradient(135deg,#9b59b6,#8e44ad);border:none;border-radius:8px;color:#fff;cursor:pointer">Сохранить</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        const inner = modal.querySelector('#br_modal_inner');
        const themeSelect = modal.querySelector('#br_theme_select');
        const bgInput = modal.querySelector('#br_bg_input');
        
        themeSelect.value = localStorage.getItem(STORAGE_THEME) || 'none';
        bgInput.value = localStorage.getItem(STORAGE_BG) || '';
        
        const close = () => { inner.classList.remove('open'); setTimeout(() => modal.remove(), 300); };
        modal.querySelector('#br_modal_close').onclick = close;
        modal.querySelector('#br_modal_cancel').onclick = close;
        modal.querySelector('#br_modal_save').onclick = () => {
            applyTheme(themeSelect.value);
            applyBackground(bgInput.value.trim());
            close();
        };
        
        setTimeout(() => inner.classList.add('open'), 10);
    }

    // ========== СОЗДАНИЕ КНОПКИ ==========
    let buttonCreated = false;
    
    function createButton() {
        if (buttonCreated || document.getElementById('br_theme_btn')) return;
        
        const btn = document.createElement('div');
        btn.id = 'br_theme_btn';
        btn.innerHTML = '🎨';
        btn.title = 'Оформление форума';
        // Максимально высокий z-index, фиксированное позиционирование
        btn.style.cssText = 'position:fixed!important;bottom:20px!important;right:20px!important;width:55px!important;height:55px!important;background:linear-gradient(135deg,#667eea,#764ba2)!important;border:none!important;border-radius:50%!important;color:#fff!important;font-size:28px!important;display:flex!important;align-items:center!important;justify-content:center!important;cursor:pointer!important;z-index:2147483647!important;box-shadow:0 4px 15px rgba(0,0,0,0.3)!important;transition:all 0.3s!important;font-family:Arial,sans-serif!important;opacity:0!important';
        
        btn.onmouseenter = () => { btn.style.transform = 'scale(1.1)'; };
        btn.onmouseleave = () => { btn.style.transform = 'scale(1)'; };
        btn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); openModal(); };
        
        document.body.appendChild(btn);
        buttonCreated = true;
        
        // Анимация появления
        setTimeout(() => { btn.style.opacity = '1'; }, 100);
        
        // Защита от удаления
        const observer = new MutationObserver(() => {
            if (!document.getElementById('br_theme_btn')) {
                buttonCreated = false;
                createButton();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // ========== ЗАПУСК ==========
    loadSettings();
    
    // Агрессивное ожидание body
    const checkBody = setInterval(() => {
        if (document.body) {
            clearInterval(checkBody);
            createButton();
        }
    }, 50);
    
    // Дополнительная защита - если страница уже загружена
    if (document.readyState === 'complete' && document.body) {
        createButton();
    }
})();
