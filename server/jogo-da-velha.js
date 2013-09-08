Users = new Meteor.Collection('users');

Meteor.startup(function() {
	if(Users.find().count()) {
		Users.remove();
	}
});

Meteor.publish('onlines', function() {
	return Users.find();
});