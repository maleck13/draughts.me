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