//获取元素的纵坐标（相对于窗口）

var startFlag = false;
var endFlag = false;
var outsideMaze = false;

function getTop(target){
  var offsetY = target.offsetTop;
  if(target.offsetParent != null) 
  	offsetY += getTop(target.offsetParent);
  return offsetY + 40;
}
//获取元素的横坐标（相对于窗口）
function getLeft(target){
  var offsetX = target.offsetLeft;
  if(target.offsetParent != null)
   	offsetX += getLeft(target.offsetParent);
  return offsetX;
}

// window.onload = alert(getTop(document.getElementById('start')));
function mouse_motion(event) 
{
	var mouseX = event.clientX;
	var mouseY = event.clientY;

	var startBlock = document.getElementById('start');
  var endBlock = document.getElementById('end');
  var narrator = document.getElementById('narrator');
  var gameBox = document.getElementById('game_box');
  // var wall = document.getElementByTag();

  startBlock.X = getLeft(startBlock);
  startBlock.Y = getTop(startBlock);
  endBlock.X = getLeft(endBlock);
  endBlock.Y = getTop(endBlock);

	
  if (mouseX >= startBlock.X && mouseX <= startBlock.X + startBlock.offsetWidth
  		&& mouseY <= startBlock.Y && mouseY >= startBlock.Y - startBlock.offsetHeight) 
  {
  	startFlag = true;
  	narrator.textContent = "S";
  }
  if (mouseX >= endBlock.X && mouseX <= endBlock.X + endBlock.offsetWidth
  	&& mouseY >= endBlock.Y && mouseY <= endBlock.Y + endBlock.offsetHeight) 
  {
  	endFlag = true; 
  } else endFlag = false;

  if (startFlag && endFlag)
  	narrator.textContent = "You Win";

  if (!startFlag && endFlag)
  	narrator.textContent = "Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!"

  if (mouseX < startBlock.X || mouseX > endBlock.X)
  	startFlag = false;

  if (startFlag)
  {
  	if (mouseX >= startBlock.X - 2 && mouseX <= startBlock.X + 148)
  	{
  		if (mouseY >= startBlock.Y - 248 && mouseY <= startBlock.Y - 48)
  		{
  			narrator.textContent = "You Lose";
  			document.getElementById('left_mid').className = "red";
  			document.getElementById('left_top').className = "red";
  		}
  	}
  	if (mouseX >= startBlock.X - 2 && mouseX <= startBlock.X + 198)
  	{
  		if (mouseY >= startBlock.Y + 2 && mouseY <= startBlock.Y + 52)
  		{
  			narrator.textContent = "You Lose";
  			document.getElementById('left_bottom').className = "red";
  		}
  	}
  	if (mouseX >= startBlock.X + 148 && mouseX <= startBlock.X + 348) 
  	{
  		if (mouseY >= startBlock.Y - 248 && mouseY <= startBlock.Y - 183)
  		{
  			narrator.textContent = "You Lose";
  			document.getElementById('mid_top').className = "red";
  		}
  	}

  	if (mouseX >= startBlock.X + 190 && mouseX <= startBlock.X + 298)
  		if (mouseY <= startBlock.Y + 2 && mouseY >= startBlock.Y - 148)
  		{
  			narrator.textContent = "You Lose";
  			document.getElementById('mid_mid').className = "red";
  			document.getElementById('mid_bottom').className = "red";
  		}
  	
  	if (mouseX >= startBlock.X + 198 && mouseX <= startBlock.X + 398)
  	{
  		if (mouseY >= startBlock.Y + 2 && mouseY <= startBlock.Y + 52)
  		{
  			narrator.textContent = "You Lose";
  			document.getElementById('right_bottom').className = "red";
  		}
  	}

  	if (mouseX >=startBlock.X + 248 && mouseX <= startBlock.X + 398)
  	{
  		if (mouseY >= startBlock.Y - 248 && mouseY <= startBlock.Y - 48)
  		{
  			narrator.textContent = "You Lose";
  			document.getElementById('right_top').className = "red";
  			document.getElementById('right_mid').className = "red";
  		}
  	}
  }

}

document.onmousemove = mouse_motion;