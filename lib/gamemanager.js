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
var games = {overallGameCount:0, activeGameCount:0};
var availableGames = {};
var util = require('util');
var Game = require('../models/game.js');
var playerMan = require('./playermanager.js');

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
        if (asquare.position.y === 0 || asquare.position.y === 1 || asquare.position.y === 6 || asquare.position.y === 7) {
          var colour = (asquare.position.y === 0 || asquare.position.y === 1) ? "red" : "black";
          asquare.piece = new pieces.Piece({side:colour, sq:asquare.position});
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

  function verifyBoard(gameid, board) {
    if (boards.hasOwnProperty(gameid)) {
      //boards prev state should match current state
      var chkBoard = boards.gameid;
      return (createGameCheck(board) === createGameCheck(chkBoard));
    }
    return false;
  }
  
  function getBoard(id) {
    return games[id].getBoard();
  }

  //public api
  var self = {
    "createGame":function (opts, cb) {
      if ('function' !== typeof cb) throw new Error("start game requires a callback function to be passed");
      if (!opts || !opts.players || opts.players.length < 1) 
        return cb("You need at least one player to create a game");
      console.log("making new game");
      var game              = new Game(createBoard(),opts.players);      
      game.on('error', handelError);
      game.on(game.events.GAME_ENDED, function (gamedata){
        console.log("ended",gamedata);
        games.activeGameCount--;
      });
      game.on(game.events.GAME_START, function (gamedata){
        delete availableGames[gamedata["id"]];
        
        console.log("started",gamedata);
      });
      game.on('ready', function(game){
        console.log("game ready");
        
        if(game.players.length == 2){ 
          games[game.getId()] = game;
          games.activeGameCount++;
        }
        else {
          availableGames[game.getId()] = game;
        }
        games.overallGameCount++;
        return cb(null,game);  
      });
      game.setUp();
      

    },
    reconnectPlayerToGame : function () {
      
    },
    "startGame":function (gameid, playername, cb) {
      //poss move some of this to redis in future
      if ('function' !== typeof cb) throw new Error("start game requires a callback function to be passed");
      //once game started ok up active game count
      self.getGame(gameid, function (game){
        if(!game) return cb("no game with id "+ gameid + "found");
        delete availableGames[game.getId()];
        games[game.getId()] = game;
        playerMan.playermanager.getPlayer(playername, function(err, play){
          if(err)return cb(err);
          if(play)play.ready = true;
          console.log(play);
          game.start();
          return cb(null, game);
        });
        
      });      
    },
    getAvailableGame : function (cb) {
      var avgame;
      var stamp = new Date().getTime() / 1000;
      stamp = Number(stamp.toFixed(0));
      for(var game in availableGames){
        if(availableGames.hasOwnProperty(game)){
          console.log("checking available games", availableGames);
          var retGame = availableGames[game];
          console.log(retGame.created, Number(game.created) < stamp);
          if(Number(retGame.created) && Number(retGame.created) < stamp){
            avgame = retGame;
            stamp = Number(retGame.created);
          }
          
        }
      }
      return cb(null, avgame);
    },
    addPlayerToAvailableGame : function (playername,cb){
      var player = playerMan.playermanager.getPlayer(playername, function (err,player){
         console.log("got player " + player.playerName);
          self.getAvailableGame(function (err, game){
             if(err){
               console.log(err);
             }
            if(! game){ 
              console.log("no game making new game");
              self.createGame({players:[player]},function (err, game){
                 console.log("made new game "+ game.getId());  
                 return cb(err, game);
              });
            }else{
               game.addPlayer(player);
               console.log("game has players ", game.getPlayers());
               game.start();
               
               return cb(null,game);
               
            }
          });  
      });
    },
    getGame : function (gameid , cb){
      if(availableGames[gameid])return cb(availableGames[gameid]);
      else if(games[gameid])return cb(games[gameid]);
      return cb();
    }
  };
  return self;
};

function handelError(errinfo){
  console.log(errinfo);
  console.log("game error occurred with game " + errinfo);
  
}

    
    