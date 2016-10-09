//右浮动选项
$('.float_right_con li').each(function(index) {
	$(this).attr('data-index', index);
});
//鼠标经过元素上
$('.float_right_con li').on('mouseover',function(){
	if($(this).attr('data-index') == 0) { //客服
		$('.float_right_con li').removeClass('float_right_active');
		$('.float_right_con li').find('.float_r_wx_content').css('display', 'none');
	}else if($(this).attr('data-index') == 1){ //微信
		$('.float_right_con li').removeClass('float_right_active');
		$('.float_right_con li').find('.float_r_wx_content').css('display', 'none');
		$(this).addClass('float_right_active');
		$(this).find('.float_r_wx_content').css('display', 'block');
	}else if($(this).attr('data-index') == 2){ //投诉反馈

	}
});
//鼠标划出元素
$('.float_right_con li').on('mouseout',function(){
	if($(this).attr('data-index') == 0) { //客服

	}else if($(this).attr('data-index') == 1){ //微信
		$('.float_right_con li').removeClass('float_right_active');
		$('.float_right_con li').find('.float_r_wx_content').css('display', 'none');
	}else if($(this).attr('data-index') == 2){ //投诉反馈

	}
});
//选项切换

$('.float_right_con li').click(function() {
	if($(this).attr('class').indexOf('float_right_active') > -1) {
		if($(this).attr('data-index') == 0) { //客服

		} else {
			$(this).removeClass('float_right_active');
			$(this).find('.float_r_wx_content').css('display', 'none');
		}
	} else {
		if($(this).attr('data-index') == 0) { //客服	
			_MEIQIA('showPanel'); //打开美恰聊天窗口
		} else {
			$('.float_right_con li').removeClass('float_right_active');
			$(this).addClass('float_right_active');
			$('.float_right_con li').find('.float_r_wx_content').css('display', 'none');
			$(this).find('.float_r_wx_content').css('display', 'block');
		}
	}
});
//服务投诉和意见反馈切换
$('.float_r_wx_content_toggle>div').click(function() {
	$('.float_r_wx_content_toggle>div>i').removeClass('float_r_wx_content_toggle_iactive');
	$(this).find('i').addClass('float_r_wx_content_toggle_iactive');
	if($(this).find('span').text() == '服务投诉') {
		$('.float_r_wx_content_tousu').css('display', 'block');
	} else {
		$('.float_r_wx_content_tousu').css('display', 'none');
	}
});
//取消
$('.float_r_wx_content_btns_l').click(function() {
	$('.float_right_con li').eq(2).removeClass('float_right_active');
	$('.float_right_con li').eq(2).find('.float_r_wx_content').css('display', 'none');
});
//提交
$('.float_r_wx_content_btns_r').click(function() {
	
	var title = $('.float_r_wx_content_tousu').val();
	if(title == '所要投诉工程师的姓名或电话（选填）') {
		title = '';
	}
	var phone = $('.float_r_wx_content_phone input').val();
	if(!regularPhoneNumber(phone)) {
		alert('您输入的手机格式不对');
		return false;
	}
	var type = '';
	$('.float_r_wx_content_toggle>div>i').each(function() {
		if($(this).attr('class').indexOf('float_r_wx_content_toggle_iactive') > -1) {
			type = $(this).attr('data-type');
		}
	});
	var content = $('.float_r_wx_content_yj').val();
	if(!content || content == '请填写您遇到的问题或意见建议，您的意见对加速度非常重要，是我们前进的动力') {
		alert('请填写您遇到的问题或意见建议');
		return false;
	}
//	console.log(phone + "::" + title + "::" + type + '::' + content);
	myc.showProgress({title:'提交中'});
	$.ajax({
		type: "post",
		url: float_right_url,
		dataType: "json",
		data: {
			phone: phone,
			title: title,
			type: type,
			content: content
		},
		success: function(rsp) {
//			console.log(rsp);
			myc.hideProgress();
			if(rsp.status == 0) {
				setTimeout(function(){
					alert(rsp.msg);
				},200);
			} else if(rsp.status == 1) {
				$('.float_right_con li').eq(2).removeClass('float_right_active');
				$('.float_right_con li').eq(2).find('.float_r_wx_content').css('display', 'none');
				setTimeout(function(){
					alert(rsp.msg);
				},200);
			}
		},
		error: function() {
			alert('网络出错,请重新提交');
		},complete:function(){
			myc.hideProgress();
		}
	});
});
//阻止冒泡
$('.float_r_wx_content').click(function(e) {
	e.stopPropagation();
});
$('.float_right_con').click(function(e){
	e.stopPropagation();
});

