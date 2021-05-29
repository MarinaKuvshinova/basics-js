'use strict';

// variables
const PERIOD = 6;

let money = 1250.8,
    income = 'freelance',
    addExpenses = 'интернет, такси, хобби',
    deposit = false,
    mission = 500000,
    arrayStrAddExpenses = addExpenses.toLowerCase().split(', ');

//typeof
console.log(`typeof:
    money = ${typeof(money)}
    income = ${typeof(income)}
    deposit = ${typeof(deposit)}`);

//work with string
console.log('длина строки addExpenses = ' + addExpenses.length);
console.log(`Период равен ${PERIOD} месяцев`);
console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`);
console.log('Строка addExpenses в нижнем регистре и разбита на массив = ');
console.log(arrayStrAddExpenses);

//work with date
let date = new Date(),
    datesCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
    budgetDay = parseFloat((money / datesCurrentMonth).toFixed(2));

console.log(`Дневной бюджет: budgetDay = ${budgetDay}`);
