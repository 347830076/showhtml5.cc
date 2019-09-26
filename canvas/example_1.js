console.profile("Core HTML5");
var canvas = document.getElementById("canvas");//获取canvas元素
var readout = document.getElementById("readout");
var context = canvas.getContext("2d");//给绘图环境变量
spritesheet = new Image();
context.font = "38px Arial";//字体
context.fillStyle = "blue"; //填充图形颜色、渐变、图案
context.strokeStyle = "blue";//描边颜色、渐变、图案
context.fillText('Hellow Canvas',canvas.width/2-150,canvas.height/2);
context.strokeText("Hellow Canvas",canvas.width/2-149,canvas.height/2);

/* canvas.addEventListener('mousedown',function(e){
	alert("监听点击事件2");
},false); */

function windowToCanvas(canvas,x,y){
	var bbox = canvas.getBoundingClientRect();
	return {x:x-bbox.left*(canvas.width/bbox.width),
	y:y-bbox.top*(canvas.height/bbox.height)
	};
}
function drawBackground(){
	var VERTICAL_SPACING = 12,
	i =context.canvas.height;
	context.clearRect(0,0,canvas.width,canvas.height);
	context.strokeStyle = 'lightgray';
	context.lineWidth = 0.5;
	
	while(i>VERTICAL_SPACING*4){
		context.beginPath();
		context.moveTo(0,i);
		context.lineTo(context.canvas.width,i);
		context.stroke();
		i-=VERTICAL_SPACING;
	}
}
function drawSpritesheet(){
	context.drawImage(spritesheet,0,0);
}
function draGuidelines(x,y){
	context.strokeStyle = 'rgba(0,0,230,0.8)';
	context.lineWidth =0.5;
	drawVerticalLine(x);
	drawHorizontalLine(y);
}
function updateReadout(x,y){
	readout.innerText = '('+x.toFixed(0)+', '+y.roFixed(0)+')';
}
function drawHorizontalLine(y){
	context.beginPath();
	context.moveTo(0,y+0.5);
	context.lineTo(context.canvas.width,y+0.5);
	context.strok();
}
function drawVerticalLine(x){
	context.beginPath();
	context.moveTo(x+0.5,0);
	context.lineTo(x+0.5,context.canvas.height);
	context.stroke();
}
canvas.onmousedown = function(e){
	alert("监听点击事件1");
	var loc = windowToCanvas(canvas,e.clientX,e.clientY);
	drawBackground();
	drawSpritesheet();
	drawGuidelines(loc.x,loc.y);
	updateReadout(loc.x,loc.y);
};
spritesheet.src = '';
spritesheet.onload = function(e){
	drawSpritesheet();
};
drawBackground();
console.profileEnd();