'use strict';

// variables
const PERIOD = 6,
      getMoneyPerMonth = () => {
        let money;

        do {
            money = +prompt("Ваш месячный доход?");
        } while (!money);

        return money;
      },
      getAddExpenses = () => {
          return prompt("Перечислите возможные расходы за рассчитываемый период через запятую.");
      },
      hasDeposit = () => {
          return confirm("Есть ли у вас депозит в банке?");
      },
      getCompulsoryExpenses = () => {
          return prompt("Введите обязательную статью расходов?");
      },
      getCompulsoryExpensesMoney = (expenses) => {
          if (expenses) {
            let money;

            do {
                money = +prompt(`Во сколько ${expenses} обойдется?`);
            } while (!money);
    
            return money;
          }
          return 0;
      },
      getAmountMonthToMission = (mission, budgetMonth) => {
          return Math.ceil(mission/budgetMonth);
      },
      getIncomeLevel = (budgetDay) => {
          if (budgetDay >= 1200) {
              return '“У вас высокий уровень дохода”';
          }

          if (budgetDay < 1200 && budgetDay > 600) {
              return '“У вас средний уровень дохода”';
          }

          if (budgetDay <= 600 && budgetDay >= 0) {
            return '“К сожалению у вас уровень дохода ниже среднего”';
          }

          return '“Что то пошло не так”';
      };

let money = getMoneyPerMonth(),
    income = 'freelance',
    addExpenses = getAddExpenses(),
    deposit = hasDeposit(),
    mission = 500000,
    arrayStrAddExpenses = addExpenses.toLowerCase().split(', '),
    expenses1 = getCompulsoryExpenses(), 
    expenses2 = getCompulsoryExpenses(), 
    amount1 = getCompulsoryExpensesMoney(expenses1), 
    amount2 = getCompulsoryExpensesMoney(expenses2),
    budgetMonth = money - amount1 - amount2,
    amountMonthToMission = getAmountMonthToMission(mission, budgetMonth);

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
    // budgetDay = parseFloat((budgetMonth / datesCurrentMonth).toFixed(2));
    budgetDay = Math.floor(budgetMonth / datesCurrentMonth);

console.log(`Дневной бюджет: budgetDay = ${budgetDay}`);
console.log(`Бюджет на месяц: budgetMonth = ${budgetMonth}`);
console.log( getIncomeLevel(budgetDay) );