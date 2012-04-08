var gameMan = require('../lib/gamemanager.js');
var assert = require('assert');
var players = require('./testfixtures/players.js');
var plyers = players.getPlayers();
var game;
var game2;
var moves = require('./testfixtures/moves.js');
var legalmoves = moves.legalmoves;
var illegalmoves = moves.illegalmoves;
var context = 0;
describe("create a new game" , function () {
  it("should create a new valid game ", function (){
    gameMan().createGame({players:[plyers[0],plyers[1]]},function (err, newgame) {
      assert(err === null);
      console.log("got game", newgame.id);
      assert(newgame !== null);
      game = newgame;
    });
    gameMan().createGame({players:[plyers[2],plyers[3]]},function (err, newgame) {
      assert(err === null);
      console.log("got game", newgame.id);
      assert(newgame !== null);
      game2 = newgame;
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
       console.log(legalmoves);
       for(var i = 0; i < legalmoves.length; i++){
         game.processMove(legalmoves[i]);
         var sq = game.getBoardSquare(legalmoves[i].endpos.x + "-" + legalmoves[i].endpos.y);
         assert(sq);
         assert(sq.piece !== undefined);
         var oldsq = game.getBoardSquare(legalmoves[i].startpos.x + "-" + legalmoves[i].startpos.y);
         assert(oldsq);
         assert(oldsq.piece === undefined);
       }
       
       console.log("--<<<<<<<<<<<  GAME ENDED >>>>>>>>>>>------ DEAD PIECES >>>>>>> ", game.removedPieces , "\n\n");
     });
   });
   gameMan().startGame(game2.getId(), plyers[2].playerName, function (err, data) {
     assert(err === null);
     gameMan().startGame(game2.getId(),plyers[3].playerName, function (err, data){
       assert(err === null);
       console.log("GAME STARTED ------------------------------\n");
       console.log(legalmoves);
       for(var i = 0; i < legalmoves.length; i++){
         game2.processMove(legalmoves[i]);
         var sq = game2.getBoardSquare(legalmoves[i].endpos.x + "-" + legalmoves[i].endpos.y);
         assert(sq);
         assert(sq.piece !== undefined);
         var oldsq = game2.getBoardSquare(legalmoves[i].startpos.x + "-" + legalmoves[i].startpos.y);
         assert(oldsq);
         assert(oldsq.piece === undefined);
       }

       console.log("--<<<<<<<<<<<  GAME ENDED >>>>>>>>>>>------ DEAD PIECES >>>>>>> ", game2.removedPieces , "\n\n");
     });
   });
 }); 
  
  
 it("should make a set of illegal moves that fail" , function () {
   game.on('error', function (err){
     console.log(err);
     assert(null !== err);
   });
   console.log(illegalmoves);
   for(var i = 0; i < illegalmoves.length; i++){
     game.processMove(illegalmoves[i]);
     var sq = game.getBoardSquare(illegalmoves[i].endpos.x + "-" + illegalmoves[i].endpos.y);
     assert(sq);
     assert(sq.piece !== undefined);
     var oldsq = game.getBoardSquare(illegalmoves[i].startpos.x + "-" + illegalmoves[i].startpos.y);
     assert(oldsq);
     assert(oldsq.piece === undefined);
   }
 }); 
});




