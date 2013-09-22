Template.onlines.helpers({
  currentUser: function() {
    return Users.myInfo(Session.get('user'));
  },
  onlines: function() {
    return Users.opponents();
  },
  hasRoom: function() {
    return Session.get('room');
  }
});

Template.onlines.events({
  "submit .form": function(event) {
    var user = $(event.target).find('.input').val();
    Session.set('user', user);
    Session.set('weapon', GameLogic.X);
    GameStream.emit('enter', user);
    event.preventDefault();
  },
  "click .play": function(event) {
    var user = Session.get('user');
    if(user) {
      var enemy = $(event.target).data('enemy');
      var room = Random.id();
      Session.set('room', room);
      GameStream.emit('invite', enemy, user, room);
    } else {
      alert('Digite seu nome primeiro.');
      $('.input').focus();
    }
    event.preventDefault();
  }
});