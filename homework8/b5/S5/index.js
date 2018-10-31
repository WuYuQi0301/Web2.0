window.onload = start;
//
var xhr = new Array(5);

function start() {
	$(".red-dot").hide();
	$(".button").attr("value", 0);
	$("#button").mouseleave(reset);
	$(".apb").attr("isTriggered", false).click(startRobot);

	$.fn.enable = function(){
		this.attr("class", "blue" +" button");
		return this;
	};
	$.fn.disable = function(){
		this.attr("class", "grey" + " button").unbind("click");
		return this;
	};
	$.fn.enableInfo = function(){
		this.attr("class", "blue");
		return this;
	};
	$.fn.disableInfo = function(){
		this.attr("class", "grey").unbind("click");
		return this;
	};
}

function startRobot() {
	console.log("startRobot");

	//get order;
	$(".apb").attr("isTriggered", true).unbind("click");
	var order = getRandomOrder();
	var orderString  = orderToString(order);
	$("#order").text(orderString);
console.log(order);
	var currentSum = 0;
	for (var i = 0; i < 5; i++)
 	{
  	switch(order[i]){
  		case 0: 
  			order[i] = aHandler;
  			break;
  		case 1:
  			order[i] = bHandler;
  			break;
  		case 2:
  			order[i] = cHandler;
  			break;
  		case 3:
  			order[i] = dHandler;
  			break;
  		case 4:
  			order[i] = eHandler;
  			break;
  		default:break;
  	}
  }
  order[5] = bubbleHandler;

 	var index = 1;
 	var first = order[0];
 	var errorMessage = "";
 	var errorSum = 0;
 	console.log(order);
	first(currentSum, order, index, order[index])
}


function aHandler(currentSum, orderFunc, index) {
	console.log("A handler called");
	console.log("currentSum : ", currentSum);

	xhr[index - 1] = $.ajax({
		obj : "A",
		type : "GET",
		url : "/request.dat",
		beforeSend : beforeSendFunc,
		success : function(data) {
			console.log("A sent success");
			//show number
			$(".Aspan").text(data);
			$("#A").attr("value", data);
			var Atext = $("#message").text() + "A : 这是个天大的秘密\n";
			$("#message").text(Atext);
			currentSum += parseInt(data);
			//enable others ( check if every one gets its value
			for (var i = 0; i < 5; i++) {
				if ($(".button")[i].value == 0) 
					$("#" + $(".button")[i].title).enable();
			}
			var nextFunc = orderFunc[index];
			nextFunc(currentSum, orderFunc, index + 1);
		},

		error : errorFunc
	});
}


function bHandler(currentSum, orderFunc, index) {
	console.log("B handler called");
	console.log("currentSum : ", currentSum);

	xhr[index - 1] = $.ajax({
		obj : "B",
		type : "GET",
		url : "/request.dat",
		beforeSend : beforeSendFunc,
		success : function(data) {
			console.log("B sent success");
			//show number
			$(".Bspan").text(data);
			$("#B").attr("value", data);
			var Btext = $("#message").text() + "B : 我不知道\n";
			$("#message").text(Btext);

			currentSum += parseInt(data);
			//enable others ( check if every one gets its value
			for (var i = 0; i < 5; i++) {
				if ($(".button")[i].value == 0) 
					$("#" + $(".button")[i].title).enable();
			}
			var nextFunc = orderFunc[index];
			nextFunc(currentSum, orderFunc, index + 1);
		},

		error : errorFunc
	});
}

function cHandler(currentSum, orderFunc, index) {
	console.log("C handler called");
	console.log("currentSum : ", currentSum, " ");

	xhr[index - 1] = $.ajax({
		obj : "C",
		type : "GET",
		url : "/request.dat",
		beforeSend : beforeSendFunc,
		success : function(data) {
			console.log("C sent success");
			//show number
			$(".Cspan").text(data);
			$("#C").attr("value", data);
			var Ctext = $("#message").text() + "C : 你不知道\n";
			$("#message").text(Ctext);

			currentSum += parseInt(data);
			//enable others ( check if every one gets its value
			for (var i = 0; i < 5; i++) {
				if ($(".button")[i].value == 0) 
					$("#" + $(".button")[i].title).enable();
			}
			var nextFunc = orderFunc[index];
			nextFunc(currentSum, orderFunc, index + 1);
		},

		error : errorFunc
	});
}

