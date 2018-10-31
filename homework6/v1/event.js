window.onload = startGame;
var restart_flag = 0;
function startGame() {
	initialJigsaw();
	$("#restart").click(restartGame);
}

function initialJigsaw() {
	$("p").text(" ");
	for (var i = 1; i < 16; i++)
		$("<div></div>").appendTo("#game_box").attr('id', "origin" + i)
						.addClass("pieces").addClass("pos" + i).click(movement);
	$("<div></div>").appendTo("#game_box").attr('id', "origin16")
					.addClass("empty").addClass("pos16");
};

function restartGame() {
	restart_flag = 1;
	$("p").text(" ");
	var rdNum = randomNmb();
	for(var i = 1; i <= 15; i++) {
		var postClass = "pieces pos" + rdNum[i];
		var index = "#origin" + i;
		$(index).attr("class", postClass);
	}
	$("#origin16").attr("class", "empty pos16");
}

function randomNmb() {
	var arr = new Array(16);
	var isExist = new Array(16);
	arr[0] = -1;
	var flag = false;

	while(!flag) {
		var counter = 1;
		for (var i = 1; i <= 15; i++)
			isExist[i] = 0;
		while(counter != 16)
		{
			var rand = Math.random();
			var num = Math.ceil(rand * 15);
			if(isExist[num] == 0)
			{
				arr[counter] = num;
				counter++;
				isExist[num] = 1;
			}
		}
		flag = isValid(arr);
	}
	return arr;
}

function isValid(arr) {
	var counter = 0, x = 0;
	for (var i = 1; i <= 15; i++) {
		for (var j = 1; j < i; j++) {
			if (arr[j] > arr[i]) {
				x = (x == 0)? 1 : 0;
				counter += (1 + x);
			}
		}
	}
	return (counter % 2 == 0);
}

function movement(event) {
	if ( restart_flag && isAdjacent(event.target))
	{
		var index = "#" + event.target.id;
		var tg = document.getElementById(event.target.id);
		var empty = document.getElementById("origin16");

		var postClass = "empty " + tg.classList[1];
		tg.className = "pieces " + empty.classList[1];
		empty.className = postClass;

		if (isWin())
			$("p").text("You Win! Click RESTART to play again");
	}
}
function isAdjacent(tg) {
	// argument = window.event || argument;
	var index = "#" + tg.id;
	var width = $(index).width();
	var deviation = width * 0.05;
	var empty_top = Math.ceil($("#origin16").position().top - deviation);
	var empty_left = Math.ceil($("#origin16").position().left - deviation);

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
	return false;
}

function isWin() {
	if (!restart_flag)
		return false;
	for (var i = 1; i <= 15; i++) {
		var index = "#origin" + i;
		var cmp = "pieces pos" + i;
		if ($(index).attr("class") != cmp)
			return false;
	}
	restart_flag = 0;
	return true;
}

