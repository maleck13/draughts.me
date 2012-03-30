var gameMan = require('../lib/gamemanager.js');
var assert = require('assert');
var players = require('./testfixtures/players.js');
var plyers = players.getPlayers();
var game;

describe("create a new game" , function () {
  it("should create a new valid game ", function (){
    gameMan().createGame({players:plyers},function (err, newgame) {
      assert(err === null);
      console.log("got game", newgame);
      assert(newgame !== null);
      game = newgame;
    });
  });  
});


