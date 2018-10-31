var X = true;
var Y = true;
var start = false;
var end = false;


function mousePosition(event){
	return {x:event.pageX, y:event.pageY};
}

function getPoint(target){
  var x = target.offsetLeft;
  var y= target.offsetTop;
  while(target = target.offsetParent){
    x += target.offsetLeft;
    y += target.offsetTop;
  }
  return {X:x, Y:y};
}


function mouseMove(event){
  var S = getPoint(document.getElementById('blockS'));
  var E = getPoint(document.getElementById('blockE'));
  event = event || window.event;
  var mousePos = mousePosition(event);

  if(mousePos.x>S.X&&mousePos.x<(S.X+40)&&mousePos.y>S.Y&&mousePos.y<(S.Y+40)){
    start = true;
    document.getElementsByTagName('p')[1].innerHTML = "<p id='secondLine'>&nbsp;</p>";
    document.getElementsByTagName('p')[1].style.textAlign = 'center';
  }
  if(mousePos.x>E.X&&mousePos.x<(E.X+40)&&mousePos.y>(E.Y)&&mousePos.y<(E.Y+40)){
    end = true;
  }else{
    end = false;
  }
  if(start&&end){
    document.getElementsByTagName('p')[1].innerHTML = "<p id='secondLine'>You win</p>";
    document.getElementsByTagName('p')[1].style.textAlign = 'center';
  }
  if(end&&!start){
    end = false;
    document.getElementsByTagName('p')[1].innerHTML = "<p id='secondLine'>Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!</p>";
    document.getElementsByTagName('p')[1].style.textAlign = 'center';
  }
  if(mousePos.x<S.X||mousePos.x>(E.X + 40)){
    start = false;
  }


  if(start){
      //document.getElementById('maze').style.cursor = 'pointer';
      if(mousePos.x>S.X&&mousePos.x<(S.X+150)){
       if(mousePos.y>(S.Y+44)||mousePos.y<(S.Y-4)){
        document.getElementsByTagName('p')[1].innerHTML = "<p id='secondLine'>You Lose</p>";
        document.getElementsByTagName('p')[1].style.textAlign = 'center';
        if(mousePos.y<(S.Y-4)){
          document.getElementById('blockOne').style.backgroundColor = 'red';
          document.getElementById('blockFour').style.backgroundColor = 'red';
        }else{
          document.getElementById('blockSix').style.backgroundColor = 'red';
          document.getElementById('blockSeven').style.backgroundColor = 'red';
          document.getElementById('blockEight').style.backgroundColor = 'red';
        }
        start = false;
      }
    }else if(mousePos.x>=(S.X+150)&&mousePos.x<(S.X+200)){
      if(mousePos.y>(S.Y+44)||mousePos.y<(S.Y-154)){
        document.getElementsByTagName('p')[1].innerHTML = "<p id='secondLine'>You Lose</p>";
        document.getElementsByTagName('p')[1].style.textAlign = 'center';
        start = false;
        if(mousePos.y>(S.Y+44)){
          document.getElementById('blockSix').style.backgroundColor = 'red';
          document.getElementById('blockSeven').style.backgroundColor = 'red';
          document.getElementById('blockEight').style.backgroundColor = 'red';
        }else{
          document.getElementById('blockTwo').style.backgroundColor = 'red';
        }
      }
    }else if(mousePos.x>=(S.X+200)&&mousePos.x<(S.X+300)){
      if(mousePos.y>(S.Y-106)||mousePos.y<(S.Y-154)){
        document.getElementsByTagName('p')[1].innerHTML = "<p id='secondLine'>You Lose</p>";
        document.getElementsByTagName('p')[1].style.textAlign = 'center';
        start = false;
        if(mousePos.y>(S.Y-106)){
          document.getElementById('blockNine').style.backgroundColor = 'red';
        }else{
          document.getElementById('blockTwo').style.backgroundColor = 'red';
        }
      }
    }else if(mousePos.x>=(S.X+300)&&mousePos.x<(S.X+350)){
      if(mousePos.y>(S.Y+44)||mousePos.y<(S.Y-154)){
        document.getElementsByTagName('p')[1].innerHTML = "<p id='secondLine'>You Lose</p>";
        document.getElementsByTagName('p')[1].style.textAlign = 'center';
        start = false;
        if(mousePos.y>(S.Y+44)){
          document.getElementById('blockSix').style.backgroundColor = 'red';
          document.getElementById('blockSeven').style.backgroundColor = 'red';
          document.getElementById('blockEight').style.backgroundColor = 'red';
        }else{
          document.getElementById('blockTwo').style.backgroundColor = 'red';
        }
      }
    }else if(mousePos.x>=(S.X+350)&&mousePos.x<(S.X+500)){
      if(mousePos.y>(S.Y+44)||mousePos.y<(S.Y-4)){
        document.getElementsByTagName('p')[1].innerHTML = "<p id='secondLine'>You Lose</p>";
        document.getElementsByTagName('p')[1].style.textAlign = 'center';
        start = false;
        if(mousePos.y>(S.Y+44)){
          document.getElementById('blockSix').style.backgroundColor = 'red';
          document.getElementById('blockSeven').style.backgroundColor = 'red';
          document.getElementById('blockEight').style.backgroundColor = 'red';
        }else{
          document.getElementById('blockThree').style.backgroundColor = 'red';
          document.getElementById('blockFive').style.backgroundColor = 'red';
        }
      }
    }
  }

  var maze = document.getElementById('maze');
  maze.onmouseout = function(){
    for(var i=0; i<this.children.length-2; i++){
      this.children[i].style.backgroundColor = '#EEEEEE';
    }
  };
}

document.onmousemove = mouseMove;


