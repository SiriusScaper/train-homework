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
	database.ref().push({
		trainName: trainName,
		destination: destination,
		trainTime: trainTime,
		frequency: frequency,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
});

// Assumptions
var tFrequency = frequency;

// Time is 3:30 AM
var firstTime = trainTime;

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, 'HH:mm').subtract(1, 'years');
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log('CURRENT TIME: ' + moment(currentTime).format('hh:mm'));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), 'minutes');
console.log('DIFFERENCE IN TIME: ' + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log('MINUTES TILL TRAIN: ' + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, 'minutes');

database
	.ref()
	.orderByChild('dateAdded')
	.limitToLast(1)
	.on('child_added', function(snapshot) {
		snapValue = snapshot.val();
		console.log(snapshot.val());
		$('#trainSchedule').append(
			'<tr>\
        <td>' +
				snapValue.trainName +
				'</td>\
        <td>' +
				snapValue.destination +
				'</td>\
        <td>' +
				snapValue.frequency +
				'</td>\
        <td>' +
				nextTrain +
				'</td>\
        <td>' +
				tMinutesTillTrain +
				'</td>\
        </tr>'
		);
	});
