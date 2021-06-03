'use strict';

// variables

const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const start = () => {
        let money;

        do {
            money = +prompt("Ваш месячный доход?", 2000);
        } while (!isNumber(money)); // (isNaN(money) || money.trim() === '' || money === null)

        return money;
};

const getAddExpenses = () => {
          return prompt("Перечислите возможные расходы за рассчитываемый период через запятую.");
};

const hasDeposit = () => {
          return confirm("Есть ли у вас депозит в банке?");
};

const getStatusIncome = (budgetDay) => {
          if (budgetDay >= 1200) {
              return '“У вас высокий уровень дохода”';
          }

          if (budgetDay >= 600) {
            return '“У вас средний уровень дохода”';
          }
          
          if (budgetDay >= 0) {
            return '“К сожалению у вас уровень дохода ниже среднего”';
          }

          return '“Что то пошло не так”';
};

const showTypeOf = (data) => {
          console.log(`${data} typeof: ${typeof(data)}`);
};

const getExpensesMonth = () => {
        let sum = 0,
            expenses = [];

        for (let i = 0; i < 2; i++) {
            let expensMoney;
                expenses[i] = prompt('Введите обязательную статью расходов?');

            do {
                expensMoney = +prompt('Во сколько это обойдется?');
            } while (!isNumber(expensMoney));

            sum += expensMoney;
        }

        return sum;
};

const getAccumulatedMonth = (money, expensesMonth) => {
          return money - expensesMonth;
};

const getTargetMonth = (mission, budgetMonth) => {
    let month = Math.ceil(mission/budgetMonth);
    if (month < 0) {
        return 'Цель не будет достигнута';
    }
    return `Cрок достижения цели в месяцах: ${month}`;
};

let money = start(),
    income = 'freelance',
    period = 6,
    addExpenses = getAddExpenses(),
    deposit = hasDeposit(),
    mission = 500000,
    arrayStrAddExpenses = addExpenses.toLowerCase().split(', '),
    //обязательная статья расходов
    expensesMonth = getExpensesMonth(),
    //месячный доход
    accumulatedMonth = getAccumulatedMonth(money, expensesMonth);

//typeof
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(`Cумму всех обязательных расходов за месяц getExpensesMonth(): ${expensesMonth}`);
console.log('Строка addExpenses в нижнем регистре и разбита на массив = ' + arrayStrAddExpenses);
console.log('getTargetMonth() = ' + getTargetMonth(mission, accumulatedMonth));
//work with date
let date = new Date(),
    datesCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
    // budgetDay = parseFloat((accumulatedMonth / datesCurrentMonth).toFixed(2));
    budgetDay = Math.floor(accumulatedMonth / datesCurrentMonth);
console.log(`Дневной бюджет: budgetDay = ${budgetDay}`);
console.log('Уровень дохода getStatusIncome() = ' + getStatusIncome(budgetDay));

