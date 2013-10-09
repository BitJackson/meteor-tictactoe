GameStream = new Meteor.Stream('game');

Meteor.startup(function() {
  Meteor.subscribe('users');
  Meteor.subscribe('onlines');
  $('.input').focus();
  VoiceShoot.initialize();
});

Meteor.setInterval(function() {
	if(Session.get('user')) {
		GameStream.emit('keepalive', Session.get('user'));
	}
}, 5000);