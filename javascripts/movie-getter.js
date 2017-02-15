"use strict";

// keeps the api key secret from prying eyes
function getURL() {
  return {
    omDbURL: "http://www.omdbapi.com/?",
    MDBurl: "https://api.themoviedb.org/3/search/movie?api_key=838eabeda5ff3bb866d5c5fc023308d1"
  };
}

module.exports = getURL;