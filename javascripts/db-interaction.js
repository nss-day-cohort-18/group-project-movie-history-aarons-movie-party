'use strict';


let firebase = require('./firebaseConfig'),
        movieGetter = require('./movie-getter.js'),
        movieAPI = movieGetter();

// ****************************************
// DB interaction using Firebase REST API
// ****************************************


/*
Setting up an ajax request to http://www.omdbapi.com/ 
and grabbing an array of movie objects
*/
function searchOMDB (movie, movieYear) {
    console.log('inside search');
    return new Promise ( function ( resolve, reject ) {
        $.ajax({
            url: movieAPI.MDBurl,
            type: 'GET',
            data: { 
                query: movie, 
                append_to_response: "images", 
                include_image_language: "en",
                adult_movie: "false",
                year: movieYear
                }
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
        }).done(function () {
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

function editMovie(movieFormObj, index) {
    return new Promise( function(resolve, reject){
        $.ajax({
            url: `https://movie-history-team-team.firebaseio.com/movies/${index}.json`,
            type: 'PUT',
            data: JSON.stringify(movieFormObj)
        }).done( function(){
            resolve();
        });
    });
}

module.exports = {
    searchOMDB,
    getMovies,
    addMovie,
    deleteMovie,
    editMovie
};