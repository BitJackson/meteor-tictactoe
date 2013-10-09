Meteor.startup(function() {
	console.log('Meteor TicTacToe Running...');
});

Meteor.setInterval(function() {
	Onlines.clearAll();
}, Onlines.INTERVAL);
