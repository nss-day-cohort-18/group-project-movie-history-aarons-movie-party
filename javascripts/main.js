'use strict';

let db = require('./db-interaction'),
   	templates = require('./dom-builder'),
   	movieTemplate = require('../templates/movie.hbs'),
   	user = require('./user'),
   	firebase = require('./firebaseConfig');


function loadMoviesToDOM() {
  //console.log("Need to load some songs, Buddy");
  let currentUser = user.getUser();
  db.getMovies(currentUser)
  .then(function(movieData){
    // console.log("got data", movieData);
   /* var idArray = Object.keys(movieData);
    idArray.forEach(function(key){
      movieData[key].id = key;
    }); 
    console.log("movie object with id: ", movieData); 
    templates.makeMovieList(movieData); */
  });

}

$('#searchmovies').keypress(function (event) {
	if (event.which == 13) {
		let movieSearchInput = document.getElementById('searchmovies').value;
		db.searchOMDB(movieSearchInput)
    .then( function(resolve) {
      templates.makeMovieList(resolve);
    });
	}
});

$('#login-btn').click(function() {
  console.log('clicked login');
  user.logInGoogle()
  .then( function(result){
    console.log('result from login', result.user.uid);
    user.setUser(result.user.uid);
    // $('#auth-btn').addClass('is-hidden');
    // $('#logout=btn').removeClass('is-hidden');
    loadMoviesToDOM();
  });
});

$('#logout-btn').click(function() {
  console.log('clicked logout');
  user.logOut();
  console.log('user logged out');
  });

// Send newSong data to db then reload DOM with updated song data
$(document).on("click", ".watchlist", function() {
  let movieObj = buildMovieObj();
  db.addMovie(movieObj)
  .then( function(movieId){
    console.log(movieId);
   // loadMoviesToDOM();
  });
});

function buildMovieObj() {
    let className = $('.moviecard').attr('id');
    let movieObj = {
      title: $(className).html(),
      uid: user.getUser()
  };
  return movieObj;
}

