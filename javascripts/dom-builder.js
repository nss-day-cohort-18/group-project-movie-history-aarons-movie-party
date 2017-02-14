'use strict';

function makeMovieList (movie) {
	var movierow = document.getElementById('movierow');
	for (var key in movie) {
		let movieList = movie[key];
		for (var x in movieList) {
			var currentMovie = movieList[x];
			movierow.innerHTML += 
							`

							<div class="mainmoviecard col-md-4">
							<div id="div--${currentMovie.id}" class="moviecard">
								<p id="title--${currentMovie.id}">${currentMovie.title}</p>
								<p id="release--${currentMovie.id}">${currentMovie.release_date}</p>
								<p id="overview--${currentMovie.id}">${currentMovie.overview}</p>

							</div>
							<section class="moveleft"><a href="#" class="watchlist" id="link--${currentMovie.id}">
							Add to Watchlist</a></section></div>`;
					// event.current target is on ahref
					// index.slice 
		}
		let cardContainer = document.getElementsByClassName("mainmoviecard");
		for (var i = 0; i < cardContainer.length; i++) {
 		 cardContainer[i].addEventListener('click', myFunction);
		}

	}

}

function myFunction () {
	console.log(event.currentTarget.childNode[1]);
}


module.exports = {makeMovieList, myFunction};