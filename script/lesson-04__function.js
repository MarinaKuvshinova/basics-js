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
      getStatusIncome = (budgetDay) => {
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
      },
      showTypeOf = (data) => {
          console.log(`${data} typeof: ${typeof(data)}`);
      },
      getExpensesMonth = (...arg) => {
        let arrValue = [...arg];

        return arrValue.reduce((a, b) => +a + parseFloat(b));
      },
      getAccumulatedMonth = (money, ...amount) => {
          return money - [...amount].reduce((a, b) => +a - parseFloat(b));
      },
      getTargetMonth = (mission, budgetMonth) => {
        return Math.ceil(mission/budgetMonth);
      };

let money = getMoneyPerMonth(),
    income = 'freelance',
    addExpenses = getAddExpenses(),
    deposit = hasDeposit(),
    mission = 500000,
    arrayStrAddExpenses = addExpenses.toLowerCase().split(', '),
    //обязательная статья расходов
    expenses1 = getCompulsoryExpenses(), 
    expenses2 = getCompulsoryExpenses(), 
    amount1 = getCompulsoryExpensesMoney(expenses1), 
    amount2 = getCompulsoryExpensesMoney(expenses2),
    expensesMonth = getExpensesMonth(amount1, amount2),
    //месячный доход
    accumulatedMonth = getAccumulatedMonth(money, amount1, amount2),
    amountMonthToMission = getTargetMonth(mission, accumulatedMonth);

//typeof
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(`Cумму всех обязательных расходов за месяц getExpensesMonth(): ${expensesMonth}`);
console.log('Строка addExpenses в нижнем регистре и разбита на массив = ' + arrayStrAddExpenses);
console.log('Cрок достижения цели в месяцах getTargetMonth = ' + amountMonthToMission);
//work with date
let date = new Date(),
    datesCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
    // budgetDay = parseFloat((accumulatedMonth / datesCurrentMonth).toFixed(2));
    budgetDay = Math.floor(accumulatedMonth / datesCurrentMonth);
console.log(`Дневной бюджет: budgetDay = ${budgetDay}`);
console.log( getStatusIncome(budgetDay) );

