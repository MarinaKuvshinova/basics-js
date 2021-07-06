'use strict';
const buttons = document.querySelector('.buttons'),
    monthes = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
let users = [];

const setLocalStorage = () => {
    localStorage.setItem('users', JSON.stringify(users));
};

const getLocalStorage = () => {
    return JSON.parse(localStorage.getItem('users'));
};

const login = () => {
    const login = prompt('Введите логин'),
        password = prompt('Введите пароль');

    users = getLocalStorage();

    let user = users.find(elem => {
        if (elem.login === login && elem.password === password) {
            return elem;
        }
    });

    if (user) {
        const text = document.querySelector('h1 span');
        text.textContent = user.firstName;
    } else {
        alert('Пользователь не найден');
    }
};

const init = () => {
    const list = document.querySelector('.users');
    list.textContent = '';
    users = getLocalStorage();

    users.forEach((element, index) => {
        const li = document.createElement('li'),
            deleteButton = document.createElement('button'),
            text = document.createElement('span');

        text.textContent = `${index + 1}) Имя: ${element.firstName}, Фамилия: ${element.lastName}, 
             Зарегистрован: ${element.regDate}`;
        li.appendChild(text);

        deleteButton.textContent = 'delete';
        deleteButton.setAttribute('data-index', index);
        deleteButton.addEventListener('click', e => {
            e.preventDefault();
            users.splice([e.target.dataset.index], 1);
            setLocalStorage();
            init();
        });

        li.appendChild(deleteButton);
        list.appendChild(li);
    });
};


const register = () => {
    let name;

    name = prompt('Введите имя и фамилию').trim();

    if (!name.match(/\s/) || name.match(/\s/).length > 1) {
        alert("Введенны не корректные данные");
        return;
    }

    const firstName = name.split(' ')[0],
        lastName = name.split(' ')[1],
        login = prompt('Введите login'),
        password = prompt('Введите пароль'),
        time = new Date(),
        regDate = `${time.getDate()} ${monthes[time.getMonth()]} ${time.getFullYear()} 
        г., ${time.toLocaleTimeString()}`;

    users.push({
        firstName,
        lastName,
        login,
        password,
        regDate
    });

    setLocalStorage();
    init();
};

buttons.addEventListener('click', e => {
    const target = e.target;

    if (target.matches('.button_register')) {
        register();
    }

    if (target.matches('.button_login')) {
        login();
    }

});

init();
