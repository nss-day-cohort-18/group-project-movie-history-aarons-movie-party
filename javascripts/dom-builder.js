'use strict';

function makeMovieList (movie) {
	 let $movieDisplay = 
	$(`<div class="col-xs-4">
		<ul class="movie-list">
		</ul>
		</div>`);
	$(".movieWrapper").html($movieDisplay);
 
 	let movieWrapper = $('#moviewrapper');
	for (var key in movie) {
		let movieList = movie[key];
		for (var x in movieList) {
			// console.log(movieList[x].title);
			let toWebpage = '';
			toWebpage = `
						<div id="${movieList[x].id}">
							${movieList[x].title}<br>
							${movieList[x].release_date}<br>
							${movieList[x].poster_path}<br>
							${movieList[x].overview}<br>
						</div>
						`;
			movieWrapper.append(toWebpage);
			//console.log(movieList);
		}

	}

}


module.exports = {makeMovieList};