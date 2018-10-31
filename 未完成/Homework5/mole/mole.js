var time = 30;
var timevar = null;
var buttom;
var status_show;
var currentIndex = null;
var before;
var count = 0;
var current_status_playing = false;
function clock(){
  document.getElementById("time-show").value = time;
  timevar = setTimeout(clock, 1000);
  time--;
  if(time == -2) {
    clearTimeout(timevar);
    status_show.value = "Game over";
    alert("Gameover! Your score is: "+ count);
    buttom[currentIndex] = false; 
    document.getElementById("time-show").value = time;
    reset();
    document.getElementById("timeRunningOut").innerHTML = "";
  }
  if(time <= 4&&time >= -1) {
    document.getElementById("timeRunningOut").innerHTML = time+1;
  }
}

function gameControl() {
  if(time == 30) { //start the game
    current_status_playing = true;
    status_show.value = "Playing";
    random_occu();
    clock();
    document.getElementById("timeRunningOut").innerHTML= "";
  } else { //stop the game
    clearInterval(timevar);
    status_show.value = "Game over";
    document.getElementById("time-show").value = time;
    alert("Game over!\nYour make the gameover without run out of the time.\nYour score is: "+count+".");
    reset();
    document.getElementById("timeRunningOut").innerHTML = "";
  }
}

function random_occu() {
  if(time != 0) {
    currentIndex = Math.floor(Math.random()*60);
    buttom[currentIndex].checked = true;
  }
}

function react() {
  if(current_status_playing) {
    if(time == 0) {
      this.checked = false;
    } else {
      if(before == true) {
        count++;
        document.getElementById("score-show").value = count;
        this.checked = false;
        random_occu();
      } else {
        count--;
        this.checked = false;
        buttom[currentIndex].checked = true;
      }
      document.getElementById("score-show").value = count;
    }
  }
}

function getStausBeforeClick() {
  before = this.checked;
}

function reset() {
  time = 30;
  count = 0;
  buttom[currentIndex].checked = false;
  document.getElementById("score-show").value = count;
  document.getElementById("time-show").value = time;
  status_show.value = "Waiting";
  current_status_playing = false;
}

function timeover() {
  alert("Game over!\nYour score is: "+count);
}

window.onload = function(){ 
  status_show = document.getElementById("status-show");
  var start_or_stop_button = document.getElementById("start-or-stop");
  start_or_stop_button.addEventListener('click', gameControl);
  buttom = document.getElementsByClassName("hole");
  for(var i = 0; i < buttom.length; i++) {
    buttom[i].onmousedown = getStausBeforeClick;
    buttom[i].onclick = react;
  }
}