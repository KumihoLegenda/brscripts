// ==UserScript==
// @name         BR Panel (Menu Only)
// @namespace    http://tampermonkey.net/
// @version      3.2
// @description  Floating menu with servers and thread mover (FIX: no prefix reset)
// @author       Black Russia
// @match        https://forum.blackrussia.online/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    if (document.body.getAttribute('data-br-script-injected-panel')) {
        return;
    }
    document.body.setAttribute('data-br-script-injected-panel', 'true');

    try {
        (function() {
            const STORAGE_PREFIX = 'br_panel_mix_';

            function getFormData(data) {
                const formData = new FormData();
                Object.entries(data).forEach(i => formData.append(i[0], i[1]));
                return formData;
            }

            function moveThread(prefix, targetNodeId) {
                const threadTitle = document.querySelector('.p-title-value')?.lastChild?.textContent || '';
                
                fetch(`${document.URL}move`, {
                    method: 'POST',
                    body: getFormData({
                        prefix_id: prefix,
                        title: threadTitle,
                        target_node_id: targetNodeId,
                        redirect_type: 'none',
                        notify_watchers: 1,
                        starter_alert: 1,
                        starter_alert_reason: "",
                        _xfToken: XF.config.csrf,
                        _xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
                        _xfWithData: 1,
                        _xfResponseType: 'json',
                    }),
                }).then(() => location.reload());
            }

            function moveThreadToSection(targetNodeId) {
                const threadId = getThreadIdFromUrl();
                if (!threadId) {
                    alert('Эта функция доступна только при просмотре темы!');
                    return false;
                }

                // ✅ ТОЛЬКО ПЕРЕНОС (без изменения префикса)
                moveThread(0, targetNodeId);

                return true;
            }

            function getThreadIdFromUrl() {
                const match = window.location.pathname.match(/\/threads\/[^.]+\.(\d+)/);
                return match ? match[1] : null;
            }

            // ===== ВСЁ НИЖЕ БЕЗ ИЗМЕНЕНИЙ =====

            const serverNames = {
                1:'RED',2:'GREEN',3:'BLUE',4:'YELLOW',5:'ORANGE',6:'PURPLE',7:'LIME',8:'PINK',9:'CHERRY',10:'BLACK',
                11:'INDIGO',12:'WHITE',13:'MAGENTA',14:'CRIMSON',15:'GOLD',16:'AZURE',17:'PLATINUM',18:'AQUA',19:'GRAY',20:'ICE',
                21:'CHILLI',22:'CHOCO',23:'MOSCOW',24:'SPB',25:'UFA',26:'SOCHI',27:'KAZAN',28:'SAMARA',29:'ROSTOV',30:'ANAPA',
                31:'EKB',32:'KRASNODAR',33:'ARZAMAS',34:'NOVOSIBIRSK',35:'GROZNY',36:'SARATOV',37:'OMSK',38:'IRKUTSK',39:'VOLGOGRAD',40:'VORONEZH',
                41:'BELGOROD',42:'MAKHACHKALA',43:'VLADIKAVKAZ',44:'VLADIVOSTOK',45:'KALININGRAD',46:'CHELYABINSK',47:'KRASNOYARSK',
                48:'CHEBOKSARY',49:'KHABAROVSK',50:'PERM',51:'TULA',52:'RYAZAN',53:'MURMANSK',54:'PENZA',55:'KURSK',
                56:'ARKHANGELSK',57:'ORENBURG',58:'KIROV',59:'KEMEROVO',60:'TYUMEN',61:'TOLYATTI',62:'IVANOVO',
                63:'STAVROPOL',64:'SMOLENSK',65:'PSKOV',66:'BRYANSK',67:'OREL',68:'YAROSLAVL',69:'BARNAUL',70:'LIPETSK',
                71:'ULYANOVSK',72:'YAKUTSK',73:'TAMBOV',74:'BRATSK',75:'ASTRAKHAN',76:'CHITA',77:'KOSTROMA',78:'VLADIMIR',
                79:'KALUGA',80:'NOVGOROD',81:'TAGANROG',82:'VOLOGDA',83:'TVER',84:'TOMSK',85:'IZHEVSK',86:'SURGUT',
                87:'PODOLSK',88:'MAGADAN',89:'CHEREPOVETS',90:'NORILSK',91:'ASTANA'
            };

            const techNodeIds = {1:226,2:227,3:228,4:229,5:245,6:325,7:365,8:396,9:408,10:488,11:493,12:554,13:613,14:653,15:660,16:701,17:757,18:815,19:857,20:925,21:1007,22:1048,23:1052,24:1095,25:1138,26:1248,27:1290,28:1292,29:1334,30:1416,31:1458,32:1460,33:1502,34:1544,35:1586};

            const techComplaintNodeIds = {1:1182,2:1183,3:1184,4:1185,5:1186,6:1187,7:1188,8:1189,9:1190,10:1191,31:1457,32:1459,33:1501,34:1543,35:1585};

            const playerComplaintNodeIds = {1:88,2:119,3:156,4:194,5:273,31:1444,32:1488,33:1531,34:1572,35:1614};

            const techColor = '#8B008B';
            const techComplaintColor = '#0000CD';
            const playerComplaintColor = '#DC143C';

            function getSelected() {
                const saved = localStorage.getItem(STORAGE_PREFIX + 'servers');
                return saved ? JSON.parse(saved) : [31, 32, 33, 34, 35];
            }

            function renderMenu() {
                const menu = document.querySelector('.fnp-menu');
                if (!menu) return;

                menu.innerHTML = '';
                const selectedIds = getSelected();

                const header = document.createElement('div');
                header.textContent = 'ПЕРЕНОС ТЕМ';
                header.style.cssText = 'text-align:center;color:#fff;font-weight:bold;font-size:12px;padding:5px 0;margin-bottom:5px;';
                menu.appendChild(header);

                const createMoveButton = (nodeId, serverId, label, color) => {
                    const a = document.createElement('a');
                    a.className = 'fnp-link';
                    a.href = '#';
                    a.textContent = `${label} ${serverId}`;
                    a.style.borderBottom = `2px solid ${color}`;
                    
                    a.onclick = (e) => {
                        e.preventDefault();
                        moveThreadToSection(nodeId);
                    };
                    
                    return a;
                };

                const group = document.createElement('div');
                group.className = 'fnp-grid';

                selectedIds.forEach(id => {
                    if (techNodeIds[id]) group.appendChild(createMoveButton(techNodeIds[id], id, 'ТР', techColor));
                    if (techComplaintNodeIds[id]) group.appendChild(createMoveButton(techComplaintNodeIds[id], id, 'ЖБТ', techComplaintColor));
                    if (playerComplaintNodeIds[id]) group.appendChild(createMoveButton(playerComplaintNodeIds[id], id, 'ЖБИ', playerComplaintColor));
                });

                menu.appendChild(group);
            }

            const wrapper = document.createElement('div');
            wrapper.className = 'fnp-wrapper';

            const toggleBtn = document.createElement('div');
            toggleBtn.className = 'fnp-toggle';
            toggleBtn.textContent = '+';

            const menu = document.createElement('div');
            menu.className = 'fnp-menu';

            wrapper.appendChild(menu);
            wrapper.appendChild(toggleBtn);
            document.body.appendChild(wrapper);

            toggleBtn.onclick = () => {
                menu.classList.toggle('show');
            };

            renderMenu();
        })();
    } catch (e) {
        console.error('[BR Script] Panel Error:', e);
    }
})();
