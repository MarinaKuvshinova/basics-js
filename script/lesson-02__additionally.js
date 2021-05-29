'use strict';

let 
    number = 266219,
    multiplicationNumber = () => {
        return Array.from(String(number), Number).reduce((a, b) => a * b);

        //or 
        // return number.toString().split('').reduce((a, b) => a * b);

        //or
        // let array = Array.from(String(number), Number),
        //     result = 1;

        // for (let i = 0; i < array.length; i++) {
        //     result *= array[i];
        // }

        // return result;
    };
    
console.log( 'Произведение number = ' + multiplicationNumber() );


//02
let multiplication = multiplicationNumber(),
    count = 3,
    pow = (number, count) => {
        if ( count === 1 ) {
          return number;
        } else {
          return number * pow(number, count - 1);
        }
    };


console.log(`Число ${multiplication} в степени ${count} = ${ pow(multiplication, count) }`);


//03
let numberPow = pow(multiplication, count),
    countShowNumbers = 2,
    firstTwoNumberPow = numberPow.toString().substr(0, countShowNumbers);

console.log(`Первые ${countShowNumbers} символа числа ${numberPow}: ${firstTwoNumberPow}`);


//дополнительное задание 1
let string = 'some test string',
    newString = string[0].toUpperCase() + string.slice(1, string.length - 1) + string[string.length - 1].toUpperCase(),
    textString = 'string',
    a = 20,
    b = 16,
    stringNumber = a.toString().concat(b); //or a.toString() + b

console.log("\n1) Получить первую и последнюю буквы строки: " + 
    string.slice(0, 1) + ' ' + string.slice(-1));
console.log("2) Сделать первую и последнюю буквы в верхнем регистре: " + newString);
console.log("3) Найти положение слова ‘string’ в строке т.е. его номер: " + string.indexOf(textString));
console.log("4) Найти положение второго пробела (“вручную” ничего не считать): " + 
    string.indexOf(' ', string.indexOf(' ') + 1));
console.log("5) Получить строку с 5-го символа длиной 4 буквы: " + string.substr(5, 4));
console.log("6) Получить строку с 5-го по 9-й символы: " + string.substring(5, 9));
console.log("7) Получить новую строку из исходной путем удаления последних 6-и символов: " + string.slice(0, -6));
console.log("8) Из двух переменных a=20 и b=16 получить переменную string, в которой будет содержаться текст “2016”: " +
    stringNumber + typeof(stringNumber));

//дополнительное задание 2
let num = 1;
num += 12;
num -= 14;
num *= 5;
num /= 7;
num++;
num--;
alert(num);