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

const checkPrintValue = (message, defaultValues, numberOnly = false) => {
    let check = false,
        value;

    do {
        value = prompt(message, defaultValues).trim();
        if (Boolean(numberOnly) === isNumber(value) &&  value !== '' && value) {
            check = true;
        } else {
            alert('Введите корректные данные');
        }
    } while (!check);

    return numberOnly ? +value : value;
};

const getPossibleCosts = () => {
    let value = prompt("Перечислите возможные расходы за рассчитываемый период через запятую."),
        valueArray = [];

    if (!value) {
        return null;
    }

    valueArray = value.toLowerCase().split(',');
    valueArray = valueArray.map( i => i.trim()[0].toUpperCase() + i.substr(1) );

    console.log(valueArray.join(', '));

    return valueArray;
};

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 6,
    budger: start(),
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {

        if (confirm('Есть ли у вас дополнительный заработок?')) {
            let itemIncome = checkPrintValue('Какой у вас есть дополнительный заработок?', 'Такси', false),
                cashIncome = checkPrintValue('Сколько в месяц вы на этом зарабатываете?', 5000, true);
            
            this.income[itemIncome] = cashIncome;
        }

        this.addExpenses = getPossibleCosts();
        this.deposit = confirm("Есть ли у вас депозит в банке?");

        for (let i = 0; i < 2; i++) {
            let expensMoney,
                expense = checkPrintValue('Введите обязательную статью расходов?', 'Садик', false);

            do {
                expensMoney = checkPrintValue('Во сколько это обойдется?', 200, true);
            } while (!isNumber(expensMoney));

            this.expenses[expense] = expensMoney;

        }
    },
    getExpensesMonth: function () {
        let sum = 0;

        for (let item in this.expenses) {
            sum += this.expenses[item];
        }

        this.expensesMonth = sum;
    },
    getBudget: function () {
        this.budgetMonth = this.budger - this.expensesMonth;
    },
    getTargetMonth: function () {
        this.getBudget();
        let month = Math.ceil(this.mission/this.budgetMonth);
        if (month < 0) {
            return 'Цель не будет достигнута';
        }
        return `За какой период будет достигнута цель (в месяцах) ${month}`;
    },
    getStatusIncome: function () {
        let date = new Date(),
            datesCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
            budgetDay = Math.floor(this.budgetMonth / datesCurrentMonth);
        
        this.budgetDay = budgetDay;

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
    },
    getInfoDeposit: function () {
        if (this.deposit) {
            this.percentDeposit = checkPrintValue('Какой годовой процент?', 10, true);
            this.moneyDeposit = checkPrintValue('Какая сумма заложена?', 10000, true);
        }
    },
    calcSaveMoney: function () {
        return this.budgetMonth * this.period;
    }

};

appData.asking();

appData.getExpensesMonth();
console.log(`Расходы за месяц expensesMonth: ${appData.expensesMonth}`);
console.log('getTargetMonth() = ' + appData.getTargetMonth());
console.log('Уровень дохода getStatusIncome() = ' + appData.getStatusIncome());

console.group("Наша программа включает в себя данные:");
for(let item in appData) {
    console.log(`${item}: ${appData[item]}`);
}
console.groupEnd();
