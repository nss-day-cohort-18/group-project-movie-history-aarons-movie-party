'use strict';

let db = require('./db-interaction.js'),
    templates = require('./dom-builder.js'),
    movieTemplate = require('./dom-builder.js'),
    user = require('./user.js'),
    firebase = require('./firebaseConfig.js'),
    storage = require('./localStorage.js'),
    domRowCounter = require('./domRowCounter.js');


/*
 This function is used to save information from the movie card
 whenever it is selected. It will create an object and push it to be
 saved within FB.
 */
function movieObjToFirebase(movieObj) {
  let movie = {
    title: movieObj.original_title,
    release_date: movieObj.release_date,
    overview: movieObj.overview,
    popularity: movieObj.popularity,
    poster_path: movieObj.poster_path,
    uid: user.getUser()
  };
  return movie;
}

/* 
Filters the search request so that you have the option to search 
by keyword/title or by year no matter where they are at within the search
*/
let formControl = (submitValue) => {
  return new Promise((resolve) => {
    //removes all movie cards from DOM
    $('.card').remove();
    //set up pattern to search for the year
    let yearPattern = /[0-9]/g;
    //split the submitValue by spaces
    let searchValues = submitValue.split(" ");
    //set arrays to store year values and regular words
    let yearValues = [];
    let keyWordValues = [];
    //Loop through searchValues array and find either year or title/keyword
    for (var search = 0; search < searchValues.length; search++) {
      if (searchValues[search].length === 4 && searchValues[search].match(yearPattern)) {
        yearValues.push(searchValues[search]);
      } else {
        keyWordValues.push(searchValues[search]);
      }
    }
    
    if (keyWordValues.length === 0) {
      resolve(yearValues[0]);
    } else {
      if (yearValues.length === 0) {
        resolve(submitValue);
      } else {
        resolve(keyWordValues.join(" "), yearValues[0]);
      }
    }
  });
};


/*
takes the search input and filters it. From there it makes an api call, stores the api
call, compares the api call to what is stored on our local firebase array, and sends the result to be
printed to the DOM
*/

let pushMovies = () => {
  removeAndAssignCurrentToggle(document.getElementsByClassName('all-toggle')[0]);
  //empty movies-list container
  $('.movies-list').empty();
  //grab the value from the search
  let movieSearchInput = $('#searchmovies').val();
  console.log(movieSearchInput);

  //send the result to be filtered
  formControl(movieSearchInput).then(
      //take the value to api request
      (movieValue) => db.searchOMDB(movieSearchInput)
    ).then( 
      //with the movie data..
      (movieData) => {
        //store the data in our localAPI array
        storage.setLocalAPI(movieData);
        console.log("This is the movie data from the API: ", movieData);
        console.log("This is the movie-data", storage.getLocalAPI());
        //combine both the local API array and the localFB array
        let combinedMoviesArray = storage.concatFBAPI();
        console.log("These are my combined movies from main.js: ", combinedMoviesArray);
        document.getElementById("searchmovies").value = '';
        //For each movie within the combined movie array, print it to the DOM
        combinedMoviesArray.forEach(function(movie) {
          let counter = domRowCounter.getCounter();
          templates.cardMovieTemplate(movie, counter);
          domRowCounter.setCounterPlusOne();
        });
      }
    ).then(
      () => {
        domRowCounter.resetCounter();
        makeEventListeners();
    });
};

$('#searchmovies').keyup(function (event) {
  //If it's the enter key..
  if (event.which === 13) {
    pushMovies();
  }
});

$('.form-control-btn').click(function(event) {
  pushMovies();
});


/*
This function performs login tasks. Sign in using Google, makes a call to Firebase
to store all movies from firebase locally
*/
$('.login').click(function() {
  console.log('clicked login');
  //sign in using Google
  user.logInGoogle()
  .then( 
    //set the user
    (result) => user.setUser(result.user.uid)
  ).then(
    //get movies from firebase
    (myUID) => db.getMovies(myUID)
  ).then(
    //store the movies from firebase locally within localStorage.js
    (movieData) => {
      storage.setLocalFB(movieData);
      let myMovies = storage.getLocalFB();
      console.log("These are my movies ", myMovies);}
    );
});


/*
Basic logout functions
*/
$('.logout').click(function() {
  console.log('clicked logout');
  user.logOut();
  console.log('user logged out');
});


/*
event listeners for the tracked, untracked, and watched toggles
*/

let removeAndAssignCurrentToggle = (myToggle) => {
  document.getElementsByClassName('current-toggle')[0].classList.remove('btn-primary');
  document.getElementsByClassName('current-toggle')[0].classList.remove('current-toggle');
  myToggle.classList.add('current-toggle');
  myToggle.classList.add('btn-primary');
};


$('.all-toggle').click(function(event) {
  removeAndAssignCurrentToggle(this);
  let comboArray = storage.getLocalComboArray();
  $('.movies-list').empty();
  comboArray.forEach(function(movie) {
    let counter = domRowCounter.getCounter();
    templates.cardMovieTemplate(movie, counter);
    domRowCounter.setCounterPlusOne();
  });
  domRowCounter.resetCounter();
});


$('.untracked-toggle').click(function(event) {
  removeAndAssignCurrentToggle(this);
  let comboArray = storage.getLocalComboArray();
  $('.movies-list').empty();
  comboArray.forEach(function(movie) {
    if (!(movie.hasOwnProperty('uid'))) {
      let counter = domRowCounter.getCounter();
      templates.cardMovieTemplate(movie, counter);
      domRowCounter.setCounterPlusOne();
    }
  });
  domRowCounter.resetCounter();
});


