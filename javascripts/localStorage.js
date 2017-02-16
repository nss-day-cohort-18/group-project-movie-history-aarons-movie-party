"use strict";

let localFB = [];
let localAPI = [];

function getLocalFB() {
	return localFB;
}

function getLocalAPI() {
	return localAPI;
}

function setLocalAPI(objARR) {
	localAPI = objARR.results;
}

function setLocalFB(objARR) {
    localFB = Object.values(objARR);
}

function addLocalFB(moveobj) {
    localFB.push(moveobj);
}

function removeLocalFB(moveobj) {
    for (var i = 0; i < localFB.length; i++) {
        if (moveobj.id === localFB[i].id) {
            localFB.splice(i, 1);
        }
    }
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

        if (n !== (comboArray.length - 1) && comboArray[n].id === comboArray[n + 1].id && comboArray[n + 1].uid) {
          console.log("2nd check has uid");
        } else if (n !== (comboArray.length - 1) && comboArray[n].id === comboArray[n + 1].id && comboArray[n + 1].uid === undefined) {
            comboArray.splice(n + 1, 1);
        }
        if (n !== 0 && comboArray[n].id === comboArray[n - 1].id && comboArray[n - 1].uid) {
            console.log("2nd check has uid");
        } else if (n !== 0 && comboArray[n].id === comboArray[n - 1].id && comboArray[n - 1].uid === undefined) {
            comboArray.splice(n - 1, 1);
        }
        return comboArray;
    }
}

module.exports = {setLocalAPI, addLocalFB, removeLocalFB, setLocalFB, concatFBAPI, getLocalAPI, getLocalFB};




