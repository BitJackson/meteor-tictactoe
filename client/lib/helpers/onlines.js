Template.onlines.helpers({
  currentUser: function() {
    return Users.info(Session.get('user'));
  },
  onlines: function() {
    return Onlines.opponentsOf(Session.get('user'));
  },
  hasRoom: function() {
    return Session.get('room');
  }
});

Template.onlines.events({
  "submit .form": function(event) {
    var user = $(event.target).find('.input').val();
    if(user) {
      Session.set('user', user);
      Session.set('weapon', GameLogic.X);
      GameStream.emit('enter', user);
    } else {
      alert('Digite um nome válido.');
    }
    event.preventDefault();
  },
  "click .play": function(event, template) {
    var user = Session.get('user');
    if(user) {
      var enemy = $(event.target).data('enemy');
      var room = Random.id();
      Session.set('room', room);
      Session.set('playing', true);
      $('.gameboard').html(Meteor.render(Template.game));
      GameStream.emit('invite', enemy, user, room);
    } else {
      alert('Digite seu nome primeiro.');
      template.find('.input').focus();
    }
    event.preventDefault();
  }
});