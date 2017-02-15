'use strict';

let db = require('./db-interaction'),
   	templates = require('./dom-builder'),
   	movieTemplate = require('../templates/movie.hbs'),
   	user = require('./user'),
   	firebase = require('./firebaseConfig');

/*
This function is used to save information from the movie card
whenever it is selected. It will create an object and push it to be 
saved within FB.
*/
function movieObjToFirebase(movieObj) {
  // return new Promise((resolve) => {
  let movie = {
    title: movieObj.original_title,
    year: movieObj.release_date.slice(0, 4),
    overview: movieObj.overview,
    poster: movieObj.poster_path,

    uid: user.getUser()
  };
  return movie;
}


// function loadMoviesToDOM() {
//   //console.log("Need to load some songs, Buddy");
//   //Jordan and Aaron were trying to connect to firebase from here
//   console.log("I am in loadMoviesToDom()");
  
//   //then populate the DOM with movies
//   // .then(function(movieObjToFirebase()){
//   // });

// }


$('#searchmovies').keyup(function (event) {
  if (event.which === 13) {
    let movieSearchInput = $('#searchmovies').val();
    console.log(movieSearchInput);
    db.searchOMDB(movieSearchInput)
      .then( 
        (movieData) => {
          console.log(movieData);
          db.addMovie(movieObjToFirebase(movieData.results[0]));
        }
    );
  }
});


$('#login-btn').click(function() {
  console.log('clicked login');
  user.logInGoogle()
  .then( 
    (result) => {
      user.setUser(result.user.uid);
      // $('#auth-btn').addClass('is-hidden');
      // $('#logout=btn').removeClass('is-hidden');
      let myUID = user.getUser();
      console.log("myUID: ", myUID);
      let myMovies = db.getMovies(myUID);
      console.log(myMovies);
  });
});






$('#logout-btn').click(function() {
  console.log('clicked logout');
  user.logOut();
  console.log('user logged out');
  });

// // Send newSong data to db then reload DOM with updated song data
// $(document).on("click", ".watchlist", function() {
//   let movieObj = movieObjToFirebase();
//   db.addMovie(movieObj)
//   .then( function(movieId){
//     console.log(movieId);
//    // loadMoviesToDOM();
//   });
// });
