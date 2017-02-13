
 //let firebase = require('./firebaseConfig');

// ****************************************
// DB interaction using Firebase REST API
// ****************************************

function searchOMDB (movie) {
	return new Promise ( function ( resolve, reject ) {
		$.ajax({
			url: `http://www.omdbapi.com/?t=${movie}`
		}).done(
			function (movieData) {
			resolve(movieData);
			console.log(movieData);
		}).fail(function (error){
			reject(error);
		});
	});
}


