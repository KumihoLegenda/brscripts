// ==UserScript==
// @name         BR Panel (Menu Only)
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  Only floating menu with servers and thread mover (FIXED: now moves threads)
// @author       Black Russia
// @match        https://forum.blackrussia.online/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // --- ИСПРАВЛЕНИЕ ОШИБКИ ---
    if (document.body.getAttribute('data-br-script-injected-panel')) {
        return;
    }
    document.body.setAttribute('data-br-script-injected-panel', 'true');
    // ---------------------------

    try {
        (function() {
            const STORAGE_PREFIX = 'br_panel_mix_';

            // Функция для получения ID темы из URL
            function getThreadIdFromUrl() {
                const match = window.location.pathname.match(/\/threads\/[^.]+\.(\d+)/);
                return match ? match[1] : null;
            }

            // === НОВАЯ ФУНКЦИЯ ДЛЯ ПЕРЕНОСА ТЕМЫ (как в первом скрипте) ===
            async function moveThreadToSection(targetNodeId) {
                // Проверяем, находимся ли мы на странице темы
                const threadId = getThreadIdFromUrl();
                if (!threadId) {
                    alert('Эта функция доступна только при просмотре темы!');
                    return false;
                }

                // Получаем CSRF-токен (как в первом скрипте)
                const csrfToken = document.querySelector('input[name="_xfToken"]')?.value || XF?.config?.csrf;
                if (!csrfToken) {
                    alert('Ошибка: CSRF токен не найден. Возможно, вы не авторизованы или страница загружена не полностью.');
                    return false;
                }

                const threadTitle = document.querySelector('.p-title-value')?.lastChild?.textContent || '';
                
                // Создаем FormData для запроса (полностью копируем из первого скрипта)
                const formData = new FormData();
                formData.append('target_node_id', targetNodeId);
                formData.append('redirect_type', 'none');
                formData.append('notify_watchers', '1');
                formData.append('starter_alert', '1');
                formData.append('starter_alert_reason', '');
                formData.append('_xfToken', csrfToken);
                formData.append('_xfRequestUri', window.location.pathname);
                formData.append('_xfWithData', '1');
                formData.append('_xfResponseType', 'json');

                try {
                    // Отправляем запрос на перемещение (как в первом скрипте)
                    const response = await fetch(`${window.location.origin}${window.location.pathname}/move`, {
                        method: 'POST',
                        body: formData,
                        credentials: 'same-origin'
                    });
                    
                    const data = await response.json();
                    
                    if (data._redirectStatus === 'success' || data.redirect) {
                        alert('Тема успешно перенесена!');
                        window.location.reload();
                        return true;
                    } else {
                        throw new Error('Ошибка при переносе: ' + JSON.stringify(data));
                    }
                } catch (error) {
                    console.error('Ошибка переноса:', error);
                    alert('Не удалось перенести тему. Убедитесь, что у вас есть права на перенос темы в этот раздел.');
                    return false;
                }
            }

            // Ссылки на тех. разделы (оставляем как есть, они нужны для получения nodeId и цвета)
            const DATA_TECH = [
                { text: 'RED (1)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-red.226/', color: '#8B008B', nodeId: 226 },
                { text: 'GREEN (2)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-green.227/', color: '#8B008B', nodeId: 227 },
                { text: 'BLUE (3)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-blue.228/', color: '#8B008B', nodeId: 228 },
                { text: 'YELLOW (4)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-yellow.229/', color: '#8B008B', nodeId: 229 },
                { text: 'ORANGE (5)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-orange.245/', color: '#8B008B', nodeId: 245 },
                { text: 'PURPLE (6)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-purple.325/', color: '#8B008B', nodeId: 325 },
                { text: 'LIME (7)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-lime.365/', color: '#8B008B', nodeId: 365 },
                { text: 'PINK (8)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-pink.396/', color: '#8B008B', nodeId: 396 },
                { text: 'CHERRY (9)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-cherry.408/', color: '#8B008B', nodeId: 408 },
                { text: 'BLACK (10)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-black.488/', color: '#8B008B', nodeId: 488 },
                { text: 'INDIGO (11)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-indigo.493/', color: '#8B008B', nodeId: 493 },
                { text: 'WHITE (12)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-white.554/', color: '#8B008B', nodeId: 554 },
                { text: 'MAGENTA (13)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-magenta.613/', color: '#8B008B', nodeId: 613 },
                { text: 'CRIMSON (14)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-crimson.653/', color: '#8B008B', nodeId: 653 },
                { text: 'GOLD (15)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-gold.660/', color: '#8B008B', nodeId: 660 },
                { text: 'AZURE (16)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-azure.701/', color: '#8B008B', nodeId: 701 },
                { text: 'PLATINUM (17)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-platinum.757/', color: '#8B008B', nodeId: 757 },
                { text: 'AQUA (18)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-aqua.815/', color: '#8B008B', nodeId: 815 },
                { text: 'GRAY (19)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-gray.857/', color: '#8B008B', nodeId: 857 },
                { text: 'ICE (20)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-ice.925/', color: '#8B008B', nodeId: 925 },
                { text: 'CHILLI (21)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-chilli.1007/', color: '#8B008B', nodeId: 1007 },
                { text: 'CHOCO (22)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-choco.1048/', color: '#8B008B', nodeId: 1048 },
                { text: 'MOSCOW (23)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-moscow.1052/', color: '#8B008B', nodeId: 1052 },
                { text: 'SPB (24)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-spb.1095/', color: '#8B008B', nodeId: 1095 },
                { text: 'UFA (25)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-ufa.1138/', color: '#8B008B', nodeId: 1138 },
                { text: 'SOCHI (26)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-sochi.1248/', color: '#8B008B', nodeId: 1248 },
                { text: 'KAZAN (27)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-kazan.1290/', color: '#8B008B', nodeId: 1290 },
                { text: 'SAMARA (28)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-samara.1292/', color: '#8B008B', nodeId: 1292 },
                { text: 'ROSTOV (29)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-rostov.1334/', color: '#8B008B', nodeId: 1334 },
                { text: 'ANAPA (30)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-anapa.1416/', color: '#8B008B', nodeId: 1416 },
                { text: 'EKB (31)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-ekb.1458/', color: '#8B008B', nodeId: 1458 },
                { text: 'KRASNODAR (32)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-krasnodar.1460/', color: '#8B008B', nodeId: 1460 },
                { text: 'ARZAMAS (33)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-arzamas.1502/', color: '#8B008B', nodeId: 1502 },
                { text: 'NOVOSIBIRSK (34)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-novosibirsk.1544/', color: '#8B008B', nodeId: 1544 },
                { text: 'GROZNY (35)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-grozny.1586/', color: '#8B008B', nodeId: 1586 },
                { text: 'SARATOV (36)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-saratov.1628/', color: '#8B008B', nodeId: 1628 },
                { text: 'OMSK (37)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-omsk.1670/', color: '#8B008B', nodeId: 1670 },
                { text: 'IRKUTSK (38)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-irkutsk.1712/', color: '#8B008B', nodeId: 1712 },
                { text: 'VOLGOGRAD (39)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-volgograd.1758/', color: '#8B008B', nodeId: 1758 },
                { text: 'VORONEZH (40)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-voronezh.1800/', color: '#8B008B', nodeId: 1800 },
                { text: 'BELGOROD (41)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-belgorod.1842/', color: '#8B008B', nodeId: 1842 },
                { text: 'MAKHACHKALA (42)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-makhachkala.1884/', color: '#8B008B', nodeId: 1884 },
                { text: 'VLADIKAVKAZ (43)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-vladikavkaz.1926/', color: '#8B008B', nodeId: 1926 },
                { text: 'VLADIVOSTOK (44)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-vladivostok.1968/', color: '#8B008B', nodeId: 1968 },
                { text: 'KALININGRAD (45)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-kaliningrad.2010/', color: '#8B008B', nodeId: 2010 },
                { text: 'CHELYABINSK (46)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-chelyabinsk.2052/', color: '#8B008B', nodeId: 2052 },
                { text: 'KRASNOYARSK (47)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-krasnoyarsk.2094/', color: '#8B008B', nodeId: 2094 },
                { text: 'CHEBOKSARY (48)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-cheboksary.2136/', color: '#8B008B', nodeId: 2136 },
                { text: 'KHABAROVSK (49)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-khabarovsk.2178/', color: '#8B008B', nodeId: 2178 },
                { text: 'PERM (50)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-perm.2220/', color: '#8B008B', nodeId: 2220 },
                { text: 'TULA (51)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-tula.2262/', color: '#8B008B', nodeId: 2262 },
                { text: 'RYAZAN (52)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-ryazan.2304/', color: '#8B008B', nodeId: 2304 },
                { text: 'MURMANSK (53)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-murmansk.2346/', color: '#8B008B', nodeId: 2346 },
                { text: 'PENZA (54)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-penza.2388/', color: '#8B008B', nodeId: 2388 },
                { text: 'KURSK (55)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-kursk.2430/', color: '#8B008B', nodeId: 2430 },
                { text: 'ARKHANGELSK (56)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-arkhangelsk.2472/', color: '#8B008B', nodeId: 2472 },
                { text: 'ORENBURG (57)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-orenburg.2514/', color: '#8B008B', nodeId: 2514 },
                { text: 'KIROV (58)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-kirov.2516/', color: '#8B008B', nodeId: 2516 },
                { text: 'KEMEROVO (59)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-kemerovo.2598/', color: '#8B008B', nodeId: 2598 },
                { text: 'TYUMEN (60)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-tyumen.2639/', color: '#8B008B', nodeId: 2639 },
                { text: 'TOLYATTI (61)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-tolyatti.2682/', color: '#8B008B', nodeId: 2682 },
                { text: 'IVANOVO (62)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-ivanovo.2714/', color: '#8B008B', nodeId: 2714 },
                { text: 'STAVROPOL (63)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-stavropol.2747/', color: '#8B008B', nodeId: 2747 },
                { text: 'SMOLENSK (64)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-smolensk.2779/', color: '#8B008B', nodeId: 2779 },
                { text: 'PSKOV (65)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-pskov.2811/', color: '#8B008B', nodeId: 2811 },
                { text: 'BRYANSK (66)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-bryansk.2843/', color: '#8B008B', nodeId: 2843 },
                { text: 'OREL (67)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-orel.2875/', color: '#8B008B', nodeId: 2875 },
                { text: 'YAROSLAVL (68)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-yaroslavl.2907/', color: '#8B008B', nodeId: 2907 },
                { text: 'BARNAUL (69)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-barnaul.2939/', color: '#8B008B', nodeId: 2939 },
                { text: 'LIPETSK (70)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-lipetsk.2971/', color: '#8B008B', nodeId: 2971 },
                { text: 'ULYANOVSK (71)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-ulyanovsk.3003/', color: '#8B008B', nodeId: 3003 },
                { text: 'YAKUTSK (72)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-yakutsk.3035/', color: '#8B008B', nodeId: 3035 },
                { text: 'TAMBOV (73)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-tambov.3289/', color: '#8B008B', nodeId: 3289 },
                { text: 'BRATSK (74)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-bratsk.3324/', color: '#8B008B', nodeId: 3324 },
                { text: 'ASTRAKHAN (75)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-astrakhan.3359/', color: '#8B008B', nodeId: 3359 },
                { text: 'CHITA (76)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-chita.3394/', color: '#8B008B', nodeId: 3394 },
                { text: 'KOSTROMA (77)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-kostroma.3429/', color: '#8B008B', nodeId: 3429 },
                { text: 'VLADIMIR (78)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-vladimir.3464/', color: '#8B008B', nodeId: 3464 },
                { text: 'KALUGA (79)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-kaluga.3499/', color: '#8B008B', nodeId: 3499 },
                { text: 'NOVGOROD (80)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-novgorod.3535/', color: '#8B008B', nodeId: 3535 },
                { text: 'TAGANROG (81)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-taganrog.3570/', color: '#8B008B', nodeId: 3570 },
                { text: 'VOLOGDA (82)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-vologda.3605/', color: '#8B008B', nodeId: 3605 },
                { text: 'TVER (83)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-tver.3643/', color: '#8B008B', nodeId: 3643 },
                { text: 'TOMSK (84)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-tomsk.3740/', color: '#8B008B', nodeId: 3740 },
                { text: 'IZHEVSK (85)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-izhevsk.3747/', color: '#8B008B', nodeId: 3747 },
                { text: 'SURGUT (86)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-surgut.3812/', color: '#8B008B', nodeId: 3812 },
                { text: 'PODOLSK (87)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-podolsk.3817/', color: '#8B008B', nodeId: 3817 },
                { text: 'MAGADAN (88)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-magadan.3912/', color: '#8B008B', nodeId: 3912 },
                { text: 'CHEREPOVETS (89)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-cherepovets.3978/', color: '#8B008B', nodeId: 3978 },
                { text: 'NORILSK (90)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-norilsk.3985/', color: '#8B008B', nodeId: 3985 },
                { text: 'ASTANA (91)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-astana.4021/', color: '#8B008B', nodeId: 4021 },
            ];

            const DATA_TECH_COMPLAINT = [
                { text: 'RED (1)', link: 'https://forum.blackrussia.online/forums/Сервер-№1-red.1182/', color: '#0000CD', nodeId: 1182 },
                { text: 'GREEN (2)', link: 'https://forum.blackrussia.online/forums/Сервер-№2-green.1183/', color: '#0000CD', nodeId: 1183 },
                { text: 'BLUE (3)', link: 'https://forum.blackrussia.online/forums/Сервер-№3-blue.1184/', color: '#0000CD', nodeId: 1184 },
                { text: 'YELLOW (4)', link: 'https://forum.blackrussia.online/forums/Сервер-№4-yellow.1185/', color: '#0000CD', nodeId: 1185 },
                { text: 'ORANGE (5)', link: 'https://forum.blackrussia.online/forums/Сервер-№5-orange.1186/', color: '#0000CD', nodeId: 1186 },
                { text: 'PURPLE (6)', link: 'https://forum.blackrussia.online/forums/Сервер-№6-purple.1187/', color: '#0000CD', nodeId: 1187 },
                { text: 'LIME (7)', link: 'https://forum.blackrussia.online/forums/Сервер-№7-lime.1188/', color: '#0000CD', nodeId: 1188 },
                { text: 'PINK (8)', link: 'https://forum.blackrussia.online/forums/Сервер-№8-pink.1189/', color: '#0000CD', nodeId: 1189 },
                { text: 'CHERRY (9)', link: 'https://forum.blackrussia.online/forums/Сервер-№9-cherry.1190/', color: '#0000CD', nodeId: 1190 },
                { text: 'BLACK (10)', link: 'https://forum.blackrussia.online/forums/Сервер-№10-black.1191/', color: '#0000CD', nodeId: 1191 },
                { text: 'INDIGO (11)', link: 'https://forum.blackrussia.online/forums/Сервер-№11-indigo.1192/', color: '#0000CD', nodeId: 1192 },
                { text: 'WHITE (12)', link: 'https://forum.blackrussia.online/forums/Сервер-№12-white.1193/', color: '#0000CD', nodeId: 1193 },
                { text: 'MAGENTA (13)', link: 'https://forum.blackrussia.online/forums/Сервер-№13-magenta.1194/', color: '#0000CD', nodeId: 1194 },
                { text: 'CRIMSON (14)', link: 'https://forum.blackrussia.online/forums/Сервер-№14-crimson.1195/', color: '#0000CD', nodeId: 1195 },
                { text: 'GOLD (15)', link: 'https://forum.blackrussia.online/forums/Сервер-№15-gold.1196/', color: '#0000CD', nodeId: 1196 },
                { text: 'AZURE (16)', link: 'https://forum.blackrussia.online/forums/Сервер-№16-azure.1197/', color: '#0000CD', nodeId: 1197 },
                { text: 'PLATINUM (17)', link: 'https://forum.blackrussia.online/forums/Сервер-№17-platinum.1198/', color: '#0000CD', nodeId: 1198 },
                { text: 'AQUA (18)', link: 'https://forum.blackrussia.online/forums/Сервер-№18-aqua.1199/', color: '#0000CD', nodeId: 1199 },
                { text: 'GRAY (19)', link: 'https://forum.blackrussia.online/forums/Сервер-№19-gray.1200/', color: '#0000CD', nodeId: 1200 },
                { text: 'ICE (20)', link: 'https://forum.blackrussia.online/forums/Сервер-№20-ice.1201/', color: '#0000CD', nodeId: 1201 },
                { text: 'CHILLI (21)', link: 'https://forum.blackrussia.online/forums/Сервер-№21-chilli.1202/', color: '#0000CD', nodeId: 1202 },
                { text: 'CHOCO (22)', link: 'https://forum.blackrussia.online/forums/Сервер-№22-choco.1203/', color: '#0000CD', nodeId: 1203 },
                { text: 'MOSCOW (23)', link: 'https://forum.blackrussia.online/forums/Сервер-№23-moscow.1204/', color: '#0000CD', nodeId: 1204 },
                { text: 'SPB (24)', link: 'https://forum.blackrussia.online/forums/Сервер-№24-spb.1205/', color: '#0000CD', nodeId: 1205 },
                { text: 'UFA (25)', link: 'https://forum.blackrussia.online/forums/Сервер-№25-ufa.1206/', color: '#0000CD', nodeId: 1206 },
                { text: 'SOCHI (26)', link: 'https://forum.blackrussia.online/forums/Сервер-№26-sochi.1247/', color: '#0000CD', nodeId: 1247 },
                { text: 'KAZAN (27)', link: 'https://forum.blackrussia.online/forums/Сервер-№27-kazan.1289/', color: '#0000CD', nodeId: 1289 },
                { text: 'SAMARA (28)', link: 'https://forum.blackrussia.online/forums/Сервер-№28-samara.1291/', color: '#0000CD', nodeId: 1291 },
                { text: 'ROSTOV (29)', link: 'https://forum.blackrussia.online/forums/Сервер-№29-rostov.1333/', color: '#0000CD', nodeId: 1333 },
                { text: 'ANAPA (30)', link: 'https://forum.blackrussia.online/forums/Сервер-№30-anapa.1415/', color: '#0000CD', nodeId: 1415 },
                { text: 'EKB (31)', link: 'https://forum.blackrussia.online/forums/Сервер-№31-ekb.1457/', color: '#0000CD', nodeId: 1457 },
                { text: 'KRASNODAR (32)', link: 'https://forum.blackrussia.online/forums/Сервер-№32-krasnodar.1459/', color: '#0000CD', nodeId: 1459 },
                { text: 'ARZAMAS (33)', link: 'https://forum.blackrussia.online/forums/Сервер-№33-arzamas.1501/', color: '#0000CD', nodeId: 1501 },
                { text: 'NOVOSIBIRSK (34)', link: 'https://forum.blackrussia.online/forums/Сервер-№34-novosibirsk.1543/', color: '#0000CD', nodeId: 1543 },
                { text: 'GROZNY (35)', link: 'https://forum.blackrussia.online/forums/Сервер-№35-grozny.1585/', color: '#0000CD', nodeId: 1585 },
                { text: 'SARATOV (36)', link: 'https://forum.blackrussia.online/forums/Сервер-№36-saratov.1627/', color: '#0000CD', nodeId: 1627 },
                { text: 'OMSK (37)', link: 'https://forum.blackrussia.online/forums/Сервер-№37-omsk.1669/', color: '#0000CD', nodeId: 1669 },
                { text: 'IRKUTSK (38)', link: 'https://forum.blackrussia.online/forums/Сервер-№38-irkutsk.1711/', color: '#0000CD', nodeId: 1711 },
                { text: 'VOLGOGRAD (39)', link: 'https://forum.blackrussia.online/forums/Сервер-№39-volgograd.1757/', color: '#0000CD', nodeId: 1757 },
                { text: 'VORONEZH (40)', link: 'https://forum.blackrussia.online/forums/Сервер-№40-voronezh.1801/', color: '#0000CD', nodeId: 1801 },
                { text: 'BELGOROD (41)', link: 'https://forum.blackrussia.online/forums/Сервер-№41-belgorod.1841/', color: '#0000CD', nodeId: 1841 },
                { text: 'MAKHACHKALA (42)', link: 'https://forum.blackrussia.online/forums/Сервер-№42-makhachkala.1883/', color: '#0000CD', nodeId: 1883 },
                { text: 'VLADIKAVKAZ (43)', link: 'https://forum.blackrussia.online/forums/Сервер-№43-vladikavkaz.1925/', color: '#0000CD', nodeId: 1925 },
                { text: 'VLADIVOSTOK (44)', link: 'https://forum.blackrussia.online/forums/Сервер-№44-vladivostok.1967/', color: '#0000CD', nodeId: 1967 },
                { text: 'KALININGRAD (45)', link: 'https://forum.blackrussia.online/forums/Сервер-№45-kaliningrad.2009/', color: '#0000CD', nodeId: 2009 },
                { text: 'CHELYABINSK (46)', link: 'https://forum.blackrussia.online/forums/Сервер-№46-chelyabinsk.2051/', color: '#0000CD', nodeId: 2051 },
                { text: 'KRASNOYARSK (47)', link: 'https://forum.blackrussia.online/forums/Сервер-№47-krasnoyarsk.2093/', color: '#0000CD', nodeId: 2093 },
                { text: 'CHEBOKSARY (48)', link: 'https://forum.blackrussia.online/forums/Сервер-№48-cheboksary.2135/', color: '#0000CD', nodeId: 2135 },
                { text: 'KHABAROVSK (49)', link: 'https://forum.blackrussia.online/forums/Сервер-№49-khabarovsk.2177/', color: '#0000CD', nodeId: 2177 },
                { text: 'PERM (50)', link: 'https://forum.blackrussia.online/forums/Сервер-№50-perm.2219/', color: '#0000CD', nodeId: 2219 },
                { text: 'TULA (51)', link: 'https://forum.blackrussia.online/forums/Сервер-№51-tula.2261/', color: '#0000CD', nodeId: 2261 },
                { text: 'RYAZAN (52)', link: 'https://forum.blackrussia.online/forums/Сервер-№52-ryazan.2303/', color: '#0000CD', nodeId: 2303 },
                { text: 'MURMANSK (53)', link: 'https://forum.blackrussia.online/forums/Сервер-№53-murmansk.2345/', color: '#0000CD', nodeId: 2345 },
                { text: 'PENZA (54)', link: 'https://forum.blackrussia.online/forums/Сервер-№54-penza.2387/', color: '#0000CD', nodeId: 2387 },
                { text: 'KURSK (55)', link: 'https://forum.blackrussia.online/forums/Сервер-№55-kursk.2429/', color: '#0000CD', nodeId: 2429 },
                { text: 'ARKHANGELSK (56)', link: 'https://forum.blackrussia.online/forums/Сервер-№56-arkhangelsk.2471/', color: '#0000CD', nodeId: 2471 },
                { text: 'ORENBURG (57)', link: 'https://forum.blackrussia.online/forums/Сервер-№57-orenburg.2513/', color: '#0000CD', nodeId: 2513 },
                { text: 'KIROV (58)', link: 'https://forum.blackrussia.online/forums/Сервер-№58-kirov.2515/', color: '#0000CD', nodeId: 2515 },
                { text: 'KEMEROVO (59)', link: 'https://forum.blackrussia.online/forums/Сервер-№59-kemerovo.2597/', color: '#0000CD', nodeId: 2597 },
                { text: 'TYUMEN (60)', link: 'https://forum.blackrussia.online/forums/Сервер-№60-tyumen.2639/', color: '#0000CD', nodeId: 2639 },
                { text: 'TOLYATTI (61)', link: 'https://forum.blackrussia.online/forums/Сервер-№61-tolyatti.2681/', color: '#0000CD', nodeId: 2681 },
                { text: 'IVANOVO (62)', link: 'https://forum.blackrussia.online/forums/Сервер-№62-ivanovo.2713/', color: '#0000CD', nodeId: 2713 },
                { text: 'STAVROPOL (63)', link: 'https://forum.blackrussia.online/forums/Сервер-№63-stavropol.2746/', color: '#0000CD', nodeId: 2746 },
                { text: 'SMOLENSK (64)', link: 'https://forum.blackrussia.online/forums/Сервер-№64-smolensk.2778/', color: '#0000CD', nodeId: 2778 },
                { text: 'PSKOV (65)', link: 'https://forum.blackrussia.online/forums/Сервер-№65-pskov.2810/', color: '#0000CD', nodeId: 2810 },
                { text: 'BRYANSK (66)', link: 'https://forum.blackrussia.online/forums/Сервер-№66-bryansk.2842/', color: '#0000CD', nodeId: 2842 },
                { text: 'OREL (67)', link: 'https://forum.blackrussia.online/forums/Сервер-№67-orel.2874/', color: '#0000CD', nodeId: 2874 },
                { text: 'YAROSLAVL (68)', link: 'https://forum.blackrussia.online/forums/Сервер-№68-yaroslavl.2906/', color: '#0000CD', nodeId: 2906 },
                { text: 'BARNAUL (69)', link: 'https://forum.blackrussia.online/forums/Сервер-№69-barnaul.2938/', color: '#0000CD', nodeId: 2938 },
                { text: 'LIPETSK (70)', link: 'https://forum.blackrussia.online/forums/Сервер-№70-lipetsk.2970/', color: '#0000CD', nodeId: 2970 },
                { text: 'ULYANOVSK (71)', link: 'https://forum.blackrussia.online/forums/Сервер-№71-ulyanovsk.3002/', color: '#0000CD', nodeId: 3002 },
                { text: 'YAKUTSK (72)', link: 'https://forum.blackrussia.online/forums/Сервер-№72-yakutsk.3034/', color: '#0000CD', nodeId: 3034 },
                { text: 'TAMBOV (73)', link: 'https://forum.blackrussia.online/forums/Сервер-№73-tambov.3288/', color: '#0000CD', nodeId: 3288 },
                { text: 'BRATSK (74)', link: 'https://forum.blackrussia.online/forums/Сервер-№74-bratsk.3323/', color: '#0000CD', nodeId: 3323 },
                { text: 'ASTRAKHAN (75)', link: 'https://forum.blackrussia.online/forums/Сервер-№75-astrakhan.3358/', color: '#0000CD', nodeId: 3358 },
                { text: 'CHITA (76)', link: 'https://forum.blackrussia.online/forums/Сервер-№76-chita.3393/', color: '#0000CD', nodeId: 3393 },
                { text: 'KOSTROMA (77)', link: 'https://forum.blackrussia.online/forums/Сервер-№77-kostroma.3428/', color: '#0000CD', nodeId: 3428 },
                { text: 'VLADIMIR (78)', link: 'https://forum.blackrussia.online/forums/Сервер-№78-vladimir.3463/', color: '#0000CD', nodeId: 3463 },
                { text: 'KALUGA (79)', link: 'https://forum.blackrussia.online/forums/Сервер-№79-kaluga.3498/', color: '#0000CD', nodeId: 3498 },
                { text: 'NOVGOROD (80)', link: 'https://forum.blackrussia.online/forums/Сервер-№80-novgorod.3533/', color: '#0000CD', nodeId: 3533 },
                { text: 'TAGANROG (81)', link: 'https://forum.blackrussia.online/forums/Сервер-№81-taganrog.3569/', color: '#0000CD', nodeId: 3569 },
                { text: 'VOLOGDA (82)', link: 'https://forum.blackrussia.online/forums/Сервер-№82-vologda.3604/', color: '#0000CD', nodeId: 3604 },
                { text: 'TVER (83)', link: 'https://forum.blackrussia.online/forums/Сервер-№83-tver.3642/', color: '#0000CD', nodeId: 3642 },
                { text: 'TOMSK (84)', link: 'https://forum.blackrussia.online/forums/Сервер-№84-tomsk.3739/', color: '#0000CD', nodeId: 3739 },
                { text: 'IZHEVSK (85)', link: 'https://forum.blackrussia.online/forums/Сервер-№85-izhevsk.3746/', color: '#0000CD', nodeId: 3746 },
                { text: 'SURGUT (86)', link: 'https://forum.blackrussia.online/forums/Сервер-№86-surgut.3811/', color: '#0000CD', nodeId: 3811 },
                { text: 'PODOLSK (87)', link: 'https://forum.blackrussia.online/forums/Сервер-№87-podolsk.3816/', color: '#0000CD', nodeId: 3816 },
                { text: 'MAGADAN (88)', link: 'https://forum.blackrussia.online/forums/Сервер-№88-magadan.3911/', color: '#0000CD', nodeId: 3911 },
                { text: 'CHEREPOVETS (89)', link: 'https://forum.blackrussia.online/forums/Сервер-№89-cherepovets.3946/', color: '#0000CD', nodeId: 3946 },
                { text: 'NORILSK (90)', link: 'https://forum.blackrussia.online/forums/Сервер-№90-norilsk.3984/', color: '#0000CD', nodeId: 3984 },
                { text: 'ASTANA (91)', link: 'https://forum.blackrussia.online/forums/Сервер-№91-astana.4020/', color: '#0000CD', nodeId: 4020 },
            ];

            const DATA_PLAYER_COMPLAINT = [
                { text: 'RED (1)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.88/', color: '#DC143C', nodeId: 88 },
                { text: 'GREEN (2)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.119/', color: '#DC143C', nodeId: 119 },
                { text: 'BLUE (3)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.156/', color: '#DC143C', nodeId: 156 },
                { text: 'YELLOW (4)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.194/', color: '#DC143C', nodeId: 194 },
                { text: 'ORANGE (5)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.273/', color: '#DC143C', nodeId: 273 },
                { text: 'PURPLE (6)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.312/', color: '#DC143C', nodeId: 312 },
                { text: 'LIME (7)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.352/', color: '#DC143C', nodeId: 352 },
                { text: 'PINK (8)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.394/', color: '#DC143C', nodeId: 394 },
                { text: 'CHERRY (9)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.435/', color: '#DC143C', nodeId: 435 },
                { text: 'BLACK (10)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.470/', color: '#DC143C', nodeId: 470 },
                { text: 'INDIGO (11)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.519/', color: '#DC143C', nodeId: 519 },
                { text: 'WHITE (12)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.560/', color: '#DC143C', nodeId: 560 },
                { text: 'MAGENTA (13)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.599/', color: '#DC143C', nodeId: 599 },
                { text: 'CRIMSON (14)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.640/', color: '#DC143C', nodeId: 640 },
                { text: 'GOLD (15)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.682/', color: '#DC143C', nodeId: 682 },
                { text: 'AZURE (16)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.723/', color: '#DC143C', nodeId: 723 },
                { text: 'PLATINUM (17)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.785/', color: '#DC143C', nodeId: 785 },
                { text: 'AQUA (18)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.844/', color: '#DC143C', nodeId: 844 },
                { text: 'GRAY (19)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.885/', color: '#DC143C', nodeId: 885 },
                { text: 'ICE (20)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.954/', color: '#DC143C', nodeId: 954 },
                { text: 'CHILLI (21)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.994/', color: '#DC143C', nodeId: 994 },
                { text: 'CHOCO (22)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1036/', color: '#DC143C', nodeId: 1036 },
                { text: 'MOSCOW (23)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1082/', color: '#DC143C', nodeId: 1082 },
                { text: 'SPB (24)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1124/', color: '#DC143C', nodeId: 1124 },
                { text: 'UFA (25)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1167/', color: '#DC143C', nodeId: 1167 },
                { text: 'SOCHI (26)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1234/', color: '#DC143C', nodeId: 1234 },
                { text: 'KAZAN (27)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1276/', color: '#DC143C', nodeId: 1276 },
                { text: 'SAMARA (28)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1320/', color: '#DC143C', nodeId: 1320 },
                { text: 'ROSTOV (29)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1362/', color: '#DC143C', nodeId: 1362 },
                { text: 'ANAPA (30)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1402/', color: '#DC143C', nodeId: 1402 },
                { text: 'EKB (31)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1444/', color: '#DC143C', nodeId: 1444 },
                { text: 'KRASNODAR (32)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1488/', color: '#DC143C', nodeId: 1488 },
                { text: 'ARZAMAS (33)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1531/', color: '#DC143C', nodeId: 1531 },
                { text: 'NOVOSIBIRSK (34)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1572/', color: '#DC143C', nodeId: 1572 },
                { text: 'GROZNY (35)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1614/', color: '#DC143C', nodeId: 1614 },
                { text: 'SARATOV (36)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1656/', color: '#DC143C', nodeId: 1656 },
                { text: 'OMSK (37)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1698/', color: '#DC143C', nodeId: 1698 },
                { text: 'IRKUTSK (38)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1740/', color: '#DC143C', nodeId: 1740 },
                { text: 'VOLGOGRAD (39)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1786/', color: '#DC143C', nodeId: 1786 },
                { text: 'VORONEZH (40)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1828/', color: '#DC143C', nodeId: 1828 },
                { text: 'BELGOROD (41)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1870/', color: '#DC143C', nodeId: 1870 },
                { text: 'MAKHACHKALA (42)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1912/', color: '#DC143C', nodeId: 1912 },
                { text: 'VLADIKAVKAZ (43)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1954/', color: '#DC143C', nodeId: 1954 },
                { text: 'VLADIVOSTOK (44)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1996/', color: '#DC143C', nodeId: 1996 },
                { text: 'KALININGRAD (45)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2038/', color: '#DC143C', nodeId: 2038 },
                { text: 'CHELYABINSK (46)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2080/', color: '#DC143C', nodeId: 2080 },
                { text: 'KRASNOYARSK (47)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2122/', color: '#DC143C', nodeId: 2122 },
                { text: 'CHEBOKSARY (48)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2164/', color: '#DC143C', nodeId: 2164 },
                { text: 'KHABAROVSK (49)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2206/', color: '#DC143C', nodeId: 2206 },
                { text: 'PERM (50)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2248/', color: '#DC143C', nodeId: 2248 },
                { text: 'TULA (51)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2290/', color: '#DC143C', nodeId: 2290 },
                { text: 'RYAZAN (52)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2332/', color: '#DC143C', nodeId: 2332 },
                { text: 'MURMANSK (53)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2374/', color: '#DC143C', nodeId: 2374 },
                { text: 'PENZA (54)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2416/', color: '#DC143C', nodeId: 2416 },
                { text: 'KURSK (55)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2458/', color: '#DC143C', nodeId: 2458 },
                { text: 'ARKHANGELSK (56)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2500/', color: '#DC143C', nodeId: 2500 },
                { text: 'ORENBURG (57)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2545/', color: '#DC143C', nodeId: 2545 },
                { text: 'KIROV (58)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2584/', color: '#DC143C', nodeId: 2584 },
                { text: 'KEMEROVO (59)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2626/', color: '#DC143C', nodeId: 2626 },
                { text: 'TYUMEN (60)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2663/', color: '#DC143C', nodeId: 2663 },
                { text: 'TOLYATTI (61)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2702/', color: '#DC143C', nodeId: 2702 },
                { text: 'IVANOVO (62)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2735/', color: '#DC143C', nodeId: 2735 },
                { text: 'STAVROPOL (63)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2767/', color: '#DC143C', nodeId: 2767 },
                { text: 'SMOLENSK (64)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2799/', color: '#DC143C', nodeId: 2799 },
                { text: 'PSKOV (65)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2831/', color: '#DC143C', nodeId: 2831 },
                { text: 'BRYANSK (66)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2863/', color: '#DC143C', nodeId: 2863 },
                { text: 'OREL (67)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2895/', color: '#DC143C', nodeId: 2895 },
                { text: 'YAROSLAVL (68)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2927/', color: '#DC143C', nodeId: 2927 },
                { text: 'BARNAUL (69)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2959/', color: '#DC143C', nodeId: 2959 },
                { text: 'LIPETSK (70)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2991/', color: '#DC143C', nodeId: 2991 },
                { text: 'ULYANOVSK (71)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3023/', color: '#DC143C', nodeId: 3023 },
                { text: 'YAKUTSK (72)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3055/', color: '#DC143C', nodeId: 3055 },
                { text: 'TAMBOV (73)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3309/', color: '#DC143C', nodeId: 3309 },
                { text: 'BRATSK (74)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3344/', color: '#DC143C', nodeId: 3344 },
                { text: 'ASTRAKHAN (75)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3379/', color: '#DC143C', nodeId: 3379 },
                { text: 'CHITA (76)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3414/', color: '#DC143C', nodeId: 3414 },
                { text: 'KOSTROMA (77)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3449/', color: '#DC143C', nodeId: 3449 },
                { text: 'VLADIMIR (78)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3484/', color: '#DC143C', nodeId: 3484 },
                { text: 'KALUGA (79)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3519/', color: '#DC143C', nodeId: 3519 },
                { text: 'NOVGOROD (80)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3555/', color: '#DC143C', nodeId: 3555 },
                { text: 'TAGANROG (81)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3590/', color: '#DC143C', nodeId: 3590 },
                { text: 'VOLOGDA (82)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3625/', color: '#DC143C', nodeId: 3625 },
                { text: 'TVER (83)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3666/', color: '#DC143C', nodeId: 3666 },
                { text: 'TOMSK (84)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3728/', color: '#DC143C', nodeId: 3728 },
                { text: 'IZHEVSK (85)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3767/', color: '#DC143C', nodeId: 3767 },
                { text: 'SURGUT (86)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3800/', color: '#DC143C', nodeId: 3800 },
                { text: 'PODOLSK (87)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3837/', color: '#DC143C', nodeId: 3837 },
                { text: 'MAGADAN (88)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3932/', color: '#DC143C', nodeId: 3932 },
                { text: 'CHEREPOVETS (89)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3967/', color: '#DC143C', nodeId: 3967 },
                { text: 'NORILSK (90)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.4005/', color: '#DC143C', nodeId: 4005 },
                { text: 'ASTANA (91)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.4041/', color: '#DC143C', nodeId: 4041 },
            ];

            const OPS_LINK = { text: 'ОПС', href: 'https://forum.blackrussia.online/threads/%D0%9E%D0%B1%D1%89%D0%B8%D0%B5-%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0-%D1%81%D0%B5%D1%80%D0%B2%D0%B5%D1%80%D0%BE%D0%B2.312571/', color: '#f59e0b', glow: true, nodeId: null };

            const SERVER_LIST = DATA_TECH.map((item, index) => {
                const match = item.text.match(/(.*?) \((\d+)\)/);
                return {
                    id: index + 1,
                    name: match ? match[1] : `Server ${index+1}`,
                    fullName: item.text
                };
            });

            function getSelected() {
                const saved = localStorage.getItem(STORAGE_PREFIX + 'servers');
                return saved ? JSON.parse(saved) : [31, 32, 33, 34, 35];
            }

            function renderMenu() {
                const menu = document.querySelector('.fnp-menu');
                if(!menu) return;

                menu.innerHTML = '';
                const selectedIds = getSelected();

                if (selectedIds.length === 0) {
                    const emptyMsg = document.createElement('div');
                    emptyMsg.style.cssText = 'color:#888; text-align:center; padding:10px; font-size:12px;';
                    emptyMsg.textContent = 'Серверы не выбраны. Нажмите настройки.';
                    menu.appendChild(emptyMsg);
                } else {
                    // Функция для создания кнопки с ПЕРЕНОСОМ темы
                    const createMoveButton = (dataArray, serverId, label) => {
                        const item = dataArray[serverId - 1];
                        if (!item || !item.nodeId) return null;
                        
                        const a = document.createElement('a');
                        a.className = 'fnp-link';
                        a.href = '#';
                        a.textContent = label + serverId;
                        a.style.borderBottom = `2px solid ${item.color}`;
                        
                        // ВАЖНО: при клике вызываем функцию переноса с nodeId
                        a.addEventListener('click', async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Запрашиваем подтверждение перед переносом
                            if (confirm(`Перенести текущую тему в раздел "${label}${serverId}"?`)) {
                                await moveThreadToSection(item.nodeId);
                            }
                        });
                        
                        a.addEventListener('pointerdown', e => e.stopPropagation());
                        return a;
                    };

                    const addGroup = (data, labelPrefix) => {
                        const group = document.createElement('div');
                        group.className = 'fnp-grid';
                        selectedIds.forEach(id => {
                            const btn = createMoveButton(data, id, labelPrefix);
                            if(btn) group.appendChild(btn);
                        });
                        menu.appendChild(group);
                    };

                    addGroup(DATA_TECH_COMPLAINT, 'ЖБТ ');
                    menu.appendChild(Object.assign(document.createElement('div'), {className:'fnp-divider'}));
                    addGroup(DATA_TECH, 'ТР ');
                    menu.appendChild(Object.assign(document.createElement('div'), {className:'fnp-divider'}));
                    addGroup(DATA_PLAYER_COMPLAINT, 'ЖБИ ');
                    menu.appendChild(Object.assign(document.createElement('div'), {className:'fnp-divider'}));

                    // ОПС - отдельная кнопка (перенос в тему правил невозможен)
                    const ops = document.createElement('a');
                    ops.className = 'fnp-link glow';
                    ops.href = '#';
                    ops.textContent = OPS_LINK.text;
                    ops.style.borderBottom = `2px solid ${OPS_LINK.color}`;
                    ops.addEventListener('click', (e) => {
                        e.preventDefault();
                        alert('ОПС - это тема с правилами, перенос темы в неё невозможен. Откроется ссылка в новой вкладке.');
                        window.open(OPS_LINK.href, '_blank');
                    });
                    menu.appendChild(ops);
                }

                const settingsBtn = document.createElement('div');
                settingsBtn.className = 'fnp-settings-btn';
                settingsBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`;
                settingsBtn.addEventListener('click', (e) => { e.stopPropagation(); openSettings(); });
                menu.appendChild(settingsBtn);
            }

            function openSettings() {
                const menu = document.querySelector('.fnp-menu');
                const toggleBtn = document.querySelector('.fnp-toggle');
                if(menu) menu.classList.remove('show');
                if(toggleBtn) toggleBtn.classList.remove('active');
                localStorage.setItem(STORAGE_PREFIX + 'state', 'false');

                let overlay = document.querySelector('.fnp-modal-overlay');
                if(!overlay) {
                    overlay = document.createElement('div'); overlay.className = 'fnp-modal-overlay';
                    overlay.innerHTML = `
                        <div class="fnp-modal">
                            <div class="fnp-modal-header">Выбор серверов</div>
                            <div class="fnp-modal-body"></div>
                            <div class="fnp-modal-footer">
                                <button class="fnp-btn fnp-btn-secondary" id="fnp-cancel">Отмена</button>
                                <button class="fnp-btn fnp-btn-primary" id="fnp-save">Сохранить</button>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(overlay);

                    overlay.querySelector('#fnp-cancel').onclick = () => overlay.classList.remove('open');
                    overlay.querySelector('#fnp-save').onclick = () => {
                        const checked = Array.from(overlay.querySelectorAll('input:checked')).map(el => +el.value).sort((a,b)=>a-b);
                        localStorage.setItem(STORAGE_PREFIX + 'servers', JSON.stringify(checked));
                        renderMenu();
                        overlay.classList.remove('open');
                    };
                }

                const body = overlay.querySelector('.fnp-modal-body');
                body.innerHTML = '';
                const current = getSelected();
                SERVER_LIST.forEach(srv => {
                    const lbl = document.createElement('label');
                    lbl.className = 'fnp-checkbox-label ' + (current.includes(srv.id) ? 'checked' : '');
                    lbl.innerHTML = `<input type="checkbox" value="${srv.id}" ${current.includes(srv.id)?'checked':''}> ${srv.name}`;
                    lbl.querySelector('input').onchange = function() {
                        this.parentElement.classList.toggle('checked', this.checked);
                    };
                    body.appendChild(lbl);
                });

                setTimeout(() => overlay.classList.add('open'), 10);
            }

            const style = document.createElement('style');
            style.textContent = `
                :root { --fnp-btn: 48px; }
                .fnp-wrapper { position: fixed; top: 0; left: 0; width: 0; height: 0; z-index: 2147483647; }
                .fnp-toggle { position: fixed; width: var(--fnp-btn); height: var(--fnp-btn); background: #151515; border: 1px solid rgba(255,255,255,0.2); border-radius: 50%; box-shadow: 0 6px 25px rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; color: #fff; cursor: grab; touch-action: none; user-select: none; transition: transform 0.2s; }
                .fnp-toggle:active { transform: scale(0.9); cursor: grabbing; }
                .fnp-toggle.active { background: #2563eb; border-color: #3b82f6; }
                .fnp-toggle.active svg { transform: rotate(45deg); }
                .fnp-menu { position: fixed; background: rgba(20, 20, 20, 0.95); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 10px; display: flex; flex-direction: column; gap: 5px; width: 300px; max-height: 70vh; overflow-y: auto; opacity: 0; visibility: hidden; transform: scale(0.9); transition: opacity 0.2s, transform 0.2s, visibility 0.2s; pointer-events: none; box-shadow: 0 10px 40px rgba(0,0,0,0.6); }
                .fnp-menu.show { opacity: 1; visibility: visible; transform: scale(1); pointer-events: auto; }
                .fnp-menu::-webkit-scrollbar { width: 4px; }
                .fnp-menu::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 2px; }
                .fnp-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; }
                .fnp-link { display: flex; align-items: center; justify-content: center; padding: 6px 2px; font-family: system-ui, -apple-system, sans-serif; font-size: 10px; font-weight: 700; color: #e5e5e5; text-decoration: none; background: rgba(255,255,255,0.05); border-radius: 6px; border: 1px solid transparent; transition: background 0.1s; white-space: nowrap; cursor: pointer; }
                .fnp-link:active { background: rgba(255,255,255,0.2); transform: translateY(1px); }
                .fnp-link.active-page { background: rgba(255,255,255,0.2); color: #fff; border-color: rgba(255,255,255,0.3); }
                .fnp-link.glow { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border-color: rgba(245, 158, 11, 0.3); }
                .fnp-divider { height: 1px; background: rgba(255,255,255,0.15); margin: 4px 0; width: 100%; }
                .fnp-settings-btn { width: 100%; padding: 8px; margin-top: 5px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #aaa; cursor: pointer; display: flex; justify-content: center; align-items: center; }
                .fnp-settings-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
                .fnp-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 2147483648; display: flex; align-items: center; justify-content: center; opacity: 0; visibility: hidden; transition: 0.3s; }
                .fnp-modal-overlay.open { opacity: 1; visibility: visible; }
                .fnp-modal { background: #1a1a1a; border: 1px solid #333; border-radius: 12px; width: 90%; max-width: 500px; max-height: 85vh; display: flex; flex-direction: column; box-shadow: 0 20px 50px rgba(0,0,0,0.8); }
                .fnp-modal-header { padding: 15px; border-bottom: 1px solid #333; display: flex; justify-content: space-between; align-items: center; color: #fff; font-weight: bold; }
                .fnp-modal-body { padding: 15px; overflow-y: auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 8px; }
                .fnp-modal-footer { padding: 15px; border-top: 1px solid #333; display: flex; justify-content: flex-end; gap: 10px; }
                .fnp-checkbox-label { display: flex; align-items: center; gap: 8px; background: #222; padding: 6px; border-radius: 6px; cursor: pointer; user-select: none; color: #ccc; font-size: 12px; border: 1px solid #333; }
                .fnp-checkbox-label:hover { background: #2a2a2a; }
                .fnp-checkbox-label input { accent-color: #2563eb; }
                .fnp-checkbox-label.checked { border-color: #2563eb; background: rgba(37, 99, 235, 0.1); color: #fff; }
                .fnp-btn { padding: 8px 16px; border-radius: 6px; border: none; cursor: pointer; font-weight: bold; transition: 0.2s; }
                .fnp-btn-primary { background: #2563eb; color: #fff; }
                .fnp-btn-primary:hover { background: #1d4ed8; }
                .fnp-btn-secondary { background: #333; color: #ccc; }
                .fnp-btn-secondary:hover { background: #444; color: #fff; }
            `;
            document.head.appendChild(style);

            const wrapper = document.createElement('div');
            wrapper.className = 'fnp-wrapper';
            const toggleBtn = document.createElement('div');
            toggleBtn.className = 'fnp-toggle';
            toggleBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;
            const menu = document.createElement('div');
            menu.className = 'fnp-menu';
            wrapper.appendChild(menu);
            wrapper.appendChild(toggleBtn);
            document.body.appendChild(wrapper);

            let savedPos = localStorage.getItem(STORAGE_PREFIX + 'pos');
            let pos = savedPos ? JSON.parse(savedPos) : {x: window.innerWidth - 60, y: window.innerHeight * 0.6};
            let isDragging = false;

            const updatePos = (x, y) => {
                pos.x = Math.min(Math.max(0, x), window.innerWidth - 50);
                pos.y = Math.min(Math.max(0, y), window.innerHeight - 50);
                toggleBtn.style.left = pos.x + 'px';
                toggleBtn.style.top = pos.y + 'px';

                const rect = toggleBtn.getBoundingClientRect();
                menu.style.left = (rect.right + 310 > window.innerWidth ? rect.left - 310 : rect.right + 10) + 'px';
                menu.style.top = (rect.bottom + 300 > window.innerHeight ? rect.top - 300 : rect.top) + 'px';
            };

            toggleBtn.addEventListener('pointerdown', (e) => {
                isDragging = true;
                toggleBtn.setPointerCapture(e.pointerId);
                toggleBtn.style.transition = 'none';
            });

            toggleBtn.addEventListener('pointermove', (e) => {
                if(!isDragging) return;
                updatePos(e.clientX - 24, e.clientY - 24);
            });

            toggleBtn.addEventListener('pointerup', (e) => {
                isDragging = false;
                toggleBtn.releasePointerCapture(e.pointerId);
                toggleBtn.style.transition = 'all 0.3s';
                pos.x = pos.x < window.innerWidth/2 ? 10 : window.innerWidth - 60;
                updatePos(pos.x, pos.y);
                localStorage.setItem(STORAGE_PREFIX + 'pos', JSON.stringify(pos));

                if(Math.abs(e.clientX - 24 - pos.x) < 10) {
                    const show = menu.classList.toggle('show');
                    toggleBtn.classList.toggle('active', show);
                    localStorage.setItem(STORAGE_PREFIX + 'state', show);
                    if(show) updatePos(pos.x, pos.y);
                }
            });

            updatePos(pos.x, pos.y);
            renderMenu();
            if(localStorage.getItem(STORAGE_PREFIX + 'state') === 'true') {
                menu.classList.add('show');
                toggleBtn.classList.add('active');
            }

        })();
    } catch (e) { console.error('[BR Script] Panel Error:', e); }
})();
