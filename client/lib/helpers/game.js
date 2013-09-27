Template.game.helpers({
  isPlaying: function() {
    return Session.get('playing');
  }
});

Template.game.events({
  "click .col": function(event) {
    if(Session.get('user')) {
      if(Session.get('room')) {
        if(Session.get('play')) {
          var room = Session.get('room');
          var weapon = Session.get('weapon');
          var col = $(event.target).data('col');
          var row = $(event.target).closest('.row').data('row');
          Session.set('play', false);
          GameStream.emit('shoot', room, weapon, row, col);
        } else {
          alert("Aguarde a sua vez.");
        }
      } else {
        alert('Escolha um inimigo primeiro.');
      }
    } else {
      alert('Digite seu nome primeiro.');
      $('.input').focus();
    }
    event.preventDefault();
  }
});