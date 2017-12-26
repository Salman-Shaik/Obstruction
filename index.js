const loadGame=function(){
  window.location.href='./src/main.html';
};

const addClickListenerToButton=function() {
  let button=document.getElementById('button');
  button.onclick=loadGame;
};

const begin=function() {
  addClickListenerToButton();
};

window.onload=begin;
