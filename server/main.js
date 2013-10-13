Meteor.startup(function() {
	Onlines.remove({});
	Users.remove({});
	console.log('Meteor TicTacToe Running...');
});

Meteor.setInterval(function() {
	Onlines.clearAll();
}, Onlines.INTERVAL);
