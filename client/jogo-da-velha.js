WEAPON_X = 'icon-x', WEAPON_O = 'icon-o';

Users = new Meteor.Collection('users');
GameStream = new Meteor.Stream('game');

Meteor.startup(function() {
  Meteor.subscribe('onlines');
  $('.input').focus();
  $(window).unload(function() {
    GameStream.emit('quit', Session.get('user'));
  });
});

var resetSession = function(room) {
  if(Session.equals('room', room)) {
    Session.set('enemy', null);
    Session.set('room', null);
    Session.set('weapon', WEAPON_X);
    GameStream.emit('cancel', room);
  }
}

Template.onlines.events({
  "submit .form": function(event) {
    var user = $(event.target).find('.input').val();
    Session.set('user', user);
    Session.set('weapon', WEAPON_X);
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

Template.onlines.currentUser = function() {
	return Session.get('user');
};

Template.onlines.onlines = function() {
	return Users.find({user: {'$ne': Session.get('user')}});
};

Template.onlines.hasRoom = function() {
  return Session.get('room');
};

Template.status.hasRoom = function() {
  return Session.get('room');
};

Template.status.canPlay = function() {
  return Session.get('play');
};

Template.status.events({
  "click .quit": function(event) {
    var room = Session.get('room');
    resetSession(room);
    event.preventDefault();
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

GameStream.on('request', function(user, enemy, room) {
  if(Session.equals('user', user)) {
    if(confirm('Deseja jogar com '+ enemy +'?')) {
      Session.set('enemy', enemy);
      Session.set('weapon', WEAPON_O);
      Session.set('room', room);
      Session.set('play', false);
      GameStream.emit('start', room, WEAPON_X);
    } else {
      resetSession(room);
    }
  }
});

GameStream.on('abort', function(room) {
  alert('Jogo cancelado.');
  resetSession(room);
});

GameStream.on('play', function(room, weapon) {
  if(Session.equals('room', room) && Session.equals('weapon', weapon)) {
    Session.set('play', true);
  }
});

GameStream.on('refresh', function(room, weapon, row, col) {
  if(Session.equals('room', room)) {
    var board = $('.gameboard');
    var target = board.find('.row[data-row="'+ row +'"]');
    target = target.find('.col[data-col="'+ col +'"]');
    target.html('<i class="'+ weapon +'"></i>');
    if(!Session.equals('weapon', weapon)) {
      Session.set('play', true); 
    }
  }
});