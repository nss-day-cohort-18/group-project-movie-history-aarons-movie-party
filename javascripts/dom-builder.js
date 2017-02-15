'use strict';

let cardMovieTemplate = function(movie) {
    return new Promise(function(resolve, reject) {

        let cardItems = {
        		movieId: movie.id,
            image: movie.poster_path,
            title: movie.title,
            year: movie.release_date.slice(0, 4),
            myRatings: movie.uid ? `${movie.ratings}` : `${Math.round(movie.popularity)}`
        };
        let cardTemplate = `
    												<div class="col-sm-6 col-md-4" data-movieId="${cardItems.movieId}">
                              <div class="thumbnail">
                                <img src="https://image.tmdb.org/t/p/w500${cardItems.image}" alt="Movie image ${cardItems.title}">
                                <div class="caption">
                                  <h3>${cardItems.title}</h3>
                                  <p>${cardItems.year}</p>
                                  <p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>
                                </div>
                              </div>
                            </div>`;
        $('#movierow').append(cardTemplate);
        resolve(cardTemplate);
        reject();
    });
};

module.exports = {cardMovieTemplate};
