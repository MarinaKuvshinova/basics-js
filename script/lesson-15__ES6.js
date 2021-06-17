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
    additionalExpensesItem = dataCol.querySelectorAll('.additional_expenses-item'),
    targetAmount = dataCol.querySelector('.target-amount'),
    periodSelect = dataCol.querySelector('.period-select'),
    incomeItems = document.querySelectorAll('.income-items');

class AppData {
    constructor(income = {}, incomeMonth = 0, addIncome = [], expenses = {}, addExpenses = [], 
            deposit = false, percentDeposit = 0, moneyDeposit = 0, budget = 0, budgetDay = 0, 
            budgetMonth = 0, expensesMonth = 0) {
        this.income = income;
        this.incomeMonth = incomeMonth;
        this.addIncome = addIncome;
        this.expenses = expenses;
        this.addExpenses = addExpenses;
        this.deposit = deposit;
        this.percentDeposit = percentDeposit;
        this.moneyDeposit = moneyDeposit;
        this.budget = budget;
        this.budgetDay = budgetDay;
        this.budgetMonth = budgetMonth;
        this.expensesMonth = expensesMonth;
    }

    start() {
        this.budget = +salaryAmount.value;
        this.getExpInc(); 
        this.getExpensesMonth();
        this.getAddExpInc();
        this.getBudget();
        this.getBudgetDay();
        this.showResult();
        this.blockingInput();
    }

    reset() {
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
    }

    resetObj() {
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
    }

    blockingInput() {
        let input = dataCol.querySelectorAll('input[type="text"]');
        [...input].forEach(item => {
            item.setAttribute('disabled', 'true');
        });
        start.style.display = 'none';
        cancel.style.display = 'block';
        cancel.addEventListener('click', this.reset.bind(this));
    }

    showResult() {
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
    }

    addExpInc(e) {
        const title = e.target.classList[1].split('_')[0];
        let block = document.querySelectorAll(`.${title}-items`);
        const cloneItem = block[0].cloneNode(true),
              plus = document.querySelector(`.${title}_add`);
    
        [...cloneItem.querySelectorAll('input')].forEach( elem => {
            elem.value = '';
        });
    
        block[0].parentNode.insertBefore(cloneItem, plus);
        block = document.querySelectorAll(`.${title}-items`);
    
        if (block.length === 3) {
            plus.style.display = 'none';
        }
    }
    
    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value,
                  itemAmount = item.querySelector(`.${startStr}-amount`).value;

            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = +itemAmount;
            }
            
        };

        document.querySelectorAll('.income-items').forEach(count);
        document.querySelectorAll('.expenses-items').forEach(count);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }

    }

    getAddExpInc() {
        const add = (item) => {
            const str = item.className.split('_')[1].split('-')[0],
                  value = item.value.trim().split(',');

            value.forEach( (text) => {
                if (text !== '') {
                    const newStr = str[0].toUpperCase() + str.slice(1);
                    this['add' + newStr].push(text);
                }
            });
        };

        additionalIncomeItem.forEach(add);
        additionalExpensesItem.forEach(add);
    }

    getExpensesMonth() {
        let sum = 0;
    
        for (let item in this.expenses) {
            sum += this.expenses[item];
        }

    
        this.expensesMonth = sum;
    }

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    }

    getBudgetDay() {
        let date = new Date(),
            datesCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        this.budgetDay = Math.floor(this.budgetMonth / datesCurrentMonth);
    }

    getTargetMonth() {
        return Math.ceil(targetAmount.value/this.budgetMonth);
    }

    getStatusIncome() {
    
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
    }

    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = checkPrintValue('Какой годовой процент?', 10, true);
            this.moneyDeposit = checkPrintValue('Какая сумма заложена?', 10000, true);
        }
    }

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }

    setPerionAmount(e) {
        let perionAmount = document.querySelector('.period-amount');
    
        perionAmount.textContent = e.target.value;
    }

    validInput(e, isNumber = false) {
        if (isNumber) {
            e.target.value = e.target.value.replace(/[^\d]/,'');
        } else {
            e.target.value = e.target.value.replace(/[^А-Яа-я ,.?!]/,'');
        }
    }

    eventsListeners() {
        const _this = this;
        start.addEventListener('click', _this.start.bind(_this));
    
        expensesPlus.addEventListener('click', (e) => _this.addExpInc(e));
        
        incomePlus.addEventListener('click', (e) => _this.addExpInc(e));
        
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
    
        additionalExpensesItem.forEach( (item) => {
            item.addEventListener('input', (e) => {
                _this.validInput(e);
            });
        });
    }
}

const appData = new AppData();

appData.eventsListeners();

