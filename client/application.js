GameStream = new Meteor.Stream('game');

Meteor.startup(function() {
  Session.set('main_menu', true);
  $('.input').focus();
  VoiceShoot.initialize();
});

Deps.autorun(function () {
  Meteor.subscribe('ranking');
  Meteor.subscribe('users');
  Meteor.subscribe('onlines');
});

Meteor.setInterval(function() {
	if(Session.get('user')) {
		GameStream.emit('keepalive', Session.get('user'));
	}
}, 5000);