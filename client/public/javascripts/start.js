$(document).ready(
    function(){
        Engine.init("myDrawing");
        var factory = PieceFactory();
        var position;
        var piece;
        for(j=1;j<=7;j++)
        {
            for(i=1;i<=15;i++)
            {
                position = new Position(i*50, j*50);
                piece = factory.createPiece("#ff0000", position);
                
                Engine.addObject(piece);
            }
        }
        
       $('a#start').click(function (){
          console.log("game start");
          socket.emit("startgame",{game:gameid,player:player});
          return false;
       }) 
    }
);

