Users = new Meteor.Collection('users');


if(Meteor.isClient) {
  Users.opponents = function () {
    return this.find({user: {'$ne': Session.get('user')}});
  }

  Users.myInfo = function () {
    return this.findOne({user: Session.get('user')});
  }
}


if(Meteor.isServer) {
  Users.winner = function (user) {
    this.update({user: user}, {$inc: {score: 1}});
  }
}