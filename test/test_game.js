var gameMan = require('../server/lib/gamemanager.js');
var assert = require('assert');
var players = require('./testfixtures/players.js');
var plyers = players.getPlayers();
var game;

describe("start game ok ", function (){
   it("should start a game with two players ", function () {
         gameMan().startGame({players:plyers}, function (err, game){
         assert(null === err);
         assert(null !== game);
         game = game;     
         assert(game.squares.length === 64);
        
      }); 
   });
  it("should make a move on our new game ", function (){
    var move = {};
  });
});

describe("game should not start", function () {
  it("should fail to start a game", function (){
    var players = {};
    gameMan().startGame(players,function(err,game){
      assert(null !== err);
      assert(null === game);
    });
  });
});
