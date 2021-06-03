'use strict';

const array = ['3422', '12', '423', '23', '2112', '123', '45'];

const getNumberArray = (arr) => {
    const newArray = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] === '2' || arr[i][0] === '4') {
            newArray.push(arr[i]);
        }
    }

    return newArray;
};

console.log('Числа что начинаются с цифры 2 или 4: ' + getNumberArray(array));

const getSimpleNumbers = () => {
    const arrayNumber = [];
    
    for (let i = 2; i <= 100; i++) {
        let number = 0;
        
        for (let j = 1; j <= i; j++) {
           
           if ( i % j === 0) {
               number++;
           }

           if (number > 2) {
               break;
           }
        }

        if (number <= 2) {
            arrayNumber.push(i); 
        }
    }

    return arrayNumber;
};


const simpleNumbers = getSimpleNumbers();

for (let i = 0; i < simpleNumbers.length; i++) {
    console.log(`${simpleNumbers[i]} его делители 1 и ${simpleNumbers[i]}`);
}