/**
 * Created by JetBrains WebStorm.
 * User: craigbrookes
 * Date: 07/03/2012
 * Time: 21:46
 * To change this template use File | Settings | File Templates.
 */

var square = require('../models/square.js');
var pieces = require('../models/piece.js');
module.exports = function (opts) {
    var games = [];
    
    var self = {
        "startGame" : function (opts) {
            console.log("starting game");
        },
        "createBoard" : function () {
           var squares = [];
         
           for(var x =1; x < 9; x++){
             for(var y=1; y<9; y++){
                var asquare = square();
                 asquare.position.x = x;
                 asquare.position.y = y;
                 if(asquare.position.x === 1 || asquare.position.x ===2 || asquare.position.x === 7 || asquare.position.x === 8 ){
                     var colour     = (asquare.position.x === 1 || asquare.position.x === 2) ? "red" : "black";
                     asquare.piece  = new pieces.Piece({side:colour}); 
                 }
                 squares.push(asquare);
             }  
           } 
           return squares; 
        }
    };
    return self;
}