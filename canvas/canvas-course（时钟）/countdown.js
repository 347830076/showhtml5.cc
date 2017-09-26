var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

//var endTime = new Date();
//endTime.setTime( endTime.getTime() + 3600*1000 )
var curShowTimeSeconds = 0

var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

window.onload = function(){

    WINDOW_WIDTH = document.documentElement.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;
  
    MARGIN_LEFT = Math.round(WINDOW_WIDTH /10);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108)-1

    MARGIN_TOP = Math.round(WINDOW_HEIGHT /5);

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");  

    canvas.width = WINDOW_WIDTH;   //设置画布的宽
    canvas.height = WINDOW_HEIGHT; //设置画布的高

    curShowTimeSeconds = getCurrentShowTimeSeconds();//当前时间的秒数
	//定时器 50毫秒一次
    setInterval(
        function(){
            render( context ); //绘画小球
            update();          //更新小球
        }
        ,
        50
    );
}

function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
    return ret; //返回当前时间的秒数
}

function update(){

    var nextShowTimeSeconds = getCurrentShowTimeSeconds();//下一次时间

    var nextHours = parseInt( nextShowTimeSeconds / 3600);//下一次时间的小时
    var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600)/60 )//下一次时间的分钟
    var nextSeconds = nextShowTimeSeconds % 60 //下一次时间的秒

    var curHours = parseInt( curShowTimeSeconds / 3600);//当前时间的小时
    var curMinutes = parseInt( (curShowTimeSeconds - curHours * 3600)/60 )//当前时间的分钟
    var curSeconds = curShowTimeSeconds % 60 //当前时间的秒

    if( nextSeconds != curSeconds ){ //如果当前小时不等于下一次小时，已经有变化，则更新，增加小球到数组balls
        if( parseInt(curHours/10) != parseInt(nextHours/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(curHours/10) );
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(curHours/10) );
        }

        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes%10) );
        }

        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
        }

        curShowTimeSeconds = nextShowTimeSeconds;
    }

    updateBalls();

    // console.log( balls.length)
}

function updateBalls(){

    for( var i = 0 ; i < balls.length ; i ++ ){

        balls[i].x += balls[i].vx;

    var c = 1.0;
	if( balls[i].y + RADIUS + balls[i].vy >= WINDOW_HEIGHT ){
	    c = ( WINDOW_HEIGHT - (balls[i].y+ RADIUS) ) / balls[i].vy;
	    // console.log( c );
	}
        
	balls[i].y += balls[i].vy;
	balls[i].vy += c * balls[i].g;;

        if( balls[i].y >= WINDOW_HEIGHT-RADIUS ){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
	    balls[i].vy = - Math.abs(balls[i].vy)*0.75;
        }
    }

    var cnt = 0
    for( var i = 0 ; i < balls.length ; i ++ )
        if( balls[i].x + RADIUS > 0 && balls[i].x -RADIUS < WINDOW_WIDTH )
            balls[cnt++] = balls[i]

    while( balls.length > cnt ){
        balls.pop();
    }
}

function addBalls( x , y , num ){

    for( var i = 0  ; i < digit[num].length ; i ++ )
        for( var j = 0  ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    vy:-5,
                    color: colors[ Math.floor( Math.random()*colors.length ) ]
                }

                balls.push( aBall )
            }
}

function render( cxt ){

    cxt.clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT);  //清屏

    var hours = parseInt( curShowTimeSeconds / 3600);  //当前小时
    var minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 )//当前分钟
    var seconds = curShowTimeSeconds % 60//当前秒

    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt )  //画小时的十位数
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt )//画小时的个位数
    renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt ) //画冒号
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);//画分钟的十位数
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);//画分钟的个位数
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);  //画冒号
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);//画秒的十位数
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);//画秒的个位数

    for( var i = 0 ; i < balls.length ; i ++ ){//遍历balls中所有的小球，并绘画出来
        cxt.fillStyle=balls[i].color;
        cxt.beginPath();
        cxt.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
        cxt.closePath();

        cxt.fill();
    }
}

function renderDigit( x , y , num , cxt ){

    cxt.fillStyle = "rgb(0,102,153)";

    for( var i = 0 ; i < digit[num].length ; i ++ )
        for(var j = 0 ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                cxt.beginPath();
                cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI )
                cxt.closePath()

                cxt.fill()
            }
}