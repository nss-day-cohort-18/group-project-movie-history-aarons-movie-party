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

	// start with API call array of results
	var comboArray = localAPI.concat(localFB);

	// sort by title name
	comboArray.sort(function(a, b) {
  var nameA = a.title.toUpperCase();
  var nameB = b.title.toUpperCase();
	  if (nameA < nameB) {
	    return -1;
	  }
	  if (nameA > nameB) {
	    return 1;
	  }
	return 0;
	});

	// if we find a duplicate and the duplicate has a uid do nothing
	// if we find a duplicate without a uid, remove it
	for (var n = 0; n < comboArray.length; n++) {

		if (comboArray[n].movieID === comboArray[n + 1].movieID && comboArray[n + 1].uid) {
		  console.log("2nd check has uid");
		} else if (comboArray[n].movieID === comboArray[n + 1].movieID && comboArray[n + 1].uid === undefined) {
			comboArray.splice(n + 1, 1);
		}
		if (n !== 0 && comboArray[n].movieID === comboArray[n - 1].movieID && comboArray[n - 1].uid) {
			console.log("2nd check has uid");
		} else if (n !== 0 && comboArray[n].movieID === comboArray[n - 1].movieID && comboArray[n - 1].uid === undefined) {
			comboArray.splice(n - 1, 1);
		}
	}
}

concatFBAPI();

module.exports = {setLocalAPI, setLocalFB, concatFBAPI};