/**
 * Created by JetBrains WebStorm.
 * User: craigbrookes
 * Date: 06/03/2012
 * Time: 21:44
 * To change this template use File | Settings | File Templates.
 */
var socketio = require('socket.io');
var io;
var Player = require('../models/player.js');
var manager = require('./playermanager.js');
var gameMan = require('./gamemanager.js');

exports.startSocketServer = function(app){
    io = socketio.listen(app);
    
    io.sockets.on('connection', function (socket) {
     socket.emit('ready',"ready");
     //use socket id to find if the player is already part of a game 
     socket.on('addplayer', function (data){  
        data.socket = socket; 
        manager.playermanager.addPlayer(data, function (err,player){
            console.log("in callback");
           player.notify({name:'added',data:{ hello: 'world' }});     
       });
     });
      
     socket.on('joingame', function (data){
       //look for available games with just one player
       //else add player to a new game 
       console.log("joining game with player ", data);
       gameMan().addPlayerToAvailableGame(data.playername, function (err , game){
          socket.emit("gameid", {id:game.getId()});
       });
       
     });
      
     socket.on('joinprivategame', function (data){
       
     }); 
     socket.on('startgame',function (data){
           console.log("starting game " + data.game + " for player " + data.player);
       gameMan().startGame(data.game,data.player, function (err, startedgame){
         console.log(err);
         console.log(startedgame);
       });
     }); 
      
     socket.on('makemove', function (data){
       gameMan().getGame(data.game, function (game){
         if(!game) socket.emit("error","no game with that id "+ data.game);
         game.processMove(data.move);
       });
     }); 
        
    });
};

function errorHandler(socket, error){
    socket.emit("error",error);
}
