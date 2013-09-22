GameStream = new Meteor.Stream('game');

GameStream.permissions.write(function() { return true; });
GameStream.permissions.read(function() { return true; });

GameStream.on('enter', function(user) {
	Users.insert({user: user, score: 0});
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

GameStream.on('endgame', function(room) {
	GameLogic.roomDelete(room);
	GameStream.emit('end', room);
});

GameStream.on('quit', function(user) {
	User.remove({user: user});
});

GameStream.on('shoot', function(room, user, weapon, row, col) {
	GameLogic.roomShot(room, weapon, row, col);
	var status = GameLogic.isGameOver(room);
	GameStream.emit('refresh', room, user, weapon, row, col, status);
});

GameStream.on('winner', function (user) {
	Users.winner(user);
})