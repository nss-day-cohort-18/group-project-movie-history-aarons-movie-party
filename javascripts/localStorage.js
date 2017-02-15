"use strict";

let localFB;
let localAPI;

function setLocalFB(objARR) {
	localFB = objARR;
}

function setLocalAPI(objARR) {
	localAPI = objARR;
}

function concatFBAPI() {
	console.log("Sort localFB and localAPI here");
}

module.exports = {setLocalAPI, setLocalFB, concatFBAPI};