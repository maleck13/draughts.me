var square = function (opts) {
     var self = {   
      occupied : function(){
          if(self.piece) return true;
          else return false;
      },
      position : {x:opts.x,y:opts.y},
      id : function (){return self.position.x + "-" + self.position.y},   
      piece : undefined,
      edge : function (){
         var pos = self.position; 
         var isEdge = (pos.y===0 || pos.y===7 || pos.x===0 || pos.x ===7);
         return{ isEdge:  isEdge, 
             isCorner:(function () {
                var edges = {};
                //find corners 
                if(pos.y === 0 && pos.x ===7 || pos.y ===7 && pos.x ===0 || 
                    pos.y===7 && pos.x === 7 || pos.x ===0 && pos.y ===0 ){
                    return true;
                }
                return false;
                
            }())
         }; 
      }, 
      neighbours : function () {
          //all edges except corners have 5 adjacent squares
          // all corners have 3 adjacent squares
          // others have 7
          
          var edgeinfo = self.edge();
          var x = self.position.x;
          var y = self.position.y;
          if(edgeinfo.isCorner){
              //corner will always be 0,7 or 7,7 7,0 0,0
              if(self.position.x === 7 && self.position.y === 7) return [{x:7,y:7},{x:7,y:7},{x:7,y:7}];
              else if(self.position.x === 0 && self.position.y === 0) return [{x:0,y:1},{y:0,x:1},{x:1,y:1}];
              else if(self.position.x === 7 && self.position.y === 0)return [{x:7,y:1},{x:7,y:7},{y:1,x:7}];
              else if(self.position.x === 0 && self.position.y === 7)return [{y:7,x:1},{y:7,x:7},{x:1,y:7}];
          }else if(self.edge().isEdge && ! edgeinfo.isCorner){
              // alway be plus one minus one on the edge axis
              // and plus one plus one minus one plus one plus one on non edge axis
              if(self.position.x === 7) return [{x:x,y:y -1},{x:x,y:y+1},{x:x-1,y:y},{x:x-1,y:y-1},{x:x-1,y:y+1}];
              else if(self.position.x === 0) return [{x:x,y:y-1},{x:x,y:y+1},{x:x+1,y:y},{x:x+1,y:y-1},{x:x+1,y:y+1}];
              else if(self.position.y === 7) return [{y:y,x:x-1},{y:y,x:x+1},{y:y-1,x:x},{y:y-1,x:x-1},{y:y-1,x:x+1}];
              else if(self.position.y === 0) return [{y:y,x:x-1},{y:y,x:x+1},{y:y+1,x:x},{y:y+1,x:x-1},{y:y+1,x:x+1}];
              //x,y -1, x,y+1,  x -1, y -1 , x-1,y ,x-1 y+1
          }else{
              return [{x:x+1,y:y},
                      {x:x-1,y:y}, 
                      {y:y -1,x:x},
                      {y:y+1,x:x},
                      {y:y-1,x:x-1},
                      {y:y+1,x:x+1},
                      {x:x-1,y:y+1},
                      {x:x+1,y:y-1}];
          }
           
      },
      asJson : function () {
        var asJson = {};
        for(var prop in self){
          if(self.hasOwnProperty(prop)){
            if('function' === typeof self[prop] && prop !== 'asJson') asJson[prop] = self[prop]();
            else if(prop === 'piece')asJson[prop] = (self.piece === undefined)?undefined: self.piece.asJson();
            else if(prop !== 'asJson') asJson[prop] = self[prop];
          }
        }
        return asJson;
      } 
    };

    return self;
    
};

module.exports = square;