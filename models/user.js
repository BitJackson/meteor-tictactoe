Users = new Meteor.SmartCollection('users');

Users.opponents = function () {
  return this.find({user: {'$ne': Session.get('user')}});
}

Users.myInfo = function () {
  return this.findOne({user: Session.get('user')});
}

Users.winner = function (user) {
  this.update({user: user}, {$inc: {score: 1}});
}

Users.startup = function() {
	if(Users.find().count()) {
		Users.remove({});
	}
}