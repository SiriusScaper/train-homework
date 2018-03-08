// Initialize Firebase
var config = {
	apiKey: 'AIzaSyBjBd9FDrDZF7GZlagjpM91V87peN9bAAI',
	authDomain: 'train-schedule-a21b1.firebaseapp.com',
	databaseURL: 'https://train-schedule-a21b1.firebaseio.com',
	projectId: 'train-schedule-a21b1',
	storageBucket: '',
	messagingSenderId: '489839293384'
};
firebase.initializeApp(config);

let database = firebase.database();

$('#submit').on('click', function(event) {
	event.preventDefault();
	let trainName = $('#trainName')
		.val()
		.trim();
	let destination = $('#destination')
		.val()
		.trim();
	let trainTime = $('#trainTime')
		.val()
		.trim();
	let frequency = $('#frequency')
		.val()
		.trim();
	console.log(name);
	database.ref().push({
		trainName: trainName,
		destination: destination,
		trainTime: trainTime,
		frequency: frequency,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
});
