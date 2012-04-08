/**
 * Created by JetBrains WebStorm.
 * User: craigbrookes
 * Date: 20/03/2012
 * Time: 21:22
 * To change this template use File | Settings | File Templates.
 */
var crypto = require('crypto');
exports.createUID = function (){
    var rand = new Date().getTime() + Math.random();
    return crypto.createHash('md5').update(rand.toString()).digest('hex');
};

exports.validateMove = function (move) {
  var valid = (move && move.hasOwnProperty('startpos') && move.hasOwnProperty('endpos') && move.hasOwnProperty('takes'));
  valid = (valid && move.startpos.hasOwnProperty('x') && move.startpos.hasOwnProperty('y') && move.endpos.hasOwnProperty('x')
    && move.endpos.hasOwnProperty('y'));
  return valid;
};