var events = require('events');
var util  = require('util');



function Player (opts) {
    var self = this;
    console.log("made new player");
    this.playerName = opts.playername;
    this.connection = opts.socket;

    events.EventEmitter.call(this);
    
    this.connection.on('disconnect', function () {
        self.left();
    });
};

util.inherits(Player,events.EventEmitter);

Player.prototype.notify = function (notification,cb) {
  this.connection.emit(notification.name,notification.data);
  if('function' === typeof cb) return cb();
};

Player.prototype.left = function (){
    console.log("left called");
    this.emit(this.events.PLAYER_LEFT,this);
}

    
Player.prototype.events = {
   PLAYER_LEFT: "playerleft"
}    

module.exports = Player;