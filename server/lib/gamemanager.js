/**
 * Created by JetBrains WebStorm.
 * User: craigbrookes
 * Date: 07/03/2012
 * Time: 21:46
 * To change this template use File | Settings | File Templates.
 */

var square = require('../models/square.js');
var piece = require('../models/piece.js');
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
                 squares.push(asquare);
             }  
           } 
           return squares; 
        }
    };
    return self;
}