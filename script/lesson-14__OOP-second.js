'use strict';

const DomElement = function (selector, height, width, bg, fontSize) {
    this.selector = selector;  
    this.height = height; 
    this.width = width; 
    this.bg = bg; 
    this.fontSize = fontSize;
};

DomElement.prototype.createElement = function () {

    let firstChar = this.selector.slice(0, 1);
    let elem;

    if (firstChar === '.') {
        elem = document.createElement('div');
        elem.className = this.selector.substring(1);
    }

    if (firstChar === '#') {
        elem = document.createElement('p');
        elem.id = this.selector.substring(1);
    }

    elem.style.cssText = `
        height: ${this.height}px; 
        width: ${this.width}px; 
        background-color: ${this.bg}; 
        font-size: ${this.fontSize}px;`;
    
    elem.textContent = 'Hello workd!';
   

    document.querySelector('body').append(elem);

};



// let elem1 = new DomElement('#parag', 20, 30, 'red', 10);
// elem1.createElement();

// let elem2 = new DomElement('.block', 200, 100, 'green', 20);
// elem2.createElement();


document.addEventListener("DOMContentLoaded", (event) => {

    let elem = new DomElement('.absolute', 100, 100, 'green', 20);
    elem.createElement();

});

document.addEventListener('keydown', (e) => {
    let block = document.querySelector('.absolute'),
        rect = block.getBoundingClientRect();

    if (e.code === 'ArrowUp') {

        if (rect.top - 10 <= 0) {
            block.style.top = 0;
        } else {
            block.style.top = rect.top - 10 + 'px';
        }
    }

    if (e.code === 'ArrowDown') {
        if (rect.top + 10 + rect.height >= window.innerHeight) {
            block.style.top = window.innerHeight;
        } else {
            block.style.top = rect.top + 10 + 'px';
        }
    }
    if (e.code === 'ArrowLeft') {
        if (rect.left - 10 <= 0) {
            block.style.left = 0;
        } else {
            block.style.left = rect.left - 10 + 'px';
        }
    }

    if (e.code === 'ArrowRight') {
        if (rect.left + 10 + rect.width >= window.innerWidth) {
            block.style.left = window.innerWidth;
        } else {
            block.style.left = rect.left + 10 + 'px';
        }
    }
});