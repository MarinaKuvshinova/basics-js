'use strict';

const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
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


let dataCol = document.querySelector('.data'),
    start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    incomePlus = dataCol.querySelector('.income').getElementsByTagName('button')[0],
    expensesPlus = dataCol.querySelector('.expenses').getElementsByTagName('button')[0],
    checkboxDeposit = dataCol.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePerionValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = dataCol.querySelector('.salary-amount'),
    // inputIncomeTitle = dataCol.querySelector('.income-title'),
    inputExpensesTitle = dataCol.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = dataCol.querySelector('.additional_expenses-item'),
    targetAmount = dataCol.querySelector('.target-amount'),
    periodSelect = dataCol.querySelector('.period-select'),
    incomeItems = document.querySelectorAll('.income-items');

const AppData = function () {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
};

AppData.prototype.start = function () {
    this.budget = +salaryAmount.value;
    this.getExpenses(); 
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.getBudgetDay();
    this.showResult();
    this.blockingInput();
};

AppData.prototype.reset = function () {
    let input = document.getElementsByTagName('input');
    [...input].forEach(item => {
        item.value = item.defaultValue;
    });

    start.style.display = 'block';
    cancel.style.display = 'none';
    start.disabled = true;
    checkboxDeposit.checked = false;
    document.querySelector('.period-amount').textContent = '1';

    let inputText = dataCol.querySelectorAll('input[type="text"]');

    [...inputText].forEach(item => {
        item.disabled = false;
    });

    this.resetObj();

    //reset income section 
    let incomes = document.querySelectorAll('.income-items');
    if (incomes.length > 1) {
        [...incomes].forEach((item, i) => {
            if (i > 0) {
                item.remove();
            }
        });
    }
    incomePlus.style.display = 'block';

    //reset expenses
    let expenses = document.querySelectorAll('.expenses-items');
    if (expenses.length > 1) {
        [...expenses].forEach((item, i) => {
            if (i > 0) {
                item.remove();
            }
        });
    }
    expensesPlus.style.display = 'block';
};
AppData.prototype.resetObj = function () {
    for (let key in this) {
        if (typeof this[key] === 'string'){
            this[key] = undefined;
        } else if (typeof this[key] === 'number') {
            this[key] = 0;
        } else if (typeof this[key] === 'boolean') {
            this[key] = false;
        } else if (this[key] instanceof Array) {
            this[key] = [];
        } else if (!(this[key] instanceof Function)) {
            this[key] = {};
        }
    }
};
AppData.prototype.blockingInput = function () {
    let input = dataCol.querySelectorAll('input[type="text"]');
    [...input].forEach(item => {
        item.setAttribute('disabled', 'true');
    });
    start.style.display = 'none';
    cancel.style.display = 'block';
    cancel.addEventListener('click', this.reset.bind(this));
};
AppData.prototype.showResult = function () {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePerionValue.value = this.calcPeriod();
    
    periodSelect.addEventListener('input', (e) => {
        this.setPerionAmount(e);
        incomePerionValue.value = _this.calcPeriod();
    });
};
AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);

    [...cloneExpensesItem.querySelectorAll('input')].forEach( elem => {
        elem.value = '';
    });

    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
    }

};
AppData.prototype.addIncomeBlock = function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);

    [...cloneIncomeItem.querySelectorAll('input')].forEach( elem => {
        elem.value = '';
    });

    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
        incomePlus.style.display = 'none';
    }

};
AppData.prototype.getExpenses = function () {
    expensesItems.forEach((item) => {
        let itemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = item.querySelector('.expenses-amount').value;

        if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = +cashExpenses;
        }
    });
};
AppData.prototype.getIncome = function () {
    incomeItems.forEach((item) => {
        let itemIncome = item.querySelector('.income-title').value,
            cashIncome = item.querySelector('.income-amount').value;
        
        if (itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = +cashIncome;
        }
    });
    
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getAddExpenses = function () {
    let addExpenses = additionalExpensesItem.value.split(',');

    addExpenses.forEach((item) => {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function () {
    additionalIncomeItem.forEach((item) => {
        let itemValue = item.value.trim();

        if (itemValue !== '') {
            this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getExpensesMonth = function () {
    let sum = 0;

    for (let item in this.expenses) {
        sum += this.expenses[item];
    }

    this.expensesMonth = sum;
};
AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
};
AppData.prototype.getBudgetDay = function () {
    let date = new Date(),
        datesCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    this.budgetDay = Math.floor(this.budgetMonth / datesCurrentMonth);
};
AppData.prototype.getTargetMonth = function () {
    return Math.ceil(targetAmount.value/this.budgetMonth);
};
AppData.prototype.getStatusIncome = function () {

    if (this.budgetDay >= 1200) {
        return '“У вас высокий уровень дохода”';
    }

    if (this.budgetDay >= 600) {
      return '“У вас средний уровень дохода”';
    }
    
    if (this.budgetDay >= 0) {
      return '“К сожалению у вас уровень дохода ниже среднего”';
    }

    return '“Что то пошло не так”';
};
AppData.prototype.getInfoDeposit = function () {
    if (this.deposit) {
        this.percentDeposit = checkPrintValue('Какой годовой процент?', 10, true);
        this.moneyDeposit = checkPrintValue('Какая сумма заложена?', 10000, true);
    }
};
AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.setPerionAmount = function (e) {
    let perionAmount = document.querySelector('.period-amount');

    perionAmount.textContent = e.target.value;

};
AppData.prototype.validInput = function (e, isNumber = false) {
    if (isNumber) {
        e.target.value = e.target.value.replace(/[^\d]/,'');
    } else {
        e.target.value = e.target.value.replace(/[^А-Яа-я ,.?!]/,'');
    }
};
AppData.prototype.eventsListeners = function () {
    const _this = this;
    start.addEventListener('click', _this.start.bind(_this));

    expensesPlus.addEventListener('click', _this.addExpensesBlock);
    
    incomePlus.addEventListener('click', _this.addIncomeBlock);
    
    periodSelect.addEventListener('input', _this.setPerionAmount);
    
    salaryAmount.addEventListener('input', (e) => {
        _this.validInput(e, true);
        start.disabled = e.target.value === '' ? true :  false;
    });
    salaryAmount.addEventListener('input', (e) => {
        _this.validInput(e, true);
    });
   
    let income = document.querySelector('.income'),
    additionalIncome = document.querySelector('.additional_income'),
    expenses = document.querySelector('.expenses');

    income.addEventListener('input', (e) => {
    if (e.target.className === 'income-title') {
        _this.validInput(e);
    }

    if (e.target.className === 'income-amount') {
        _this.validInput(e, true);
    }
    });

    additionalIncome.addEventListener('input', (e) => {
        _this.validInput(e);
    });

    expenses.addEventListener('input', (e) => {
    if (e.target.className === 'expenses-title') {
        _this.validInput(e);
    }

    if (e.target.className === 'expenses-amount') {
        _this.validInput(e, true);
    }
    });

    targetAmount.addEventListener('input', (e) => {
        _this.validInput(e, true);
    });

    additionalExpensesItem.addEventListener('input', (e) => {
        _this.validInput(e);
    });
};

const appData = new AppData();

appData.eventsListeners();

