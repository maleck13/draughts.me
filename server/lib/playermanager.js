/**
 * Created by JetBrains WebStorm.
 * User: craigbrookes
 * Date: 07/03/2012
 * Time: 20:01
 * To change this template use File | Settings | File Templates.
 */
var Player = require('../models/player.js');
exports.playermanager = function (opts) {
    var players = {};
    var self = {
        addPlayer : function (data, cb){
            console.log("adding player "+data.playername);
            try{
                var player = new Player(data);
                console.log("made new player");
                player.on(player.events.PLAYER_LEFT,self.removePlayer);
                console.log("adding player to active players");    
                players[player.playerName] = player;
                console.log("calling cb");
                if('function' === typeof cb) return cb(null,player);
            }catch(e){
                if(e.name === "PlayerException"){
                    
                } 
            }
        },
        removePlayer : function (player) {
            console.log("removing player");
        }
    };
    return self;
};