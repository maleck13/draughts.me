/**
 *
 * Note boardid is sent from client
 * board state verified here
 * move sent from client with boardid
 * board verified. move processed. board state hash updated
 */

var square = require('../models/square.js');
var pieces = require('../models/piece.js');
var crypto = require('crypto');
var EXCEPTIONS = require('./exceptions.js');
var boards = {overallGameCount : 0,activeGameCount:0};

module.exports = function (opts) {    
    
    var self = {
        "startGame" : function () {
            //poss move some of this to redis in future
            var board = self.createBoard();
            console.log("starting game on board " + board.id);
            boards[createGameId()] = board;
            
            //once game started ok up active game count
            boards.activeGameCount++;
            boards.overallGameCount++;
        },
        "createBoard" : function () {
           var board = {squares:[]};
         
           for(var x =1; x < 9; x++){
             for(var y=1; y<9; y++){
                var asquare = square();
                 asquare.position.x = x;
                 asquare.position.y = y;
                 if(asquare.position.x === 1 || asquare.position.x ===2 || asquare.position.x === 7 || asquare.position.x === 8 ){
                     var colour     = (asquare.position.x === 1 || asquare.position.x === 2) ? "red" : "black";
                     asquare.piece  = new pieces.Piece({side:colour}); 
                 }
                 board['squares'][board['squares'].length] = asquare ;
             }  
           }
           board.id = createGameCheck(board); 
           return board; 
        },
        "processMove" : function (gameid,move){
            if(move.hasOwnProperty('startpos') && move.hasOwnProperty('endpos') && move.hasOwnProperty('piece')){
                
            }else throw new Error(EXCEPTIONS.GAME_EXCEPTIONS.MOVE_EXCEPTION());
        }
    };
    return self;
};


function createGameCheck(board){
   return  crypto.createHash('md5').update(board.toString()).digest("hex");
}

function createGameId(){
   var rand = new Date().getTime() + Math.random(); 
   return crypto.createHash('md5').update(rand.toString()).digest('hex');
}

function verifyGameId(gameid, players) {
    
}

function verifyBoard(gameid,board){
    if(boards.hasOwnProperty(gameid)){
        //boards prev state should match current state
        var chkBoard = boards.gameid; 
        return (createGameCheck(board) === createGameCheck(chkBoard));
    }
    return false;
}
    
    