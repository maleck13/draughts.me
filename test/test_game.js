var gameMan = require('../lib/gamemanager.js');
var assert = require('assert');
var players = require('./testfixtures/players.js');
var plyers = players.getPlayers();
var game;
var moves = require('./testfixtures/moves.js');
var context = 0;
describe("create a new game" , function () {
  it("should create a new valid game ", function (){
    gameMan().createGame({players:plyers},function (err, newgame) {
      assert(err === null);
      console.log("got game", newgame.id);
      assert(newgame !== null);
      game = newgame;
    });
  });
  
 it("should make a move on the new game", function (){
   game.on('error', function (err){
     console.log(err);
   });
   gameMan().startGame(game.getId(), plyers[0].playerName, function (err, data) {
     assert(err === null);
     gameMan().startGame(game.getId(),plyers[1].playerName, function (err, data){
       assert(err === null);
       console.log("GAME STARTED ------------------------------\n");
       
       for(var i = 0; i < moves.length; i++){
         game.processMove(moves[i]);
         var sq = game.getBoardSquare(moves[i].endpos.x + "-" + moves[i].endpos.y);
         assert(sq);
         assert(sq.piece !== undefined);
         var oldsq = game.getBoardSquare(moves[i].startpos.x + "-" + moves[i].startpos.y);
         assert(oldsq);
         assert(oldsq.piece === undefined);
       }
       
       console.log("--<<<<<<<<<<<  GAME ENDED >>>>>>>>>>>------ DEAD PIECES >>>>>>> ", game.removedPieces , "\n\n");
     });
   });
   
   
 }); 
});




