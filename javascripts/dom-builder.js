
'use strict';

let cardMovieTemplate = function(movie, counter) {

    let createWrapper = () => {
        let movieRow = document.createElement("div");
        movieRow.classList.add("row");
        movieRow.id = "row--" + counter;
        $('.movies-list').append(movieRow);
    }; 
    if (counter % 3 === 0) {
        createWrapper();
    }
    //setting up structure for apending items to DOM
    let cardItems = {
        movieId: movie.id,
        image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : './dist/images/image-not-available.jpg',
        title: movie.title,
        year: movie.uid ? movie.year : movie.release_date.slice(0, 4),
        myRatings: movie.ratings ? movie.ratings : 'You have not watched the movie to rate!',
        popularity: Math.round(movie.popularity),
        tracked: movie.uid ? 'movie-tracked' : ''
    };

    let trackedDisplay = '';
    if (movie.uid) {
        trackedDisplay = 'Untrack this movie';
    } else {
        trackedDisplay = 'Have you watched this movie?';
    }
    //card-template
    let cardTemplate = `<div class="col-sm-6 col-md-4" data-movieId="${cardItems.movieId}">
                          <div class="thumbnail ${cardItems.tracked}">
                            <img src="${cardItems.image}" alt="Movie image ${cardItems.title}">
                            <div class="caption">
                              <h3>${cardItems.title}</h3>
                              <h3>${cardItems.year}</h3>
                              <h3>${cardItems.popularity}</h3>
                              <h3>${cardItems.myRatings}</h3>
                            </div>
                            <hr>
                            <div class="group-star">
                                <span class="glyphicon glyphicon-star-empty" aria-hidden="true" data-star="1"></span>
                                <span class="glyphicon glyphicon-star-empty" aria-hidden="true" data-star="2"></span>
                                <span class="glyphicon glyphicon-star-empty" aria-hidden="true" data-star="3"></span>
                                <span class="glyphicon glyphicon-star-empty" aria-hidden="true" data-star="4"></span>
                                <span class="glyphicon glyphicon-star-empty" aria-hidden="true" data-star="5"></span>
                                <span class="glyphicon glyphicon-star-empty" aria-hidden="true" data-star="6"></span>
                                <span class="glyphicon glyphicon-star-empty" aria-hidden="true" data-star="7"></span>
                                <span class="glyphicon glyphicon-star-empty" aria-hidden="true" data-star="8"></span>
                                <span class="glyphicon glyphicon-star-empty" aria-hidden="true" data-star="9"></span>
                                <span class="glyphicon glyphicon-star-empty" aria-hidden="true" data-star="10"></span>
                            </div>
                            <div class="checkbox">
                                <label><input type="checkbox" class="untrack">${trackedDisplay}</label>
                            </div>
                          </div>
                        </div>`;
    $('.movies-list .row').last().append(cardTemplate);
};

module.exports = {cardMovieTemplate};