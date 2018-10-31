window.onload = start;

//when submit the form
function start() {
	$("#alarm").text("");
	var search = window.location.search;
	console.log(window.location.search);
	if (search != "") {
		var username = search.substr(10, search.length - 10);
		console.log(username);

		$.post("/requestdata", username, function(data){
			if (data === "fail")
				console.log("from event : message is ", data);
			else {
				var dataOBJ = eval('(' + data + ')');
				console.log(data);
				changeHTML(dataOBJ);
				}
		});
	}

	$("#submit").click(function(){
		var newInfo = getJsonData();

		if (isValid(newInfo)) {
			console.log("valid format");
			$.post("/postdata", newInfo, function(message){
				if (message === "name")
					alert("该用户名已经存在");
				else if (message === "id")
					alert("该学号已经存在");
				else if (message === "phone")
					alert("该电话已经存在");
				else if (message === "mail")
					alert("该邮箱已经存在");
				else {
					$("body").html(message);
					changeHTML(newInfo);
				}
			});
		}
		else {
			console.log("wrong format");
		}
	});

	$("#reset").click(function (){
		$("input").val("");
		$("#alarm_name").text("");
		$("#alarm_id").text("");
		$("#alarm_phone").text("");
		$("#alarm_mail").text("");
	});
}
function getJsonData() {
	var input = {};
	input["name"] = $("#u_name").val();
	input["id"] = $("#u_id").val();
	input["phone"] = $("#u_phone").val();
	input["mail"] = $("#u_mail").val();
	return input;
}

function changeHTML(dataOBJ) {
	$("#name").text(dataOBJ.name);
	$("#id").text(dataOBJ.id);
	$("#phone").text(dataOBJ.phone);
	$("#mail").text(dataOBJ.mail);
}

//verify info if vaild in format return true
function isValid(input) {
	var flag = true;
	var alarmText = "";

	if ((input.name[0] < 'a' || input.name[0] > 'z') 
			&& (input.name[0] < 'A' || input.name[0] > 'Z'))
		alarmText += "用户名必须以英文字母开头\n";
	if (input.name.length < 6 || input.name.length > 18)
		alarmText += "用户名长度应为6到18位\n";
	for (var i = 0; i < input.name.length; i++) {
		if (!checkName(input.name[i]))
		{
			alarmText += "用户名只能是英文字母、数字或下划线\n";
			break;
		}
	}
	

	$("#alarm_name").text(alarmText);
	if (alarmText != "")
		flag = false;

	alarmText = "";

	if (input.id.length != 8 || input.id[0] == '0')
	{
		flag = false;
		$("#alarm_id").text("学号8位数字，不能以0开头");
	}
	else $("#alarm_id").text("");

	if (input.phone.length != 11 || input.phone == '0')
	{
		flag = false;
		$("#alarm_phone").text("电话11位数字，不能以0开头");
	}
	else $("#alarm_phone").text("");

	if (!checkMail(input.mail))
	{
		flag = false;
		$("#alarm_mail").text("邮箱不合法");
	}
	else $("#alarm_mail").text("");

	return flag;
}

function checkName(bit) {
	var isLetter = !((bit < 'a' || bit > 'z') && (bit < 'A' || bit > 'Z'));
	var isDight = !(bit < '0' || bit > '9');
	var isSign = (bit === '_')
	return (isLetter || isDight ||isSign); 
}

function checkMail(mail) {
	return /^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/.test(mail);
}