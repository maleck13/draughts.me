/**
 * Created by JetBrains WebStorm.
 * User: craigbrookes
 * Date: 19/03/2012
 * Time: 14:16
 * To change this template use File | Settings | File Templates.
 */
var assert = require('assert');
var gameMan = require('../server/lib/gamemanager.js');

describe("verify a game is ok", function (){
   it("should create a game and preform a move without validation error", function(){
      var game = gameMan().startGame();
       
   });
    
   it("should create a game and perform an illigal move causing validation error", function () {
       
   }); 
    
   it("should not have any moves outside of 7 or 0", function () {
        var game = gameMan().startGame();
        var length =    game.squares.length;
        assert(length === 64);
        for(var i =0; i < length; i++){
            assert(game.squares[i].neighbours().length >= 3);
            var nlength = game.squares[i].neighbours().length;
            for(var j = 0; j < nlength; j++){
                var neighb =  game.squares[i].neighbours()[j];
                console.log("checking neighbour ", neighb, "for square" , game.squares[i]);
                assert(neighb.x <8 && neighb.y < 8,"x or y not less than 7 " + neighb.x + "-" + neighb.y);
               // assert(neighb.x > 0 && neighb.y > 0);
            }
        }
   });
});