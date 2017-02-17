'use strict';

let cardMovieTemplate = function(movie) {
    return new Promise(function(resolve, reject) {

 
        //setting up structure for apending items to DOM
        let cardItems = {
            movieIndex: movie.index ? movie.index : '',
            movieId: movie.id,
            image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : './dist/images/image-not-available.jpg',
            title: movie.title,
            year: movie.release_date.slice(0, 4),
            myRatings: movie.ratings,
            popularity: Math.round(movie.popularity),
            tracked: movie.uid ? 'movie-tracked' : '',
            rated: movie.ratings ? 'movie-rated' : '',
        };
        //card-template
        let cardTemplate = `<div class="col-sm-6 col-md-4">
                              <div class="thumbnail ${cardItems.tracked} ${cardItems.rated}" data-movieId="${cardItems.movieId}" id=${cardItems.movieIndex}>
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
                                <div class="buttons">
                                    <button class="track" type="button" id="track">Track this movie</button>
                                    <button class="untrack" type="button" id="untrack">Untrack this movie</button>
                                </div>
                              </div>
                            </div>`;
        $('.movies-list').append(cardTemplate);
        resolve(cardTemplate);
        reject();
    });
};

module.exports = {cardMovieTemplate};
