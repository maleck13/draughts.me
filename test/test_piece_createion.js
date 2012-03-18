/**
 * Created by JetBrains WebStorm.
 * User: craigbrookes
 * Date: 18/03/2012
 * Time: 11:41
 * To change this template use File | Settings | File Templates.
 */
var assert = require('assert');
var piece = require('../server/models/piece.js');
var king = require('../server/models/king.js');

describe("normal piece creation", function () {
   it("should create a normal piece with type man", function () {
     var redpiece = new piece.Piece({side:'red'});
       console.log(redpiece.toString());
       assert.equal("red",redpiece.side);
       assert.equal('man', redpiece.type);
   });
});

describe("king peice creation inherits piece", function () {
   it("should create a king that inherits methods from piece", function () {
      var aking = new king.King({side:'red'});
      assert.equal("red",aking.side); //test inherited property 
      assert(true,aking.hasOwnProperty('take')); 
   }); 
});