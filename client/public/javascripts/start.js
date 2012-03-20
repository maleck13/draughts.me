$(document).ready(
    function(){
        Engine.init("myDrawing");
        var factory = PieceFactory();
        var position = new Position(50, 50);
        var piece = factory.createPiece("#ff0000", position);
        Engine.addObject(piece);
    }
);

