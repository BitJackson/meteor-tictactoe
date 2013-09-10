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
	GameStream.emit('refresh', room, weapon, row, col);
});


var GameLogic = (function () {
	var _places = ['11','12','13','21','22','23','31','32','33'];
	var _rooms = {};

	function isValidShot(room,shot) {
		//check if room exists
		if(!_rooms[room]) 
			return false;
		
		//is in the correct interval
		if(shot < 0 || shot >= _places.length) return false;
		
		//is duplicated shot
		if(_rooms[room].x.indexOf(shot) !== -1) return false;
		if(_rooms[room].o.indexOf(shot) !== -1) return false;

		return true;
	}

	return {
		roomAdd: function (room) {
			if(_rooms[room]) 
				return false;
			_rooms[room] = {x: [], o: []};
			return true;
		},

		roomDelete: function(room) {
			if(!_rooms[room]) 
				return false;
			delete _rooms[room];
			return true;
		},

		roomShot: function (room, weapon, row, col) {
			
			if(typeof row !== 'number' || typeof col !== 'number')
				return false;

			var shot = _places.indexOf(row.toString() + col.toString());
			if(!isValidShot(room,shot))
				return false;

			return true;
		}
	};

})();
