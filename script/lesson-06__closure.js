'use strict';

const getNumber = () => {
    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    let number = randomNumber(1, 100),
        won = false,
        guessNumber,
        countAttempts = 10;

    console.log('наше число ' + number);

    const checkNumber = (someNumber) => {
        let enterNumber = someNumber;

        if (won) {
            return;
        }

        if (countAttempts <= 0) {
           let value = confirm('Попытки закончились, хотите сыграть еще?');
           
           if (value) {
               getNumber();
           }
           
           return;
        }

        if (typeof(enterNumber) === 'undefined') {
            enterNumber = +prompt('Угадай число от 1 до 100');
            countAttempts--;
            return checkNumber(enterNumber);
        }

        if (isNaN(parseInt(enterNumber))) {
            enterNumber = +prompt('Введи число!');
            return checkNumber(enterNumber);
        }

        if (!enterNumber) {
            won = true;
            alert('Игра окончена');
            return checkNumber(enterNumber);
        }

        if (enterNumber === number) {
            won = true;
            let value = confirm('Поздравляю, Вы угадали!!! Хотели бы сыграть еще?');

            if (value) {
                getNumber();
            }

            return checkNumber(enterNumber);
        }

        if (enterNumber < number) {
            alert('Загаданное число больше, осталось попыток ' + countAttempts);
            enterNumber = +prompt('Введите число');
        }

        if (enterNumber > number) {
            alert('Загаданное число меньше, осталось попыток ' + countAttempts);
            enterNumber = +prompt('Введите число');
        }

        countAttempts--;

        return checkNumber(enterNumber);
    };

    console.dir(checkNumber);

    return checkNumber(guessNumber);
};

getNumber();
