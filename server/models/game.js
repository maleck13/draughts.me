/**
 * Created by JetBrains WebStorm.
 * User: craigbrookes
 * Date: 07/03/2012
 * Time: 21:50
 * To change this template use File | Settings | File Templates.
 */
var events = require('events');
var util = require('util');

function Game(opts){
   events.EventEmitter.call(this);    
}

util.inherits(Game,events.EventEmitter);

Game.prototype.startNewGame = function (opts) {
    //make game pass game and emit
    var game = {};
    this.emit(this.events.GAME_START,game);    
};
    
Game.prototype.endGame = function (opts) {
   //clean up game
   var data = {}; 
   this.emit(this.events.GAME_ENDED,data); 
};

Game.prototype.events = {
  GAME_ENDED : "gameended",
  GAME_START : "gamestarted"  
};

module.exports = Game;
