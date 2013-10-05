GameStream = new Meteor.Stream('game');

Meteor.startup(function() {
  Meteor.subscribe('users');
  Meteor.subscribe('onlines');
  $('.input').focus();
  $(window).on('beforeunload', function() {
  	GameStream.emit('quit', Session.get('user'));
  	return "You will quit the game...";
  }); 
});