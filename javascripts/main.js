'use strict';

let db = require('./db-interaction'),
   	templates = require('./dom-builder'),
   	movieTemplate = require('../templates/movie.hbs'),
   	user = require('./user'),
   	firebase = require('./firebaseConfig');


function loadMoviesToDOM() {
  //console.log("Need to load some songs, Buddy");
  //Jordan and Aaron were trying to connect to firebase from here
  let currentUser = user.getUser();
  db.getMovies(currentUser);
  //then populate the DOM with movies
  // .then(function(buildMovieObj()){
  // });

}


/*
This function is used to save information from the movie card
whenever it is selected. It will create an object and push it to be 
saved within FB.
*/
// function movieObjToFirebase(movieObj) {
//     let movieObj = {
//       title: obj_title,
//       release_date: release_date,
//       overview: overview,
//       uid: user.getUser()
//   };
//   return movieObj;
// }


$('#searchmovies').keyup(function (event) {
	if (event.which === 13) {
		let movieSearchInput = $('#searchmovies').val();
    console.log(movieSearchInput);
		db.searchOMDB(movieSearchInput)
      .then( 
        (movieData) => console.log(movieData)
 //      templates.makeMovieList(resolve);
 //    });
	// }
    );
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

// // Send newSong data to db then reload DOM with updated song data
// $(document).on("click", ".watchlist", function() {
//   let movieObj = buildMovieObj();
//   db.addMovie(movieObj)
//   .then( function(movieId){
//     console.log(movieId);
//    // loadMoviesToDOM();
//   });
// });
