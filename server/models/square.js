var square = function (opts) {
     var self = {
      occupied : false,
      position : {x:'',y:''},
      piece : undefined,   
      isEdge : function (){
         var pos = self.position; 
         return (pos.y===1 || pos.y===8 || pos.x===1 || pos.x ===8); 
      },
      legalMoves : [],
      neighbours : []  
    };
    return self;
};

module.exports = square;