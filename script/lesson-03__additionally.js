'use strict';

const langsObject = {
    'ru': ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    'en': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
};

let lang = prompt('Введите язык: en или ru', 'en');

function getWeekDays(language) {
    let yourLang = language;

    if (!langsObject.hasOwnProperty(yourLang)) {
        return console.log('Такого языка пока не существует');
    }

    console.log("Варинат 1");
    console.log('Дни недели на ' + yourLang + ' ' + langsObject[yourLang]);

    console.log("Варинат 2");
    if (yourLang === 'en') {
        console.log('Days of the week in english ' + langsObject[yourLang]);
    } else {
        console.log('Дни недели на русском ' + langsObject[yourLang]);
    }

    console.log("Варинат 3");
    switch(yourLang) {
        case 'en':
            console.log('Days of the week in english ' + langsObject[yourLang]);
            break;
        case 'ru':
            console.log('Дни недели на русском ' + langsObject[yourLang]);
            break;
        default: 
            console.log('Такого языка пока не существует');
            break;
    }
}

getWeekDays(lang);

let namePerson = prompt('Введите имя');
const getPosition = (name) => {
    return name === 'Артем' ? 'директор' : (name === 'Максим' ? 'преподаватель' : 'студент');
};

console.log( getPosition(namePerson) );

