// ==UserScript==
// @name         Forum Script for Support Team (Chief)
// @namespace    https://forum.blackrussia.online
// @version      2.2
// @description  Forum script for curator and deputy curator
// @author       kumiho
// @match        https://forum.blackrussia.online/*
// @include      https://forum.blackrussia.online/
// @grant        none
// @license      MIT
// @icon         https://sun6-23.userapi.com/s/v1/ig1/Bg7Sgc3yqNZ1F5YedeolIhnyRKIclMmKRAjpf9Rzj0XKAsgR9fLgLgNB3TUBDBF_N7XKKgPK.jpg?size=2155x2155&quality=96&crop=2,2,2155,2155&ava=1
// @downloadURL https://update.greasyfork.org/scripts/556527/Forum%20Script%20for%20Support%20Team%20%28%D0%A1%20IP%29.user.js
// @updateURL https://update.greasyfork.org/scripts/556527/Forum%20Script%20for%20Support%20Team%20%28%D0%A1%20IP%29.meta.js
// ==/UserScript==

(function () {
    'use strict';
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

    // Список кнопок, которые должны только вставлять текст (НЕ отправлять)
    const NO_AUTO_SEND_TITLES = [
        'Приветствие',
        'Дубликат',
        'Покупка ИВ у бота',
        'Покупка ИВ у игрока',
        'Трансфер на твинк',
        'Продажа ИВ игроку',
        'Махинации со взломом',
        'Переношу в нужный раздел'
    ];

    const buttons = [
        {
            title: 'Приветствие',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                '[CENTER] текст [/CENTER]',
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(255, 140, 0, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Дубликат',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Данная тема является дубликатом вашей предыдущей темы, ссылка на тему - <br>Пожалуйста, <b>прекратите создавать идентичные или похожие темы - иначе Ваш форумный аккаунт может быть заблокирован</b>.<br><br>[B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B]",
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(255, 140, 0, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Покупка ИВ у бота',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER][B][COLOR=rgb(255, 255, 255)]Внимательно изучив вашу систему логирования, было выявлено, что бот через (какую систему была передача) передал Вам игровую валюту в размере (размер), данная совокупность действий в полной мере противоречит правилам проекта пункта 2.28, прошу вас настоятельно с ним ознакомиться и впредь не нарушать.[/COLOR][/B][/CENTER]<br><br>" +
                "[CENTER][COLOR=rgb(255, 0, 0)]2.28[/COLOR]. Запрещена покупка/продажа внутриигровой валюты за реальные деньги в любом виде | [COLOR=rgb(255, 0, 0)]PermBan с обнулением аккаунта + ЧС проекта.[/COLOR]<br>" +
                "[B]Примечание: любые попытки купить или продать внутриигровую валюту, интересоваться этим у других игроков или обсуждать это – наказуемо.<br>Примечание: нельзя обменивать донат валюту (например, рубли, пополненные через сайт) на игровые ценности и наоборот.<br>Пример: пополнение донат-счёта другого игрока в обмен на игровую валюту или другие ценности запрещено.<br>Примечание: продавать или обменивать игровые ценности, которые были куплены за донат-валюту, не запрещено.[/B][B]Исключение: покупка игровой валюты или ценностей через официальный сайт разрешена.[/B][/CENTER]<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B]Ваша тема закреплена и ожидает вердикта [COLOR=rgb(255, 142, 0)]Куратора технических специалистов / Заместителя Куратора технических специалистов.[/COLOR] Пожалуйста, ожидайте ответа.[/B][/CENTER]<br>" +
                "[CENTER][size=15px][COLOR=rgb(255, 255,0)][ICODE]На рассмотрении.[/ICODE][/size][/CENTER][/COLOR]",
            prefix: PIN_PREFIX,
            status: true,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(255, 140, 0, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Покупка ИВ у игрока',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER][B][COLOR=rgb(255, 255, 255)]Внимательно изучив вашу систему логирования, было выявлено, что продавец игровой валюты с никнеймом (ник продавца) через (какую систему была передача) передал Вам игровую валюту в размере (размер), данная совокупность действий в полной мере противоречит правилам проекта пункта 2.28, прошу вас настоятельно с ним ознакомиться и впредь не нарушать.[/COLOR][/B][/CENTER]<br><br>" +
                "[CENTER][COLOR=rgb(255, 0, 0)]2.28[/COLOR]. Запрещена покупка/продажа внутриигровой валюты за реальные деньги в любом виде | [COLOR=rgb(255, 0, 0)]PermBan с обнулением аккаунта + ЧС проекта.[/COLOR]<br>" +
                "[B]Примечание: любые попытки купить или продать внутриигровую валюту, интересоваться этим у других игроков или обсуждать это – наказуемо.<br>Примечание: нельзя обменивать донат валюту (например, рубли, пополненные через сайт) на игровые ценности и наоборот.<br>Пример: пополнение донат-счёта другого игрока в обмен на игровую валюту или другие ценности запрещено.<br>Примечание: продавать или обменивать игровые ценности, которые были куплены за донат-валюту, не запрещено.[/B][B]Исключение: покупка игровой валюты или ценностей через официальный сайт разрешена.[/B][/CENTER]<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B]Ваша тема закреплена и ожидает вердикта [COLOR=rgb(255, 142, 0)]Куратора технических специалистов / Заместителя Куратора технических специалистов.[/COLOR] Пожалуйста, ожидайте ответа.[/B][/CENTER]<br>" +
                "[CENTER][size=15px][COLOR=rgb(255, 255,0)][ICODE]На рассмотрении.[/ICODE][/size][/CENTER][/COLOR]",
            prefix: PIN_PREFIX,
            status: true,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(255, 140, 0, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Трансфер на твинк',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER][B]Внимательно изучив вашу систему логирования, было выявлено, что с вашего аккаунта с никнеймом (Никнейм) через (какую систему была передача) передавали (что передали) на второй аккаунт с никнеймом (Никнейм).[/B][/CENTER]<br><br>" +
                "[CENTER][B]Данная совокупность действий в полной мере противоречит правилам проекта пункта [COLOR=rgb(255, 0, 0)]4.05[/COLOR], прошу вас настоятельно с ним ознакомиться и впредь не нарушать.<br><br>[/B][/CENTER]" +
                "[CENTER][COLOR=rgb(255, 0, 0)][B]4.05[/B][/COLOR][B]. Запрещена передача либо трансфер игровых ценностей, между игровыми аккаунтами либо серверами, а также в целях удержания имущества | [/B][COLOR=rgb(255, 0, 0)][B]Warn / Ban 15 дней / PermBan[/B][/COLOR][B]<br>Пример: передать бизнес, АЗС, дом или любые другие игровые материальные ценности с одного аккаунта игрока на другой / используя свой твинк / договорившись заранее с игроком и иные способы удержания.[/B][/CENTER]<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B]Ваша тема закреплена и ожидает вердикта [COLOR=rgb(255, 142, 0)]Куратора технических специалистов / Заместителя Куратора технических специалистов.[/COLOR] Пожалуйста, ожидайте ответа.[/B][/CENTER]<br>" +
                "[CENTER][size=15px][COLOR=rgb(255, 255,0)][ICODE]На рассмотрении.[/ICODE][/size][/CENTER][/COLOR]",
            prefix: PIN_PREFIX,
            status: true,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(255, 140, 0, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Продажа ИВ игроку',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER][B][COLOR=rgb(255, 255, 255)]Внимательно изучив вашу систему логирования, было выявлено, что вы продали игровую валюту через (какую систему была передача) игроку с никнеймом (Никнейм) в размере (размер).[/COLOR][/B][/CENTER]<br><br>" +
                "[CENTER][B]Данная совокупность действий в полной мере противоречит правилам проекта пункта [COLOR=rgb(255, 0, 0)]2.28[/COLOR], прошу вас настоятельно с ним ознакомиться и впредь не нарушать.<br><br>[/B][/CENTER]" +
                "[CENTER][COLOR=rgb(255, 0, 0)]2.28[/COLOR]. Запрещена покупка/продажа внутриигровой валюты за реальные деньги в любом виде | [COLOR=rgb(255, 0, 0)]PermBan с обнулением аккаунта + ЧС проекта.[/COLOR]<br>" +
                "[B]Примечание: любые попытки купить или продать внутриигровую валюту, интересоваться этим у других игроков или обсуждать это – наказуемо.<br>Примечание: нельзя обменивать донат валюту (например, рубли, пополненные через сайт) на игровые ценности и наоборот.<br>Пример: пополнение донат-счёта другого игрока в обмен на игровую валюту или другие ценности запрещено.<br>Примечание: продавать или обменивать игровые ценности, которые были куплены за донат-валюту, не запрещено.[/B][B]Исключение: покупка игровой валюты или ценностей через официальный сайт разрешена.[/B][/CENTER]<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B]Ваша тема закреплена и ожидает вердикта [COLOR=rgb(255, 142, 0)]Куратора технических специалистов / Заместителя Куратора технических специалистов.[/COLOR] Пожалуйста, ожидайте ответа.[/B][/CENTER]<br>" +
                "[CENTER][size=15px][COLOR=rgb(255, 255,0)][ICODE]На рассмотрении.[/ICODE][/size][/CENTER][/COLOR]",
            prefix: PIN_PREFIX,
            status: true,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(255, 140, 0, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Махинации со взломом',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER][B][COLOR=rgb(255, 255, 255)]Внимательно изучив систему логирования, было выявлено, что игрок с никнеймом (ник) был взломан. В ходе дальнейшей проверки обнаружено, что имущество игрока было передано на ваш аккаунт. Данные действия подразумевают собой совокупность, которая направлена на получение выгоды нечестным для этого путем.[/COLOR][/B][/CENTER]<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B]Ваша тема закреплена и ожидает вердикта [COLOR=rgb(255, 142, 0)]Куратора технических специалистов / Заместителя Куратора технических специалистов.[/COLOR] Пожалуйста, ожидайте ответа.[/B][/CENTER]<br>" +
                "[CENTER][size=15px][COLOR=rgb(255, 255,0)][ICODE]На рассмотрении.[/ICODE][/size][/CENTER][/COLOR]",
            prefix: PIN_PREFIX,
            status: true,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(255, 140, 0, 0.8); font-family: UtromPressKachat',
        },
        {
            title: '(<--<---<--- Жалобы на Тех. спецов --->--->-->)',
            dpstyle: 'oswald: 3px; color: #fff; background: #db2309; box-shadow: 0 0 2px 0 rgba(0,0,0,0.14),0 2px 2px 0 rgba(0,0,0,0.12),0 1px 3px 0 rgba(0,0,0,0.2); border: none; border-color: #f53317',
        },
        {
            title: 'Форма подачи Жалобы на ТС',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER][B][COLOR=rgb(255, 255, 255)]Ваше обращение составлено не по форме.[/COLOR][/B][/CENTER]<br>" +
                "[CENTER]Пожалуйста, заполните форму, создав новую тему: Название темы с NickName технического специалиста<br>Пример:<br> Lev_Kalashnikov | махинации<br>Форма заполнения темы:<br>[code]01. Ваш игровой никнейм:<br>02. Игровой никнейм технического специалиста:<br>03. Сервер, на котором Вы играете:<br>04. Описание ситуации (описать максимально подробно и раскрыто):<br>05. Любые скриншоты, которые могут помочь в решении проблемы (если таковые имеются):<br>06. Дата и время произошедшей технической проблемы (постарайтесь указать максимально точно):[/code][/CENTER]<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Нет окна блокировки',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Без окна о блокировке тема не подлежит рассмотрению - создайте новую тему, прикрепив окно блокировки с фотохостинга или видеохостинга.<br> Также обращаем ваше внимание на то, что доказательства из социальных сетей <u>не принимаются</u>.<br><br>[URL='https://yapx.ru/']yapx.ru[/URL],<br>[URL='https://imgur.com/']imgur.com[/URL],<br>[URL='https://www.youtube.com/']youtube.com[/URL],<br>[URL='https://imgbb.com']ImgBB.com[/URL],<br>[URL='https://imgfoto.host/']ImgFoto.host[/URL],<br>[URL='https://postimages.org/']Postimages.org[/URL]<br>(все кликабельно).[/CENTER]<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Правила раздела ЖАЛОБ НА ТС',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Пожалуйста, убедительная просьба, ознакомиться с назначением данного раздела в котором Вы создали тему, так как Ваш запрос не относится к жалобам на технических специалистов.<br>Что принимается в данном разделе:<br>Жалобы на технических специалистов, оформленные по форме подачи и не нарушающие правила подачи:<br> [SIZE=7][COLOR=rgb(226, 80, 65)][U]Правила подачи жалобы на технических специалистов[/U][/COLOR][/SIZE][/CENTER]<br><br>" +
                "[QUOTE][SIZE=4][COLOR=rgb(226, 80, 65)]01.[/COLOR] Ваш игровой никнейм:[SIZE=4][COLOR=rgb(226, 80, 65)]<br>02.[/COLOR] Игровой никнейм технического специалиста:[COLOR=rgb(226, 80, 65)]<br>03.[/COLOR] Сервер, на котором Вы играете:[COLOR=rgb(226, 80, 65)]<br>04.[/COLOR] Описание ситуации (описать максимально подробно и раскрыто):[COLOR=rgb(226, 80, 65)]<br>05.[/COLOR] Любые скриншоты, которые могут помочь в решении проблемы (если таковые имеются):[COLOR=rgb(226, 80, 65)]<br>06.[/COLOR] Дата и время произошедшей технической проблемы (постарайтесь указать максимально точно):[/SIZE][/SIZE][/QUOTE]<br><br>" +
                "[SIZE=4][SIZE=4][COLOR=rgb(226, 80, 65)]Примечание:[/COLOR] все оставленные заявки обращения в данный раздел обязательно должны быть составлены по шаблону предоставленному немного выше.<br>В ином случае, заявки обращения в данный раздел, составленные не по форме — будут отклоняться.<br>Касательно названия заголовка темы — четких правил нет, но, желательно, чтобы оно содержало лишь никнейм технического специалиста и причину.<br>Заранее, настоятельно рекомендуем ознакомиться [U][B][URL='https://forum.blackrussia.online/index.php?forums/faq.231/']с данным разделом[/URL][/B][/U][/SIZE][/SIZE]<br>" +
                "[CENTER][SIZE=7][COLOR=rgb(226, 80, 65)][U]Какие жалобы не проверяются?[/U][/COLOR][/SIZE][/CENTER]<br><br>" +
                "[SIZE=4][COLOR=rgb(226, 80, 65)]—[/COLOR] Если в содержании темы присутствуют оффтоп/оскорбления.<br>[COLOR=rgb(226, 80, 65)]—[/COLOR] С момента выдачи наказания прошло более 14 дней.[/SIZE]<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Срок подачи ЖБ',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]С момента выдачи наказания от технического специалиста прошло более 14-ти дней.[/CENTER]<br><br>" +
                "[CENTER][B]Ваша тема закреплена и ожидает вердикта [COLOR=rgb(255, 142, 0)]Куратора технических специалистов / Заместителя Куратора технических специалистов.[/COLOR] Пожалуйста, ожидайте ответа.[/B][/CENTER]<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][size=15px][COLOR=rgb(255, 255,0)][ICODE]На рассмотрении.[/ICODE][/size][/CENTER][/COLOR]",
            prefix: PIN_PREFIX,
            status: true,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Имущество БУДЕТ восстановлено',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Убедительная просьба, <b><u>не менять никнейм до момента восстановления</u></b>.<br>[CENTER]Для активации восстановления используйте команды: [COLOR=rgb(255, 213, 51)]/roulette[/COLOR], [COLOR=rgb(255, 213, 51)]/recovery[/COLOR][/CENTER]<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][COLOR=rgb(255, 255, 0)][B]Ожидайте вердикта от команды проекта[/B][/COLOR][/CENTER]",
            status: true,
            prefix: COMMAND_PREFIX,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Не относится',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Ваше обращение не относится к жалобам на технических специалистов.<br> Пожалуйста, будьте добры, ознакомьтесь с правилами данного раздела: [URL='https://forum.blackrussia.online/forums/Информация-для-игроков.231/']клик[/URL] <br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Запрос привязок',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER][B][COLOR=rgb(255, 255, 255)]1. Укажите ваш Telegram ID, если ваш игровой аккаунт был привязан к Telegram. Узнать его можно здесь: t.me/getmyid_bot<br>[/COLOR][/B][COLOR=rgb(255, 255, 255)][B]2. Укажите ваш оригинальный ID страницы ВКонтакте, которая привязана к аккаунту (взять его можно через данный сайт - https://regvk.com/ )<br>[/B][/COLOR][B][COLOR=rgb(255, 255, 255)]3. Укажите почту, которая привязана к аккаунту[/COLOR][/B][/CENTER]<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][I][COLOR=rgb(247, 218, 100)]Ожидаю ваш ответ.[/COLOR][/I][/CENTER]",
            prefix: TECHADM_PREFIX,
            status: true,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Смена пароля',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[COLOR=rgb(255, 255, 255)][SIZE=4]Сбросьте пароль через любую из привязок ВКонтакте или Telegram, после чего, убедительная просьба, сообщить об этом в данной теме.<br><br>Ожидаю вашего ответа.<br>[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>[COLOR=rgb(255, 255, 0)]На рассмотрении[/COLOR][/SIZE][/COLOR]",
            prefix: TECHADM_PREFIX,
            status: true,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: '(<--<--<--<-- Технический раздел -->-->-->-->)',
            dpstyle: 'oswald: 3px; color: #fff; background: #db2309; box-shadow: 0 0 2px 0 rgba(0,0,0,0.14),0 2px 2px 0 rgba(0,0,0,0.12),0 1px 3px 0 rgba(0,0,0,0.2); border: none; border-color: #f53317',
        },
        {
            title: 'Форма подачи ТР',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER][B][COLOR=rgb(255, 255, 255)]Ваше обращение составлено не по форме.[/COLOR][/B][/CENTER]<br>" +
                "[CENTER]Пожалуйста, заполните форму, создав новую тему: <br>[CODE]01. Ваш игровой никнейм:<br>02. Сервер, на котором Вы играете:<br>03. Суть Вашей возникшей проблемы (описать максимально подробно и раскрыто): <br>04. Любые скриншоты, которые могут помочь в решении проблемы (если таковые имеются):<br>05. Дата и время произошедшей технической проблемы (постарайтесь указать максимально точно):[/CODE]<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Нет скринов/видео',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Без доказательств (в частности скриншоты или видео) – решить проблему не получится. Если доказательства найдутся - создайте новую тему, прикрепив доказательства с фотохостинга или видеохостинга<br> Также обращаем ваше внимание на то, что доказательства из социальных сетей <u>не принимаются</u>.<br><br>[URL='https://yapx.ru/']yapx.ru[/URL],<br>[URL='https://imgur.com/']imgur.com[/URL],<br>[URL='https://www.youtube.com/']youtube.com[/URL],<br>[URL='https://imgbb.com']ImgBB.com[/URL],<br>[URL='https://imgfoto.host/']ImgFoto.host[/URL],<br>[URL='https://postimages.org/']Postimages.org[/URL]<br>(все кликабельно).<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Нерабочая ссылка',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER][B][COLOR=rgb(255, 255, 255)]К сожалению, ссылка на ваши прикрепленные доказательства недоступна или не работает.[/COLOR][/B]<br>" +
                "[CENTER][B]Пожалуйста, отправьте новое обращение, убедившись, что ссылка на доказательства работает и содержит качественные фотографии или видеозаписи.[/B][/CENTER]" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Док-ва из соц.сети',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Доказательства из социальных сетей <u>не принимаются и не подлежат рассмотрению</u>.<br><br>Вы можете воспользоваться любым удобным фото/видеохостингом, но для вашего удобства мы перечислили популярные сайты:<br>[URL='https://yapx.ru/']yapx.ru[/URL],<br>[URL='https://imgur.com/']imgur.com[/URL],<br>[URL='https://www.youtube.com/']youtube.com[/URL],<br>[URL='https://imgbb.com']ImgBB.com[/URL],<br>[URL='https://imgfoto.host/']ImgFoto.host[/URL],<br>[URL='https://postimages.org/']Postimages.org[/URL]<br>(все кликабельно).<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Правила раздела ТР',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Пожалуйста, убедительная просьба, ознакомиться с назначением данного раздела, в котором Вы создали тему, поскольку Ваш запрос не относится к технической проблеме.<br>Что принимается в тех разделе:<br>Если возникли технические проблемы, которые так или иначе связаны с игровым модом<br>Форма заполнения:<br>[QUOTE]<br>[SIZE=4][COLOR=rgb(226, 80, 65)]01.[/COLOR] Ваш игровой никнейм:<br>[COLOR=rgb(226, 80, 65)]02.[/COLOR] Сервер, на котором Вы играете:<br>[COLOR=rgb(226, 80, 65)]03.[/COLOR] Суть возникшей проблемы (описать максимально подробно и раскрыто):<br>[COLOR=rgb(226, 80, 65)]04.[/COLOR] Любые скриншоты, которые могут помочь в решении проблемы (если таковые имеются):<br>[COLOR=rgb(226, 80, 65)]05.[/COLOR] Дата и время произошедшей технической проблемы (постарайтесь указать максимально точно):[/SIZE][/QUOTE]<br>[/CENTER]<br><br>" +
                "[CENTER][SIZE=7][COLOR=rgb(226, 80, 65)][U]Если возникли технические проблемы, которые так или иначе связаны с вылетами из игры и любыми другими проблемами клиента[/U][/COLOR][/SIZE][/CENTER]<br><br>" +
                "[QUOTE]<br>[SIZE=4][COLOR=rgb(226, 80, 65)]01. [/COLOR]Ваш игровой ник:<br>[COLOR=rgb(226, 80, 65)]02. [/COLOR]Сервер:<br>[COLOR=rgb(226, 80, 65)]03.[/COLOR] Тип проблемы: Обрыв соединения | Проблема с ReCAPTCHA | Краш игры (закрытие игры) | Другое [Выбрать один вариант ответа]<br>[COLOR=rgb(226, 80, 65)]04. [/COLOR]Действия, которые привели к этому (при вылетах, по возможности предоставлять место сбоя):<br>[COLOR=rgb(226, 80, 65)]05.[/COLOR] Как часто данная проблема:<br>[COLOR=rgb(226, 80, 65)]06.[/COLOR] Полное название мобильного телефона:<br>[COLOR=rgb(226, 80, 65)]07.[/COLOR] Версия Android:<br>[COLOR=rgb(226, 80, 65)]08. [/COLOR]Дата и время (по МСК):<br>[COLOR=rgb(226, 80, 65)]09. [/COLOR]Связь с Вами по Telegram/VK:[/SIZE][/QUOTE]" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][/CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Забыл пароль',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER][B][COLOR=rgb(255, 255, 255)]В решении данной проблемы вам могут помочь только установленные привязки на аккаунте.<br>[CENTER][B][COLOR=rgb(255, 255, 255)]Вы можете через специализированного бота в привязанных социальных сетях восстановить доступ к игровому аккаунту, сбросив пароль через окно \"ввода пароля\" при входе в игру или же поменяв пароль в самом боте. Если же на вашем игровом аккаунте отсутствуют привязки — мы ничем не сможем вам помочь, ибо каждый игрок несёт ответственность за свой игровой аккаунт и за игровые ценности на нём.<br><br>Помощник Кирилл (Telegram) - [I][URL='https://t.me/br_helper_bot']клик[/URL][/I] (кликабельно)<br>[CENTER][B]BLACK RUSSIA - Мобильная онлайн-игра (ВКонтакте) - [URL='https://vk.com/blackrussia.online'][I]клик [/I][/URL](кликабельно)[/B][/CENTER]<br><br>" +
                "[COLOR=rgb(255, 255, 255)][B]После регистрации игрового аккаунта мы настоятельно рекомендуем каждому пользователю обезопасить свой игровой аккаунт всеми возможными соответствующими привязками, дабы в дальнейшем не попадать в подобные ситуации и не попадаться на несанкционированный вход со стороны злоумышленников.<br><br>" +
                "[COLOR=rgb(255, 255, 255)][B] Мы не сбрасываем пароли и не отвязываем возможно утерянные привязки от игровых аккаунтов.<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Пропало имущество(доп.инфа)',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER][SIZE=5]Для дальнейшего рассмотрения темы, предоставьте:<br><BR>[QUOTE]1. Скриншоты или видео, подтверждающие факт владения этим имуществом.<BR>2. Все детали пропажи: дата, время, после каких действий имущество пропало.<BR>3. Информация о том, как вы изначально получили это имущество:<BR>4. Дата покупки;<br>5. Способ приобретения (у игрока, в магазине или через донат;<br>6. Видеофиксация покупки (если присутствует);<br>7. Никнейм игрока, у которого было приобретено имущество, если покупка была сделана не в магазине.[/QUOTE]<BR>[/CENTER]" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][size=15px][COLOR=rgb(255, 255,0)][ICODE]На рассмотрении.[/ICODE][/size][/CENTER][/COLOR]",
            prefix: PIN_PREFIX,
            status: true,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: "Проблемы с Кешом",
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Если вы столкнулись с проблемой загрузки страниц форума, пожалуйста, выполните следующие действия:<br><br>• Откройте \"Настройки\".<br>• Найдите во вкладке \"Приложения\" свой браузер, через который вы пользуетесь нашим сайтом форума.<br>• Нажмите на браузер, после чего внизу выберите \"Очистить\" -> \"Очистить Кэш\".<br><br>После следуйте данным инструкциям:<br>• Перейдите в настройки браузера.<br>• Выберите \"Конфиденциальность и безопасность\" -> \"Очистить историю\".<br>• В основных и дополнительных настройках поставьте галочку в пункте \"Файлы cookie и данные сайтов\".<br>После этого нажмите \"Удалить данные\".<br><br>Ниже прилагаем видео-инструкции описанного процесса для разных браузеров:<br>Для браузера CHROME: https://youtu.be/FaGp2rRru9s<br>Для браузера OPERA: https://youtube.com/shorts/eJOxkc3Br6A?feature=share" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Законопослушность',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]К сожалению, администрация, технические специалисты и другие должностные лица BLACK RUSSIA не могут повлиять на законопослушность вашего аккаунта.<br>Повысить законопослушность можно двумя способами:<BR><BR>1. Каждый PayDay (00 минут каждого часа) вам начисляется одно очко законопослушности(Если только у вас нет PLATINUM VIP-статуса), если за прошедший час вы отыграли не менее 20 минут.<br>2. Приобрести законопослушность в /donate.<br>[/CENTER]" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Команде проекта',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Ваша тема закреплена и находится на рассмотрении у команды проекта.<br>[CENTER]Создавать новые темы с данной проблемой — не нужно, ожидайте ответа в данной теме. Если проблема решится - Вы всегда можете оставить своё сообщение в этой теме.<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][COLOR=rgb(255, 255, 0)]Передано команде проекта.[/COLOR][/CENTER][/SIZE]",
            prefix: COMMAND_PREFIX,
            status: true,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Известно КП',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Команде проекта уже известно о данной проблеме, она обязательно будет рассмотрена и исправлена.<br>Спасибо за Ваше обращение!<br><br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Не является багом',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Проблема, с которой вы столкнулись, не является багом или ошибкой сервера.<br><br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'В раздел Госс Организаций.',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Ваша тема не относится к техническому разделу, пожалуйста, оставьте ваше заявление в соответствующем разделе Государственных Организаций вашего сервера.[/CENTER]<br><br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'В раздел Криминальных Организаций',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Ваша тема не относится к техническому разделу, пожалуйста, оставьте ваше заявление в соответствующем разделе Криминальных Организаций вашего сервера.[/CENTER]" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Жб на адм',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Обратитесь в раздел 'Жалобы на администрацию' вашего сервера.<br>Форма для подачи жалобы - [I][URL='https://forum.blackrussia.online/index.php?threads/Правила-подачи-жалоб-на-администрацию.3429349/']клик[/URL][/I] (кликабельно)<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Жб на лидеров',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Данная тема не относится к техническому разделу.<br>Пожалуйста, обратитесь в раздел 'Жалобы на Лидеров' Вашего сервера.<br>Форма подачи жалобы - [I][URL='https://forum.blackrussia.online/threads/%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0-%D0%BF%D0%BE%D0%B4%D0%B0%D1%87%D0%B8-%D0%B6%D0%B0%D0%BB%D0%BE%D0%B1-%D0%BD%D0%B0-%D0%BB%D0%B8%D0%B4%D0%B5%D1%80%D0%BE%D0%B2.3429391/']клик[/URL][/I] (кликабельно)" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Жб на игроков',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Данная тема не относится к техническому разделу.<br>Пожалуйста, обратитесь в раздел 'Жалобы на игроков' Вашего сервера.<br>Форма подачи жалобы - [I][URL='https://forum.blackrussia.online/index.php?threads/Правила-подачи-жалоб-на-игроков.3429394/']клик[/URL][/I] (кликабельно)" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Обжалования',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Вы получили наказание от администратора своего сервера.<br> Для его снижения/обжалования обратитесь в раздел<br><<Обжалования>> вашего сервера.<br>Форма подачи темы - [I][URL='https://forum.blackrussia.online/index.php?threads/Правила-подачи-заявки-на-обжалование-наказания.3429398/']клик[/URL][/I] (кликабельно)" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Сервер не отвечает',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Если у Вас встречаются такие проблемы, как «Сервер не отвечает», не отображаются сервера в лаунчере, не удаётся выполнить вход на сайт/форум, попробуйте совершить следующие действия: <br><br>• Сменить IP-адрес любыми средствами; <br>• Переключиться на Wi-Fi/мобильный интернет или на любую доступную сеть; <br>• Использование VPN; <br>• Перезагрузка роутера.<br><br>[CENTER]Если методы выше не помогли, то переходим к следующим шагам: <br><br>1. Устанавливаем приложение «1.1.1.1: Faster & Safer Internet» Ссылка: https://clck.ru/ZP6Av и переходим в него.<br>2. Соглашаемся со всей политикой приложения.<br>3. Нажимаем на ползунок и ждем, когда текст изменится на «Подключено».<br>4. Проверяем: Отображаются ли серверы? Удается ли выполнить вход в игру? Работают ли другие источники (сайт, форум)? <br>[CENTER]📹 Включение продемонстрировано на видео: https://youtu.be/Wft0j69b9dk<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Перенаправление в поддержку',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER][B][COLOR=rgb(255, 255, 255)]В том случае, если у вас произошла одна из указанных проблем:[/COLOR][/B][/CENTER]<br>" +
                "[CENTER][COLOR=rgb(255, 255, 255)]1. Баланс доната (BC) стал отрицательным.<br> 2. Донат не был зачислен на аккаунт.<br> 3. Донат был зачислен не в полном объеме.<br> 4. Отсутствие подарка при подключении или продлении тарифа Tele-2.<br> 5. Частые переподключения к серверу.[/COLOR][/CENTER]<br><br>" +
                "[CENTER][B][COLOR=rgb(255, 255, 255)]Вам в срочном порядке необходимо обратиться в техническую поддержку нашего проекта https://blackrussia.online (внизу справа виджет создания обращения).[/COLOR][/B][/CENTER]<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Сим-карта',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER][SIZE=4][COLOR=rgb(255, 255, 255)][B]Если вы приобрели тариф Black Russia, но награды не были зачислены или у Вас не получается активировать номер с тарифом Black Russia , тогда [/B][I][B]убедитесь в следующем:[/B][/I][/COLOR][/SIZE][/CENTER]<br>" +
                "[CENTER][B]1. У вас тариф Black Russia, а не другой тариф, например, тариф Black[/B][/CENTER]<br>" +
                "[B][COLOR=rgb(255, 255, 255)]2. Номер активирован.[/COLOR][/B]<br>" +
                "[B][COLOR=rgb(255, 255, 255)]3. После активации номера [U]прошло более 48-ми часов.[/U][/COLOR][/B]<br><br>" +
                "[B][COLOR=rgb(255, 255, 255)]Если пункты выше не описывают вашу ситуацию в обязательном порядке обратитесь в службу поддержки[I] для дальнейшего решения:[/I][/COLOR][/B]<br>" +
                "[B][COLOR=rgb(255, 255, 255)]На сайте через виджет обратной связи (https://blackrussia.online)[/COLOR][/B]<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Правила восстановления',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Пожалуйста, убедительная просьба, ознакомьтесь с правилами восстановлений - [URL='https://forum.blackrussia.online/index.php?threads/В-каких-случаях-мы-не-восстанавливаем-игровое-имущество.25277/']клик[/URL]<br>Вы создали тему, которая не относится к технической проблеме.[/CENTER]<br><br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Хочу стать адм/хелп',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Технические специалисты не принимают решения по назначению на должности.<br>Для этого есть раздел заявок на форуме - [I][URL='https://forum.blackrussia.online/forums/%D0%97%D0%90%D0%AF%D0%92%D0%9A%D0%98-%D0%9D%D0%90-%D0%94%D0%9E%D0%9B%D0%96%D0%9D%D0%9E%D0%A1%D0%A2%D0%98-%D0%9B%D0%98%D0%94%D0%95%D0%A0%D0%9E%D0%92-%D0%98-%D0%90%D0%93%D0%95%D0%9D%D0%A2%D0%9E%D0%92-%D0%9F%D0%9E%D0%94%D0%94%D0%95%D0%A0%D0%96%D0%9A%D0%98.3066/']клик[/URL][/I] (кликабельно), где вы можете ознакомиться с актуальными заявками и формами подачи.<br>Приятной игры и удачи в карьерном росте!<br><br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Предложение по улучш.',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Ваша тема не относится к технической проблеме.<br>Если вы хотите предложить улучшение, пожалуйста, перейдите в соответствующий раздел.<br> [URL=\"https://forum.blackrussia.online/index.php?categories/Предложения-по-улучшению.656/\"] Предложения по улучшению → нажмите сюда[/URL]<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Нужны все прошивки',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER] Для активации какой либо прошивки необходимо поставить все детали данного типа \"SPORT\" \"SPORT+\" и т.п.<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Тестерам',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Ваша тема передана на тестирование.[/CENTER][/SIZE]" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>",
            prefix: WAIT_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Пропали вещи с аукц/маркет',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER]Если вы выставили свои вещи на аукцион а их никто не купил, то воспользуйтесь командой [COLOR=rgb(251, 160, 38)]/reward[/COLOR]<br> В случае отсутствии вещей там, приложите скриншоты с + /time в новой теме<br><br>Если же вещи пропали с маркетплейса, значит их никто не купил, вам следует забрать их с ПВЗ (пункта выдачи заказов) в течение 7 дней, иначе предметы системно уничтожатся.<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Отвязка привязок',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER][B][COLOR=rgb(255, 255, 255)]Удалить установленные привязки на вашем аккаунте не представляется возможным ни нам, ни команде проекта. [/COLOR][/B]<br><br>" +
                "[CENTER][B][COLOR=rgb(255, 255, 255)]Бывают случаи, когда злоумышленник, получив несанкционированный доступ к аккаунту, устанавливает на него свою привязку. В такой ситуации аккаунт блокируется перманентно с причиной \"Чужая привязка\". Дальнейшая разблокировка игрового аккаунта невозможна во избежания повторных случаев взлома.[/COLOR][/B][/CENTER]" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Заблокированный IP',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER][COLOR=rgb(255, 255, 255)][size=15px]Вы оказались на заблокированном IP-адресе. Ваш аккаунт не заблокирован, так что поводов для беспокойства нет. Такая ситуация может возникнуть по разным причинам, например, из-за смены мобильного интернета или переезда. Чтобы избежать этой проблемы, перезагрузите телефон или используйте VPN.[/CENTER] <br>" +
                "[CENTER]Приносим свои извинения за доставленные неудобства. Желаем приятного времяпровождения на нашем проекте.[/CENTER]<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B][CENTER]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Ваш акк взломан',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER][B][COLOR=rgb(255, 255, 255)]Ваш игровой аккаунт был подвержен несанкционированному доступу со стороны злоумышленников. В том случае, если с аккаунта было украдено имущество - все причастные к этому будут наказаны. Ваш аккаунт будет временно заблокирован с причиной \"Взломан\" с целью же вашей дальнейшей безопасности и предотвращения повторных случаев заходов злоумышленников. [/COLOR][/B][/CENTER]<br><br>" +
                "[CENTER][B][COLOR=rgb(255, 255, 255)]Для восстановления доступа и уточнения всех нюансов настоятельно рекомендуем вам обратиться в раздел 'Жалобы на технических специалистов' - [/COLOR][/B][URL='https://forum.blackrussia.online/forums/Жалобы-на-технических-специалистов.490/'][B][COLOR=rgb(255, 255, 255)][I]клик [/I][/COLOR][/B][/URL][B][COLOR=rgb(255, 255, 255)](кликабельно)[/COLOR][/B][/CENTER]" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Нет ответа игрока',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER][B][COLOR=rgb(255, 255, 255)]К сожалению, обратной связи от вас в данной теме так и не поступило.[/COLOR][/B][/CENTER]<br>" +
                "[CENTER][B][COLOR=rgb(255, 255, 255)]Если Ваша проблема по-прежнему не решена, пожалуйста, создайте новое обращение.[/COLOR][/B][/CENTER]<br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[B][I][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/I][/B]",
            prefix: CLOSE_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'После рестарта',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER][COLOR=rgb(255, 255, 255)]Проверьте, пожалуйста, будет ли актуальна Ваша проблема после рестарта сервера (после 05:00 по-московскому времени)<br>[/COLOR][/CENTER]" +
                "[CENTER][B][COLOR=rgb(255, 255, 255)]Ожидаем от Вас обратной связи в данной теме.[/COLOR][/B][/CENTER]" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][size=15px][COLOR=rgb(255, 255,0)][ICODE]На рассмотрении.[/ICODE][/size][/CENTER][/COLOR]",
            prefix: PIN_PREFIX,
            status: true,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: '(<--<--<--<-- Жалобы на игроков -->-->-->-->)',
            dpstyle: 'oswald: 3px; color: #fff; background: #db2309; box-shadow: 0 0 2px 0 rgba(0,0,0,0.14),0 2px 2px 0 rgba(0,0,0,0.12),0 1px 3px 0 rgba(0,0,0,0.2); border: none; border-color: #f53317',
        },
        {
            title: 'Игрок будет заблокирован',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER][SIZE=4]После проверки доказательств и системы логирования вердикт:<br><br>Игрок будет заблокирован[/CENTER]<br><br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][I][COLOR=rgb(0, 255, 0)][B]Одобрено[/B][/COLOR][/I][/CENTER]",
            prefix: ODOBRENO_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
        {
            title: 'Игрок не будет заблокирован',
            content: "[CENTER][IMG width=695px]https://i.postimg.cc/mrhcH5vR/1621526767066.png[/IMG]<br>"+
                "[COLOR=rgb(209, 213, 216)][FONT=Arial][size=15px][CENTER]{{ greeting }}, уважаемый(-ая) {{ user.mention }}[/CENTER]<br><br>" +
                "[CENTER][SIZE=4]После проверки доказательств и системы логирования вердикт:<br><br>Доказательств недостаточно для блокировки игрока[/CENTER]<br><br>" +
                "[CENTER][IMG width=695px]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/IMG][/CENTER]<br>" +
                "[CENTER][B][I][COLOR=rgb(255, 0, 0)]Отказано[/COLOR][/I][/B][/CENTER]",
            prefix: UNACCEPT_PREFIX,
            status: false,
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgba(127, 199, 255, 0.8); font-family: UtromPressKachat',
        },
    ];

    // Добавляем стили для кнопок
    const style = document.createElement('style');
    style.textContent = `
        .bgButton {
            background: #1a1a1a;
            color: #ffffff;
            border: 1px solid #333;
            border-radius: 4px;
            padding: 6px 8px;
            margin: 2px;
            font-size: 11px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
            min-width: 50px;
            max-width: 55px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1.1;
            word-break: break-word;
            white-space: normal;
            flex-shrink: 0;
        }

        .bgButton:hover {
            background: #2a2a2a;
            border-color: #555;
        }

        .bgButtonsContainer {
            display: flex;
            gap: 2px;
            flex-wrap: nowrap;
            overflow-x: auto;
            padding: 5px 0;
            margin-bottom: 10px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
        }

        .bgButtonsContainer::-webkit-scrollbar {
            display: none;
        }

        @media (max-width: 768px) {
            .bgButton {
                min-width: 48px;
                max-width: 52px;
                font-size: 10px;
                padding: 5px 6px;
            }
        }

        @media (min-width: 769px) {
            .bgButtonsContainer {
                flex-wrap: wrap;
                overflow-x: visible;
            }
        }
    `;
    document.head.appendChild(style);

    let isInitialized = false;

    function initializeScript() {
        if (window.location.href.includes('threads')) {
            if (document.getElementById('selectAnswer')) {
                return;
            }
            
            $(document).ready(() => {
                if (typeof Handlebars === 'undefined') {
                    $('body').append('<script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"></script>');
                }

                addButton('На рассмотрение', 'pin', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(255, 250, 0, 0.8);');
                addButton('Тех. Спец', 'techspec', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(0, 0, 255, 0.8);');
                addButton('Рассмотрено', 'watched', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(128, 255, 128, 0.8);');
                addButton('Одобрено', 'odobreno', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(128, 255, 128, 0.8);');
                addButton('Отказано', 'unaccept', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(255, 0, 0, 0.8);');
                addButton('Закрыто', 'closed', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(255, 0, 0, 0.8);');
                addAnswers();

                const threadData = getThreadData();

                $('button#unaccept').click(() => editThreadData(UNACCEPT_PREFIX, false));
                $('button#pin').click(() => editThreadData(PIN_PREFIX, true));
                $('button#teamProject').click(() => editThreadData(COMMAND_PREFIX, true));
                $('button#watched').click(() => editThreadData(WATCHED_PREFIX, false));
                $('button#decided').click(() => editThreadData(DECIDED_PREFIX, false));
                $('button#closed').click(() => editThreadData(CLOSE_PREFIX, false));
                $('button#techspec').click(() => editThreadData(TECHADM_PREFIX, true));
                $('button#odobreno').click(() => editThreadData(ODOBRENO_PREFIX, false));

                $(`button#selectAnswer`).click(() => {
                    XF.alert(buttonsMarkup(buttons), null, 'ВЫБЕРИТЕ ОТВЕТ');
                    buttons.forEach((btn, id) => {
                        $(`button#answers-${id}`).click(() => {
                            const shouldAutoSend = !NO_AUTO_SEND_TITLES.includes(btn.title);
                            pasteContent(id, threadData, shouldAutoSend);
                        });
                    });
                });
                
                isInitialized = true;
            });
        }
    }

    function addButton(name, id, style) {
        if ($(`button#${id}`).length === 0) {
            $('.button--icon--reply').before(
                `<button type="button" class="button--primary button rippleButton" id="${id}" style="${style}">${name}</button>`,
            );
        }
    }

    function addAnswers() {
        if ($('button#selectAnswer').length === 0) {
            $('.button--icon--reply').after(`<button type="button" class="button--cta uix_quickReply--button button button--icon button--icon--write rippleButton" id="selectAnswer" style="oswald: 3px; margin-left: 5px; margin-top: 10px; border-radius: 13px;">ОТВЕТЫ</button>`);
        }
    }

    function buttonsMarkup(buttons) {
        return `<div class="select_answer">${buttons
            .map(
                (btn, i) =>
                    `<button id="answers-${i}" class="button--primary button rippleButton" style="margin:4px; ${btn.dpstyle || ''}"><span class="button-text">${btn.title}</span></button>`,
            )
            .join('')}</div>`;
    }

    function pasteContent(id, data = {}, send = false) {
        const template = Handlebars.compile(buttons[id].content);
        if ($('.fr-element.fr-view p').text() === '') $('.fr-element.fr-view p').empty();

        $('span.fr-placeholder').empty();
        $('div.fr-element.fr-view p').append(template(data));
        $('a.overlay-titleCloser').trigger('click');

        if (send == true && buttons[id].prefix !== undefined) {
            editThreadData(buttons[id].prefix, buttons[id].status);
            $('.button--icon.button--icon--reply.rippleButton').trigger('click');
        } else if (send == true) {
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
                4 < hours && hours <= 11 ? 'Доброе утро' :
                11 < hours && hours <= 15 ? 'Добрый день' :
                15 < hours && hours <= 21 ? 'Добрый вечер' : 'Доброй ночи',
        };
    }

    function editThreadData(prefix, pin = false, may_lens = true) {
        const threadTitle = $('.p-title-value')[0].lastChild.textContent;

        if (pin == false) {
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
        if (pin == true) {
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
        if (may_lens === true) {
            if (prefix == UNACCEPT_PREFIX || prefix == WATCHED_PREFIX || prefix == CLOSE_PREFIX || prefix == DECIDED_PREFIX) {
                moveThread(prefix, 230);
            }
            if (prefix == WAIT_PREFIX) {
                moveThread(prefix, 917);
            }
            if (prefix == COMMAND_PREFIX) {
                moveThread(prefix, 490);
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

    initializeScript();
})();
