'use strict';

let firebase = require('./firebaseConfig'),
	provider = new firebase.auth.GoogleAuthProvider(),
	currentUser = null;


function logInGoogle() {
	// console.log("This is the user: ", user);
	return firebase.auth().signInWithPopup(provider);
}

function logOut() {
	return firebase.auth().signOut();
}

function getUser() {
	console.log("This is the current user from user.getUser(): ", currentUser);
	return currentUser;
}

function setUser(val) {
	return new Promise ((resolve) => {
		currentUser = val;
		let myUserId = getUser();
		console.log("my user in user.setUser(): ", myUserId);
		resolve(myUserId);
	});
}


module.exports = {logInGoogle, logOut, getUser, setUser};
