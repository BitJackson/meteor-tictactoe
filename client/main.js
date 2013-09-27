var clearGameSession = function(msg, room) {
  if(Session.equals('room', room)) {
    alert(msg);
    Session.set('enemy', null);
    Session.set('room', null);
    Session.set('weapon', GameLogic.X);
    $('.gameboard').empty();
    $('.opponents').html(Meteor.render(Template.onlines));
  }
}

var checkGameOver = function(status) {
  if(status) {
    var user = Session.get('user');
    var enemy = Session.get('enemy');
    var room = Session.get('room');
    if(status === GameLogic.D) {
      GameStream.emit('draw', user);
      alert('Empate!');
    } else {
      if(status === Session.get('weapon')) {
        GameStream.emit('winner', user);
        alert('Vencedor: '+ user);
      } else {
        GameStream.emit('loser', user);
        alert('Perdedor: '+ user);
      }
    }
    GameStream.emit('gameover', user, enemy, room);
  }
}

var changeUserPlay = function(room, weapon) {
  if(Session.equals('room', room) && Session.equals('weapon', weapon)) {
    Session.set('play', true);
  }
}

GameStream.on('request', function(user, enemy, room) {
  if(Session.equals('user', user)) {
    if(confirm('Deseja jogar com '+ enemy +'?')) {
      Session.set('enemy', enemy);
      Session.set('weapon', GameLogic.O);
      Session.set('room', room);
      Session.set('play', false);
      $('.gameboard').html(Meteor.render(Template.game));
      GameStream.emit('start', user, enemy, room, GameLogic.X);
    } else {
      GameStream.emit('cancel', 'Jogo cancelado', room);
    }
  }
});

GameStream.on('end', function(msg, room) {
  clearGameSession(msg, room);
});

GameStream.on('play', function(room, weapon) {
  changeUserPlay(room, weapon);
});

GameStream.on('refresh', function(room, weapon, row, col, status) {
  if(Session.equals('room', room)) {
    var board = $('.gameboard');
    var target = board.find('.row[data-row="'+ row +'"]');
    target = target.find('.col[data-col="'+ col +'"]');
    target.html('<i class="'+ weapon +'"></i>');
    checkGameOver(status);
    if(!Session.equals('weapon', weapon)) {
      Session.set('play', true); 
    }
  }
});