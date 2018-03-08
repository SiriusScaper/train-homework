var config = {
	apiKey: 'AIzaSyD6wIbk35rO9JLGNU3oUpbURXExLgtTuto',
	authDomain: 'employeedb-8f84a.firebaseapp.com',
	databaseURL: 'https://employeedb-8f84a.firebaseio.com',
	projectId: 'employeedb-8f84a',
	storageBucket: '',
	messagingSenderId: '500955266079'
};
firebase.initializeApp(config);

let database = firebase.database();

$('#submit').on('click', function(event) {
	event.preventDefault();
	let name = $('#name')
		.val()
		.trim();
	let role = $('#role')
		.val()
		.trim();
	let startDate = $('#startDate')
		.val()
		.trim();
	let monthlyRate = $('#monthlyRate')
		.val()
		.trim();
	console.log(name);
	database.ref().push({
		employeeName: name,
		employeeRole: role,
		startdate: startDate,
		monthlyrate: monthlyRate,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
});
