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


var GameLogic = {};

(function (scope) {

	var _places = ['11','12','13','21','22','23','31','32','33'];

	//one number in a winner sequence correspond to one key in _places
	var _winner_sequences = [
		//rows
		[0,1,2],[3,4,5],[6,7,8],
		//cols
		[0,3,6],[1,4,7],[2,5,8],
		//crossed
		[0,4,8],[2,4,6]
	];

	//TODO comment
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

	function sequenceMatch(arr1, arr2) {
		for(var i = 0; i < arr1.length; i++) {
			if(arr2.indexOf(arr1[i]) === -1)
				return false;
		}
		return true;
	}

	scope.roomAdd = function (room) {
		if(_rooms[room]) 
			return false;
		_rooms[room] = {x: [], o: []};
		return true;
	}

	scope.roomDelete = function (room) {
		if(!_rooms[room]) 
			return false;
		delete _rooms[room];
		return true;
	}

	scope.roomShot = function (room, weapon, row, col) {
		if(typeof row !== 'number' || typeof col !== 'number')
			return false;

		var shot = _places.indexOf(row.toString() + col.toString());
		if(!isValidShot(room,shot))
			return false;

		console.log(weapon);
		if(weapon === 'icon-x')
			_rooms[room].x.push(shot);

		if(weapon === 'icon-o')
			_rooms[room].o.push(shot);

		console.log(_rooms[room]);

		return true;
	}

	scope.roomWinner = function (room) {
		for(var i = 0; i < _winner_sequences.length; i++) {
			if( sequenceMatch( _winner_sequences[i], _rooms[room].x) )
				return 'icon-x';
			if( sequenceMatch( _winner_sequences[i], _rooms[room].o) )
				return 'icon-o';
		}
		return null;
	}

})(GameLogic);

