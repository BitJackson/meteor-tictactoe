Users = new Meteor.Collection('users');
Meteor.subscribe('onlines');

Session.set('user', 'Caio');

Template.onlines.currentUser = function() {
	return Session.get('user');
};

Template.onlines.users = function() {
	var users = Users.find();
	var currentUser = Session.get('user');
	return users;
};