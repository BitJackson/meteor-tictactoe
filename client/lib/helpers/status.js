Template.status.helpers({
  hasRoom: function() {
    return Session.get('room');
  },
  canPlay: function() {
    return Session.get('play');
  }
});

Template.status.events({
  "click .quit": function(event) {
    var room = Session.get('room');
    GameStream.emit('cancel', room);
    event.preventDefault();
  }
});