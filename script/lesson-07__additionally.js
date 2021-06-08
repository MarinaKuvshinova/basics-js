'use strict';

const weekDayArray = ['Понедельние', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

const weekDayPrint = (week) => {
    const div = document.createElement('div');
    div.innerHTML = week.join(', ');
    document.body.appendChild(div);

    const title = document.createElement('h2');
    title.innerHTML = 'Дни недели';
    document.body.appendChild(title);

    const currentDay = new Date(Date.now());

    for(let item in week) {
        const div = document.createElement('div');
        div.innerHTML = '- ' + week[item];
        
        if (item >= 5) {
            div.style.fontStyle = "italic";
        }

        if (+item === currentDay.getDay() - 1) {
            div.style.fontWeight = "bold";
        }

        document.body.appendChild(div);
    }
 };

weekDayPrint(weekDayArray);