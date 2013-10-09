Template.ranking.helpers({
  users: function() {
  	//console.log(Onlines.namelist());
    return Users.find();
  },
});