var gameMan = require('../server/lib/gamemanager.js');
var assert = require('assert');
var players = require('./testfixtures/players.js');
var plyers = players.getPlayers();
var board = {};


describe('borad create', function () {
   it('should create a board with 64 sqaures and 16 pieces', function (){
      gameMan().createGame({players:plyers}, function (err,game){
        assert.equal(game.squares.length, 64);
        board = game;
      });
       
   });
});

describe('check edges', function () {
    it('should have 28 edge squares',function () {
        var edges = 0;
      gameMan().createGame({players:plyers}, function (err,game){
        for(var i = 0; i < game.squares.length; i++){
            if(game.squares[i].edge().isEdge) edges++;
        }
        assert.equal(28,edges);
      });
    });
});

describe('query board test', function () {
   it('should find a valid square', function () {
     gameMan().createGame({players:plyers}, function (err,game){
      gameMan().queryBoard(game.gameid,"1-1", function (err, sq){
          console.log(sq);
          assert(err === null);
          assert(sq.id() === "1-1");
      }); 
     });
   }); 
});