function onfousInput_float(dom) {
	if($(dom).val() == '所要投诉工程师的姓名或电话（选填）' || $(dom).val() == '请留下您的手机号码' || $(dom).val() == '请填写您遇到的问题或意见建议，您的意见对加速度非常重要，是我们前进的动力') {
		$(dom).val('');
		$(dom).css('color', '#bcbcbc');
	}
}

function blurInput_float(dom) {
	if(!$(dom).val()) {
		$(dom).val($(dom).attr('data-type'));
	}
}
//判断手机号码是否正确
function regularPhoneNumber(str) {
	var s = str.replace(/\s|\-/g, '');
	if(s.indexOf("+86") == 0) {
		s = s.substr(3);
	}
	var d = /^1\d{10}$/g;
	if(d.test(s)) {
		return s;
	} else {
		return null;
	}
}
//美恰
(function(m, ei, q, i, a, j, s) {
	m[i] = m[i] || function() {
		(m[i].a = m[i].a || []).push(arguments)
	};
	j = ei.createElement(q),
		s = ei.getElementsByTagName(q)[0];
	j.async = true;
	j.charset = 'UTF-8';
	j.src = '//static.meiqia.com/dist/meiqia.js';
	s.parentNode.insertBefore(j, s);
})(window, document, 'script', '_MEIQIA');
_MEIQIA('entId', 29716);
// 在这里开启手动模式（必须紧跟美洽的嵌入代码）
_MEIQIA('withoutBtn');

//点击body关闭美恰聊天窗口或反馈
$('body').click(function() {
	_MEIQIA('hidePanel');
	$('.float_right_con li').eq(2).removeClass('float_right_active');
	$('.float_right_con li').eq(2).find('.float_r_wx_content').css('display', 'none');
});

var _debug = false;


if (_debug) {
	window.onerror = function (message, url, line) {
		alert('Error at line ' + line + ': ' + JSON.stringify(message));
	};
}

