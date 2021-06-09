'use strict';

const weekDayArray = ['Понедельние', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
      monthArray = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 
        'Сентября', 'Октября', 'Ноября', 'Декабря'];

const addZero = (number) => {
    return number < 10 ? '0' + number : number;
};

const declinationTextHour = (hour) => {
    let text,
        lastNumber = hour.toString().slice(-1);
    
    switch(lastNumber) {
        case '1': {
            text = 'час';
        } break;
        case '2':
        case '3':
        case '4': {
            text = 'часa';
        } break;
        default: {
            text = 'часов';
        } break;
    }

    return text;
};

const declinationTextTime = (time) => {
    let text,
        lastNumber = time.toString().slice(-1);
    
    switch(lastNumber) {
        case '1': {
            text = 'а';
        } break;
        case '2':
        case '3':
        case '4': {
            text = 'ы';
        } break;
        default: {
            text = '';
        } break;
    }

    return text;
};

let timer = setInterval(function(){
        let dataNow = new Date( Date.now() ),
            timeContainer = document.querySelector("#time1");

        timeContainer.setAttribute("style", "color:red; font-weight: bold");
        timeContainer.innerHTML = `
        a) 'Сегодня ${weekDayArray[dataNow.getDay() - 1]}, ${dataNow.getDate()} 
            ${monthArray[dataNow.getMonth()]} ${dataNow.getFullYear()} года, ${dataNow.getHours()} 
            ${declinationTextHour(dataNow.getHours())} ${dataNow.getMinutes()} минут${
                declinationTextTime(dataNow.getMinutes())} ${dataNow.getSeconds()} секунд${
                declinationTextTime(dataNow.getSeconds())}' <br> 
        б) '${addZero(dataNow.getDay())}.${addZero(dataNow.getMonth())}.${dataNow.getFullYear()} - 
        ${addZero(dataNow.getHours())}:${addZero(dataNow.getMinutes())}:${addZero(dataNow.getSeconds())}'`;

    }, 1000);




