var square = require('./square');
var gameUtil = require('../lib/gameUtils.js');
function Piece (opts) {
    this.type = "man";
    this.side = opts.side;
    this.id   = gameUtil.createUID();
    this.position   = opts.position;
    this.rank   = 1;
}; 

Piece.prototype.Take = function (cb) {
    console.log("will take");
};

Piece.prototype.setPosition = function (sqpos){
  this.position = sqpos;
};
Piece.prototype.toString = function () {
  return this.type + " "+ this.side;  
};

Piece.prototype.asJson = function () {
  return {
    type:this.type,
    side:this.side,
    id : this.id,
    position : this.position
  };
};
exports.Piece = Piece;