window.onload = start;

var option = {
	type : "GET",
	url : "/request",
	beforeSend : beforeSendFunc,
	success : successSendFunc
}
var xhr = new Array(5);
var order = new Array(5);
var index = 0;

function start() {
	$(".red-dot").hide();
	$(".button").attr("value", 0).click(sendGet);
	$("#button").mouseleave(reset);
	$(".apb").attr("isTriggered", false).click(startRobot);

	$.fn.enable = function(mothod){
		this.attr("class", "blue" +" button").bind("click", mothod);
		return this;
	};
	$.fn.disable = function(){
		this.attr("class", "grey" + " button").unbind("click");
		return this;
	};
	$.fn.enableInfo = function(mothod, callback){
		this.attr("class", "blue").bind("click", mothod);
		callback(this);
	};
	$.fn.disableInfo = function(){
		this.attr("class", "grey").unbind("click");
		return this;
	};
}

function startRobot() {
	console.log("startRobot");
	$(".apb").attr("isTriggered", true).unbind("click");
	getRandomOrder();
	var orderString  = "(";
	for(var i = 0; i < 5; i++)
		orderString = orderString + order[i] + ((i == 5)? ")" : ",")
	orderString += ")";
	$("#order").text(orderString);

	$("#" + order[0]).trigger("click");
}

function sendGet() {
	var parse = {
		"A" : 0,
		"B" : 1,
		"C" : 2,
		"D" : 3,
		"E" : 4
	}
	var target = this.title;
	console.log(target, " begin to send request");
	// if (xhr[parse[target]] != null)
	// {
	// 	console.log(xhr.length, " ", parse[target]);
	// 	console.log("forbid resend in ", target, " ", xhr[parse[target]]);
	// 	xhr[parse[target]].abort();
	// } else {
		xhr[parse[target]] = $.ajax({
			obj : target,
			type : "GET",
			url : "/request.dat",
			beforeSend : beforeSendFunc,
			success : successSendFunc
		});
	// }
}

function beforeSendFunc(XMLHttpRequest) {
	//waiting
	$("." + this.obj + "span").show().text("...");
	//disable all
	$(".button").disable();
}

function successSendFunc(data) {
	console.log(this.obj, "send end");
	//show number
	$("." + this.obj + "span").text(data)
	$("#" + this.obj).attr("value", data);
	//enable others
	//check if every one gets its value
	for (var i = 0; i < 5; i++) {
		if ($(".button")[i].value == 0) 
			$("#" + $(".button")[i].title).enable(sendGet);
	}

	//if every one gets its value, enable big bubble
	if (index == 4)
	{
		$("#info-bar").enableInfo(getSum, function(argument){
			argument.trigger("click");
		});
	}
	else {
		if ($(".apb").attr("isTriggered") == "true") {
			console.log("trigger", order[index + 1]);
			$("#" + order[++index]).trigger("click");
		}
	}	
}

function getSum() {
	var sum = 0;
	$(".button")
	for (var i = 0; i < 5; i++)
		sum += $(".button")[i].value;
	$("#sum").text(sum);
	$("#info-bar").disableInfo();
}

function reset() {
	console.log("reset");
	for (var i = 0; i < 5; i++) {
		order[i] = "";
		xhr[i] = null;
	}
	index = 0;
	$(".red-dot").hide();
	$(".button").enable(sendGet).attr("value", 0);
	$("#info-bar").disableInfo();
	$("#sum").text("");
	$("#order").text("");
	$(".apb").bind("click", startRobot).attr("isTriggered", false);
}

function getRandomOrder() {
  var orderNum = new Array(5);
  for (var i = 0; i < 5; i++)
  	orderNum[i] = i;
  
  console.log(orderNum);

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
  for (var i = 0; i < 5; i++)
  {
  	switch(orderNum[i]){
  		case 0: 
  			order[i] = "A";
  			break;
  		case 1:
  			order[i] = "B";
  			break;
  		case 2:
  			order[i] = "C";
  			break;
  		case 3:
  			order[i] = "D";
  			break;
  		case 4:
  			order[i] = "E";
  			break;
  		default:break;
  	}
  }
}