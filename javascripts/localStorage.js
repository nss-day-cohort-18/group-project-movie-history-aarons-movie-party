"use strict";

/*
Arrays to hold both api returns as well as firebase returns
*/

let localFB = [],
        localAPI = [],
        comboConcatArray = [],
        localFBKeys = [];

/*
functions to return local arrays
*/
function getLocalFB() {
    return localFB;
}
function getLocalAPI() {
    return localAPI;
}
function getLocalComboArray() {
    return comboConcatArray;
}

/*
setting the local arrays from firebase and api
*/
function setLocalAPI(objARR) {
    localAPI = objARR.results;
}
function setLocalFB(objARR) {
    localFB = Object.values(objARR);
    localFBKeys = Object.keys(objARR);
    for (var i = 0; i < localFB.length; i++) {
        localFB[i].index = localFBKeys[i];
    }
    console.log("should include index ", localFB);
}

/*
adding movies to our local firebase array
*/
function addLocalFB(moveobj) {
    localFB.push(moveobj);
}

/*
remove from local fb array
*/
function removeLocalFB(moveobj) {
    for (var i = 0; i < localFB.length; i++) {
        if (moveobj.id === localFB[i].id) {
            localFB.splice(i, 1);
        }
    }
}

/*
combining and filtering both firebase and api local arrays
so there are no duplicates
*/
function concatFBAPI() {
    console.log("Sort localFB and localAPI here");
    console.log("This is localFB: ", localFB);
    console.log("This is localAPI: ", localAPI);


   //filter localFB by search parameter
    var filteredFBArray = [];
    var searchInput = $('#searchmovies').val().toUpperCase();
    for (var p = 0; p < localFB.length; p++) {
        var comparingTitle = localFB[p].title.toUpperCase();
        if (comparingTitle.includes(searchInput)) {
            filteredFBArray.push(localFB[p]);
        }
    }

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
    }
    comboConcatArray = comboArray;
    return comboConcatArray;
}

module.exports = {setLocalAPI, getLocalComboArray, addLocalFB, removeLocalFB, setLocalFB, concatFBAPI, getLocalAPI, getLocalFB};


