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
    // checkboxDeposit = dataCol.querySelector('#deposit-check'),
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
    incomeItems = document.querySelectorAll('.income-items'),
    depositCheck = document.getElementById('deposit-check'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

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
        this.checkConformity = true;
    }

    start() {
        this.budget = +salaryAmount.value;
        this.getExpInc(); 
        this.getExpensesMonth();
        this.getAddExpInc();
        this.getInfoDeposit();
        this.getBudget();
        this.getBudgetDay();
        this.showResult();
        this.blockingInput();
        this.setCookie();
    }

    reset() {
        let input = document.getElementsByTagName('input');
        [...input].forEach(item => {
            item.value = item.defaultValue;
        });
    
        start.style.display = 'block';
        cancel.style.display = 'none';
        start.disabled = true;
        depositCheck.checked = false;
        depositBank.value = '';
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

        //reset percent 
        depositBank.value = '';
        depositBank.style.display = 'none';
        depositAmount.value = '';
        depositAmount.style.display = 'none';
        depositPercent.value = '';
        depositPercent.style.display = 'none';

        this.resetCookie();
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
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
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

    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = ' none';
            depositPercent.value = '';
            
            if (salaryAmount.value !== '') {
                start.disabled = false;
            } else {
                start.disabled = true;
            }
        }
    }

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'inline-block';
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }

    setCookie() {
        localStorage.setItem('budget_month', budgetMonthValue.value);
        localStorage.setItem('budget_day', budgetDayValue.value);
        localStorage.setItem('expenses_month', expensesMonthValue.value);
        localStorage.setItem('additional_income', additionalIncomeValue.value);
        localStorage.setItem('additional_expenses', additionalExpensesValue.value);
        localStorage.setItem('income_period', incomePerionValue.value);
        localStorage.setItem('target_month', targetMonthValue.value);

        //cookies
        document.cookie = `budget_month=${budgetMonthValue.value}`;
        document.cookie = `budget_day=${budgetDayValue.value}`;
        document.cookie = `expenses_month=${expensesMonthValue.value}`;
        document.cookie = `additional_income=${additionalIncomeValue.value}`;
        document.cookie = `additional_expenses=${additionalExpensesValue.value}`;
        document.cookie = `income_period=${incomePerionValue.value}`;
        document.cookie = `target_month=${targetMonthValue.value}`;
        document.cookie = `isLoad=true`;
    }

    getCookie(name) {
        const cookies = document.cookie.split(';');
        let cookieObj = {};
    
        for (let cookie of cookies) {
            const values = cookie.trim().split('=');
            if (values[0] === name) {
                cookieObj = {name: values[0], text: values[1] ? values[1] : ''};

                if (values[0] !== 'isLoad' && localStorage.getItem(name) !== values[1]) {
                    this.checkConformity = false;
                    document.cookie='isLoad=false';
                    break;
                }
            }
        }

        if (cookieObj !== {}) {
            document.cookie='isLoad=false';
            this.checkConformity = false;
        }
        
        return cookieObj;
    }

    resetCookie() {
        localStorage.clear();

        document.cookie.split(";")
            .forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
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

        depositCheck.addEventListener('change', this.depositHandler.bind(this));

        
        depositAmount.addEventListener('input', (e) => {
            _this.validInput(e, true);
        });

        depositPercent.addEventListener('input', (e) => {
            _this.validInput(e, true);
            if (+e.target.value > 0 && +e.target.value < 100) {
                if (salaryAmount.value !== '') {
                    start.disabled = false;
                }
            } else {
                alert('Введите корректное значение в поле проценты');
                e.target.value = '';
                start.disabled = true;
            }
        });

        window.addEventListener('load', () => {
            const isLoad = this.getCookie('isLoad');

            if (isLoad && isLoad.text) {
                document.querySelectorAll('input').forEach(item => {
                    item.disabled = true;
                });

                budgetMonthValue.value = this.getCookie('income_period').text;
                budgetDayValue.value = this.getCookie('budget_day').text;
                expensesMonthValue.value = this.getCookie('expenses_month').text;
                additionalExpensesValue.value = this.getCookie('additional_expenses').text;
                additionalIncomeValue.value = this.getCookie('additional_income').text;
                targetMonthValue.value = this.getCookie('target_month').text;
                this.blockingInput();
            } 

            if (!isLoad.text) {
                this.resetCookie();
                this.reset();
            }
        });
    }
}




const appData = new AppData();

appData.eventsListeners();

