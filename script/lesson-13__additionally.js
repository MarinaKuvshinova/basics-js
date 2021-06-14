'use strict';

const text = document.querySelector('.color'),
      button = document.querySelector('.button'),
      body = document.body;

button.addEventListener('click', () => {
    let colorNumber = Math.floor(Math.random() * (parseInt('ffffff', 16) + 1)),
        color = '#' + colorNumber.toString(16).padEnd(6, '0');

    body.style.backgroundColor = color;
    button.style.color = color;
    text.textContent = color;
});
