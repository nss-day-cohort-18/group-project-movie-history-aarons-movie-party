'use strict';


 //let firebase = require('./firebaseConfig');
/*
    apiKey: 'AIzaSyAjNt10LaBGKk5edTtotKiduJmaX4JT4zo',
    authDomain: 'moviehistory-e4b18.firebaseapp.com',
    databaseURL: 'https://moviehistory-e4b18.firebaseio.com'
 */
// ****************************************
// DB interaction using Firebase REST API
// ****************************************

function searchOMDB (movie) {
	return new Promise ( function ( resolve, reject ) {
		$.ajax({
			url: `https://api.themoviedb.org/3/search/movie?api_key=2065b4d356548d79a5905b6401847709&query=${movie}`,
			method: 'GET'
		}).done(
			function (movieData) {
			resolve(movieData);
		}).fail(function (error){
			reject(error);
		});
	});
}

/*
 * Get the User's Movie List
 */
function getMovies (user) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: `https://moviehistory-e4b18.firebaseio.com/movies.json?orderBy="uid"&equalTo="${user}"`
		}).done(function(movieData){
			resolve(movieData);
		}).fail( function(error){
			reject(error);
		});
	});
}

function addMovie (movieFormObj) {
	console.log('add movie', movieFormObj);
	return new Promise ( function (resolve, reject ) {

		$.ajax ( {
			url: 'https://moviehistory-e4b18.firebaseio.com/movies.json',
			type: 'POST',
			data: JSON.stringify(movieFormObj),
			dataType: 'json'
		}).done(function (movieId) {
			resolve();
		});
	});
}

function deleteMovie (movieId) {
	return new Promise ( function ( resolve, reject ) {
		$.ajax({
			url: `https://moviehistory-e4b18.firebaseio.com/movies/${movieId}.json`,
			method: 'DELETE'
		}).done( function () {
			resolve();
		});
	});
}

function getMovie (movieId) {
	return new Promise (function (resolve, reject) {
		$.ajax ({
			url: `https://moviehistory-e4b18.firebaseio.com/movies/${movieId}.json`,
		}).done(function (movieData) {
			resolve(movieData);
		}).fail( function (error) {
			reject (error);
		});
	});
}


