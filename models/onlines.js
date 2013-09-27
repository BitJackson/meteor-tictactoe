Onlines = new Meteor.SmartCollection('onlines');

Onlines.opponentsOf = function (user) {
  return this.find({user: {$ne: user}, playing: false});
};

Onlines.enter = function(user) {
	this.insert({user: user, playing: false});
};

Onlines.startGame = function(user, enemy) {
	this.update({user: user}, {$set: {playing: true}});
	this.update({user: enemy}, {$set: {playing: true}});
};

Onlines.gameOver = function(user) {
	this.update({user: user}, {$set: {playing: false}});
};

Onlines.quit = function(user) {
	this.remove({user: user});
};

Onlines.startup = function() {
	if(this.find().count()) {
		this.remove({});
	}
};