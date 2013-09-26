Meteor.publish('users', function() {
	return Users.find();
});
Meteor.publish('onlines', function() {
	return Onlines.find();
});