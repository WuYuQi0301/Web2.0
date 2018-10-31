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
		xhr.abort();
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
	var flag = 0, seq = -1;
	for (var i = 0; i < 5; i++) {
		if ($(".button")[i].value != 0) {
			flag++;
			continue;
		}
		if (seq == -1) seq = i;
		$("#" + $(".button")[i].title).enable(sendGet);
	}

	//if every one gets its value, enable big bubble
	if (flag == 5)
	{
		$("#info-bar").enableInfo(getSum, function(argument){
			argument.trigger("click");
		});
	}
	else {
		if ($(".apb").attr("isTriggered") == "true") {
			$("#" + $(".button")[seq].title).trigger("click");
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
		xhr[i] = null;
	}
	$(".red-dot").hide();
	$(".button").enable(sendGet).attr("value", 0);
	$("#info-bar").disableInfo();
	$("#sum").text("");
	$(".apb").bind("click", startRobot).attr("isTriggered", false);
}
