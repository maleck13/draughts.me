var square = require('./square');
var gameUtil = require('../lib/gameUtils.js');
function Piece (opts) {
    this.type = "man";
    this.side = opts.side;
    this.id   = gameUtil.createUID();
}; 

Piece.prototype.Take = function () {
    console.log("will take");
};

Piece.prototype.toString = function () {
  return this.type + " "+ this.side;  
};

exports.Piece = Piece;