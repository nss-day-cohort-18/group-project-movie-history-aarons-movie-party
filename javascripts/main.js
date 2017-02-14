'use strict';

let db = require('./db-interaction'),
   	templates = require('./dom-builder'),
   	movieTemplate = require('../templates/movie.hbs'),
   	user = require('./user'),
   	firebase = require('./firebaseConfig');

function loadMoviesToDOM (movieInfo) {
	let movieDivCard = document.createElement('div');
	movieDivCard.innerHTML = movieTemplate(movieInfo);
	$('.movie-container').append(movieDivCard);
}

$('#searchmovies').keypress(function (event) {
	if (event.which == 13) {
		let movieSearchInput = document.getElementById('searchmovies').value;
		console.log(movieSearchInput);
		db.searchOMDB(movieSearchInput);
	}
});