Onlines = new Meteor.SmartCollection('onlines');

Onlines.opponentsOf = function (user) {
  return this.find({user: {'$ne': user}});
};

Onlines.enter = function(user) {
	this.insert({user: user});
};

Onlines.quit = function(user) {
	this.remove({user: user});
};

Onlines.startup = function() {
	if(this.find().count()) {
		this.remove({});
	}
};