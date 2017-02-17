'use strict';


/*
Firebase Config
This is connected to our fb-getter.js to retrieve appropriate information
for handling all firebase requests
*/
let firebase = require('firebase/app'),
   fb = require('./fb-getter'),
   fbData = fb();

require('firebase/auth');
require('firebase/database');

var config = {
  apiKey: fbData.apiKey,
  databaseURL: fbData.databaseURL,
  authDomain: fbData.authDomain
};

firebase.initializeApp(config);

module.exports = firebase;