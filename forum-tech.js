(function () {
    'use strict';
    try {
        (function() {
            const STORAGE_PREFIX = 'br_panel_mix_';

            // Ссылки на тех. разделы
            const DATA_TECH = [
                { text: 'RED (1)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-red.226/', color: '#8B008B' },
                { text: 'GREEN (2)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-green.227/', color: '#8B008B' },
                { text: 'BLUE (3)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-blue.228/', color: '#8B008B' },
                { text: 'YELLOW (4)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-yellow.229/', color: '#8B008B' },
                { text: 'ORANGE (5)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-orange.245/', color: '#8B008B' },
                { text: 'PURPLE (6)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-purple.325/', color: '#8B008B' },
                { text: 'LIME (7)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-lime.365/', color: '#8B008B' },
                { text: 'PINK (8)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-pink.396/', color: '#8B008B' },
                { text: 'CHERRY (9)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-cherry.408/', color: '#8B008B' },
                { text: 'BLACK (10)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-black.488/', color: '#8B008B' },
                { text: 'INDIGO (11)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-indigo.493/', color: '#8B008B' },
                { text: 'WHITE (12)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-white.554/', color: '#8B008B' },
                { text: 'MAGENTA (13)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-magenta.613/', color: '#8B008B' },
                { text: 'CRIMSON (14)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-crimson.653/', color: '#8B008B' },
                { text: 'GOLD (15)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-gold.660/', color: '#8B008B' },
                { text: 'AZURE (16)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-azure.701/', color: '#8B008B' },
                { text: 'PLATINUM (17)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-platinum.757/', color: '#8B008B' },
                { text: 'AQUA (18)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-aqua.815/', color: '#8B008B' },
                { text: 'GRAY (19)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-gray.857/', color: '#8B008B' },
                { text: 'ICE (20)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-ice.925/', color: '#8B008B' },
                { text: 'CHILLI (21)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-chilli.1007/', color: '#8B008B' },
                { text: 'CHOCO (22)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-choco.1048/', color: '#8B008B' },
                { text: 'MOSCOW (23)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-moscow.1052/', color: '#8B008B' },
                { text: 'SPB (24)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-spb.1095/', color: '#8B008B' },
                { text: 'UFA (25)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-ufa.1138/', color: '#8B008B' },
                { text: 'SOCHI (26)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-sochi.1248/', color: '#8B008B' },
                { text: 'KAZAN (27)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-kazan.1290/', color: '#8B008B' },
                { text: 'SAMARA (28)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-samara.1292/', color: '#8B008B' },
                { text: 'ROSTOV (29)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-rostov.1334/', color: '#8B008B' },
                { text: 'ANAPA (30)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-anapa.1416/', color: '#8B008B' },
                { text: 'EKB (31)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-ekb.1458/', color: '#8B008B' },
                { text: 'KRASNODAR (32)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-krasnodar.1460/', color: '#8B008B' },
                { text: 'ARZAMAS (33)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-arzamas.1502/', color: '#8B008B' },
                { text: 'NOVOSIBIRSK (34)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-novosibirsk.1544/', color: '#8B008B' },
                { text: 'GROZNY (35)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-grozny.1586/', color: '#8B008B' },
                { text: 'SARATOV (36)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-saratov.1628/', color: '#8B008B' },
                { text: 'OMSK (37)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-omsk.1670/', color: '#8B008B' },
                { text: 'IRKUTSK (38)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-irkutsk.1712/', color: '#8B008B' },
                { text: 'VOLGOGRAD (39)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-volgograd.1758/', color: '#8B008B' },
                { text: 'VORONEZH (40)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-voronezh.1800/', color: '#8B008B' },
                { text: 'BELGOROD (41)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-belgorod.1842/', color: '#8B008B' },
                { text: 'MAKHACHKALA (42)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-makhachkala.1884/', color: '#8B008B' },
                { text: 'VLADIKAVKAZ (43)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-vladikavkaz.1926/', color: '#8B008B' },
                { text: 'VLADIVOSTOK (44)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-vladivostok.1968/', color: '#8B008B' },
                { text: 'KALININGRAD (45)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-kaliningrad.2010/', color: '#8B008B' },
                { text: 'CHELYABINSK (46)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-chelyabinsk.2052/', color: '#8B008B' },
                { text: 'KRASNOYARSK (47)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-krasnoyarsk.2094/', color: '#8B008B' },
                { text: 'CHEBOKSARY (48)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-cheboksary.2136/', color: '#8B008B' },
                { text: 'KHABAROVSK (49)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-khabarovsk.2178/', color: '#8B008B' },
                { text: 'PERM (50)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-perm.2220/', color: '#8B008B' },
                { text: 'TULA (51)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-tula.2262/', color: '#8B008B' },
                { text: 'RYAZAN (52)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-ryazan.2304/', color: '#8B008B' },
                { text: 'MURMANSK (53)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-murmansk.2346/', color: '#8B008B' },
                { text: 'PENZA (54)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-penza.2388/', color: '#8B008B' },
                { text: 'KURSK (55)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-kursk.2430/', color: '#8B008B' },
                { text: 'ARKHANGELSK (56)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-arkhangelsk.2472/', color: '#8B008B' },
                { text: 'ORENBURG (57)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-orenburg.2514/', color: '#8B008B' },
                { text: 'KIROV (58)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-kirov.2516/', color: '#8B008B' },
                { text: 'KEMEROVO (59)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-kemerovo.2598/', color: '#8B008B' },
                { text: 'TYUMEN (60)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-tyumen.2639/', color: '#8B008B' },
                { text: 'TOLYATTI (61)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-tolyatti.2682/', color: '#8B008B' },
                { text: 'IVANOVO (62)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-ivanovo.2714/', color: '#8B008B' },
                { text: 'STAVROPOL (63)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-stavropol.2747/', color: '#8B008B' },
                { text: 'SMOLENSK (64)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-smolensk.2779/', color: '#8B008B' },
                { text: 'PSKOV (65)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-pskov.2811/', color: '#8B008B' },
                { text: 'BRYANSK (66)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-bryansk.2843/', color: '#8B008B' },
                { text: 'OREL (67)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-orel.2875/', color: '#8B008B' },
                { text: 'YAROSLAVL (68)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-yaroslavl.2907/', color: '#8B008B' },
                { text: 'BARNAUL (69)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-barnaul.2939/', color: '#8B008B' },
                { text: 'LIPETSK (70)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-lipetsk.2971/', color: '#8B008B' },
                { text: 'ULYANOVSK (71)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-ulyanovsk.3003/', color: '#8B008B' },
                { text: 'YAKUTSK (72)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-yakutsk.3035/', color: '#8B008B' },
                { text: 'TAMBOV (73)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-tambov.3289/', color: '#8B008B' },
                { text: 'BRATSK (74)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-bratsk.3324/', color: '#8B008B' },
                { text: 'ASTRAKHAN (75)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-astrakhan.3359/', color: '#8B008B' },
                { text: 'CHITA (76)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-chita.3394/', color: '#8B008B' },
                { text: 'KOSTROMA (77)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-kostroma.3429/', color: '#8B008B' },
                { text: 'VLADIMIR (78)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-vladimir.3464/', color: '#8B008B' },
                { text: 'KALUGA (79)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-kaluga.3499/', color: '#8B008B' },
                { text: 'NOVGOROD (80)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-novgorod.3535/', color: '#8B008B' },
                { text: 'TAGANROG (81)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-taganrog.3570/', color: '#8B008B' },
                { text: 'VOLOGDA (82)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-vologda.3605/', color: '#8B008B' },
                { text: 'TVER (83)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-tver.3643/', color: '#8B008B' },
                { text: 'TOMSK (84)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-tomsk.3740/', color: '#8B008B' },
                { text: 'IZHEVSK (85)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-izhevsk.3747/', color: '#8B008B' },
                { text: 'SURGUT (86)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-surgut.3812/', color: '#8B008B' },
                { text: 'PODOLSK (87)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-podolsk.3817/', color: '#8B008B' },
                { text: 'MAGADAN (88)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-magadan.3912/', color: '#8B008B' },
                { text: 'CHEREPOVETS (89)', link: 'https://forum.blackrussia.online/forums/Технический-раздел-cherepovets.3978/', color: '#8B008B' },
            ];

            const DATA_TECH_COMPLAINT = [
                { text: 'RED (1)', link: 'https://forum.blackrussia.online/forums/Сервер-№1-red.1182/', color: '#0000CD' },
                { text: 'GREEN (2)', link: 'https://forum.blackrussia.online/forums/Сервер-№2-green.1183/', color: '#0000CD' },
                { text: 'BLUE (3)', link: 'https://forum.blackrussia.online/forums/Сервер-№3-blue.1184/', color: '#0000CD' },
                { text: 'YELLOW (4)', link: 'https://forum.blackrussia.online/forums/Сервер-№4-yellow.1185/', color: '#0000CD' },
                { text: 'ORANGE (5)', link: 'https://forum.blackrussia.online/forums/Сервер-№5-orange.1186/', color: '#0000CD' },
                { text: 'PURPLE (6)', link: 'https://forum.blackrussia.online/forums/Сервер-№6-purple.1187/', color: '#0000CD' },
                { text: 'LIME (7)', link: 'https://forum.blackrussia.online/forums/Сервер-№7-lime.1188/', color: '#0000CD' },
                { text: 'PINK (8)', link: 'https://forum.blackrussia.online/forums/Сервер-№8-pink.1189/', color: '#0000CD' },
                { text: 'CHERRY (9)', link: 'https://forum.blackrussia.online/forums/Сервер-№9-cherry.1190/', color: '#0000CD' },
                { text: 'BLACK (10)', link: 'https://forum.blackrussia.online/forums/Сервер-№10-black.1191/', color: '#0000CD' },
                { text: 'INDIGO (11)', link: 'https://forum.blackrussia.online/forums/Сервер-№11-indigo.1192/', color: '#0000CD' },
                { text: 'WHITE (12)', link: 'https://forum.blackrussia.online/forums/Сервер-№12-white.1193/', color: '#0000CD' },
                { text: 'MAGENTA (13)', link: 'https://forum.blackrussia.online/forums/Сервер-№13-magenta.1194/', color: '#0000CD' },
                { text: 'CRIMSON (14)', link: 'https://forum.blackrussia.online/forums/Сервер-№14-crimson.1195/', color: '#0000CD' },
                { text: 'GOLD (15)', link: 'https://forum.blackrussia.online/forums/Сервер-№15-gold.1196/', color: '#0000CD' },
                { text: 'AZURE (16)', link: 'https://forum.blackrussia.online/forums/Сервер-№16-azure.1197/', color: '#0000CD' },
                { text: 'PLATINUM (17)', link: 'https://forum.blackrussia.online/forums/Сервер-№17-platinum.1198/', color: '#0000CD' },
                { text: 'AQUA (18)', link: 'https://forum.blackrussia.online/forums/Сервер-№18-aqua.1199/', color: '#0000CD' },
                { text: 'GRAY (19)', link: 'https://forum.blackrussia.online/forums/Сервер-№19-gray.1200/', color: '#0000CD' },
                { text: 'ICE (20)', link: 'https://forum.blackrussia.online/forums/Сервер-№20-ice.1201/', color: '#0000CD' },
                { text: 'CHILLI (21)', link: 'https://forum.blackrussia.online/forums/Сервер-№21-chilli.1202/', color: '#0000CD' },
                { text: 'CHOCO (22)', link: 'https://forum.blackrussia.online/forums/Сервер-№22-choco.1203/', color: '#0000CD' },
                { text: 'MOSCOW (23)', link: 'https://forum.blackrussia.online/forums/Сервер-№23-moscow.1204/', color: '#0000CD' },
                { text: 'SPB (24)', link: 'https://forum.blackrussia.online/forums/Сервер-№24-spb.1205/', color: '#0000CD' },
                { text: 'UFA (25)', link: 'https://forum.blackrussia.online/forums/Сервер-№25-ufa.1206/', color: '#0000CD' },
                { text: 'SOCHI (26)', link: 'https://forum.blackrussia.online/forums/Сервер-№26-sochi.1247/', color: '#0000CD' },
                { text: 'KAZAN (27)', link: 'https://forum.blackrussia.online/forums/Сервер-№27-kazan.1289/', color: '#0000CD' },
                { text: 'SAMARA (28)', link: 'https://forum.blackrussia.online/forums/Сервер-№28-samara.1291/', color: '#0000CD' },
                { text: 'ROSTOV (29)', link: 'https://forum.blackrussia.online/forums/Сервер-№29-rostov.1333/', color: '#0000CD' },
                { text: 'ANAPA (30)', link: 'https://forum.blackrussia.online/forums/Сервер-№30-anapa.1415/', color: '#0000CD' },
                { text: 'EKB (31)', link: 'https://forum.blackrussia.online/forums/Сервер-№31-ekb.1457/', color: '#0000CD' },
                { text: 'KRASNODAR (32)', link: 'https://forum.blackrussia.online/forums/Сервер-№32-krasnodar.1459/', color: '#0000CD' },
                { text: 'ARZAMAS (33)', link: 'https://forum.blackrussia.online/forums/Сервер-№33-arzamas.1501/', color: '#0000CD' },
                { text: 'NOVOSIBIRSK (34)', link: 'https://forum.blackrussia.online/forums/Сервер-№34-novosibirsk.1543/', color: '#0000CD' },
                { text: 'GROZNY (35)', link: 'https://forum.blackrussia.online/forums/Сервер-№35-grozny.1585/', color: '#0000CD' },
                { text: 'SARATOV (36)', link: 'https://forum.blackrussia.online/forums/Сервер-№36-grozny.1585/', color: '#0000CD' },
                { text: 'OMSK (37)', link: 'https://forum.blackrussia.online/forums/Сервер-№37-omsk.1669/', color: '#0000CD' },
                { text: 'IRKUTSK (38)', link: 'https://forum.blackrussia.online/forums/Сервер-№38-irkutsk.1711/', color: '#0000CD' },
                { text: 'VOLGOGRAD (39)', link: 'https://forum.blackrussia.online/forums/Сервер-№39-volgograd.1757/', color: '#0000CD' },
                { text: 'VORONEZH (40)', link: 'https://forum.blackrussia.online/forums/Сервер-№40-voronezh.1801/', color: '#0000CD' },
                { text: 'BELGOROD (41)', link: 'https://forum.blackrussia.online/forums/Сервер-№41-belgorod.1841/', color: '#0000CD' },
                { text: 'MAKHACHKALA (42)', link: 'https://forum.blackrussia.online/forums/Сервер-№42-makhachkala.1883/', color: '#0000CD' },
                { text: 'VLADIKAVKAZ (43)', link: 'https://forum.blackrussia.online/forums/Сервер-№43-vladikavkaz.1925/', color: '#0000CD' },
                { text: 'VLADIVOSTOK (44)', link: 'https://forum.blackrussia.online/forums/Сервер-№44-vladivostok.1967/', color: '#0000CD' },
                { text: 'KALININGRAD (45)', link: 'https://forum.blackrussia.online/forums/Сервер-№45-kaliningrad.2009/', color: '#0000CD' },
                { text: 'CHELYABINSK (46)', link: 'https://forum.blackrussia.online/forums/Сервер-№46-chelyabinsk.2051/', color: '#0000CD' },
                { text: 'KRASNOYARSK (47)', link: 'https://forum.blackrussia.online/forums/Сервер-№47-krasnoyarsk.2093/', color: '#0000CD' },
                { text: 'CHEBOKSARY (48)', link: 'https://forum.blackrussia.online/forums/Сервер-№48-cheboksary.2135/', color: '#0000CD' },
                { text: 'KHABAROVSK (49)', link: 'https://forum.blackrussia.online/forums/Сервер-№49-khabarovsk.2177/', color: '#0000CD' },
                { text: 'PERM (50)', link: 'https://forum.blackrussia.online/forums/Сервер-№50-perm.2219/', color: '#0000CD' },
                { text: 'TULA (51)', link: 'https://forum.blackrussia.online/forums/Сервер-№51-tula.2261/', color: '#0000CD' },
                { text: 'RYAZAN (52)', link: 'https://forum.blackrussia.online/forums/Сервер-№52-ryazan.2303/', color: '#0000CD' },
                { text: 'MURMANSK (53)', link: 'https://forum.blackrussia.online/forums/Сервер-№53-murmansk.2345/', color: '#0000CD' },
                { text: 'PENZA (54)', link: 'https://forum.blackrussia.online/forums/Сервер-№54-penza.2387/', color: '#0000CD' },
                { text: 'KURSK (55)', link: 'https://forum.blackrussia.online/forums/Сервер-№55-kursk.2429/', color: '#0000CD' },
                { text: 'ARKHANGELSK (56)', link: 'https://forum.blackrussia.online/forums/Сервер-№56-arkhangelsk.2471/', color: '#0000CD' },
                { text: 'ORENBURG (57)', link: 'https://forum.blackrussia.online/forums/Сервер-№57-orenburg.2513/', color: '#0000CD' },
                { text: 'KIROV (58)', link: 'https://forum.blackrussia.online/forums/Сервер-№58-kirov.2515/', color: '#0000CD' },
                { text: 'KEMEROVO (59)', link: 'https://forum.blackrussia.online/forums/Сервер-№59-kemerovo.2597/', color: '#0000CD' },
                { text: 'TYUMEN (60)', link: 'https://forum.blackrussia.online/forums/Сервер-№60-tuymen.2640/', color: '#0000CD' },
                { text: 'TOLYATTI (61)', link: 'https://forum.blackrussia.online/forums/Сервер-№61-tolyatti.2681/', color: '#0000CD' },
                { text: 'IVANOVO (62)', link: 'https://forum.blackrussia.online/forums/Сервер-№62-ivanovo.2713/', color: '#0000CD' },
                { text: 'STAVROPOL (63)', link: 'https://forum.blackrussia.online/forums/Сервер-№63-stavropol.2746/', color: '#0000CD' },
                { text: 'SMOLENSK (64)', link: 'https://forum.blackrussia.online/forums/Сервер-№64-smolensk.2778/', color: '#0000CD' },
                { text: 'PSKOV (65)', link: 'https://forum.blackrussia.online/forums/Сервер-№65-pskov.2810/', color: '#0000CD' },
                { text: 'BRYANSK (66)', link: 'https://forum.blackrussia.online/forums/Сервер-№66-bryansk.2842/', color: '#0000CD' },
                { text: 'OREL (67)', link: 'https://forum.blackrussia.online/forums/Сервер-№67-orel.2874/', color: '#0000CD' },
                { text: 'YAROSLAVL (68)', link: 'https://forum.blackrussia.online/forums/Сервер-№68-yaroslavl.2906/', color: '#0000CD' },
                { text: 'BARNAUL (69)', link: 'https://forum.blackrussia.online/forums/Сервер-№69-barnaul.2938/', color: '#0000CD' },
                { text: 'LIPETSK (70)', link: 'https://forum.blackrussia.online/forums/Сервер-№70-lipetsk.2970/', color: '#0000CD' },
                { text: 'ULYANOVSK (71)', link: 'https://forum.blackrussia.online/forums/Сервер-№71-ulyanovsk.3002/', color: '#0000CD' },
                { text: 'YAKUTSK (72)', link: 'https://forum.blackrussia.online/forums/Сервер-№72-yakutsk.3034/', color: '#0000CD' },
                { text: 'TAMBOV (73)', link: 'https://forum.blackrussia.online/forums/Сервер-№73-tambov.3288/', color: '#0000CD' },
                { text: 'BRATSK (74)', link: 'https://forum.blackrussia.online/forums/Сервер-№74-bratsk.3323/', color: '#0000CD' },
                { text: 'ASTRAKHAN (75)', link: 'https://forum.blackrussia.online/forums/Сервер-№75-astrakhan.3358/', color: '#0000CD' },
                { text: 'CHITA (76)', link: 'https://forum.blackrussia.online/forums/Сервер-№76-chita.3393/', color: '#0000CD' },
                { text: 'KOSTROMA (77)', link: 'https://forum.blackrussia.online/forums/Сервер-№77-kostroma.3428/', color: '#0000CD' },
                { text: 'VLADIMIR (78)', link: 'https://forum.blackrussia.online/forums/Сервер-№78-vladimir.3463/', color: '#0000CD' },
                { text: 'KALUGA (79)', link: 'https://forum.blackrussia.online/forums/Сервер-№79-kaluga.3498/', color: '#0000CD' },
                { text: 'NOVGOROD (80)', link: 'https://forum.blackrussia.online/forums/Сервер-№80-novgorod.3533/', color: '#0000CD' },
                { text: 'TAGANROG (81)', link: 'https://forum.blackrussia.online/forums/Сервер-№81-taganrog.3569/', color: '#0000CD' },
                { text: 'VOLOGDA (82)', link: 'https://forum.blackrussia.online/forums/Сервер-№82-vologda.3604/', color: '#0000CD' },
                { text: 'TVER (83)', link: 'https://forum.blackrussia.online/forums/Сервер-№83-tver.3642/', color: '#0000CD' },
                { text: 'TOMSK (84)', link: 'https://forum.blackrussia.online/forums/Сервер-№84-tomsk.3739/', color: '#0000CD' },
                { text: 'IZHEVSK (85)', link: 'https://forum.blackrussia.online/forums/Сервер-№85-izhevsk.3746/', color: '#0000CD' },
                { text: 'SURGUT (86)', link: 'https://forum.blackrussia.online/forums/Сервер-№86-surgut.3811/', color: '#0000CD' },
                { text: 'PODOLSK (87)', link: 'https://forum.blackrussia.online/forums/Сервер-№87-podolsk.3816/', color: '#0000CD' },
                { text: 'MAGADAN (88)', link: 'https://forum.blackrussia.online/forums/Сервер-№88-magadan.3911/', color: '#0000CD' },
                { text: 'CHEREPOVETS (89)', link: 'https://forum.blackrussia.online/forums/Сервер-№89-cherepovets.3946/', color: '#0000CD' },
            ];

            const DATA_PLAYER_COMPLAINT = [
                { text: 'RED (1)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.88/', color: '#DC143C' },
                { text: 'GREEN (2)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.119/', color: '#DC143C' },
                { text: 'BLUE (3)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.156/', color: '#DC143C' },
                { text: 'YELLOW (4)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.194/', color: '#DC143C' },
                { text: 'ORANGE (5)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.273/', color: '#DC143C' },
                { text: 'PURPLE (6)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.312/', color: '#DC143C' },
                { text: 'LIME (7)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.352/', color: '#DC143C' },
                { text: 'PINK (8)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.394/', color: '#DC143C' },
                { text: 'CHERRY (9)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.435/', color: '#DC143C' },
                { text: 'BLACK (10)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.470/', color: '#DC143C' },
                { text: 'INDIGO (11)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.519/', color: '#DC143C' },
                { text: 'WHITE (12)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.560/', color: '#DC143C' },
                { text: 'MAGENTA (13)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.599/', color: '#DC143C' },
                { text: 'CRIMSON (14)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.640/', color: '#DC143C' },
                { text: 'GOLD (15)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.682/', color: '#DC143C' },
                { text: 'AZURE (16)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.723/', color: '#DC143C' },
                { text: 'PLATINUM (17)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.785/', color: '#DC143C' },
                { text: 'AQUA (18)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.844/', color: '#DC143C' },
                { text: 'GRAY (19)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.885/', color: '#DC143C' },
                { text: 'ICE (20)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.954/', color: '#DC143C' },
                { text: 'CHILLI (21)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.994/', color: '#DC143C' },
                { text: 'CHOCO (22)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1036/', color: '#DC143C' },
                { text: 'MOSCOW (23)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1082/', color: '#DC143C' },
                { text: 'SPB (24)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1124/', color: '#DC143C' },
                { text: 'UFA (25)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1167/', color: '#DC143C' },
                { text: 'SOCHI (26)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1234/', color: '#DC143C' },
                { text: 'KAZAN (27)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1276/', color: '#DC143C' },
                { text: 'SAMARA (28)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1320/', color: '#DC143C' },
                { text: 'ROSTOV (29)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1362/', color: '#DC143C' },
                { text: 'ANAPA (30)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1402/', color: '#DC143C' },
                { text: 'EKB (31)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1444/', color: '#DC143C' },
                { text: 'KRASNODAR (32)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1488/', color: '#DC143C' },
                { text: 'ARZAMAS (33)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1531/', color: '#DC143C' },
                { text: 'NOVOSIBIRSK (34)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1572/', color: '#DC143C' },
                { text: 'GROZNY (35)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1614/', color: '#DC143C' },
                { text: 'SARATOV (36)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1656/', color: '#DC143C' },
                { text: 'OMSK (37)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1698/', color: '#DC143C' },
                { text: 'IRKUTSK (38)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1740/', color: '#DC143C' },
                { text: 'VOLGOGRAD (39)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1786/', color: '#DC143C' },
                { text: 'VORONEZH (40)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1828/', color: '#DC143C' },
                { text: 'BELGOROD (41)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1870/', color: '#DC143C' },
                { text: 'MAKHACHKALA (42)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1912/', color: '#DC143C' },
                { text: 'VLADIKAVKAZ (43)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1954/', color: '#DC143C' },
                { text: 'VLADIVOSTOK (44)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.1996/', color: '#DC143C' },
                { text: 'KALININGRAD (45)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2038/', color: '#DC143C' },
                { text: 'CHELYABINSK (46)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2080/', color: '#DC143C' },
                { text: 'KRASNOYARSK (47)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2122/', color: '#DC143C' },
                { text: 'CHEBOKSARY (48)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2164/', color: '#DC143C' },
                { text: 'KHABAROVSK (49)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2206/', color: '#DC143C' },
                { text: 'PERM (50)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2248/', color: '#DC143C' },
                { text: 'TULA (51)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2290/', color: '#DC143C' },
                { text: 'RYAZAN (52)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2332/', color: '#DC143C' },
                { text: 'MURMANSK (53)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2374/', color: '#DC143C' },
                { text: 'PENZA (54)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2416/', color: '#DC143C' },
                { text: 'KURSK (55)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2458/', color: '#DC143C' },
                { text: 'ARKHANGELSK (56)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2500/', color: '#DC143C' },
                { text: 'ORENBURG (57)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2545/', color: '#DC143C' },
                { text: 'KIROV (58)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2584/', color: '#DC143C' },
                { text: 'KEMEROVO (59)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2626/', color: '#DC143C' },
                { text: 'TYUMEN (60)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2663/', color: '#DC143C' },
                { text: 'TOLYATTI (61)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2702/', color: '#DC143C' },
                { text: 'IVANOVO (62)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2735/', color: '#DC143C' },
                { text: 'STAVROPOL (63)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2767/', color: '#DC143C' },
                { text: 'SMOLENSK (64)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2799/', color: '#DC143C' },
                { text: 'PSKOV (65)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2831/', color: '#DC143C' },
                { text: 'BRYANSK (66)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2863/', color: '#DC143C' },
                { text: 'OREL (67)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2895/', color: '#DC143C' },
                { text: 'YAROSLAVL (68)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2927/', color: '#DC143C' },
                { text: 'BARNAUL (69)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2959/', color: '#DC143C' },
                { text: 'LIPETSK (70)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.2991/', color: '#DC143C' },
                { text: 'ULYANOVSK (71)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3023/', color: '#DC143C' },
                { text: 'YAKUTSK (72)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3055/', color: '#DC143C' },
                { text: 'TAMBOV (73)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3309/', color: '#DC143C' },
                { text: 'BRATSK (74)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3344/', color: '#DC143C' },
                { text: 'ASTRAKHAN (75)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3379/', color: '#DC143C' },
                { text: 'CHITA (76)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3414/', color: '#DC143C' },
                { text: 'KOSTROMA (77)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3449/', color: '#DC143C' },
                { text: 'VLADIMIR (78)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3484/', color: '#DC143C' },
                { text: 'KALUGA (79)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3519/', color: '#DC143C' },
                { text: 'NOVGOROD (80)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3555/', color: '#DC143C' },
                { text: 'TAGANROG (81)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3590/', color: '#DC143C' },
                { text: 'VOLOGDA (82)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3625/', color: '#DC143C' },
                { text: 'TVER (83)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3666/', color: '#DC143C' },
                { text: 'TOMSK (84)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3728/', color: '#DC143C' },
                { text: 'IZHEVSK (85)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3767/', color: '#DC143C' },
                { text: 'SURGUT (86)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3800/', color: '#DC143C' },
                { text: 'PODOLSK (87)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3837/', color: '#DC143C' },
                { text: 'MAGADAN (88)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3932/', color: '#DC143C' },
                { text: 'CHEREPOVETS (89)', link: 'https://forum.blackrussia.online/forums/Жалобы-на-игроков.3967/', color: '#DC143C' },
            ];

            const OPS_LINK = { text: 'ОПС', href: 'https://forum.blackrussia.online/threads/%D0%9E%D0%B1%D1%89%D0%B8%D0%B5-%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0-%D1%81%D0%B5%D1%80%D0%B2%D0%B5%D1%80%D0%BE%D0%B2.312571/', color: '#f59e0b', glow: true };

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
                    const createBtn = (dataArray, serverId, label) => {
                        const item = dataArray[serverId - 1];
                        if (!item) return null;
                        const a = document.createElement('a');
                        a.className = 'fnp-link';
                        if (window.location.href.includes(item.link)) a.classList.add('active-page');
                        a.href = item.link; a.textContent = label; a.target = '_blank';
                        a.style.borderBottom = `2px solid ${item.color}`;
                        a.addEventListener('pointerdown', e => e.stopPropagation());
                        return a;
                    };

                    const addGroup = (data, labelPrefix) => {
                        const group = document.createElement('div');
                        group.className = 'fnp-grid';
                        selectedIds.forEach(id => {
                            const btn = createBtn(data, id, labelPrefix + id);
                            if(btn) group.appendChild(btn);
                        });
                        menu.appendChild(group);
                    };

                    addGroup(DATA_TECH_COMPLAINT, 'ЖБТ');
                    menu.appendChild(Object.assign(document.createElement('div'), {className:'fnp-divider'}));
                    addGroup(DATA_TECH, 'ТР');
                    menu.appendChild(Object.assign(document.createElement('div'), {className:'fnp-divider'}));
                    addGroup(DATA_PLAYER_COMPLAINT, 'ЖБИ');
                    menu.appendChild(Object.assign(document.createElement('div'), {className:'fnp-divider'}));

                    const ops = document.createElement('a');
                    ops.className = 'fnp-link glow';
                    ops.href = OPS_LINK.href; ops.textContent = OPS_LINK.text; ops.target = '_blank';
                    ops.style.borderBottom = `2px solid ${OPS_LINK.color}`;
                    ops.addEventListener('pointerdown', e => e.stopPropagation());
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
                .fnp-link { display: flex; align-items: center; justify-content: center; padding: 6px 2px; font-family: system-ui, -apple-system, sans-serif; font-size: 10px; font-weight: 700; color: #e5e5e5; text-decoration: none; background: rgba(255,255,255,0.05); border-radius: 6px; border: 1px solid transparent; transition: background 0.1s; white-space: nowrap; }
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


	if (document.body.dataset.forumButtonsLoaded) return;
    document.body.dataset.forumButtonsLoaded = 'true';
	const UNACCEPT_PREFIX = 4; // префикс отказано
  const ODOBRENO_PREFIX = 8; // префикс одобрено
	const PIN_PREFIX = 2; //  префикс закрепить
	const COMMAND_PREFIX = 10; // префикс команде проекта
	const CLOSE_PREFIX = 7; // префикс закрыто
	const DECIDED_PREFIX = 6; // префикс решено
	const TECHADM_PREFIX = 13 // префикс техническому специалисту
	const WATCHED_PREFIX = 9; // префикс рассмотрено
	const WAIT_PREFIX = 14; // префикс ожидание (для переноса в баг-трекер)
	const NO_PREFIX = 0; // префикс отсутствует
	const buttons = [

{
	title: 'Приветствие',
	content:
  "[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
  '[CENTER] текст [/CENTER][/FONT]',
},
{
	title: 'Дубликат',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
	"[CENTER]Данная тема является дубликатом вашей предыдущей темы, ссылка на тему - <br>Пожалуйста, <b>прекратите создавать идентичные или похожие темы - иначе Ваш форумный аккаунт может быть заблокирован</b>.<br><br>" +
	'[B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B]',
},
{
  title: 'Покупка ИВ у бота',
  content:
  "[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[CENTER][B][FONT=verdana][COLOR=rgb(255, 255, 255)]Внимательно изучив вашу систему логирования, было выявлено, что бот через (какую систему была передача) передал Вам игровую валюту в размере (размер), данная совокупность действий в полной мере противоречит правилам проекта пункта 2.28, прошу вас настоятельно с ним ознакомиться и впредь не нарушать.[/COLOR][/FONT][/B][/CENTER]<br><br>' +
  '[CENTER][COLOR=rgb(255, 0, 0)]2.28[/COLOR]. Запрещена покупка/продажа внутриигровой валюты за реальные деньги в любом виде | [COLOR=rgb(255, 0, 0)]PermBan с обнулением аккаунта + ЧС проекта.[/COLOR][/FONT][FONT=verdana]<br>[B]Примечание: любые попытки купить или продать внутриигровую валюту, интересоваться этим у других игроков или обсуждать это – наказуемо.<br>Примечание: нельзя обменивать донат валюту (например, рубли, пополненные через сайт) на игровые ценности и наоборот.<br>Пример: пополнение донат-счёта другого игрока в обмен на игровую валюту или другие ценности запрещено.<br>Примечание: продавать или обменивать игровые ценности, которые были куплены за донат-валюту, не запрещено.[/B][/FONT][B][FONT=verdana]Исключение: покупка игровой валюты или ценностей через официальный сайт разрешена.[/B][/FONT][/CENTER]<br>' +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  "[CENTER][FONT=Verdana][B]Ваша тема закреплена и ожидает вердикта <u>Куратора Технических Специалистов / Заместителя Куратора Технических Специалистов</u>.<br><br>[/FONT][/B]" +
	'[SIZE=4][FONT=Verdana][CENTER]<u>Создавать подобные темы не нужно</u>.<br>[B][COLOR=rgb(255, 255, 0)][FONT=verdana]На рассмотрении[/FONT][/CENTER][/COLOR][/B]',
},
{
	title: 'Покупка ИВ у игрока',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[CENTER][B][COLOR=rgb(255, 255, 255)][FONT=verdana]Внимательно изучив вашу систему логирования, было выявлено, что продавец игровой валюты с никнеймом (ник продавца) через (какую систему была передача) передал Вам игровую валюту в размере (размер), данная совокупность действий в полной мере противоречит правилам проекта пункта 2.28, прошу вас настоятельно с ним ознакомиться и впредь не нарушать.[/FONT][/COLOR][/B][/CENTER]<br><br>' +
  '[CENTER][COLOR=rgb(255, 0, 0)]2.28[/COLOR]. Запрещена покупка/продажа внутриигровой валюты за реальные деньги в любом виде | [COLOR=rgb(255, 0, 0)]PermBan с обнулением аккаунта + ЧС проекта.[/COLOR][/FONT][FONT=verdana]<br>[B]Примечание: любые попытки купить или продать внутриигровую валюту, интересоваться этим у других игроков или обсуждать это – наказуемо.<br>Примечание: нельзя обменивать донат валюту (например, рубли, пополненные через сайт) на игровые ценности и наоборот.<br>Пример: пополнение донат-счёта другого игрока в обмен на игровую валюту или другие ценности запрещено.<br>Примечание: продавать или обменивать игровые ценности, которые были куплены за донат-валюту, не запрещено.[/B][/FONT][B][FONT=verdana]Исключение: покупка игровой валюты или ценностей через официальный сайт разрешена.[/B][/FONT][/CENTER]<br>' +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  "[CENTER][FONT=Verdana][B]Ваша тема закреплена и ожидает вердикта <u>Куратора Технических Специалистов / Заместителя Куратора Технических Специалистов</u>.<br><br>[/FONT][/B]" +
	'[SIZE=4][FONT=Verdana][CENTER]<u>Создавать подобные темы не нужно</u>.<br>[B][COLOR=rgb(255, 255, 0)][FONT=verdana]На рассмотрении[/FONT][/CENTER][/COLOR][/B]',
},
{
	title: 'Трансфер на твинк',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[CENTER][B][FONT=verdana]Внимательно изучив вашу систему логирования, было выявлено, что с вашего аккаунта с никнеймом (Никнейм) через (какую систему была передача) передавали (что передали) на второй аккаунт с никнеймом (Никнейм).[/FONT][/B][/CENTER]<br><br>' +
  '[CENTER][B][FONT=verdana]Данная совокупность действий в полной мере противоречит правилам проекта пункта [COLOR=rgb(255, 0, 0)]4.05[/COLOR], прошу вас настоятельно с ним ознакомиться и впредь не нарушать.<br><br>[/FONT][/B][/CENTER]' +
  '[CENTER][COLOR=rgb(255, 0, 0)][B][FONT=verdana]4.05[/FONT][/B][/COLOR][FONT=verdana][B]. Запрещена передача либо трансфер игровых ценностей, между игровыми аккаунтами либо серверами, а также в целях удержания имущества | [/B][COLOR=rgb(255, 0, 0)][B]Ban 15 - 30 дней / PermBan[/B][/COLOR][/FONT][B][FONT=verdana]<br>Пример: передать бизнес, АЗС, дом или любые другие игровые материальные ценности с одного аккаунта игрока на другой / используя свой твинк / договорившись заранее с игроком и иные способы удержания.[/FONT][/B][/CENTER]<br>' +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  "[CENTER]Ваша тема закреплена и ожидает вердикта <u>Куратора Технических Специалистов / Заместителя Куратора Технических Специалистов</u>.[/CENTER]<br><br>" +
	'[SIZE=4][FONT=Verdana][CENTER]<u>Создавать подобные темы не нужно</u>.<br>[B][COLOR=rgb(255, 255, 0)][FONT=verdana]На рассмотрении[/FONT][/CENTER][/COLOR][/B]',
},
{
	title: 'Продажа ИВ игроку',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[CENTER][B][FONT=verdana][COLOR=rgb(255, 255, 255)]Внимательно изучив вашу систему логирования, было выявлено, что вы продали игровую валюту через (какую систему была передача) игроку с никнеймом (Никнейм) в размере (размер).[/CENTER][/COLOR][/FONT][/B]<br><br>' +
  '[CENTER][B][FONT=verdana]Данная совокупность действий в полной мере противоречит правилам проекта пункта [COLOR=rgb(255, 0, 0)]2.28[/COLOR], прошу вас настоятельно с ним ознакомиться и впредь не нарушать.<br><br>[/FONT][/B][/CENTER]' +
  '[CENTER][COLOR=rgb(255, 0, 0)]2.28[/COLOR]. Запрещена покупка/продажа внутриигровой валюты за реальные деньги в любом виде | [COLOR=rgb(255, 0, 0)]PermBan с обнулением аккаунта + ЧС проекта.[/COLOR][/FONT][FONT=verdana]<br>[B]Примечание: любые попытки купить или продать внутриигровую валюту, интересоваться этим у других игроков или обсуждать это – наказуемо.<br>Примечание: нельзя обменивать донат валюту (например, рубли, пополненные через сайт) на игровые ценности и наоборот.<br>Пример: пополнение донат-счёта другого игрока в обмен на игровую валюту или другие ценности запрещено.<br>Примечание: продавать или обменивать игровые ценности, которые были куплены за донат-валюту, не запрещено.[/B][/FONT][B][FONT=verdana]Исключение: покупка игровой валюты или ценностей через официальный сайт разрешена.[/CENTER]<br>' +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  "[CENTER]Ваша тема закреплена и ожидает вердикта <u>Куратора Технических Специалистов / Заместителя Куратора Технических Специалистов</u>.[/CENTER]<br>" +
	'[SIZE=4][FONT=Verdana][CENTER]<u>Создавать подобные темы не нужно</u>.<br>[B][COLOR=rgb(255, 255, 0)][FONT=verdana]На рассмотрении[/FONT][/CENTER][/COLOR][/B]',
},
{
	title: 'Махинации со взломом',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[CENTER][B][COLOR=rgb(255, 255, 255)][FONT=verdana]Внимательно изучив систему логирования, было выявлено, что игрок с никнеймом (ник) был взломан. В ходе дальнейшей проверки обнаружено, что имущество игрока было передано на ваш аккаунт. Данные действия подразумевают собой совокупность, которая направлена на получение выгоды нечестным для этого путем.[/FONT][/COLOR][/B][/CENTER]<br>' +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  "[CENTER]Ваша тема закреплена и ожидает вердикта <u>Куратора Технических Специалистов / Заместителя Куратора Технических Специалистов</u>.[/CENTER]<br>" +
	'[SIZE=4][FONT=Verdana][CENTER]<u>Создавать подобные темы не нужно</u>.<br>[B][COLOR=rgb(255, 255, 0)][FONT=verdana]На рассмотрении[/FONT][/CENTER][/COLOR][/B]',
},
{
	title: 'Переношу в нужный раздел',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[CENTER][B][FONT=verdana]Данная тема никак не относится к этому разделу.[/FONT][/B]' +
  '[CENTER][B][FONT=verdana]Переношу ваше обращение в соответствующий для этого раздел.[/FONT][/B][/CENTER]' +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>',
},

{
  title: 'ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ  ᅠᅠ ᅠ ЖАЛОБЫ НА ТЕХ. СПЕЦОВ ᅠ ᅠ ᅠᅠ ᅠ ᅠ ᅠ ᅠᅠ ᅠ ᅠ ᅠ ᅠ  ᅠ ',
  dpstyle: 'oswald: 3px;     color: #fff; background: #db2309; box-shadow: 0 0 2px 0 rgba(0,0,0,0.14),0 2px 2px 0 rgba(0,0,0,0.12),0 1px 3px 0 rgba(0,0,0,0.2); border: none; border-color: #f53317',
    },
{
	title: 'Рассмотрение',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER]Тема взята в работу и закреплена, пожалуйста, ожидайте ответа в ней.<br> Рассмотрение темы может занять определенное время.<br>' +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]',
	prefix: TECHADM_PREFIX,
	status: true,
},
{
	title: 'Ожидайте вердикта руководства',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	"[CENTER]Ваша тема закреплена и ожидает вердикта <u>Куратора Технических Специалистов / Заместителя Куратора Технических Специалистов</u>.<br><br>" +
  '[SIZE=4][FONT=Verdana][CENTER]<u>Создавать подобные темы не нужно</u>.[/CENTER]<br>' +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[CENTER][COLOR=rgb(255, 255, 0)]На рассмотрении[/CENTER]',
	prefix: PIN_PREFIX,
	status: true,
},
{
	title: 'Форма подачи ЖБ ТС',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[CENTER][B][COLOR=rgb(255, 255, 255)][FONT=verdana]Ваше обращение составлено не по форме.[/FONT][/COLOR][/B][/CENTER]<br>' +
	"[CENTER]Пожалуйста, заполните форму, создав новую тему: Название темы с NickName технического специалиста<br>Пример:<br> Lev_Kalashnikov | махинации<br>Форма заполнения темы:<br>[code]01. Ваш игровой никнейм:<br>02. Игровой никнейм технического специалиста:<br>03. Сервер, на котором Вы играете:<br>04. Описание ситуации (описать максимально подробно и раскрыто):<br>05. Любые скриншоты, которые могут помочь в решении проблемы (если таковые имеются):<br>06. Дата и время произошедшей технической проблемы (постарайтесь указать максимально точно):[/code][/CENTER]<br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Нет окна блокировки',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  "[CENTER]Без окна о блокировке тема не подлежит рассмотрению - создайте новую тему, прикрепив окно блокировки с фотохостинга или видеохостинга.<br> Также обращаем ваше внимание на то, что доказательства из социальных сетей <u>не принимаются</u>.<br><br>[URL='https://yapx.ru/']yapx.ru[/URL],<br>[URL='https://imgur.com/']imgur.com[/URL],<br>[URL='https://www.youtube.com/']youtube.com[/URL],<br>[URL='https://imgbb.com']ImgBB.com[/URL],<br>[FONT=verdana][URL='https://imgfoto.host/']ImgFoto.host[/URL],<br>[URL='https://postimages.org/']Postimages.org[/URL][/FONT]<br>(все кликабельно).[/CENTER]<br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Ошибка, будет разбан',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER]После дополнительной перепроверки была выявлена ошибка, ваш аккаунт будет разблокирован в течение 24-х часов. Приносим свои извинения за предоставленные неудобства.<br>[/CENTER]<br>'+
	"[CENTER]Ваша тема закреплена и ожидает вердикта <u>Куратора Технических Специалистов / Заместителя Куратора Технических Специалистов</u>.[/CENTER]<br><br>" +
	'[SIZE=4][FONT=Verdana][CENTER]<u>Создавать подобные темы не нужно</u>.<br>' +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[CENTER][COLOR=rgb(255, 255, 0)]На рассмотрении[/CENTER]',
	prefix: PIN_PREFIX,
	status: true,
},
{
	title: 'Правила раздела',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	"[CENTER]Пожалуйста, убедительная просьба, ознакомиться с назначением данного раздела в котором Вы создали тему, так как Ваш запрос не относится к жалобам на технических специалистов.<br>Что принимается в данном разделе:<br>Жалобы на технических специалистов, оформленные по форме подачи и не нарушающие правила подачи:<br> [FONT=verdana][SIZE=7][COLOR=rgb(226, 80, 65)][U]Правила подачи жалобы на технических специалистов[/U][/COLOR][/SIZE][/FONT][/CENTER]<br><br>[QUOTE][FONT=verdana][SIZE=4][COLOR=rgb(226, 80, 65)]01.[/COLOR] Ваш игровой никнейм:[FONT=verdana][SIZE=4][COLOR=rgb(226, 80, 65)]<br>02.[/COLOR] Игровой никнейм технического специалиста:[COLOR=rgb(226, 80, 65)]<br>03.[/COLOR] Сервер, на котором Вы играете:[COLOR=rgb(226, 80, 65)]<br>04.[/COLOR] Описание ситуации (описать максимально подробно и раскрыто):[COLOR=rgb(226, 80, 65)]<br>05.[/COLOR] Любые скриншоты, которые могут помочь в решении проблемы (если таковые имеются):[COLOR=rgb(226, 80, 65)]<br>06.[/COLOR] Дата и время произошедшей технической проблемы (постарайтесь указать максимально точно):[/SIZE][/FONT][/SIZE][/QUOTE]<br><br>[FONT=verdana][SIZE=4][FONT=verdana][SIZE=4][COLOR=rgb(226, 80, 65)]Примечание:[/COLOR] все оставленные заявки обращения в данный раздел обязательно должны быть составлены по шаблону предоставленному немного выше.<br>В ином случае, заявки обращения в данный раздел, составленные не по форме — будут отклоняться.<br>Касательно названия заголовка темы — четких правил нет, но, желательно, чтобы оно содержало лишь никнейм технического специалиста и причину.<br>Заранее, настоятельно рекомендуем ознакомиться [U][B][URL='https://forum.blackrussia.online/index.php?forums/faq.231/']с данным разделом[/URL][/B][/U][/SIZE][/FONT][/SIZE][/FONT]<br>[CENTER][FONT=verdana][SIZE=7][COLOR=rgb(226, 80, 65)][U]Какие жалобы не проверяются?[/U][/COLOR][/SIZE][/FONT][/CENTER]<br><br>[FONT=verdana][SIZE=4][COLOR=rgb(226, 80, 65)]—[/COLOR] Если в содержании темы присутствуют оффтоп/оскорбления.<br>[COLOR=rgb(226, 80, 65)]—[/COLOR] С момента выдачи наказания прошло более 14 дней.[/SIZE][/FONT]<br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Срок подачи ЖБ',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER]С момента выдачи наказания от технического специалиста прошло более 14-ти дней.[/center]<br><br>'+
	"[CENTER]Ваша тема закреплена и ожидает вердикта <u>Куратора Технических Специалистов / Заместителя Куратора Технических Специалистов</u>.<br><br>" +
	'[SIZE=4][FONT=Verdana][CENTER]<u>Создавать подобные темы не нужно</u>.<br>' +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[COLOR=rgb(255, 255, 0)]На рассмотрении[/CENTER]',
	prefix: PIN_PREFIX,
	status: true,
},
{
	title: 'Имущество восстановлено',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	"[CENTER]Убедительная просьба, <b><u>не менять никнейм до момента восстановления</u></b>.<br>" +
	'[CENTER]Для активации восстановления используйте команды: [COLOR=rgb(255, 213, 51)]/roulette[/COLOR], [COLOR=rgb(255, 213, 51)]/recovery[/COLOR][/CENTER]<br>' +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][COLOR=rgb(255, 255, 0)][B][FONT=verdana]Ожидайте вердикта от команды проекта[/FONT][/B][/COLOR][/CENTER]',
	status: true,
	prefix: COMMAND_PREFIX,
},
{
	title: 'Не относится',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	"[CENTER]Ваше обращение не относится к жалобам на технических специалистов.<br> Пожалуйста, будьте добры, ознакомьтесь с правилами данного раздела: [URL='https://forum.blackrussia.online/forums/Информация-для-игроков.231/']клик[/URL] <br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Запрос привязок',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	"[CENTER][B][COLOR=rgb(255, 255, 255)][FONT=verdana]1. Укажите ваш Telegram ID, если ваш игровой аккаунт был привязан к Telegram. Узнать его можно здесь: t.me/getmyid_bot<br>[/FONT][/COLOR][/B][COLOR=rgb(255, 255, 255)][FONT=verdana][B]2. Укажите ваш оригинальный ID страницы ВКонтакте, которая привязана к аккаунту (взять его можно через данный сайт - https://regvk.com/ )<br>[/B][/FONT][/COLOR][B][COLOR=rgb(255, 255, 255)][FONT=verdana]3. Укажите почту, которая привязана к аккаунту[/FONT][/COLOR][/B][/CENTER]<br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  "[CENTER][I][COLOR=rgb(247, 218, 100)][FONT=verdana]Ожидаю ваш ответ.[/FONT][/COLOR][/I][/CENTER]",
  prefix: TECHADM_PREFIX,
	status: true,
},
{
  title: 'Смена пароля',
  color: '',
  content:
  "[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[COLOR=rgb(255, 255, 255)][FONT=verdana][SIZE=4]Сбросьте пароль через любую из привязок ВКонтакте или Telegram, после чего, убедительная просьба, сообщить об этом в данной теме.<br><br>Ожидаю вашего ответа.<br>' +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[COLOR=rgb(255, 255, 0)]На рассмотрении[/COLOR][/FONT][/SIZE][/COLOR]',
	prefix: TECHADM_PREFIX,
	status: true,
},
	{
  title: ' ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠᅠ ᅠ Технический раздел ᅠ ᅠ ᅠᅠ ᅠ ᅠ ᅠ ᅠᅠ  ᅠ ᅠ ᅠ ᅠ ᅠ  ᅠ ᅠ ',
  dpstyle: 'oswald: 3px;     color: #fff; background: #db2309; box-shadow: 0 0 2px 0 rgba(0,0,0,0.14),0 2px 2px 0 rgba(0,0,0,0.12),0 1px 3px 0 rgba(0,0,0,0.2); border: none; border-color: #f53317',
    },
{
	title: 'Форма подачи ТР',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[CENTER][B][COLOR=rgb(255, 255, 255)][FONT=verdana]Ваше обращение составлено не по форме.[/FONT][/COLOR][/B][/CENTER]<br>' +
	"[CENTER]Пожалуйста, заполните форму, создав новую тему: <br>[CODE]01. Ваш игровой никнейм:<br>02. Сервер, на котором Вы играете:<br>03. Суть Вашей возникшей проблемы (описать максимально подробно и раскрыто): <br>04. Любые скриншоты, которые могут помочь в решении проблемы (если таковые имеются):<br>05. Дата и время произошедшей технической проблемы (постарайтесь указать максимально точно):[/CODE]<br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Нет скринов/видео',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  "[CENTER]Без доказательств (в частности скриншоты или видео) – решить проблему не получится. Если доказательства найдутся - создайте новую тему, прикрепив доказательства с фотохостинга или видеохостинга<br> Также обращаем ваше внимание на то, что доказательства из социальных сетей <u>не принимаются</u>.<br><br>[URL='https://yapx.ru/']yapx.ru[/URL],<br>[URL='https://imgur.com/']imgur.com[/URL],<br>[URL='https://www.youtube.com/']youtube.com[/URL],<br>[URL='https://imgbb.com']ImgBB.com[/URL],<br>[FONT=verdana][URL='https://imgfoto.host/']ImgFoto.host[/URL],<br>[URL='https://postimages.org/']Postimages.org[/URL][/FONT]<br>(все кликабельно).<br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Нерабочая ссылка',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][FONT=verdana][COLOR=rgb(255, 255, 255)]К сожалению, ссылка на ваши прикрепленные доказательства недоступна или не работает.[/COLOR][/FONT][/B]<br>' +
  '[CENTER][B][FONT=verdana]Пожалуйста, отправьте новое обращение, убедившись, что ссылка на  доказательства работает и содержит качественные фотографии или видеозаписи.[/FONT][/B][/CENTER]' +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Док-ва из соц.сети',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  "[CENTER]Доказательства из социальных сетей <u>не принимаются и не подлежат рассмотрению</u>.<br><br>Вы можете воспользоваться любым удобным фото/видеохостингом, но для вашего удобства мы перечислили популярные сайты:<br>[URL='https://yapx.ru/']yapx.ru[/URL],<br>[URL='https://imgur.com/']imgur.com[/URL],<br>[URL='https://www.youtube.com/']youtube.com[/URL],<br>[URL='https://imgbb.com']ImgBB.com[/URL],<br>[FONT=verdana][URL='https://imgfoto.host/']ImgFoto.host[/URL],<br>[URL='https://postimages.org/']Postimages.org[/URL][/FONT]<br>(все кликабельно).<br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Правила раздела',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	"[CENTER]Пожалуйста, убедительная просьба, ознакомиться с назначением данного раздела, в котором Вы создали тему, поскольку Ваш запрос не относится к технической проблеме.<br>Что принимается в тех разделе:<br>Если возникли технические проблемы, которые так или иначе связаны с игровым модом<br>Форма заполнения:<br>[QUOTE]<br>[FONT=verdana][SIZE=4][COLOR=rgb(226, 80, 65)]01.[/COLOR] Ваш игровой никнейм:<br>[COLOR=rgb(226, 80, 65)]02.[/COLOR] Сервер, на котором Вы играете:<br>[COLOR=rgb(226, 80, 65)]03.[/COLOR] Суть возникшей проблемы (описать максимально подробно и раскрыто):<br>[COLOR=rgb(226, 80, 65)]04.[/COLOR] Любые скриншоты, которые могут помочь в решении проблемы (если таковые имеются):<br>[COLOR=rgb(226, 80, 65)]05.[/COLOR] Дата и время произошедшей технической проблемы (постарайтесь указать максимально точно):[/SIZE][/FONT][/QUOTE]<br>[/CENTER]<br><br>[CENTER][FONT=verdana][SIZE=7][COLOR=rgb(226, 80, 65)][U]Если возникли технические проблемы, которые так или иначе связаны с вылетами из игры и любыми другими проблемами клиента[/U][/COLOR][/SIZE][/FONT][/CENTER]<br><br>[QUOTE]<br>[FONT=verdana][SIZE=4][COLOR=rgb(226, 80, 65)]01. [/COLOR]Ваш игровой ник:<br>[COLOR=rgb(226, 80, 65)]02. [/COLOR]Сервер:<br>[COLOR=rgb(226, 80, 65)]03.[/COLOR] Тип проблемы: Обрыв соединения | Проблема с ReCAPTCHA | Краш игры (закрытие игры) | Другое [Выбрать один вариант ответа]<br>[COLOR=rgb(226, 80, 65)]04. [/COLOR]Действия, которые привели к этому (при вылетах, по возможности предоставлять место сбоя):<br>[COLOR=rgb(226, 80, 65)]05.[/COLOR] Как часто данная проблема:<br>[COLOR=rgb(226, 80, 65)]06.[/COLOR] Полное название мобильного телефона:<br>[COLOR=rgb(226, 80, 65)]07.[/COLOR] Версия Android:<br>[COLOR=rgb(226, 80, 65)]08. [/COLOR]Дата и время (по МСК):<br>[COLOR=rgb(226, 80, 65)]09. [/COLOR]Связь с Вами по Telegram/VK:[/SIZE][/FONT][/QUOTE]" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][/CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Передача логисту',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	"[CENTER]Ваша тема закреплена и передана <u>Техническому Специалисту по Логированию</u> для дальнейшего вердикта, пожалуйста, ожидайте ответ в данной теме.<br><br>" +
	'[CENTER]Создавать новые темы с данной проблемой не нужно.<br>' +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][COLOR=rgb(255, 255, 0)]На рассмотрении[/color][/CENTER][/FONT][/SIZE]',
	prefix: TECHADM_PREFIX,
	status: true,
},
{
  title: 'Забыл пароль',
	color: '',
	content:
  "[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[CENTER][B][COLOR=rgb(255, 255, 255)]В решении данной проблемы вам могут помочь только установленные привязки на аккаунте.<br>' +
  '[CENTER][B][COLOR=rgb(255, 255, 255)]Вы можете через специализированного бота в привязанных социальных сетях восстановить доступ к игровому аккаунту, сбросив пароль через окно "ввода пароля" при входе в игру или же поменяв пароль в самом боте. Если же на вашем игровом аккаунте отсутствуют привязки — мы ничем не сможем вам помочь, ибо каждый игрок несёт ответственность за свой игровой аккаунт и за игровые ценности на нём.<br><br>' +
  "Помощник Кирилл (Telegram) - [I][URL='https://t.me/br_helper_bot']клик[/URL][/I] (кликабельно)<br>" +
  "[CENTER][B][FONT=verdana]BLACK RUSSIA - Мобильная онлайн-игра (ВКонтакте) - [URL='https://vk.com/blackrussia.online'][I]клик [/I][/URL](кликабельно)[/FONT][/B][/CENTER]<br><br>" +
  '[COLOR=rgb(255, 255, 255)][B]После регистрации игрового аккаунта мы настоятельно рекомендуем каждому пользователю обезопасить свой игровой аккаунт всеми возможными соответствующими привязками, дабы в дальнейшем не попадать в подобные ситуации и не попадаться на несанкционированный вход со стороны злоумышленников.<br><br>' +
  '[COLOR=rgb(255, 255, 255)][B] Мы не сбрасываем пароли и не отвязываем возможно утерянные привязки от игровых аккаунтов.<br>' +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Пропало имущество(доп.инфа)',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][SIZE=5][FONT=Verdana]Для дальнейшего рассмотрения темы, предоставьте:<br><BR>[QUOTE]1. Скриншоты или видео, подтверждающие факт владения этим имуществом.<BR>2. Все детали пропажи: дата, время, после каких действий имущество пропало.<BR>3. Информация о том, как вы изначально получили это имущество:<BR>4. Дата покупки;<br>5. Способ приобретения (у игрока, в магазине или через донат;<br>6. Видеофиксация покупки (если присутствует);<br>7. Никнейм игрока, у которого было приобретено имущество, если покупка была сделана не в магазине.[/QUOTE]<BR>[/CENTER]'+
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][COLOR=rgb(255, 255, 0)]Тема закреплена и находится на рассмотрении[/COLOR][/CENTER][/FONT][/SIZE]',
	prefix: PIN_PREFIX,
	status: true,
},
{
	title: "Проблемы с Кешом",
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[center]Если вы столкнулись с проблемой загрузки страниц форума, пожалуйста, выполните следующие действия:<br><br>• Откройте "Настройки".<br>• Найдите во вкладке "Приложения" свой браузер, через который вы пользуетесь нашим сайтом форума.<br>• Нажмите на браузер, после чего внизу выберите "Очистить" -> "Очистить Кэш".<br><br>После следуйте данным инструкциям:<br>• Перейдите в настройки браузера.<br>• Выберите "Конфиденциальность и безопасность" -> "Очистить историю".<br>• В основных и дополнительных настройках поставьте галочку в пункте "Файлы cookie и данные сайтов".<br>После этого нажмите "Удалить данные".<br><br>Ниже прилагаем видео-инструкции описанного процесса для разных браузеров:<br>Для браузера CHROME: https://youtu.be/FaGp2rRru9s<br>Для браузера OPERA: https://youtube.com/shorts/eJOxkc3Br6A?feature=share'+
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Законопослушность',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER]К сожалению, администрация, технические специалисты и другие должностные лица BLACK RUSSIA не могут повлиять на законопослушность вашего аккаунта.<br>Повысить законопослушность можно двумя способами:<BR><BR>1. Каждый PayDay (00 минут каждого часа) вам начисляется одно очко законопослушности(Если только у вас нет PLATINUM VIP-статуса), если за прошедший час вы отыграли не менее 20 минут.<br>2. Приобрести законопослушность в /donate.<br>[/CENTER]'+
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Команде проекта',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	"[CENTER]Ваша тема закреплена и находится на рассмотрении у команды проекта.<br>" +
	"[CENTER]Создавать новые темы с данной проблемой — не нужно, ожидайте ответа в данной теме. Если проблема решится - Вы всегда можете оставить своё сообщение в этой теме.<br>" +
	"[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>" +
  '[CENTER][COLOR=rgb(255, 255, 0)]Передано команде проекта.[/color][/CENTER][/FONT][/SIZE]',
	prefix: COMMAND_PREFIX,
	status: true,
},
{
	title: 'Известно КП',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	"[CENTER]Команде проекта уже известно о данной проблеме, она обязательно будет рассмотрена и исправлена.<br>Спасибо за Ваше обращение!<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Не является багом',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER]Проблема, с которой вы столкнулись, не является багом или ошибкой сервера.<br><br>' +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'В раздел Госс Организаций.',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER]Ваша тема не относится к техническому разделу, пожалуйста, оставьте ваше заявление в соответствующем разделе Государственных Организаций вашего сервера.[/CENTER]<br><br>'+
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'В раздел Криминальных Организаций',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER]Ваша тема не относится к техническому разделу, пожалуйста, оставьте ваше заявление в соответствующем разделе Криминальных Организаций вашего сервера.[/CENTER]'+
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Жб на адм',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	"[CENTER]Обратитесь в раздел 'Жалобы на администрацию' вашего сервера.<br>Форма для подачи жалобы - [I][URL='https://forum.blackrussia.online/index.php?threads/Правила-подачи-жалоб-на-администрацию.3429349/']клик[/URL][/I] (кликабельно)<br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Жб на лидеров',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	"[CENTER]Данная тема не относится к техническому разделу.<br>Пожалуйста, обратитесь в раздел 'Жалобы на Лидеров' Вашего сервера.<br>Форма подачи жалобы - [I][URL='https://forum.blackrussia.online/threads/%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0-%D0%BF%D0%BE%D0%B4%D0%B0%D1%87%D0%B8-%D0%B6%D0%B0%D0%BB%D0%BE%D0%B1-%D0%BD%D0%B0-%D0%BB%D0%B8%D0%B4%D0%B5%D1%80%D0%BE%D0%B2.3429391/']клик[/URL][/I] (кликабельно)" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Жб на игроков',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	"[CENTER]Данная тема не относится к техническому разделу.<br>Пожалуйста, обратитесь в раздел 'Жалобы на игроков' Вашего сервера.<br>Форма подачи жалобы - [I][URL='https://forum.blackrussia.online/index.php?threads/Правила-подачи-жалоб-на-игроков.3429394/']клик[/URL][/I] (кликабельно)" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Обжалования',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	"[CENTER]Вы получили наказание от администратора своего сервера.<br> Для его снижения/обжалования обратитесь в раздел<br><<Обжалования>> вашего сервера.<br>Форма подачи темы - [I][URL='https://forum.blackrussia.online/index.php?threads/Правила-подачи-заявки-на-обжалование-наказания.3429398/']клик[/URL][/I] (кликабельно)" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Сервер не отвечает',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	"[CENTER]Если у Вас встречаются такие проблемы, как «Сервер не отвечает», не отображаются сервера в лаунчере, не удаётся выполнить вход на сайт/форум, попробуйте совершить следующие действия: <br><br>" +
	"[LEFT]• Сменить IP-адрес любыми средствами; <br>" +
	"[LEFT]• Переключиться на Wi-Fi/мобильный интернет или на любую доступную сеть; <br>"+
	"[LEFT]• Использование VPN; <br>"+
	"[LEFT]• Перезагрузка роутера.<br><br>" +
	"[CENTER]Если методы выше не помогли, то переходим к следующим шагам: <br><br>" +
	'[LEFT]1. Устанавливаем приложение «1.1.1.1: Faster & Safer Internet» Ссылка: https://clck.ru/ZP6Av и переходим в него.<br>'+
	'[LEFT]2. Соглашаемся со всей политикой приложения.<br>'+
	'[LEFT]3. Нажимаем на ползунок и ждем, когда текст изменится на «Подключено».<br>'+
	'[LEFT]4. Проверяем: Отображаются ли серверы? Удается ли выполнить вход в игру? Работают ли другие источники (сайт, форум)? <br>' +
	'[CENTER]📹 Включение продемонстрировано на видео: https://youtu.be/Wft0j69b9dk<br>'+
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
  title: 'Перенаправление в поддержку',
	color: '',
	content:
  "[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[CENTER][B][COLOR=rgb(255, 255, 255)]В том случае, если у вас произошла одна из указанных проблем:[/COLOR][/B][/CENTER]<br>' +
  '[CENTER][COLOR=rgb(255, 255, 255)][FONT=verdana]1. Баланс доната (BC) стал отрицательным.<br> 2. Донат не был зачислен на аккаунт.<br> 3. Донат был зачислен не в полном объеме.<br> 4. Отсутствие подарка при подключении или продлении тарифа Tele-2.<br> 5. Частые переподключения к серверу.[/FONT][/COLOR][/CENTER]<br><br>' +
  '[CENTER][B][COLOR=rgb(255, 255, 255)][FONT=verdana]Вам в срочном порядке необходимо обратиться в техническую поддержку нашего проекта https://blackrussia.online (внизу справа виджет создания обращения).[/FONT][/COLOR][/B][/CENTER]<br>' +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Сим-карта',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][SIZE=4][FONT=Veranda][FONT=verdana][COLOR=rgb(255, 255, 255)][B]Если вы приобрели тариф Black Russia, но награды не были зачислены или у Вас не получается активировать номер с тарифом Black Russia , тогда [/B][I][B]убедитесь в следующем:[/B][/I][/COLOR][/FONT][/FONT][/FONT][/SIZE][/CENTER]<br>' +
  '[CENTER][B][FONT=verdana]1. У вас тариф Black Russia, а не другой тариф, например, тариф Black[/FONT][/B][/CENTER]<br>' +
  '[B][FONT=verdana][COLOR=rgb(255, 255, 255)]2. Номер активирован.[/COLOR][/FONT]<br>' +
  '[B][FONT=verdana][COLOR=rgb(255, 255, 255)]3. После активации номера [U]прошло более 48-ми часов.[/U][/COLOR][/FONT]<br><br>' +
  '[B][FONT=verdana][COLOR=rgb(255, 255, 255)]Если пункты выше не описывают вашу ситуацию в обязательном порядке обратитесь в службу поддержки[I] для дальнейшего решения:[/I][/COLOR][/FONT]<br>' +
  '[B][FONT=verdana][COLOR=rgb(255, 255, 255)]На сайте через виджет обратной связи (https://blackrussia.online)[/COLOR][/FONT]<br>' +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Правила восстановления',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	"[CENTER]Пожалуйста, убедительная просьба, ознакомьтесь с правилами восстановлений - [URL='https://forum.blackrussia.online/index.php?threads/В-каких-случаях-мы-не-восстанавливаем-игровое-имущество.25277/']клик[/URL]<br>Вы создали тему, которая не относится к технической проблеме.[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Хочу стать адм/хелп',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	"[CENTER]Технические специалисты не принимают решения по назначению на должности.<br>Для этого есть раздел заявок на форуме - [I][URL='https://forum.blackrussia.online/forums/%D0%97%D0%90%D0%AF%D0%92%D0%9A%D0%98-%D0%9D%D0%90-%D0%94%D0%9E%D0%9B%D0%96%D0%9D%D0%9E%D0%A1%D0%A2%D0%98-%D0%9B%D0%98%D0%94%D0%95%D0%A0%D0%9E%D0%92-%D0%98-%D0%90%D0%93%D0%95%D0%9D%D0%A2%D0%9E%D0%92-%D0%9F%D0%9E%D0%94%D0%94%D0%95%D0%A0%D0%96%D0%9A%D0%98.3066/']клик[/URL][/I] (кликабельно), где вы можете ознакомиться с актуальными заявками и формами подачи.<br>Приятной игры и удачи в карьерном росте!<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Предложение по улучш.',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER]Ваша тема не относится к технической проблеме.<br>Если вы хотите предложить улучшение, пожалуйста, перейдите в соответствующий раздел.<br> [URL="https://forum.blackrussia.online/index.php?categories/Предложения-по-улучшению.656/"] Предложения по улучшению → нажмите сюда[/URL]<br>' +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Нужны все прошивки',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER] Для активации какой либо прошивки необходимо поставить все детали данного типа "SPORT" "SPORT+" и т.п.<br>' +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Тестерам',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	"[CENTER]Ваша тема передана на тестирование.[/CENTER][/FONT][/SIZE]" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>',
	prefix: WAIT_PREFIX,
	status: false,
},
{
	title: 'Пропали вещи с аукц/маркет',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER]Если вы выставили свои вещи на аукцион а их никто не купил, то воспользуйтесь командой [COLOR=rgb(251, 160, 38)]/reward[/COLOR]<br> В случае отсутствии вещей там, приложите скриншоты с + /time в новой теме<br><br>Если же вещи пропали с маркетплейса, значит их никто не купил, вам следует забрать их с ПВЗ (пункта выдачи заказов) в течение 7 дней, иначе предметы системно уничтожатся.<br>'+
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Отвязка привязок',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][COLOR=rgb(255, 255, 255)][FONT=verdana]Удалить установленные привязки на вашем аккаунте не представляется возможным ни нам, ни команде проекта. [/FONT][/COLOR][/B]<br><br>' +
  '[CENTER][B][FONT=verdana][COLOR=rgb(255, 255, 255)]Бывают случаи, когда злоумышленник, получив несанкционированный доступ к аккаунту, устанавливает на него свою привязку. В такой ситуации аккаунт блокируется перманентно с причиной "Чужая привязка". Дальнейшая разблокировка игрового аккаунта невозможна во избежания повторных случаев взлома.[/COLOR][/FONT][/B][/CENTER]' +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Заблокированный IP',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][COLOR=rgb(255, 255, 255)][FONT=Verdana][size=15px]Вы оказались на заблокированном IP-адресе. Ваш аккаунт не заблокирован, так что поводов для беспокойства нет. Такая ситуация может возникнуть по разным причинам, например, из-за смены мобильного интернета или переезда. Чтобы избежать этой проблемы, перезагрузите телефон или используйте VPN.[/CENTER] <br>' +
	'[CENTER]Приносим свои извинения за доставленные неудобства. Желаем приятного времяпровождения на нашем проекте.[/CENTER]<br>' +
  '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B][CENTER]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Ваш акк взломан',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[CENTER][B][FONT=verdana][COLOR=rgb(255, 255, 255)]Ваш игровой аккаунт был подвержен несанкционированному доступу со стороны злоумышленников. В том случае, если с аккаунта было украдено имущество - все причастные к этому будут наказаны. Ваш аккаунт будет временно заблокирован с причиной "Взломан" с целью же вашей дальнейшей безопасности и предотвращения повторных случаев заходов злоумышленников. [/COLOR][/FONT][/B][/CENTER]<br><br>' +
  "[CENTER][B][COLOR=rgb(255, 255, 255)][FONT=verdana]Для восстановления доступа и уточнения всех нюансов настоятельно рекомендуем вам обратиться в раздел 'Жалобы на технических специалистов' - [/FONT][/COLOR][/B][URL='https://forum.blackrussia.online/forums/Жалобы-на-технических-специалистов.490/'][B][COLOR=rgb(255, 255, 255)][FONT=verdana][I]клик [/I][/FONT][/COLOR][/B][/URL][B][COLOR=rgb(255, 255, 255)][FONT=verdana](кликабельно)[/FONT][/COLOR][/B][/CENTER]" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'Нет ответа игрока',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[CENTER][B][FONT=verdana][COLOR=rgb(255, 255, 255)]К сожалению, обратной связи от вас в данной теме так и не поступило.[/COLOR][/FONT][/B][/CENTER]<br>' +
  '[CENTER][B][COLOR=rgb(255, 255, 255)][FONT=verdana]Если Ваша проблема по-прежнему не решена, пожалуйста, создайте новое обращение.[/FONT][/COLOR][/B][/CENTER]<br>' +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B]',
	prefix: CLOSE_PREFIX,
	status: false,
},
{
	title: 'После рестарта',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
  '[CENTER][FONT=verdana][COLOR=rgb(255, 255, 255)]Проверьте, пожалуйста, будет ли актуальна Ваша проблема после рестарта сервера (после 05:00 по-московскому времени)<br>[/COLOR][/FONT][/CENTER]' +
  '[CENTER][B][FONT=verdana][COLOR=rgb(255, 255, 255)]Ожидаем от Вас обратной связи в данной теме.[/COLOR][/FONT][/B][/CENTER]' +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	'[COLOR=rgb(255, 255, 0)]На рассмотрении[/color][/FONT][/SIZE]',
	prefix: PIN_PREFIX,
	status: true,
},

{
  title: 'ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠᅠ ᅠ ЖАЛОБЫ НА ИГРОКОВ ᅠ ᅠ ᅠᅠ ᅠ ᅠ ᅠ ᅠᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ     ',
  dpstyle: 'oswald: 3px;     color: #fff; background: #db2309; box-shadow: 0 0 2px 0 rgba(0,0,0,0.14),0 2px 2px 0 rgba(0,0,0,0.12),0 1px 3px 0 rgba(0,0,0,0.2); border: none; border-color: #f53317',
    },
{
	title: 'Игрок будет заблокирован',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	"[CENTER][SIZE=4][FONT=Verdana]После проверки доказательств и системы логирования вердикт:<br><br>[FONT=verdana]Игрок будет заблокирован[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	"[CENTER][I][FONT=verdana][COLOR=rgb(0, 255, 0)][B]Одобрено[/B][/COLOR][/FONT][/I][/CENTER]",
  prefix: ODOBRENO_PREFIX,
  status: false
},
{
	title: 'Игрок не будет заблокирован',
	color: '',
	content:
	"[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	"[CENTER][SIZE=4][FONT=Verdana]После проверки доказательств и системы логирования вердикт:<br><br>Доказательств недостаточно для блокировки игрока[/CENTER]<br><br>" +
	'[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
	"[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Отказано[/COLOR][/FONT][/I][/B][/CENTER]",
  prefix: UNACCEPT_PREFIX,
  status: false
},
];

	$(document).ready(() => {
	// Загрузка скрипта для обработки шаблонов
	$('body').append('<script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"></script>');

	// Добавление кнопок при загрузке страницы
	addButton('На рассмотрение', 'pin', 'border-radius: 20px; margin-right: 11px; border: 2px solid; border-color: rgb(255, 165, 0);');
	addButton('КП', 'teamProject', 'border-radius: 20px; margin-right: 100x; border: 2px solid; border-color: rgb(255, 255, 0);');
	addButton('Рассмотрено', 'watched', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(0, 255, 0);');
	addButton('Отказано', 'unaccept', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(255, 0, 0);');
	addButton('Решено', 'decided', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(0, 255, 0);');
	addButton('Закрыто', 'closed', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(255, 0, 0);');
	addButton('Тех. спецу', 'techspec', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(0, 0, 255);');
  addButton('Одобрено', 'odobreno', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(128, 255, 128);');
	addAnswers();

	// Поиск информации о теме
	const threadData = getThreadData();

	$(`button#ff`).click(() => pasteContent(8, threadData, true));
	$(`button#prr`).click(() => pasteContent(2, threadData, true));
	$(`button#zhb`).click(() => pasteContent(21, threadData, false));
	$('button#unaccept').click(() => editThreadData(UNACCEPT_PREFIX, false));
	$('button#pin').click(() => editThreadData(PIN_PREFIX, true));
	$('button#teamProject').click(() => editThreadData(COMMAND_PREFIX, true));
	$('button#watched').click(() => editThreadData(WATCHED_PREFIX, false));
	$('button#decided').click(() => editThreadData(DECIDED_PREFIX, false));
	$('button#closed').click(() => editThreadData(CLOSE_PREFIX, false));
	$('button#odobreno').click(() => editThreadData(ODOBRENO_PREFIX, false));
	$('button#techspec').click(() => editThreadData(TECHADM_PREFIX, true));

	$(`button#selectAnswers`).click(() => {
            XF.alert(buttonsMarkup(buttons), null, 'Выберите ответ:');
            buttons.forEach((btn, id) => {
                if (id > 6) {
                    $(`button#answers-${id}`).click(() => pasteContent(id, threadData, true));
                } else {
                    $(`button#answers-${id}`).click(() => pasteContent(id, threadData, false));
                }
            });
        });

        $(`button#selectMoveTasks`).click(() => {
            XF.alert(tasksMarkup1(tasks), null, 'Выберите действие:');
            tasks.forEach((btn, id) => {
                $(`button#answers-${id}`).click(() => moveThread(tasks[id].prefix, tasks[id].move));
            });
        });
    });


    function addButton(name, id, hex = "grey") {
		$('.button--icon--reply').before(
		`<button type="button" class="button--primary button rippleButton" id="${id}" style="border-radius: 25px; margin-right: 5px; background-color: ${hex}">${name}</button>`,
		);
		}

    function addAnswers() {
        $('.button--icon--reply').after(`<button type="button" class="button--cta uix_quickReply--button button button--icon button--icon--write rippleButton" id="selectAnswers" style="oswald: 3px; margin-left: 5px; margin-top: 1px; border-radius: 13px; background-color: #FF4500; border-color: #E6E6FA">Ответы</button>`,
        );
    }

    function buttonsMarkup(buttons) {
    return `<div class="select_answer">${buttons
        .map(
        (btn, i) =>
        `<button id="answers-${i}" class="button--primary button rippleButton" style="margin:4px; border-radius: 13px; ${btn.dpstyle}"><span class="button-text">${btn.title}</span></button>`,
    )
        .join('')}</div>`;
}

    function tasksMarkup(buttons) {
        return `<div class="select_answer">${buttons
            .map(
            (btn, i) =>
            `<button id="answers-${i}" class="button--primary button ` +
            `rippleButton" style="margin:5px; border-radius: 13px; margin-right: 5px; border: 1px solid; border-color: #E6E6FA; background-color: ${btn.color || "#000000"}"><span class="button-text">${btn.title}</span></button>`,
        )
            .join('')}</div>`;
    }

        function pasteContent(id, data = {}, send = false) {
		  const template = Handlebars.compile(buttons[id].content);
		  if ($('.fr-element.fr-view p').text() === '') $('.fr-element.fr-view p').empty();

		  $('span.fr-placeholder').empty();
		  $('div.fr-element.fr-view p').append(template(data));
		  $('a.overlay-titleCloser').trigger('click');

		  if(send == true){
			  editThreadData(buttons[id].prefix, buttons[id].status);
			  $('.button--icon.button--icon--reply.rippleButton').trigger('click');
		  }
	}
	function getThreadData() {
	const authorID = $('a.username')[0].attributes['data-user-id'].nodeValue;
	const authorName = $('a.username').html();
	const hours = new Date().getHours();
	return {
	user: {
	id: authorID,
	name: authorName,
	mention: `[USER=${authorID}]${authorName}[/USER]`,
	},
	greeting: () =>
	4 < hours && hours <= 11 ?
	'Доброе утро' :
	11 < hours && hours <= 15 ?
	'Добрый день' :
	15 < hours && hours <= 21 ?
	'Добрый вечер' :
	'Доброй ночи',
	};
	}

	function editThreadData(prefix, pin = false, may_lens = true) {
	const threadTitle = $('.p-title-value')[0].lastChild.textContent;

	if(pin == false){
	fetch(`${document.URL}edit`, {
	method: 'POST',
	body: getFormData({
	prefix_id: prefix,
	title: threadTitle,
	_xfToken: XF.config.csrf,
	_xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
	_xfWithData: 1,
	_xfResponseType: 'json',
	}),
	}).then(() => location.reload());
	}
	if(pin == true){
	fetch(`${document.URL}edit`, {
	method: 'POST',
	body: getFormData({
	prefix_id: prefix,
	title: threadTitle,
	discussion_open: 1,
	sticky: 1,
	_xfToken: XF.config.csrf,
	_xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
	_xfWithData: 1,
	_xfResponseType: 'json',
	}),
	}).then(() => location.reload());
	}
	if(may_lens === true) {
	if(prefix == WATCHED_PREFIX || prefix == CLOSE_PREFIX || prefix == DECIDED_PREFIX) {
	moveThread(prefix, 230); }

	if(prefix == WAIT_PREFIX) {
	moveThread(prefix, 917);
	}
	}
	}

	function moveThread(prefix, type) {
	const threadTitle = $('.p-title-value')[0].lastChild.textContent;

	fetch(`${document.URL}move`, {
		method: 'POST',
		body: getFormData({
		prefix_id: prefix,
		title: threadTitle,
		target_node_id: type,
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

	function getFormData(data) {
		const formData = new FormData();
		Object.entries(data).forEach(i => formData.append(i[0], i[1]));
		return formData;
	}
})();
