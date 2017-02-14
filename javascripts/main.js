'use strict';

let db = require('./db-interaction'),
   	templates = require('./dom-builder'),
   	movieTemplate = require('../templates/movie.hbs'),
   	user = require('./user'),
   	firebase = require('./firebaseConfig');

/*
function loadMoviesToDOM (movieInfo) {
	let movieDivCard = document.createElement('div');
	movieDivCard.innerHTML = movieTemplate(movieInfo);
	$('.movie-container').append(movieDivCard);
} */

$('#searchmovies').keypress(function (event) {
  if (event.which == 13) {
    let movieSearchInput = document.getElementById('searchmovies').value;
    // console.log(movieSearchInput);
    db.searchOMDB(movieSearchInput);
  }
});


function loadMoviesToDOM() {
  //console.log("Need to load some songs, Buddy");
  let currentUser = user.getUser();
  db.getMovies(currentUser)
  .then(function(movieData){
    console.log("got data", movieData);
   /*  var idArray = Object.keys(movieData);
    idArray.forEach(function(key){
      movieData[key].id = key;
    }); */
    console.log("movie object with id: ", movieData);
    // templates.makeSongList(songData);
  });

}

// loadMoviesToDOM();

