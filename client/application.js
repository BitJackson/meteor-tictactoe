GameStream = new Meteor.Stream('game');

Meteor.startup(function() {
  Meteor.subscribe('users');
  Meteor.subscribe('onlines');
  $('.input').focus();
  $('.show_ranking').click(function() {
  	$('.rankingboard').html(Meteor.render(Template.ranking));
  	$(this).detach();
  });
  $(window).unload(function() {
    GameStream.emit('quit', Session.get('user'));
  });
});