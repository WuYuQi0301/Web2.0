window.onload = start;

var option = {
	type : "GET",
	url : "/request",
	beforeSend : beforeSendFunc,
	success : successSendFunc
}

function start() {
	$(".red-dot").hide();
	$(".button").attr("value", 0).click(sendGet);
	$("#button").mouseleave(reset);

	$.fn.enable = function(mothod){
		this.attr("class", "blue" +" button").bind("click", mothod);
		return this;
	};
	$.fn.disable = function(){
		this.attr("class", "grey" + " button").unbind("click");
		return this;
	};
	$.fn.enableInfo = function(mothod){
		this.attr("class", "blue").bind("click", mothod);
		return this;
	};
	$.fn.disableInfo = function(){
		this.attr("class", "grey").unbind("click");
		return this;
	};
}


function sendGet() {
	var target = this.title;
	$.ajax({
		obj : target,
		type : "GET",
		url : "/request.dat",
		beforeSend : beforeSendFunc,
		success : successSendFunc
	});
}

function beforeSendFunc(XMLHttpRequest) {
	//waiting
	$("." + this.obj + "span").show().text("...");
	//disable others
	for (var i = 0; i < 5; i++) {		
		if ($(".button")[i].title == this.obj)
			continue;
		$("#" + $(".button")[i].title).disable();
	}
}

function successSendFunc(data) {
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
		$("#" + $(".button")[i].title).enable(sendGet);
	}
	//if every one gets its value, enable big bubble
	if (flag == 5)
		$("#info-bar").enableInfo(getSum);
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
	$(".red-dot").hide();
	$(".button").enable(sendGet).attr("value", 0);
	$("#info-bar").disableInfo();
	$("#sum").text("");
}