$('.tracked-toggle').click(function(event) {
  removeAndAssignCurrentToggle(this);
  let comboArray = storage.getLocalComboArray();
  $('.movies-list').empty();
  comboArray.forEach(function(movie) {
    if (movie.hasOwnProperty('uid')) {
      let counter = domRowCounter.getCounter();
      templates.cardMovieTemplate(movie, counter);
      domRowCounter.setCounterPlusOne();
    }
  });
  domRowCounter.resetCounter();
});


$('.watched-toggle').click(function(event) {
  removeAndAssignCurrentToggle(this);
  let comboArray = storage.getLocalComboArray();
  $('.movies-list').empty();
  comboArray.forEach(function(movie) {
    if (movie.hasOwnProperty('uid') && movie.watched) {
      let counter = domRowCounter.getCounter();
      templates.cardMovieTemplate(movie, counter);
      domRowCounter.setCounterPlusOne();
    }
  });
  domRowCounter.resetCounter();
});

function makeEventListeners() {
  // data from both calls to compare
  var localAPI = storage.getLocalAPI(),
      localFB = storage.getLocalFB();

  // values to save
  var updatedAPIObj = {};
  var updatedFBObj = {};
  var indexOfAPIObj;
  var indexOfFBObj;

  // events to monitor
  var listenForEvent = false;
  var removeEvent = false;
  var addEvent = false;
  var ratedEvent = false;
  var deletedObj;
  var addedObj;
  var updatedObj;
// event listener for highlighting movie cards
  $(".thumbnail").click( function() {

    console.log("Thumbnail is being clicked.");


    // if class exists just remove class
    if ($(this).hasClass("card-clicked") && !$(event.target).hasClass("track") && !$(event.target).hasClass("untrack") && !$(event.target).hasClass("glyphicon")) {
      $(this).removeClass("card-clicked");

        if (listenForEvent === true) {
          if (removeEvent === true) {
            db.deleteMovie(deletedObj.index);
            removeEvent = false;
          }
          if (addEvent === true && ratedEvent !== true) {
            db.addMovie(addedObj);
            addEvent = false;
          }
          if (ratedEvent === true && addEvent !== true) {
            db.editMovie(updatedObj, updatedObj.index);
            ratedEvent = false;
          }
          if (addEvent === true && ratedEvent === true) {
            db.addMovie(updatedObj);
            addEvent = false;
            ratedEvent = false;
          }
        }
      listenForEvent = false;
      console.log("ListenForEvent ", listenForEvent);
    // if class doesn't exist, check for event
    } else if (!$(this).hasClass("card-clicked") && !$(event.target).hasClass("track") && !$(event.target).hasClass("untrack") && !$(event.target).hasClass("glyphicon")) {

        if (listenForEvent === true) {
          if (removeEvent === true) {
            db.deleteMovie(Number(deletedObj.index));
            removeEvent = false;
          }
          if (addEvent === true && ratedEvent !== true) {
            db.addMovie(addedObj);
            addEvent = false;
          }
          if (ratedEvent === true && addEvent !== true) {
            db.editMovie(updatedObj, Number(updatedObj.index));
            ratedEvent = false;
          }
          if (addEvent === true && ratedEvent === true) {
            db.addMovie(updatedObj);
            addEvent = false;
            ratedEvent = false;
          }
        }
      //then remove class from prev and add class to current selected
      $('div').removeClass("card-clicked");
      $(this).addClass("card-clicked");
      listenForEvent = true;
      console.log("ListenForEvent ", listenForEvent);
    }

  // event listeners for once a movie is targeted
    if (listenForEvent === true) {
      updatedAPIObj = {};
      updatedFBObj = {};

      // finding currently selected localAPI object (may not exist)
      for (var t = 0; t < localAPI.length; t++) {
        if (localAPI[t].id == $(".card-clicked").attr("data-movieId")) {
          updatedAPIObj = localAPI[t];
          indexOfAPIObj = t;
          break;
        }
      }
      // finding currently selected localFB object (may not exist)
      for (var l = 0; l < localFB.length; l++) {
        if (localFB[l].id == $(".card-clicked").attr("data-movieId")) {
          updatedFBObj = localFB[l];
          indexOfFBObj = l;
          break;
        }
      }
      // removing from tracked
      $(".card-clicked").find(".untrack").click(function () {
        console.log("You clicked on untrack");
        deletedObj = updatedFBObj;
        removeEvent = true;
        console.log("removeEvent ", removeEvent);
        $(".card-clicked").removeClass("movie-tracked");
        $(".card-clicked").removeClass("movie-rated");
      });

      // adding to tracked
      $(".card-clicked").find(".track").click(function () {
        console.log("You clicked on track");
        updatedAPIObj.uid = user.getUser();
        updatedAPIObj.watched = false;
        updatedAPIObj.rating = 0;
        localFB.push(updatedAPIObj);
        addedObj = updatedAPIObj;
        addEvent = true;
        console.log("addEvent ", addEvent);
        $(".card-clicked").addClass("movie-tracked");
      });

      // giving a rating
      $(".card-clicked").find(".glyphicon").click(function () {
        console.log("You clicked on a star");
        if (addEvent === true) {
          addedObj.watched = true;
          addedObj.rating = $(this).attr("data-star");
          updatedObj = addedObj;
          ratedEvent = true;
        } else {
          updatedFBObj.watched = true;
          updatedFBObj.rating = $(this).attr("data-star");
          updatedObj = updatedFBObj;
          localFB.splice(indexOfFBObj, 1, updatedFBObj);
          ratedEvent = true;
        }
        console.log("ratedEvent ", ratedEvent);
        $(".card-clicked").addClass("movie-rated");
      });
    }
  });
}
