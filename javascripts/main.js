'use strict';

let db = require('./db-interaction.js'),
    templates = require('./dom-builder.js'),
    movieTemplate = require('./dom-builder.js'),
    user = require('./user.js'),
    firebase = require('./firebaseConfig.js');

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
        poster_path: movieObj.poster_path,

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

let formControl = (submitValue) => {
    return new Promise((resolve) => {
        $('.card').remove();
        let yearPattern = /[0-9]/g;
        let searchValues = submitValue.split(" ");
        let yearValues = [];
        let keyWordValues = [];
        for(var search = 0; search < searchValues.length; search++) {
            if(searchValues[search].length === 4 && searchValues[search].match(yearPattern)) {
                yearValues.push(searchValues[search]);
            } else {
                keyWordValues.push(searchValues[search]);
            }
        }
        //go to firebase to search related movies
        // readFirebase.readMovies();
        //also go to movie load to compare movies with the api call

        if(keyWordValues.length === 0) {
            resolve(yearValues[0]);
        } else {
            if(yearValues.length === 0) {
                resolve(submitValue);
            } else {
                resolve(keyWordValues.join(" "), yearValues[0]);
            }
        }
    });
};


$('#searchmovies').keyup(function(event) {
    if(event.which === 13) {
        $('.movies-list').empty();
        let movieSearchInput = $('#searchmovies').val();
        console.log(movieSearchInput);
        formControl(movieSearchInput).then(
            (movieValue) => db.searchOMDB(movieSearchInput)
        ).then(
            (movieData) => {
                console.log("This is the movie-data", movieData);
                // db.addMovie(movieObjToFirebase(movieData.results[0]));
                // console.log(templates.cardMovieTemplate);
                movieData.results.forEach(function(movie) {
                    templates.cardMovieTemplate(movie);
                });
                // templates.cardMovieTemplate(movieData.results[0]);
            }
        );
    }
});


$('.login').click(function() {
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


$('.logout').click(function() {
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
