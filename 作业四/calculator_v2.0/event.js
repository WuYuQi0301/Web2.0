window.onload = function () {
	var dgt_arr = document.getElementsByName("digit");
	var spc_btn_arr = document.getElementsByName("spc-btn");
	var oprt_arr = document.getElementsByName("operator");
	var input_box = document.getElementById("input-box");
	var show_box = document.getElementById("show");
	var equation = [];
	var is_operator = 0;
	var is_calculated = 0;

	//change css style
	var slogen = document.getElementById("slogen");
	var txt = slogen.firstChild;
	function change_style() {
		slogen.className = "label_style_after";
		txt.className = "txt_style_after";
	}
	function change_back() {
		slogen.className = "label_style_before";
		txt.className = "txt_style_before";
	}

	for (var i = dgt_arr.length - 1; i >= 0; i--) {
		dgt_arr[i].onclick = function() {
			change_style();
			if (is_calculated)
			{
				input_box.value = "";
				show_box.value = "";
				is_calculated = 0;
			}
			if (is_operator)
			{
				input_box.value = "";
				is_operator = 0;
			}
			input_box.value += this.value;
		}
	}

	for (var i = oprt_arr.length - 1; i >= 0; i--) {
		oprt_arr[i].onclick = function() {
			change_style();
			if (is_calculated)
			{
				input_box.value = "";
				show_box.value = "";
				is_calculated = 0;
			}
			if (this.value == ".") {
				//if on content in input box, consider it as "0."
				if(input_box.value == "" || is_operator)
				{
					is_operator = 0;
					input_box.value = "0.";
				}
				//if there is already exsisted a dot, refuse to accpet another one
				else if(input_box.value.indexOf(".") == -1)
				{
					input_box.value += this.value;
				}
			}
			// "("
			else if (this.value == "(")
			{
				equation += "(";
				show_box.value += " ( ";
				is_operator = 1;
			}
			//if there is not a "(" before enter an ")", refuse to accpet
			else if (this.value == ")") {
				if (equation.indexOf("(") != -1)
				{
					equation = equation + input_box.value + this.value;
					show_box.value = show_box.value + " " + input_box.value + " )";
					is_operator = 1;
				}
			}
			//enter +-*/
			else if (this.value != "=") {
				//when nothing in the input box (including that first input is "(")
				if (input_box.value == "")
				{
					equation = equation + "0" + this.value;
					show_box.value = show_box.value + "0 " + this.value;
				}
				//when there is an")"before it, do not add input box.value
				else if (equation[equation.length - 1] == ')')
				{
					equation += this.value;
					show_box.value = show_box.value + " " +this.value;
				}
				//change operator if there is another before it
				else if (equation[equation.length - 1] == '*' || equation[equation.length - 1] == '-' 
						|| equation[equation.length - 1] == '+'||equation[equation.length - 1] == '/')
				{
					equation = equation.substr(0, equation.length - 1) + this.value;
					show_box.value = show_box.value.substr(0, show_box.value.length - 1) + this.value;
				}
				//normal
				else
				{
					equation = equation + input_box.value + this.value;
					show_box.value = show_box.value + " " + input_box.value + " " + this.value;
				}
				is_operator = 1;
			}
			// enter "="
			else {
				if (input_box.value == "") {
					is_calculated = 1;
					equation = [];
				}
				else {
					try {
					equation += input_box.value;
					show_box.value = show_box.value + " " + input_box.value;
					is_calculated = 1;
					input_box.value = eval(equation);
					if (input_box.value == "Infinity")
						throw exception();
					} catch (exception) {
						alert( equation + "  Invalid Mathematical Equation!");
						input_box.value = "";
						show_box.value = "";
						equation = [];
					}
				}
			}
		}
	}

	for (var i = spc_btn_arr.length - 1; i >= 0; i--) {
		spc_btn_arr[i].onclick = function() {
			if (this.value == "CE") {
				input_box.value = "";
				show_box.value = "";
				equation = [];
				change_back();
			}
			else {
				change_style();
				if (!is_calculated)
					input_box.value = input_box.value.substr(0, input_box.value.length - 1);
			}
		}
	}
}
