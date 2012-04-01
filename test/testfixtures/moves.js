/**
 * Created by JetBrains WebStorm.
 * User: craigbrookes
 * Date: 01/04/2012
 * Time: 09:32
 * To change this template use File | Settings | File Templates.
 */
module.exports = [
  //ply 1
  {startpos:{x:0,y:1},takes:[],endpos:{x:1,y:2}},
  //ply2 2
  {startpos:{x:1,y:6},takes:[],endpos:{x:2,y:5}},
  //ply1
  {startpos:{x:1,y:2},takes:[],endpos:{x:2,y:3}},

  {startpos:{x:2,y:5},takes:[],endpos:{x:1,y:4}},
  
  {startpos:{x:2,y:3},takes:[{x:1,y:4}],endpos:{x:0,y:5}}
  
];