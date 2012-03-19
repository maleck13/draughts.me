/**
 * Created by JetBrains WebStorm.
 * User: craigbrookes
 * Date: 19/03/2012
 * Time: 13:42
 * To change this template use File | Settings | File Templates.
 */
var util = require('util');

exports.PLAYER_EXCEPTIONS = {
 ILLEGAL_MOVE : function (extra){
     var extra = extra || "";
     return util.format("Your move was illegal %s",extra.toString());
 }  
};

exports.GAME_EXCEPTIONS = {
  MOVE_EXCEPTION : function(extra){
      var extra = extra || "";
      return {name : "move exception" , message : util.format("A game exception occurred and the move could not be executed. %s ",extra.toString()),code:503};
  }  
};