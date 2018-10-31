window.onload = start;

var option = {
	type : "GET",
	url : "/request",
	beforeSend : beforeSendFunc,
	success : successSendFunc
}
var xhr = new Array(5);

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
	$("#A").trigger("click");
	$("#B").trigger("click");
	$("#C").trigger("click");
	$("#D").trigger("click");
	$("#E").trigger("click");
}


function sendGet() {
	var parse = {
		"A" : 1,
		"B" : 2,
		"C" : 3,
		"D" : 4,
		"E" : 5
	}
	var target = this.title;
	console.log(target, " begin to send request");
	if (xhr[parse[target]] != null)
	{
		console.log("forbid resend in ", target);
		xhr[parse[target]].abort();
	} else {
			xhr[parse[target]] = $.ajax({
				obj : target,
				type : "GET",
				url : "/request.dat",
				beforeSend : beforeSendFunc,
				success : successSendFunc
		});
	}
}

function beforeSendFunc(XMLHttpRequest) {
	//waiting
	$("." + this.obj + "span").show().text("...");
}

function successSendFunc(data) {
	console.log(this.obj, "send end");
	//show number
	$("." + this.obj + "span").text(data)
	$("#" + this.obj).attr("value", data).disable();
	//enable others
	//check if every one gets its value
	var flag = 0;
	for (var i = 0; i < 5; i++) {
		if ($(".button")[i].value != 0) {
			flag++;
			continue;
		}
	}

	//if every one gets its value, enable big bubble
	if (flag == 5)
	{
		$("#info-bar").enableInfo(getSum, function(argument){
			argument.trigger("click");
		});
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
	for (var i = 1; i <= 5; i++) {
		xhr[i] = null;
	}
	$(".red-dot").hide();
	$(".button").enable(sendGet).attr("value", 0);
	$("#info-bar").disableInfo();
	$("#sum").text("");
	$(".apb").bind("click", startRobot).attr("isTriggered", false);
}
