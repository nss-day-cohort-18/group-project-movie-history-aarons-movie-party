'use strict';

function makeMovieList (movie) {
	var movierow = document.getElementById('movierow');
	for (var key in movie) {
		let movieList = movie[key];
		for (var x in movieList) {
			movierow.innerHTML += 
							`
							<div class="mainmoviecard col-md-3">
							<div id="${movieList[x].id}" class="moviecard">
								<p id="title">${movieList[x].title}</p>
								<p id="release_date">${movieList[x].release_date}</p>
								<p id="overview">${movieList[x].overview}</p>
							</div>
							<section class="moveleft"><a href="#" class="watchlist">
							Add to Watchlist</a></section></div>`;
/*
							`
							<div class="mainmoviecard col-md-3">
							<div id="${movieList[x].id}" class="moviecard">
								<b>Title:</b> ${movieList[x].title}<br>
								<b>Release Date:</b> ${movieList[x].release_date}<br>
								<b>Description:</b><br>${movieList[x].overview}<br><br>
							</div>
							<section class="moveleft"><a href="#" class="watchlist">
							Add to Watchlist</a></section></div>`;
*/
		}

	}

}


module.exports = {makeMovieList};