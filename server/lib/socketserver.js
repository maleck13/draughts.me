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
     socket.emit('ready');
     socket.on('addplayer', function (data){  
        data.socket = socket; 
        manager.playermanager().addPlayer(data, function (err,player){
            console.log("in callback");
           player.notify({name:'added',data:{ hello: 'world' }});     
       });
     });
      
     socket.on('joingame', function (data){
       
     });
      
     socket.on('startgame',function (data){
        if(data.players && data.players.length ===2){
            gameMan().startGame(data);
        }   
     });   
        
    });
};

function errorHandler(socket, error){
    socket.emit("error",error);
}
