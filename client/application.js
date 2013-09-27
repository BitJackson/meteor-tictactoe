GameStream = new Meteor.Stream('game');

Meteor.startup(function() {
  Meteor.subscribe('users');
  Meteor.subscribe('onlines');
  $('.opponents').html(Meteor.render(Template.onlines));
  $('.input').focus();
  $('.show_ranking').click(function() {
  	var link_rank = $(this);
    link_rank.hide();
    $('.rankingboard').html(Meteor.render(Template.ranking));
  	$('.close_ranking').click(function() {
      link_rank.show();
      $('.rankingboard').empty();
    });
  });
  $(window).unload(function() {
    GameStream.emit('quit', Session.get('user'));
  });
});