var myc = (function(){

	//定时器
	function repeat(f, t, c) {
		var count = 0;
		return setTimeout(function() {
			if (f(++count) === false) return;
			else if (c && count >= c) return;
			else setTimeout(arguments.callee, t);
		}, t);
	}

	//弹出框
	function alert(obj,callback){				
		var title = obj.title || '系统提示';
		var msg = obj.msg || '';
		if(obj.buttons){			
			var buttons = obj.buttons;								
		}else{
			var buttons = ['确定'];
		}
		if(document.getElementById("alertbackground")){
			document.getElementById("alertbackground").style.display = 'block';
			document.getElementById("alertContainer").style.display = 'block';
		}else{
			var html = '<div id="alertbackground" style="position: fixed;left: 0;top: 0px;width: 100%;height: 100%;background-color: rgba(0,0,0,0.5);z-index:9999999"></div><div id="alertContainer" style="position: fixed;left: 50%;top: 50%;-webkit-transform: translateX(-50%) translateY(-50%);-moz-transform: translateX(-50%) translateY(-50%);-ms-transform: translateX(-50%) translateY(-50%);-o-transform: translateX(-50%) translateY(-50%);transform: translateX(-50%) translateY(-50%);width: 300px;height: auto;z-index: 9999999;background-color: #fff;text-align: center;border-radius: 7px;"><div id="alertTitle" style="height: 40px;line-height: 40px;color: #45c01a;font-size: 18px;border-bottom: 1px solid #45c01a;"></div><div id="alertMsg"  style="min-height: 50px;padding: 10px;word-break:break-all;word-wrap:break-word;"></div><div id="alertBtnContainer" style="position: relative;height: 40px;line-height: 40px;border-top: 1px solid #e1e1e1;"></div></div>';
			document.body.insertAdjacentHTML('beforeEnd', html);
		}
		
		document.getElementById("alertTitle").innerHTML = title;			
		document.getElementById("alertMsg").innerHTML = msg;		
		
		
		var btnStyle = '<div style="position: absolute;left: 0;width: 100%;">'+ buttons[0];
		document.getElementById("alertBtnContainer").innerHTML = btnStyle;
	
		var divs = document.getElementById("alertBtnContainer").querySelectorAll('div');
		for(var i = 0; i < divs.length; i++){
			divs[i].addEventListener('click',function(){
				if(callback && typeof(callback) == 'function'){
					callback();
					alertHide();
				}else{
					alertHide();
				}
			},false);
		}
		document.getElementById("alertbackground").addEventListener('click',function(){
			event.stopPropagation();
			event.preventDefault();
			alertHide();
		},false);

		function alertHide(){
			document.getElementById("alertbackground").style.display = 'none';
			document.getElementById("alertContainer").style.display = 'none';
		}
	}
	//弹出带两个或三个按钮的confirm对话框
	function confirm(obj,callback){				
		var title = obj.title || '淘美';
		var msg = obj.msg || '';
		if(obj.buttons){
			if(obj.buttons.length == 1){					
				var buttons = [obj.buttons[0], '取消'];
			}else{
				var buttons = obj.buttons;
			}					
		}else{
			var buttons = ['确定', '取消'];
		}
		if(document.getElementById("confirmbackground")){
			document.getElementById("confirmbackground").style.display = 'block';
			document.getElementById("confirmContainer").style.display = 'block';
		}else{
			var html = '<div id="confirmbackground" style="position: fixed;left: 0;top: 0px;width: 100%;height: 100%;background-color: rgba(0,0,0,0.5);z-index:9999999"></div><div id="confirmContainer" style="position: fixed;left: 50%;top: 50%;-webkit-transform: translateX(-50%) translateY(-50%);-moz-transform: translateX(-50%) translateY(-50%);-ms-transform: translateX(-50%) translateY(-50%);-o-transform: translateX(-50%) translateY(-50%);transform: translateX(-50%) translateY(-50%);width: 300px;height: auto;z-index: 9999999;background-color: #fff;text-align: center;border-radius: 7px;"><div id="confirmTitle" style="height: 40px;line-height: 40px;color: #45c01a;font-size: 18px;border-bottom: 1px solid #45c01a;"></div><div id="confirmMsg"  style="min-height: 50px;padding: 10px;word-break:break-all;word-wrap:break-word;"></div><div id="confirmBtnContainer" style="position: relative;height: 40px;line-height: 40px;border-top: 1px solid #e1e1e1;"></div></div>';
			document.body.insertAdjacentHTML('beforeEnd', html);
		}
		
		document.getElementById("confirmTitle").innerHTML = title;			
		document.getElementById("confirmMsg").innerHTML = msg;		
		
		if(buttons.length <= 2){
			var btnStyle = '<div style="position: absolute;left: 0;width: 50%;border-right: 1px solid #e1e1e1;">'+ buttons[0] +'</div><div style="position: absolute;right: 0;width: 50%;">'+ buttons[1] +'</div>';
			document.getElementById("confirmBtnContainer").innerHTML = btnStyle;
		}else{
			var btnStyle = '<div style="position: absolute;left: 0;width: 33.3%;border-right: 1px solid #e1e1e1;">'+ buttons[0] +'</div><div style="position: absolute;left:33.3%;width: 33.3%;border-right: 1px solid #e1e1e1;">'+ buttons[1] +'</div><div style="position: absolute;right: 0;width: 33.3%;">' + buttons[2] + '</div>';
			document.getElementById("confirmBtnContainer").innerHTML = btnStyle;
		}
		var divs = document.getElementById("confirmBtnContainer").querySelectorAll('div');
		for(var i = 0; i < divs.length; i++){
			divs[i].setAttribute('index',i);
			divs[i].addEventListener('click',function(){
				var index = ~~this.getAttribute('index') + 1;
				if(callback && typeof(callback) == 'function'){
					callback({buttonIndex : index});
					confirmHide();
				}
			},false);
		}
		document.getElementById("confirmbackground").addEventListener('click',function(){
			confirmHide();
		},false);
		document.getElementById("confirmbackground").addEventListener('click',function(){
			event.stopPropagation();
			event.preventDefault();
		},false);
		function confirmHide(){
			document.getElementById("confirmbackground").style.display = 'none';
			document.getElementById("confirmContainer").style.display = 'none';
		}
	}
	
	//吐丝
	var toastTimer = null;
	function toast(obj){
		if(document.getElementById("toastContainer")){
			document.body.removeChild(document.getElementById("toastContainer"));
		}					
		if(obj.location == 'top'){
			var duration = 'top:20px;';
			var translate = '-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);';
		}else if(obj.location == 'middle'){
			var duration = 'top:50%;';
			var translate = '-webkit-transform: translateX(-50%) translateY(-50%);-moz-transform: translateX(-50%) translateY(-50%);-ms-transform: translateX(-50%) translateY(-50%);-o-transform: translateX(-50%) translateY(-50%);transform: translateX(-50%) translateY(-50%);';
		}else if(obj.location == 'bottom'){
			var duration = 'bottom:20%;';
			var translate = '-webkit-transform: translateX(-50%) translateY(-50%);-moz-transform: translateX(-50%) translateY(-50%);-ms-transform: translateX(-50%) translateY(-50%);-o-transform: translateX(-50%) translateY(-50%);transform: translateX(-50%) translateY(-50%);';
		}else{
			var duration = 'top:50%;';
			var translate = '-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);';
		}
		var seed = (obj.duration / 1000) || 2;
		var location = '-webkit-animation: toastFrames 1s '+ seed +'s forwards;-moz-animation: toastFrames 1s'+ seed +'s forwards;-ms-animation: toastFrames 1s '+ seed +'s forwards;-o-animation: toastFrames 1s forwards'+ seed +'s;animation: toastFrames 1s ' + seed + 's forwards;';
		
		var style = '<style>@-webkit-keyframes toastFrames{from{opacity: 1;}to{opacity: 0;display:none;}}@-moz-keyframes toastFrames{from{opacity: 1;}to{opacity: 0;display:none;}}@-o-keyframes toastFrames{from{opacity: 1;}to{opacity: 0;display:none;}}@-ms-keyframes toastFrames{from{opacity: 1;}to{opacity: 0;display:none;}}</style>';
		
		var html = style + '<div id="toastContainer" style="position: fixed;'+ duration +'left: 50%;	width: 100%;z-index: 9999999;text-align: center;'+ translate + location +'"><span style="display: inline-block;	max-width: 80%;padding: 10px 20px;border-radius: 7px;word-break:break-all;word-wrap:break-word;background-color: rgba(0,0,0,0.5);color: #fff;" id="toastText"></span></div>';
		
		document.body.insertAdjacentHTML('beforeEnd', html);
		document.getElementById("toastText").innerText = obj.msg;	
		document.getElementById("toastContainer").addEventListener('touchmove',function(){
			event.stopPropagation();
			event.preventDefault();
		},false);
		if(toastTimer){
			clearTimeout(toastTimer);
		}
		var timeout = parseInt((seed+1)*1000); 
		toastTimer = setTimeout(function(){			
			if(document.getElementById("toastContainer")){
				document.body.removeChild(document.getElementById("toastContainer"));
			}
		},timeout);
	}
	//显示进度图层
	function showProgress(obj){
		if(obj){
			var rgba = obj.rgba || 0.3;
		}else{
			var rgba = 0.3;
		}
		
		if(document.getElementById("showProgressContainer")){
			document.getElementById("showProgressBackground").style.display = 'block';
			document.getElementById("showProgressContainer").style.display = 'block';
			document.getElementById("showProgressBackground").removeEventListener("touchstart",showProgressTouch);
			document.getElementById("showProgressBackground").removeEventListener("touchmove",showProgressTouch);
		}else{
			var html = '<div id="showProgressBackground" style="position: fixed;width: 100%;height: 100%;left: 0;top: 0;background-color: rgba(0,0,0,'+ rgba +');z-index:999999"></div><div id="showProgressContainer" style="position: fixed;left: 50%;top: 50%;-webkit-transform:  translateX(-50%) translateY(-50%);-moz-transform:  translateX(-50%) translateY(-50%);-ms-transform:  translateX(-50%) translateY(-50%);-o-transform:  translateX(-50%) translateY(-50%);transform:  translateX(-50%) translateY(-50%);background-color: rgba(0,0,0,1);color: #fff;padding: 15px;border-radius: 5px;text-align: center;min-height: 115px;min-width: 115px;z-index:999999"><div class="showProgressLoading"></div><div id="showProgressTitle" style="padding: 5px 0;color:#fff"></div><div id="showProgressText" style="color:#fff"></div></div>';
			
			document.body.insertAdjacentHTML('beforeEnd', html);
		}
		if(obj){
			var title = obj.title || '努力加载中...';
			var text = obj.text || '请稍候...';
			var modal = obj.modal || true;
		}else{
			var title = '努力加载中...';
			var text = '请稍候...';
			var modal = true;
		}
		document.getElementById("showProgressTitle").innerHTML = title;
		document.getElementById("showProgressText").innerHTML = text;
		
		if(modal){
			document.getElementById("showProgressBackground").addEventListener('touchstart',showProgressTouch,false);
			document.getElementById("showProgressBackground").addEventListener('touchmove',showProgressTouch,false);
		}	
	}
	function showProgressTouch(){
		event.stopPropagation();
		event.preventDefault();
	}
	//隐藏进度图层
	function hideProgress(){
		if(document.getElementById("showProgressContainer")){
			document.getElementById("showProgressBackground").style.display = 'none';
			document.getElementById("showProgressContainer").style.display = 'none';
		}
	}
	function getTime(time) {
	    if (time) {
	        var yy = time.getYear() + 1900;
	        var MM = time.getMonth() + 1;
	        var dd = time.getDate();
	        var HH = time.getHours();
	        var mm = time.getMinutes();
	        var ss = time.getSeconds();
	
	        return yy + "-" + bl(MM) + "-" + bl(dd) + " " + bl(HH) + ":" + bl(mm) + ":" + bl(ss);
	    }
	    else {
	        time = new Date();
	        var yy = time.getYear() + 1900;
	        var MM = time.getMonth() + 1;
	        var dd = time.getDate();
	        var HH = time.getHours();
	        var mm = time.getMinutes();
	        var ss = time.getSeconds();
	
	        return yy + "-" + bl(MM) + "-" + bl(dd) + " " + bl(HH) + ":" + bl(mm) + ":" + bl(ss);
	    }
	}
	function bl(s) {
	    return s < 10 ? '0' + s: s;
	}
	return {
		alert: alert,
		confirm : confirm,
		toast : toast,
		showProgress : showProgress,
		hideProgress : hideProgress,
		repeat : repeat,
		getTime : getTime
	};
})();