Template.ranking.helpers({
  users: function() {
  	return Users.showRanking(Onlines.userlist());
  },
  showRanking: function() {
  	return Session.equals('main_menu', false);
  }
});

Template.ranking.events({
	"click .back_mainmenu": function() {
    Session.set('main_menu', true);
  }
});