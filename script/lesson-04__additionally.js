'use strict';

const someFunction = (value) => {
    if (typeof(value)!=='string') {
        return 'Введена не строка';
    }
    if (value.trim().length > 30) {
        return value.substring(0, 30).trim() + '...';
    }
};

console.log( someFunction(' 123sdfsdfklsdnfklsndfsndlf ds aksdadjad akdajd akd d ') );