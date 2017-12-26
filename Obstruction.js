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
// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------

let game=new Game();
let updateDisplay=function(text) {
  let display=document.getElementById('display');
  display.innerText=text;
}
let action={};
action.Won=function(){
  updateDisplay(`${game.getCurrentPlayerInfo().name}`+" has won");
};

action.isOn=function() {
  game.currentPlayerIndex=1-game.currentPlayerIndex;
  updateDisplay(getCurrentPlayer()+"'s Turn");
};

const getGameStatus=function(){
  let gameStatus={};
  if(game.hasCompleted()){
    gameStatus.status="Won";
  }
  else{
    gameStatus.status="isOn";
  }
  return gameStatus;
};

const getCurrentPlayer=function(){
  return game.getCurrentPlayerInfo().name;
};

const clearCell=function(position){
  let cell=document.getElementById(position);
  if(cell==undefined){
    return;
  }
  cell.disabled=true;
  cell.style.backgroundColor="#555555";
  if(game.getTotalMoves().includes(position)){
    return;
  }
  game.updateCurrentPlayerMoves(position);
};

const clearDiagonals=function(position) {
  let diagonals=[position-9,position+9,position-11,position+11];
  diagonals.forEach((element)=>{
    clearCell(element);
  });
};

const clearTopAndBottom = function(position) {
  let positions=[position+10,position-10];
  positions.forEach((element)=>{
    clearCell(element);
  });
};

const clearSides=function(position){
  let sides=[position+1,position-1];
  sides.forEach((element)=>{
    clearCell(element);
  });
};

const updateCells=function(position) {
  let cell=document.getElementById(position);
  let currentPlayer=game.getCurrentPlayerInfo();
  let currentPlayerSymbol=currentPlayer.symbol;
  let totalMoves=game.getTotalMoves();
  if(totalMoves.includes(position)){
    return;
  }
  cell.innerHTML="<img src="+currentPlayerSymbol+">";
  game.updateCurrentPlayerMoves(position);
  clearTopAndBottom(position);
  clearDiagonals(position);
  clearSides(position);
  let gameStatus=getGameStatus();
  action[gameStatus.status]();
};

const handleClickEvent=function(event) {
  let cell=event.target;
  let cellPosition=+cell.id;
  updateCells(cellPosition);
};

const addGridToPage=function() {
  let table=document.getElementById("mainGrid");
  let row=table.insertRow();
  for (let id = 11;id < 67; id++) {
    if(+id.toString().slice(1)>6){
      row=table.insertRow();
      id+=4;
    }
    cell=row.insertCell(id%10-1);
    cell.id=id;
  }
};

const addClickEventToGrid=function(){
  let table=document.getElementById("mainGrid");
  table.onclick=handleClickEvent;
};

const startGame=function() {
  updateDisplay(getCurrentPlayer()+"'s Turn");
  addGridToPage();
  addClickEventToGrid();
}
window.onload=startGame;
