/**
 * Created by JetBrains WebStorm.
 * User: craigbrookes
 * Date: 07/03/2012
 * Time: 21:50
 * To change this template use File | Settings | File Templates.
 */
var events      = require('events');
var util        = require('util');
var validate    = require('underscore');
var GAME_EXCEPTION = {
    
};


function Game(players,opts) {
    events.EventEmitter.call(this);
    if(!validate.isArray(players) && players.length === 2) throw {};
}

util.inherits(Game, events.EventEmitter);

Game.prototype.startNewGame = function (opts) {
    //make game pass game and emit
    //maybe each game should be spawned as seperate process?
    var game = {};
    this.emit(this.events.GAME_START, game);
};

Game.prototype.endGame = function (opts) {
    //clean up game
    var data = {};
    this.emit(this.events.GAME_ENDED, data);
};

Game.prototype.events = {
    GAME_ENDED:"gameended",
    GAME_START:"gamestarted"
};

module.exports = Game;