function dHandler(currentSum, orderFunc, index) {
	console.log("D handler called");
	console.log("currentSum : ", currentSum, " ");

	xhr[index - 1] = $.ajax({
		obj : "D",
		type : "GET",
		url : "/request.dat",
		beforeSend : beforeSendFunc,
		success : function(data) {
			console.log("D sent success");
			//show number
			$(".Dspan").text(data);
			$("#D").attr("value", data);
			var Dtext = $("#message").text() + "D : 他不知道";
			$("#message").text(Dtext);
			currentSum += parseInt(data);
			//enable others ( check if every one gets its value
			for (var i = 0; i < 5; i++) {
				if ($(".button")[i].value == 0) 
					$("#" + $(".button")[i].title).enable();
			}
			var nextFunc = orderFunc[index];
			nextFunc(currentSum, orderFunc, index + 1);
		},

		error : errorFunc
	});
}

function eHandler(currentSum, orderFunc, index) {
	console.log("C handler called");
	console.log("currentSum : ", currentSum, " ");

	xhr[index - 1] = $.ajax({
		obj : "E",
		type : "GET",
		url : "/request.dat",
		beforeSend : beforeSendFunc,
		success : function(data) {
			console.log("E sent success");
			//show number
			$(".Espan").text(data);
			$("#E").attr("value", data);
			var Etext = $("#message").text() + "E : 才怪\n";
			$("#message").text(Etext);
			currentSum += parseInt(data);
			//enable others ( check if every one gets its value
			for (var i = 0; i < 5; i++) {
				if ($(".button")[i].value == 0) 
					$("#" + $(".button")[i].title).enable();
			}
			var nextFunc = orderFunc[index];
			nextFunc(currentSum, orderFunc, index + 1);
		},

		error : errorFunc
	});
}

function bubbleHandler(currentSum, orderFunc, index) {
	$("#sum").text(currentSum).disableInfo();
	$("#message").text($("#message").text() + "\n大气泡：楼主异步调用战斗力感人，目测不超过" + currentSum);
	console.log("info get");
}

function reset() {
	console.log("reset");
	for(var i = 0; i < 5; i++)
	{
		if (xhr[i] != undefined && xhr != null)
		{
			var cur = xhr[i];
			cur.abort();
			xhr[i] = null;
		}
	}
	$(".red-dot").hide();
	$(".button").enable().attr("value", 0);
	$("#info-bar").disableInfo();
	$("#sum").text("");
	$("#message").text("");
	$("#order").text("");
	$(".apb").bind("click", startRobot).attr("isTriggered", false);
}

function beforeSendFunc(XMLHttpRequest) {
	//waiting
	$("." + this.obj + "span").show().text("...");
	//disable all
	$(".button").disable();
}

function getRandomOrder() {
  var orderNum = new Array(5);
  for (var i = 0; i < 5; i++)
  	orderNum[i] = i;
  
  for (var i = 0; i < 20; i++) {
  	var x = Math.floor(Math.random() * 6);
  	var y = Math.floor(Math.random() * 6);
  	if (x >= 0 && x < 5 && y >= 0 && y < 5)
  	{
  		var temp = orderNum[x];
  		orderNum[x] = orderNum[y];
  		orderNum[y] = temp;
  	}
  }

  return orderNum;
}

function orderToString(order) {
	var orderLetter = new Array(5);
	for (var i = 0; i < 5; i++)
  {
  	switch(order[i]){
  		case 0: 
  			orderLetter[i] = "A";
  			break;
  		case 1:
  			orderLetter[i] = "B";
  			break;
  		case 2:
  			orderLetter[i] = "C";
  			break;
  		case 3:
  			orderLetter[i] = "D";
  			break;
  		case 4:
  			orderLetter[i] = "E";
  			break;
  		default:break;
  	}
  }

	var result = "(";
	for(var i = 0; i < 5; i++)
		result = result + orderLetter[i] + ((i == 5)? ")" : ",")
	result += ")";
	return result;
}
