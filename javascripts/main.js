'use strict';

let db = require('./db-interaction.js'),
   	templates = require('./dom-builder.js'),
   	movieTemplate = require('./dom-builder.js'),
   	user = require('./user.js'),
   	firebase = require('./firebaseConfig.js'),
    storage = require('./localStorage.js');


/*
 This function is used to save information from the movie card
 whenever it is selected. It will create an object and push it to be
 saved within FB.
 */
function movieObjToFirebase(movieObj) {
  let movie = {
    title: movieObj.original_title,
    year: movieObj.release_date,
    overview: movieObj.overview,
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
$('#searchmovies').keyup(function (event) {
  //If it's the enter key..
  if (event.which === 13) {
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
          
          //For each movie within the combined movie array, print it to the DOM
          combinedMoviesArray.forEach(function(movie) {
            templates.cardMovieTemplate(movie);
          });
        }
      );
  }
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

