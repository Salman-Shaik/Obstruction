const loadGame=function(){
  window.location.href='./src/main.html';
};
const loadHelp=function() {
  window.location.href='./src/help.html';
}
const addClickListenerToButton=function() {
  let button=document.getElementById('button');
  button.onclick=loadGame;
  let help=document.getElementById('help');
  help.onclick=loadHelp;
};

const begin=function() {
  addClickListenerToButton();
};

window.onload=begin;
