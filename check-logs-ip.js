// ==UserScript==
// @name        IP Address Checker
// @namespace   https://github.com/
// @version      1.2
// @description  Проверка IP адресов с геолокацией
// @author       IP Checker
// @match        https://logs.blackrussia.online/gslogs/*
// @match        http://*/*
// @match        https://*/*
// @icon         data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E
// @license      MIT
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @connect      *
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    
    console.log('[IP Checker] Скрипт запущен!');
    
    // Функция для создания кнопки
    function addButton() {
        // Проверяем, нет ли уже кнопки
        if (document.getElementById('ip-checker-fab-button')) {
            console.log('[IP Checker] Кнопка уже существует');
            return;
        }
        
        console.log('[IP Checker] Создаю кнопку...');
        
        // Создаем контейнер для кнопки
        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'ip-checker-fab-button';
        buttonContainer.innerHTML = '🔍';
        buttonContainer.title = 'Проверка IP адресов';
        
        // Стили для кнопки
        Object.assign(buttonContainer.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '28px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            zIndex: '999999',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            fontFamily: 'Arial, sans-serif'
        });
        
        // Эффекты при наведении
        buttonContainer.onmouseenter = () => {
            buttonContainer.style.transform = 'scale(1.1)';
            buttonContainer.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
        };
        
        buttonContainer.onmouseleave = () => {
            buttonContainer.style.transform = 'scale(1)';
            buttonContainer.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
        };
        
        // Обработчик клика
        buttonContainer.onclick = () => {
            console.log('[IP Checker] Кнопка нажата');
            showModal();
        };
        
        // Добавляем кнопку на страницу
        document.body.appendChild(buttonContainer);
        console.log('[IP Checker] Кнопка добавлена на страницу');
    }
    
    // Функция для создания модального окна
    function showModal() {
        // Удаляем старый модал если есть
        const oldModal = document.getElementById('ip-checker-modal');
        if (oldModal) {
            oldModal.remove();
        }
        
        console.log('[IP Checker] Создаю модальное окно');
        
        const modal = document.createElement('div');
        modal.id = 'ip-checker-modal';
        
        // Стили для модального окна
        Object.assign(modal.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.9)',
            zIndex: '1000000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Arial, sans-serif'
        });
        
        modal.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                border-radius: 20px;
                padding: 30px;
                max-width: 90%;
                width: 600px;
                max-height: 80%;
                overflow-y: auto;
                color: white;
                box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                    <h2 style="margin: 0;">🔍 Проверка IP адресов</h2>
                    <button id="ip-checker-close" style="
                        background: rgba(255,255,255,0.2);
                        border: none;
                        color: white;
                        font-size: 24px;
                        cursor: pointer;
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                    ">×</button>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: bold;">IP адрес 1:</label>
                    <input type="text" id="ip-checker-ip1" placeholder="например: 8.8.8.8" style="
                        width: 100%;
                        padding: 10px;
                        border: 2px solid rgba(255,255,255,0.3);
                        background: rgba(255,255,255,0.1);
                        border-radius: 10px;
                        color: white;
                        font-size: 14px;
                        box-sizing: border-box;
                    ">
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: bold;">IP адрес 2:</label>
                    <input type="text" id="ip-checker-ip2" placeholder="например: 1.1.1.1" style="
                        width: 100%;
                        padding: 10px;
                        border: 2px solid rgba(255,255,255,0.3);
                        background: rgba(255,255,255,0.1);
                        border-radius: 10px;
                        color: white;
                        font-size: 14px;
                        box-sizing: border-box;
                    ">
                </div>
                
                <button id="ip-checker-check" style="
                    width: 100%;
                    padding: 12px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    margin-bottom: 20px;
                ">🔍 Проверить</button>
                
                <div id="ip-checker-results" style="
                    background: rgba(0,0,0,0.3);
                    border-radius: 15px;
                    padding: 20px;
                    text-align: center;
                ">
                    <div>💡 Введите два IP адреса для проверки</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Закрытие модального окна
        const closeBtn = document.getElementById('ip-checker-close');
        closeBtn.onclick = () => modal.remove();
        
        // Закрытие по клику вне окна
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
        
        // Проверка IP
        const checkBtn = document.getElementById('ip-checker-check');
        checkBtn.onclick = () => checkIPs();
        
        // Обработка Enter
        const ip1Input = document.getElementById('ip-checker-ip1');
        const ip2Input = document.getElementById('ip-checker-ip2');
        
        ip1Input.onkeypress = (e) => {
            if (e.key === 'Enter') checkIPs();
        };
        
        ip2Input.onkeypress = (e) => {
            if (e.key === 'Enter') checkIPs();
        };
    }
    
    // Проверка IP
    async function checkIPs() {
        const ip1 = document.getElementById('ip-checker-ip1').value.trim();
        const ip2 = document.getElementById('ip-checker-ip2').value.trim();
        const resultsDiv = document.getElementById('ip-checker-results');
        
        if (!ip1 || !ip2) {
            resultsDiv.innerHTML = '<div style="color: #ff8888;">⚠️ Пожалуйста, введите оба IP адреса</div>';
            return;
        }
        
        resultsDiv.innerHTML = '<div>⏳ Загрузка данных...</div>';
        
        try {
            const data1 = await getIPInfo(ip1);
            const data2 = await getIPInfo(ip2);
            displayResults(data1, data2, resultsDiv);
        } catch (error) {
            resultsDiv.innerHTML = `<div style="color: #ff8888;">❌ Ошибка: ${error.message}</div>`;
        }
    }
    
    // Получение информации об IP
    function getIPInfo(ip) {
        return new Promise((resolve) => {
            // Простой и надежный сервис
            GM_xmlhttpRequest({
                method: "GET",
                url: `http://ip-api.com/json/${ip}?fields=status,country,regionName,city,lat,lon,isp,query`,
                timeout: 10000,
                onload: function(response) {
                    try {
                        if (response.status === 200) {
                            const data = JSON.parse(response.responseText);
                            if (data.status === 'success') {
                                resolve({
                                    ip: data.query,
                                    country: data.country || 'Неизвестно',
                                    city: data.city || 'Неизвестно',
                                    region: data.regionName || 'Неизвестно',
                                    isp: data.isp || 'Неизвестно',
                                    lat: data.lat,
                                    lon: data.lon
                                });
                            } else {
                                resolve({
                                    ip: ip,
                                    country: 'Не удалось определить',
                                    city: 'Неизвестно',
                                    region: 'Неизвестно',
                                    isp: 'Неизвестно',
                                    lat: null,
                                    lon: null
                                });
                            }
                        } else {
                            resolve({
                                ip: ip,
                                country: 'Ошибка сервиса',
                                city: 'Неизвестно',
                                region: 'Неизвестно',
                                isp: 'Неизвестно',
                                lat: null,
                                lon: null
                            });
                        }
                    } catch (e) {
                        resolve({
                            ip: ip,
                            country: 'Ошибка парсинга',
                            city: 'Неизвестно',
                            region: 'Неизвестно',
                            isp: 'Неизвестно',
                            lat: null,
                            lon: null
                        });
                    }
                },
                onerror: function() {
                    resolve({
                        ip: ip,
                        country: 'Нет соединения',
                        city: 'Неизвестно',
                        region: 'Неизвестно',
                        isp: 'Неизвестно',
                        lat: null,
                        lon: null
                    });
                }
            });
        });
    }
    
    // Расчет расстояния
    function calculateDistance(lat1, lon1, lat2, lon2) {
        if (!lat1 || !lon1 || !lat2 || !lon2) return 'Недостаточно данных';
        
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return (R * c).toFixed(2) + ' км';
    }
    
    // Отображение результатов
    function displayResults(data1, data2, container) {
        const distance = calculateDistance(data1.lat, data1.lon, data2.lat, data2.lon);
        
        container.innerHTML = `
            <div style="margin-bottom: 15px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 10px;">
                <div style="font-weight: bold; margin-bottom: 10px;">📌 IP 1: ${data1.ip}</div>
                <div>🌍 Страна: ${data1.country}</div>
                <div>🏙️ Город: ${data1.city}</div>
                <div>🗺️ Регион: ${data1.region}</div>
                <div>🏢 Провайдер: ${data1.isp}</div>
                ${data1.lat ? `<div>📍 Координаты: ${data1.lat}, ${data1.lon}</div>` : ''}
            </div>
            
            <div style="margin-bottom: 15px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 10px;">
                <div style="font-weight: bold; margin-bottom: 10px;">📌 IP 2: ${data2.ip}</div>
                <div>🌍 Страна: ${data2.country}</div>
                <div>🏙️ Город: ${data2.city}</div>
                <div>🗺️ Регион: ${data2.region}</div>
                <div>🏢 Провайдер: ${data2.isp}</div>
                ${data2.lat ? `<div>📍 Координаты: ${data2.lat}, ${data2.lon}</div>` : ''}
            </div>
            
            <div style="padding: 15px; background: rgba(255,255,255,0.1); border-radius: 10px; text-align: center;">
                <div style="font-size: 18px; margin-bottom: 10px;">📏 Расстояние</div>
                <div style="font-size: 28px; font-weight: bold; color: #ffd700;">${distance}</div>
            </div>
        `;
    }
    
    // Ждем загрузки страницы и добавляем кнопку
    function waitForBody() {
        if (document.body) {
            console.log('[IP Checker] Body найден, добавляю кнопку');
            addButton();
        } else {
            console.log('[IP Checker] Жду загрузки body...');
            setTimeout(waitForBody, 100);
        }
    }
    
    // Запускаем скрипт
    waitForBody();
    
    // Также пробуем добавить кнопку при изменении DOM
    const observer = new MutationObserver(function(mutations) {
        if (document.body && !document.getElementById('ip-checker-fab-button')) {
            console.log('[IP Checker] Обнаружено изменение DOM, добавляю кнопку');
            addButton();
        }
    });
    
    observer.observe(document.documentElement, { childList: true, subtree: true });
    
    console.log('[IP Checker] Скрипт инициализирован');
})();
