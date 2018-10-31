var playing = false;
var buttons = document.getElementById('outer').children;

$("button").click(function(){
	if(!playing){
		var random = Math.floor(Math.random()*60);
		buttons[random].className = 'buttonClick';
		$("#status").text("Playing");
		playing = true;
		$("#time").text("30");
		$("#score").text("0");
		var i = 29;
		interval = setInterval(function(){
			$("#time").text(i);
			i--;
			if(i<0){
				clearInterval(interval);
				$(".buttonClick").removeClass("buttonClick").addClass("button");
				$("#status").text("Gameover");
				playing = false;
				alert($("#score").text());
			}
		} , 1000);
	}else{
		$("#status").text("Stop");
		$(".buttonClick").removeClass("buttonClick").addClass("button");
		playing = false;
		clearInterval(interval);
	}
});

for(let i=0; i<59; i++){
	var add = document.createElement('div');
	add.className = 'button';
	$("#outer").append(add);
}

for(var i=0; i<60; i++){
	buttons[i].onclick = (function(arg){
		return function(){
			var random = Math.floor(Math.random()*60);
			if(this.className == 'buttonClick'){
				this.className = 'button';
				buttons[random].className = 'buttonClick';
				$("#score").text(parseInt($("#score").text())+1);
			}else{
				if(playing==true)
					$("#score").text(parseInt($("#score").text())-1);
			}
		};
	})(i);
}