/**
 * Created by JetBrains WebStorm.
 * User: craigbrookes
 * Date: 25/03/2012
 * Time: 19:52
 * To change this template use File | Settings | File Templates.
 */
var Player = require('../../models/player.js');
var events = require('events');
var util = require('util');
var playerManager = require('../../lib/playermanager.js');

function Socket(){
   events.EventEmitter.call(this); 
   return (this);
}
Socket.prototype = Object.create(events.EventEmitter.prototype);

exports.getPlayers = function (){
    
   var players = [];
  var ply;
  var sock = new Socket();
  sock.on('error', function (err){
    console.log("an error was emmitted to the player");
    console.log(err);
  });
  for(var i =0; i < 4; i++){
      ply = new Player({playername:"player"+i,socket:sock,side:(i % 2 === 0)?'red':'black'});
      playerManager.playermanager.addPlayer({playername:"player"+i,socket:sock,side:(i % 2 === 0)?'red':'black'}, function (err,ok){
        
      });
      ply.on('error', function (err){
        
      });
      players.push(ply);
  }
  return players;  
};