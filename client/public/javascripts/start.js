$(document).ready(
    function(){
        Engine.init("myDrawing");
        var factory = PieceFactory();
        var position;
        var piece;
        for(j=1;j<=1;j++)
        {
            for(i=1;i<=1;i++)
            {
                position = new Position(i, j);
                piece = factory.createPiece("333333", position);
                console.log(piece);
                piece.animated = false;
                Engine.addObject(piece);
            }
        }
    }
);

