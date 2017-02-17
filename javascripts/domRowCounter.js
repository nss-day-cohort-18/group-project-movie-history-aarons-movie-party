"use strict";

let counter = 0;

let getCounter = () => counter;
let setCounterPlusOne = () => counter++;
let resetCounter = () => {counter = 0;};

module.exports = {getCounter, setCounterPlusOne, resetCounter};