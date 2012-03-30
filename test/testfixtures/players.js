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

function Socket(){
   events.EventEmitter.call(this); 
}
util.inherits(Socket,events.EventEmitter);

exports.getPlayers = function (){
    
   var players = [];
  var ply;
  var sock = new Socket();
  for(var i =0; i < 2; i++){
      ply = new Player({playername:"player"+i,socket:sock,side:(i % 2 === 0)?'red':'black'});
      players.push(ply);
  }
  return players;  
};