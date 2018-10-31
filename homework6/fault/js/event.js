window.onload = startGame;
var restart_flag = 0;
var difficulty = 4;

function startGame() {
	initialJigsaw();
	$("#restart").click(restartGame);
	$("select").change(changeDifficulty);
}

function changeDifficulty() {
	difficulty = $("select").val();
	$("#info").text(" ");
	var new_css = "./css/style_" + difficulty + ".css"; 
   	$("#css").attr("href", new_css);
   	restart_flag = 0;

   	for (var i = 1; i < difficulty * difficulty; i++)
   		$("#origin" + i).attr("class", "pieces pos" + i);
   	for (var i = 9; i <= difficulty * difficulty; i++)
   		$("#origin" + i).show();
   	for (var i = difficulty * difficulty + 1; i <= 25; i++)
   		$("#origin" + i).hide();
   	$("#origin" + (difficulty * difficulty)).attr("class", "empty pos" + (difficulty * difficulty));
}

function initialJigsaw() {
	$("#info").text(" ");

	for (var i = 1; i < 16; i++)
		$("<div></div>").appendTo("#game_box").attr('id', "origin" + i)
						.addClass("pieces").addClass("pos" + i).click(movement);
	$("<div></div>").appendTo("#game_box").attr('id', "origin16")
					.addClass("empty").addClass("pos16").click(movement);

	for (var i = 17; i < 25; i++)
		$("<div></div>").appendTo("#game_box").attr('id', "origin" + i)
						.addClass("pieces").addClass("pos" + i).click(movement).hide();
	$("<div></div>").appendTo("#game_box").attr('id', "origin25")
					.addClass("empty").addClass("pos25").hide();
}

function randomNmb() {
	var range = difficulty * difficulty;
	var arr = new Array(range);
	var isExist = new Array(range);
	arr[0] = -1;

	var counter = 1;
	for (var i = 1; i <= range - 1; i++)
		isExist[i] = 0;
	while(counter != range)
	{
		var rand = Math.random();
		var num = Math.ceil(rand * (range - 1));
		if(isExist[num] == 0)
		{
			arr[counter] = num;
			counter++;
			isExist[num] = 1;
		}
	}
	if (!isValid(arr))
	{
		var temp = arr[range - 1];
		arr[range - 1] = arr[range - 2];
		arr[range - 2] = temp; 
	}
	return arr;
}
function restartGame() {
	restart_flag = 1;
	$("#info").text(" ");
	var range = difficulty * difficulty;
	var rdNum = randomNmb();

	for(var i = 1; i <= range - 1; i++)
		$("#origin" + i).attr("class", "pieces pos" + rdNum[i]);
	$("#origin" + range).attr("class", "empty pos" + range);
}



function isValid(arr) {
	var range = difficulty * difficulty;
	var counter = 0, x = 0;
	for (var i = 1; i < range; i++) {
		for (var j = 1; j < i; j++) {
			if (arr[j] > arr[i])
				counter++;
		}
	}
	return counter % 2 == 0;
}

function movement(event) {
	console.log("restart_flag = " + restart_flag);

	if ( restart_flag && isAdjacent(event.target))
	{
	console.log("yes");

		var range = difficulty * difficulty;
		var index = "#" + event.target.id;
		var indexEmpty = "origin" + range;
		var tg = document.getElementById(event.target.id);
		var empty = document.getElementById(indexEmpty);

		var postClass = "empty " + tg.classList[1];
		tg.className = "pieces " + empty.classList[1];
		empty.className = postClass;

		if (isWin())
			$("#info").text("You Win! Click RESTART to play again");
	}
}
function isAdjacent(tg) {
	var index = "#" + tg.id;
	var range = difficulty * difficulty;
	var indexEmpty = "#origin" + range;
	var width = $(index).width();
	var deviation = width * 0.05;
	var empty_top = Math.ceil($(indexEmpty).position().top - deviation);
	var empty_left = Math.ceil($(indexEmpty).position().left - deviation);

	var tg_top = Math.ceil($(index).position().top);
	var tg_left = Math.ceil($(index).position().left);


	if (tg_top <= empty_top  + deviation && tg_top >= empty_top - deviation)
	{
		if ((tg_left <= empty_left + width + deviation && tg_left >= empty_left + width - deviation)
		 	|| ( tg_left <= empty_left - width + deviation&& tg_left >= empty_left - width - deviation))
		return true;
	}
	if (tg_left >= empty_left - deviation && tg_left <= empty_left + deviation)
	{
		if ((tg_top <= empty_top + width + deviation && tg_top >= empty_top + width - deviation) 
			|| (tg_top <= empty_top - width + deviation && tg_top >= empty_top - width - deviation))
		return true;
	}
	console.log("ad func");
	return false;
}

function isWin() {
	if (!restart_flag)
		return false;
	var range = difficulty * difficulty;
	for (var i = 1; i < range; i++)
		if ($("#origin" + i).attr("class") != ("pieces pos" + i))
			return false;
	restart_flag = 0;
	return true;
}