Users = new Meteor.Collection('users');

Meteor.startup(function() {
	Meteor.subscribe('onlines');
	Session.set('weapon', 'icon-x');
});

Template.onlines.events({
  "submit .form": function(event) {
    var name = $(event.target).find('.input').val();
    Session.set('user', name);
    Users.insert({name: name});
    event.preventDefault();
  }
});

Template.onlines.currentUser = function() {
	return Session.get('user');
};

Template.onlines.users = function() {
	return Users.find({name: {'$ne': Session.get('user')}});
};

Template.game.events({
  "click .col": function(event) {
    if(Session.get('user')) {
      var weapon = Session.get('weapon');
      var col = $(event.target);
      var row = col.closest('.row');
      console.log("Weapon: %s | Row: %s | Col: %s", weapon, row.data('row'), col);
    } else {
      alert("First you need to enter your name!");
      $('.input').focus();
    }
  }
});

Template.game.weapon = function() {
	return Session.get('weapon');
};