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
var boards = {overallGameCount:0, activeGameCount:0};
var gameUtil = require('./gameUtils');
var util = require('util');

module.exports = function (opts) {
  //private functions and vars

  /**
   * @PRIVATE
   * @DESCRIPTION:
   * responsible for creating all the squares that make up a board
   */
  function createBoard() {
    var board = {squares:[]};

    for (var x = 0; x < 8; x++) {
      for (var y = 0; y < 8; y++) {
        var asquare = square({x:x, y:y});
        if (asquare.position.x === 0 || asquare.position.x === 1 || asquare.position.x === 6 || asquare.position.x === 7) {
          var colour = (asquare.position.x === 0 || asquare.position.x === 1) ? "red" : "black";
          asquare.piece = new pieces.Piece({side:colour});
        }
        board['squares'][board['squares'].length] = asquare;
      }
    }
    board.id = createGameCheck(board);
    board.asJson = function () {
      var json = [];
      board.squares.forEach(function (sq, inx) {
        json[json.length] = sq.asJson();
      });
      return json;

    };
    return board;
  }

  /**
   * @description creates a hash of the board state to check against
   * @param board
   */
  function createGameCheck(board) {
    return  crypto.createHash('md5').update(board.toString()).digest("hex");
  }


  function verifyGameId(gameid, players) {
  }

  function validateMoveData(move) {
    var valid = (move && move.hasOwnProperty('startpos') && move.hasOwnProperty('endpos'));
    valid = (valid && move.startpos.hasOwnProperty('x') && move.startpos.hasOwnProperty('y') && move.endpos.hasOwnProperty('x')
      && move.endpos.hasOwnProperty('y'));
    return valid;
  }

  function verifyBoard(gameid, board) {
    if (boards.hasOwnProperty(gameid)) {
      //boards prev state should match current state
      var chkBoard = boards.gameid;
      return (createGameCheck(board) === createGameCheck(chkBoard));
    }
    return false;
  }
  
  function getBoard(id) {
    return boards[id];
  }

  //public api
  var self = {
    "createGame":function (opts, cb) {
      if ('function' !== typeof cb) throw new Error("start game requires a callback function to be passed");
      
      if (!opts || !opts.players || opts.players.length < 1) 
        return cb("You need at least one player to create a game");
      var board = createBoard();
      var gameid = gameUtil.createUID();
      
      //console.log("starting game on board " + board.id + " with gameid "+gameid);
      board.gameid = gameid;
      board.players = opts.players;
      boards[gameid] = board;
      return cb(null,board);

    },
    "startGame":function (gameid, cb) {
      //poss move some of this to redis in future
      if ('function' !== typeof cb) throw new Error("start game requires a callback function to be passed");
      //once game started ok up active game count
      var board  = boards[gameid];
      boards.activeGameCount++;
      boards.overallGameCount++;
      console.log("returning game " + board.gameid);
      return cb(null, board);
    },
    "processMove":function (gameid, move, cb) {
      if (validateMoveData(move)) {
        self.queryBoard(gameid, move.startpos.x+"-"+move.startpos.y, function (err,sq){
           if(err)return cb(err);
           if(! sq.occupied()) return cb("there is no peice on that square");
           var neighbours = sq.neighbours();
           var ilen = neighbours.length;
           for(var i =0; i < ilen; i++){
             //if end pos is a neighbour and not occupied then simple set the piece and remove it from the current sq
           self.queryBoard(gameid,neighbours[i].x.toString()+"-"+neighbours[i].y.toString(), function(err,square){
               if(square.position.x === move.endpos.x && move.endpos.y === square.position.y){
                 if(square.occupied()) return cb("that square is occupied");
                 else{
                   square.piece = sq.piece;
                   sq.piece = undefined;
                   return cb(null,"ok");
                 }
               }
             });
             
           }
        });
        //make move and return updated board
        //if move ok update the check hash and return ok to cb else err
      } else throw new Error(EXCEPTIONS.GAME_EXCEPTIONS.MOVE_EXCEPTION());
    },
    queryBoard:function (gameid, squareid, cb) {
      if (boards[gameid]) {
        var board = boards[gameid];
        var max = board.squares.length;
        for (var i = 0; i < max; i++) {
          if (board.squares[i].id() == squareid) {
            return cb(null, board.squares[i]);
          }
        }
      }
      return cb("no square", null);
    },
    getAvailableGames:function () {

    }
  };
  return self;
};



    
    