function PieceFactory(){
    var STATICID = 0;
    var self = {
        'createPiece':function(colour, pos)
        {
            return new Piece(colour, pos, STATICID++);
        }
    }
    return self;
}

