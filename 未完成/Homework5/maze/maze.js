var tagStart = false;
var tagEnd = false;
var tagPath = [false, false, false, false, false];
var tagCheat = false;
var outsideTag = false;

window.onload = function(){
  var start = document.getElementById("start");
  var end = document.getElementById("end");
  start.addEventListener('mouseover', overStart);
  end.addEventListener('mouseover', overEnd);
  var outside = document.getElementById("outside");
  outside.addEventListener('mouseover', setOutside);
  var wall = document.getElementsByClassName("wall");
  var path = document.getElementById("maze");
  path.addEventListener('mouseout', passPath);
  var wall = document.getElementsByClassName("wall");
  for(var i = 0; i < 5; i++) {
    wall[i].onmouseover = touchWall;
    wall[i].onmouseout = reSetName;
  }
}

function touchWall() {
  if(tagStart == true) {
    //event.target.className = "changeTemp";
    this.className = "changeTemp";
    document.getElementById("tell").textContent = "You lose";
    tagStart = false;
  }
  reStart();
}

function overStart() {
  if(tagStart == false) {
    document.getElementById("tell").textContent = "Playing";
    tagEnd = false; 
    for(var i = 0; i < 5; i++) {
      tagPath[i] = false;
    }
    tagCheat = false;
  }
  tagStart = true;
  document.getElementById("tell").textContent = "Game start. Enjoy yourself.";
}

function passPath(event) {
  if(event.target.id == "path1") {
    tagPath[0] = true;
  }
  else if(event.target.id == "path2") {
    tagPath[1] = true;
  }
  else if(event.target.id == "path3"){
    tagPath[2] = true;
  }
  else if(event.target.id == "path4") {
    tagPath[3] = true;
  } else if(event.target.id == "path5") {
    tagPath[4] = true;
  }
}

function overEnd() {
  if(tagStart == true){
    var temp = true;
    for(var i = 0; i < 5; i++) {
      if(tagPath[i] != true) {
        temp = false;
      }
    }
    if(tagStart == true&&temp == true&&outsideTag == true) {
      document.getElementById("tell").textContent = "Don't cheat, you should start from the 'S' and move to 'E' inside the maze!";
      reStart();
      return;
    }
    if(tagStart == true&&temp == true) {
      document.getElementById("tell").textContent = "You Win";
    } else {
      document.getElementById("tell").textContent = "Don't cheat, you should start from the 'S' and move to 'E' inside the maze!";
      tagStart = false;
    }
  }
  reStart();
}

function reStart() {
  tagStart = false;
  tagEnd = false;
  tagPath = [false, false, false, false, false];
  tagCheat = false;
  outsideTag = false;
}

function reSetName() {
  this.className = "wall";
}

function setOutside() {
  outsideTag = true;
}