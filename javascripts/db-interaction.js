'use strict';


let firebase = require('./firebaseConfig'),
        movieGetter = require('./movie-getter.js'),
        movieAPI = movieGetter();
        // fb = firebase();
/*
    apiKey: 'AIzaSyAjNt10LaBGKk5edTtotKiduJmaX4JT4zo',
    authDomain: 'moviehistory-e4b18.firebaseapp.com',
    databaseURL: 'https://moviehistory-e4b18.firebaseio.com'
 */
// ****************************************
// DB interaction using Firebase REST API
// ****************************************


/*
Setting up an ajax request to http://www.omdbapi.com/ 
and grabbing an array of movie objects
*/
function searchOMDB (movie) {
    console.log('inside search');
    return new Promise ( function ( resolve, reject ) {
        $.ajax({
            url: movieAPI.MDBurl,
            type: 'GET',
            data: { query: movie, append_to_response: "images", include_image_language: "en"}
        }).done(
            (movieData) => resolve(movieData)
        ).fail(function (error){
            reject(error);
        });
    });
}


/*
 * Get the User's Movie List from Firebase
 */
function getMovies (user) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: `https://movie-history-team-team.firebaseio.com/movies.json?orderBy="uid"&equalTo="${user}"`
        }).done(function(movieData){
            resolve(movieData);
        }).fail( function(error){
            reject(error);
        });
    });
}


/* 
adding movies to firebase
*/
function addMovie (movieFormObj) {
    console.log('add movie', movieFormObj);
    return new Promise ( function (resolve, reject ) {
        $.ajax ( {
            url: `https://movie-history-team-team.firebaseio.com/movies.json`,
            type: 'POST',
            data: JSON.stringify(movieFormObj),
            dataType: 'json'
        }).done(function (movieId) {
            resolve();
        });
    });
}


/*
deleting movies from firebase
*/
function deleteMovie (movieId) {
    return new Promise ( function ( resolve, reject ) {
        $.ajax({
            url: `https://movie-history-team-team.firebaseio.com/movies/${movieId}.json`,
            method: 'DELETE'
        }).done( function () {
            resolve();
        });
    });
}

module.exports = {
    searchOMDB,
    getMovies,
    addMovie,
    deleteMovie
};