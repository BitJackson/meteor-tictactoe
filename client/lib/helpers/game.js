Template.game.helpers({
  isPlaying: function() {
    return Session.get('playing');
  },
  playClass: function() {
    return Session.get('play') ? " is-to-play" : " is-to-wait";
  }
});

Template.game.events({
  "click .col": function(event) {
    if(Session.get('play')) {
      var room = Session.get('room');
      var weapon = Session.get('weapon');
      var col = $(event.target).data('col');
      var row = $(event.target).closest('.row').data('row');
      Session.set('play', false);
      GameStream.emit('shoot', room, weapon, row, col);
    } else {
      alert("Please, wait your time.");
    }
    event.preventDefault();
  }
});