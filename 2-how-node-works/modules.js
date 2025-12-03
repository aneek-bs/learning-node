// console.log(arguments);
// console.log(require("module").wrapper);

//module.exports
const Calculator = require("./test-modules-1");
const calculator1 = new Calculator();
console.log("Adding - " + calculator1.add(2, 56));

//exports
// const Calculator2 = require("./test-modules-2")
const { add, multiply, divide } = require("./test-modules-2");
console.log("Adding again - " + add(2, 56));

//caching
require("./test-modules-3")();
require("./test-modules-3")();
require("./test-modules-3")();
