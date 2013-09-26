GameStream = new Meteor.Stream('game');

Meteor.startup(function() {
  Meteor.subscribe('users');
  Meteor.subscribe('onlines');
  $('.gameboard').html(Meteor.render(Template.game));
  $('.input').focus();
  $(window).unload(function() {
    GameStream.emit('quit', Session.get('user'));
  });
});