Template.ranking.helpers({
  users: function() {
    return Users.find();
  },
});

Template.ranking.events({
	"click .show": function(event) {
		$(event.target).hide();
		$('.ranking').removeClass('is-hide');
	},
	"click .close": function(event) {
		var ranking = $(event.target).closest('.ranking');
		ranking.addClass('is-hide');
		$('.show').show();
	}
});