var gameMan = require('../server/lib/gamemanager.js');
var assert = require('assert');
var board = gameMan().createBoard();

describe('borad create', function () {
   it('should create a board with 64 sqaures and 16 pieces', function (){
       assert.equal(board.length, 64);
   });
});

describe('check edges', function () {
    it('should have 28 edge squares',function () {
        var edges = 0;
        for(var i = 0; i < board.length; i++){
            if(board[i].isEdge()) edges++;
        }
        assert.equal(28,edges);
    });
})