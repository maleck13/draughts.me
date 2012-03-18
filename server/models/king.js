/**
 * Created by JetBrains WebStorm.
 * User: craigbrookes
 * Date: 18/03/2012
 * Time: 11:33
 * To change this template use File | Settings | File Templates.
 */
var piece = require('./piece');
var util = require('util');

function King (opts) {
   piece.Piece.apply(this,[opts]); //equiv of calling super(opts)
};

util.inherits(King,piece.Piece); //extend inherit from piece


//override of take method

King.prototype.take = function (){
    console.log("king taking");
}
    
//add king only methods    

exports.King = King;
