var square = require('./square');

function Piece (opts) {
    this.type = "man";
    this.side = opts.side;
};

Piece.prototype.Take = function () {
    console.log("will take");
};

Piece.prototype.toString = function () {
  return this.type + " "+ this.side;  
};

exports.Piece = Piece;