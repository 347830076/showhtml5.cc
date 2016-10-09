$("#city").click(function(e) {
	SelCity(this, e);
});

function onfousInput(dom) {
	if($(dom).val() == '您的姓名' || $(dom).val() == '您的手机号' || $(dom).val() == '手机验证码' || $(dom).val() == '详细地址' || $(dom).val() == '省份/城市/县区') {
		$(dom).val('');
		$(dom).css('color', '#5e5e5e');
	}else if($(dom).val() == '输入订单号查询'){
		$(dom).val('');
		$(dom).css('color', '#8b8b8b');
		$(dom).css('background-color', '#fff');
	}
}

function blurInput(dom) {
	if(!$(dom).val()) {
		$(dom).val($(dom).attr('data-type'));
		$(dom).css('color', '#d8d8d8');
	}
	if($(dom).val() == '输入订单号查询'){
		$(dom).css('background-color', '#f5f6f6');
		$(dom).css('color', '#8b8b8b');
	}
}



function repeat(time, callbcak) {
	if(time > 0) {
		callbcak(time);
		time--;
		setTimeout(function() {
			repeat(time, callbcak);
		}, 1000);
	} else {
		callbcak(0);
	}
}

function alertHide() {
	$('#alertbackground').css('display', 'none');
	$('#alertContainer').css('display', 'none');
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
