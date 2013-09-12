Users = new Meteor.Collection('users');
GameStream = new Meteor.Stream('game');

GameStream.permissions.write(function() { return true; });
GameStream.permissions.read(function() { return true; });

Meteor.startup(function() {
	if(Users.find().count()) {
		Users.remove({});
	}
});

Meteor.publish('onlines', function() {
	return Users.find();
});

GameStream.on('enter', function(user) {
	Users.insert({user: user});
});

GameStream.on('start', function(room, weapon) {
	GameLogic.roomAdd(room);
	GameStream.emit('play', room, weapon);
});

GameStream.on('invite', function(enemy, user, room) {
	GameStream.emit('request', enemy, user, room);
});

GameStream.on('cancel', function(room) {
	GameLogic.roomDelete(room);
	GameStream.emit('abort', room);
});

GameStream.on('quit', function(user) {
	User.remove({user: user})
});

GameStream.on('shoot', function(room, weapon, row, col) {
	GameLogic.roomShot(room, weapon,row,col);
	var winner = GameLogic.roomWinner(room);
	if(winner)
		console.log('CONGRATULATIONS ' + winner + '!!!!');
	GameStream.emit('refresh', room, weapon, row, col);
});