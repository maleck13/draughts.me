/**
 * Created by JetBrains WebStorm.
 * User: craigbrookes
 * Date: 07/03/2012
 * Time: 21:50
 * To change this template use File | Settings | File Templates.
 */
var events = require('events');
var util = require('util');
var validate = require('underscore');
var gameUtil = require('../lib/gameUtils');

var GAME_EXCEPTION = {

};


function Game (board, players, opts) {
  events.EventEmitter.call(this);
  if (!validate.isArray(players) && players.length < 1) throw {name : "NoPlayers", message : "You need at least one player"};
  this.board = board;
  this.players = [];
  this.id = gameUtil.createUID();
  this.created = new Date().getTime() / 1000;
  this.created = this.created.toFixed(0);
  this.turn = 0;
  this.activeplayer = "red";
  this.started = false;
  this.timeouts = {};

  for (var i = 0; i < players.length; i++) {
    this.addPlayer(players[i]);
  }

  this.addListener('error', function (err) {
    if (this.players[0] && this.players[0].notify)this.players[0].notify({name : "error", data : err});
    if (this.players[1] && this.players[1].notify)this.players[1].notify({name : "error", data : err});
  });
  this.addListener(this.events.GAME_START, function (info) {
    console.log("listener recieved game started");
    if (this.players[0] && this.players[0].notify) this.players[0].notify({name : "gamestarted", data : info});
    if (this.players[1] && this.players[1].notify)this.players[1].notify({name : "gamestarted", data : info});
  });
  this.addListener(this.events.GAME_ENDED, function (info) {
    this.players[0].activegame = undefined;
    this.players[1].activegame = undefined;
    if (this.players[0] && this.players[0].notify)this.players[0].notify({name : "gameended", data : info});
    if (this.players[1] && this.players[1].notify) this.players[1].notify({name : "gameended", data : info});
  });

  this.removedPieces = [];
}

Game.prototype = Object.create(events.EventEmitter.prototype);

Game.prototype.getBoard = function () {
  return this.board;
}
Game.notifyPlayers = function (notification) {
  if(notification && notification.hasOwnProperty("name") && notification.hasOwnProperty("data")){
    this.players.forEach(function (plyr) {
      plyr.notify(notification);
    });
  }
};

Game.prototype.getPlayers = function () {
  return this.players;
};

Game.prototype.getBoardSquare = function (sqId) {
  var len = this.board.squares.length;
  var currentSq;
  for (var i = 0; i < len; i++) {
    currentSq = this.board.squares[i];
    if (currentSq && currentSq.id() === sqId) return currentSq;
  }
  return undefined;
};

Game.prototype.getId = function () {
  return this.id;
};

Game.prototype.getPlayer = function (name) {
  if (this.players && this.players.length > 0) {
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].playerName === name) {
        return this.players[i];
      }
    }
  }
  return;
};

Game.prototype.start = function (playername) {
  //check game ready to start
  if (this.started) return;
  var player = this.getPlayer(playername);
  if (!player) {
    console.log(this.players);
    this.emit('error', "no player found " + playername, 500);
    return;
  }

  player.ready = true;

  console.log("starting game " + this.players.length, this.players);
  if (this.players && this.players.length === 2) {
    console.log("there are two players");
    if (this.players[0].ready && this.players[1].ready) {
      console.log("both players are ready ");
      this.started = new Date().getTime().toFixed(0) / 1000;
      this.emit(this.events.GAME_START, {id : this.id});
      this.started = true;
      return;
    }
    else this.emit("error", {id : this.id, msg : "players not ready"});
  }
  this.emit("waiting", "game not ready " + this.id);

};

Game.prototype.setUp = function () {
  var self = this;
  this.created = new Date().getTime() / 1000;
  this.created = this.created.toFixed(0);
  console.log("set up called ");
  this.emit("ready", this);
  return (this);
};

Game.prototype.end = function () {
  this.emit(this.events.GAME_ENDED, {id : this.id, players : this.players});
}


