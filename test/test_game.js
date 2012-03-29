var gameMan = require('../server/lib/gamemanager.js');
var assert = require('assert');
var players = require('./testfixtures/players.js');
var plyers = players.getPlayers();
var game;

describe("create a new game" , function () {
  it("should create a new valid game ", function (){
    gameMan().createGame({players:plyers},function (err, newgame) {
      assert(err === null);
      assert(newgame !== null);
      game = newgame;
    });
  });  
});


describe("make move on new game", function () {
  it("should make a valid move", function (){
     gameMan().processMove(game.gameid,{startpos:{x:1,y:1},endpos:{x:2,y:2}}, function (err,suc){
       gameMan().queryBoard(game.gameid,"2-2", function (err, sq){         
          assert(true === sq.occupied());
       });
       assert(null === err);
       assert("ok" === suc);
     });
  });
});
