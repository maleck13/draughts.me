/**
 * Created by JetBrains WebStorm.
 * User: craigbrookes
 * Date: 07/03/2012
 * Time: 20:01
 * To change this template use File | Settings | File Templates.
 */
var Player = require('../models/player.js');
exports.playermanager = playerManager({});

function playerManager (opts) {
    var players = {};
    var self = {
        addPlayer : function (data, cb){
            console.log("adding player "+data.playername);
            try{
                var player = new Player(data);
                player.on(player.events.PLAYER_LEFT,self.removePlayer);    
                players[player.playerName] = player;
                console.log(players);
                
                if('function' === typeof cb) return cb(null,player);
            }catch(e){
                if(e.name === "PlayerException"){
                    
                } 
            }
        },
        removePlayer : function (player, cb) {
            console.log("removing player");
            player.ready = false;
            //start some kind of timer to end the game
        },
        "getPlayer": function (name, cb) {
           console.log("looking for player " + name);
            console.log(players);
           if(players.hasOwnProperty(name)){
             console.log("found player");
             return cb(null,players[name]);
           }
          
          return cb();
        }
    };
    return self;
};