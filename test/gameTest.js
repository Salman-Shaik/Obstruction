const assert = require('assert');
let Game=require('../src/game.js');
let test={};
exports.test=test;

test['getCurrentPlayerInfo should give current player info']=function(){
  let game=new Game();
  let expectedOutput={
    name:"player1",
    moves:[],
    symbol:"images/x.jpg"
  };
  assert.deepEqual(game.getCurrentPlayerInfo(),expectedOutput);
};

test['updateCurrentPlayerMoves should update moves of current player']=function(){
  let game=new Game();
  game.updateCurrentPlayerMoves(22);
  assert.ok(game.getCurrentPlayerInfo().moves.includes(22));
  game.currentPlayerIndex=1-game.currentPlayerIndex;
  game.updateCurrentPlayerMoves(32);
  assert.ok(game.getCurrentPlayerInfo().moves.includes(32));
};

test['hasCompleted should tell whether the game is completed or not']=function(){
  let game=new Game();
  assert.ok(!game.hasCompleted());
  game.updateCurrentPlayerMoves(22);
  game.updateCurrentPlayerMoves(32);
  game.updateCurrentPlayerMoves(12);
  assert.ok(!game.hasCompleted());
};

test['getTotalMoves should give total moves of both the players']=function(){
  let game=new Game();
  game.updateCurrentPlayerMoves(22);
  game.updateCurrentPlayerMoves(32);
  game.updateCurrentPlayerMoves(12);
  assert.deepEqual(game.getTotalMoves(),[22,32,12]);
  game.currentPlayerIndex=1-game.currentPlayerIndex;
  game.updateCurrentPlayerMoves(25);
  game.updateCurrentPlayerMoves(35);
  game.updateCurrentPlayerMoves(15);
  assert.deepEqual(game.getTotalMoves(),[22,32,12,25,35,15]);
};
