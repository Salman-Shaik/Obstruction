let Player=function(name,symbol) {
  this.name=name;
  this.symbol=symbol;
  this.moves=[];
};
let Game=function() {
  this.players=[];
  this.players.push(new Player("player1","images/x.jpg"));
  this.players.push(new Player("player2","images/o.jpg"));
  this.currentPlayerIndex=0;
};

Game.prototype.hasCompleted = function () {
  return this.getTotalMoves().length==36;
};
Game.prototype.getCurrentPlayerInfo = function () {
  return this.players[this.currentPlayerIndex];
};
Game.prototype.getTotalMoves = function () {
  return this.players[0].moves.concat(this.players[1].moves);
};
Game.prototype.updateCurrentPlayerMoves=function(move){
    this.getCurrentPlayerInfo().moves.push(move);
};
module.exports=Game;
