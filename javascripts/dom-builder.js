// 'use strict';
// // this builds to DOM
// function makeMovieList (movie) {
// 	var movierow = document.getElementById('movierow');
// 	for (var key in movie) {
// 		let movieList = movie[key];
// 		for (var x in movieList) {
// 			var currentMovie = movieList[x];
// 			movierow.innerHTML += 
// 							`

// 							<div class="mainmoviecard col-md-4">
// 							<div id="div--${currentMovie.id}" class="moviecard">
// 								<h4>${currentMovie.title}</h4>
// 								<h5>${currentMovie.release_date}</h5>
// 								<section>${currentMovie.overview}</section>
// 							</div>
// 							<section class="moveleft"><a href="#" class="watchlist" id="link--${currentMovie.id}">
// 							Add to Watchlist</a></section></div>`;
// 					// event.current target is on ahref
// 					// index.slice 
// 		}
// 		let cardContainer = document.getElementsByClassName("mainmoviecard");
// 		for (var i = 0; i < cardContainer.length; i++) {
//  		 cardContainer[i].addEventListener('click', function(event) {
//  		 	console.log("This is being attached to a separate function. This is within dom-builder.js");
//  		 });
// 		}
// 	}
// }




// module.exports = {makeMovieList, myFunction};