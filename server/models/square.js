var square = function (opts) {
     var self = {
      occupied : function(){
          return (self.piece);
      },
      position : {x:'',y:''},
      piece : undefined,   
      edge : function (){
         var pos = self.position; 
         return{ isEdge:  (pos.y===1 || pos.y===8 || pos.x===1 || pos.x ===8), 
             edges:(function () {
                var edges = {};
                //find corners 
                if(pos.y === 1 && pos.x ===1 || pos.y ===8 && pos.x ===1 || 
                    pos.y===8 && pos.x === 8 || pos.x ===8 && pos.y ===1 ){
                    edges.sides = 2;
                    edges.isCorner = true;
                }else if(this.isEdge){
                    edges.isCorner = false;
                    edges.sides =1;
                } 
                return edges;
            }())
         }; 
      },
      legalMoves : [],
      neighbours : function () {
          //all edges except corners have 5 adjacent squares
          // all corners have 3 adjacent squares
          // others have 8
          var neighbourSquares = [];
          var edgeinfo = self.edge().edges;
          if(edgeinfo.isCorner){
              
          }else if(edgeinfo.isEdge && ! edgeinfo.isCorner){
              
          }else{
              
          }
          return neighbourSquares;
           
      }  
    };
    return self;
};

module.exports = square;