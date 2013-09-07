Users = new Meteor.Collection('users');

Meteor.publish('onlines', function() {
	return Users.find();
});