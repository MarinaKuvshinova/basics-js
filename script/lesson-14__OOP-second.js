'use strict';

const DomElement = function (selector, height, width, bg, fontSize) {
    this.selector = selector;  
    this.height = height; 
    this.width = width; 
    this.bg = bg; 
    this.fontSize = fontSize;
};

DomElement.prototype.createElement = function () {
    console.log(this);

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

    document.querySelector('.wrapper').append(elem);

};


let elem1 = new DomElement('#parag', 20, 30, 'red', 10);
elem1.createElement();

let elem2 = new DomElement('.block', 200, 100, 'green', 20);
elem2.createElement();