'use strict';

const $e = document.querySelector.bind(document),
      $c = document.querySelectorAll.bind(document);

const sortBooks = (books) => {
    let array = books;
    
    array.sort( (a, b) => {
        let number1 = a.querySelector('h2 > a').textContent.split('.')[0].replace(/[^0-9]/g,''),
            number2 = b.querySelector('h2 > a').textContent.split('.')[0].replace(/[^0-9]/g,'');
        return number1 - number2;
    });

    return array;
};

let bookCollection = $c('.book'),
    booksContainer = $e('.books'),
    arrayBooks = [],
    fragment = new DocumentFragment(),
    adv = $e('.adv');

arrayBooks = sortBooks([...bookCollection]);
arrayBooks.forEach(element => {
    let text = element.querySelector('h2 > a').textContent;

    if (text === 'Книга 3. this и Пропопипы Объектов') {
        element.querySelector('h2 > a').textContent = 'Книга 3. this и Прототипы Объектов';
    }

    fragment.append(element);
});
booksContainer.append(fragment);

document.body.style.backgroundImage = 'url("./image/you-dont-know-js.jpg")';
adv.remove();

let newCollection = $c('.book'),
    liCollection6 = newCollection[5].querySelectorAll('li'),
    liCollection5 = newCollection[4].querySelectorAll('li'),
    liCollection2 = newCollection[1].querySelectorAll('li');

liCollection6[liCollection6.length - 1].insertAdjacentHTML('beforebegin', '<li>Глава 8: За пределами ES6</li>');

liCollection5[5].before(liCollection5[2]);
liCollection5[3].before(liCollection5[9]);
liCollection5[7].after(liCollection5[5]);

liCollection2[5].before(liCollection2[8]);
liCollection2[5].before(liCollection2[4]);
liCollection2[3].after(liCollection2[6]);
liCollection2[9].after(liCollection2[2]);