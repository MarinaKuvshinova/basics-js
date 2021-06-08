'use strict';
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

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 6,
    budger: start(),
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: () => {
        let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую.");
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm("Есть ли у вас депозит в банке?");

        for (let i = 0; i < 2; i++) {
            let expensMoney,
                expense = prompt('Введите обязательную статью расходов?');

            do {
                expensMoney = +prompt('Во сколько это обойдется?');
            } while (!isNumber(expensMoney));

            appData.expenses[expense] = expensMoney;

        }
    },
    getExpensesMonth: () => {
        let sum = 0;

        for (let item in appData.expenses) {
            sum += appData.expenses[item];
        }
        appData.expensesMonth = sum;
    },
    getBudget: () => {
        appData.budgetMonth = appData.budger - appData.expensesMonth;
    },
    getTargetMonth: () => {
        appData.getBudget();
        let month = Math.ceil(appData.mission/appData.budgetMonth);
        if (month < 0) {
            return 'Цель не будет достигнута';
        }
        return `За какой период будет достигнута цель (в месяцах) ${month}`;
    },
    getStatusIncome: (accumulatedMonth) => {
        let date = new Date(),
            datesCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
            // budgetDay = parseFloat((accumulatedMonth / datesCurrentMonth).toFixed(2));
            budgetDay = Math.floor(accumulatedMonth / datesCurrentMonth);
        
        appData.budgetDay = budgetDay;

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
    }

};

appData.asking();

appData.getExpensesMonth();
console.log(`Расходы за месяц expensesMonth: ${appData.expensesMonth}`);
console.log('getTargetMonth() = ' + appData.getTargetMonth());
console.log('Уровень дохода getStatusIncome() = ' + appData.getStatusIncome(appData.budgetMonth));

console.group("Наша программа включает в себя данные:");
for(let item in appData) {
    console.log(`${item}: ${appData[item]}`);
}
console.groupEnd();