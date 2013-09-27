GameStream = new Meteor.Stream('game');

Meteor.startup(function() {
  Meteor.subscribe('users');
  Meteor.subscribe('onlines');
  $('.opponents').html(Meteor.render(Template.onlines));
  $('.input').focus();
  $(window).unload(function() {
    GameStream.emit('quit', Session.get('user'));
  });
});