Game.prototype.processMove = function (move) {
  if (!this.started) {
    this.emit('error', "game has not started yet");
    return;
  }
  var that = this;
  console.log("processing move", move);
  if (gameUtil.validateMove(move)) {
    var fromId = move.startpos.x + "-" + move.startpos.y;
    var sq = this.getBoardSquare(fromId);
    if (sq) {
      for (var i = 0; i < sq.neighbours().length; i++) {
        var neighbour = sq.neighbours()[i];
        if (neighbour.x === move.endpos.x && neighbour.y === move.endpos.y) {
          if (!neighbour.legal) {
            this.emit('error', "Illegal Move, Is Neighbour but not diagonal", move);
            return;
          }

          var moveto = this.getBoardSquare(neighbour.x + "-" + neighbour.y);
          if (!moveto) this.emit('error', "no move to square found");
          moveto.piece = sq.piece;
          console.log("moving piece " + sq.piece + " from " + move.startpos.x + "-" + move.startpos.y + " to " + move.endpos.x + "-" + move.endpos.y);
          sq.piece = undefined;
          this.emit("completed", move);
          this.activeplayer = (this.activeplayer == "red") ? "black" : "red";
          return;
        }
      }
      if (move.takes && move.takes.length > 0) {
        console.log("processing takes");
        move.takes.forEach(function (sqloc, ind) {
          var jumpedsq = that.getBoardSquare(sqloc.x + "-" + sqloc.y);
          if (jumpedsq.occupied() && jumpedsq.piece.side !== sq.piece.side && jumpedsq.piece.rank <= sq.piece.rank) {
            console.log("PIECE TAKEN !!", jumpedsq.piece);
            that.removedPieces.push(jumpedsq.piece);
            console.log("removed pieces ", that.removedPieces);
            jumpedsq.piece = undefined;
            var landing = that.getBoardSquare(move.endpos.x + "-" + move.endpos.y);
            if (landing && landing.occupied() === false) {
              landing.piece = sq.piece;
              sq.piece = undefined;
              that.emit('completed', move);
            } else that.emit('error', "illigal move");
          }
        });
      } else this.emit('error', "illigal move " + move);
      // no neighbour found need to chck the takes array process each take is valid
      // also need to check if a take was avaible,cos that piece needs to be removed.
      // maybe after each move an array of all possible moves should be made?
    } else this.emit("error", "invalid move no square");

  } else this.emit("error", "invalid move");
};

Game.prototype.getPlayers = function () {
  return this.players;
}

Game.prototype.addPlayer = function (player) {
  var self = this;
  if (this.players.length < 2) {
    player.activegame = this.getId();
    this.players.push(player);
    if (this.players.length === 2) {
      console.log("** TWO PLAYERS ** EMIT READY ** STOP INTERVALS");
      this.emit(this.events.GAME_READY, this.id);
      if (this.timeouts.waitingForPlayer) clearInterval(this.timeouts.waitingForPlayer);
      return;
    } else {
      console.log("only one player emitting event ");
      self.timeouts.waitingForPlayer = setInterval(function () {
        self.emit("waiting", {message: "waiting for another player to join", code:100,id:self.getId()});
        self.players.forEach(function (ply) {
          if (ply && ply.notify) ply.notify({name : "waiting", data : "waiting for another player to join"});
        });
      }, 1500);
    }
  }
  else {
    this.emit("error", "no more players can be added to game " + this.id);
    return;
  }


};

Game.prototype.removePlayer = function (player) {
  player.activegame = undefined;
  for (var i = 0; i < this.players.length; i++) {
    var pl = this.players[i];
    if (pl.connection.id === player.connection.id) {
      this.players.splice(i);
      break;
    }
  }
};

Game.prototype.pieceCanBeTaken = function (piece) {

};

Game.prototype.events = {
  GAME_ENDED : "gameended",
  GAME_START : "gamestarted",
  GAME_READY : "gameready"
};

module.exports = Game;



