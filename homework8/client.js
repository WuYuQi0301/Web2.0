
var findLargest = require('./findLargest')
findLargest('./path/to/dir', function (er, filename) {
  if (er) return console.error(er)
  console.log('largest file was:', filename)
})




var res = new Int16Array([16,10,11,8,2]),l= res.length;
var variables = [];
(function calculate(i) {
	if(i === l-1) {
		variables[i] = res[i];
		console.log(i + ":" + variables[i]); 
		process.exit();
	} 
	else {
		calculateTail(res[i],res[i+1],function(tail) {
			variables[i] = tail;
			calculateHead(res[i],res[i+1],function(head) {
				res[i+1] = head;
				console.log('-----------------'+i+'-----------------')
				calculate(i+1);
			});
		});
	}
})(0);
function calculateTail(x,y,cb) {
   setTimeout(function(){
		var tail = (x-y)/2;
		cb(tail);
	},300);
}
function calculateHead(x,y,cb) {
	setTimeout(function(){
		var head = (x+y)/2;
		cb(head);
	},400);
}