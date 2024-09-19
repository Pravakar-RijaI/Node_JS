// console.log(arguments);
// console.log(require('module').wrapper);


//module.exports = 
/*const Calculator = require('./test-module-1');

class calculator extends Calculator {
    constructor() {
        super();
    }
};

const calc = new Calculator();

const a = 3;
const b = 4;

console.log(`Sum of ${a} and ${b} is ${calc.divide(a, b)}`);*/

//exports
//const calc = require('./test-module-2');
const { add, multiply, divide } = require('./test-module-2');

console.log(divide(2, 3));

//caching 
const anony = require('./test-module-3');

anony();
anony();
anony();

