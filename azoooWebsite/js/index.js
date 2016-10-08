$("#city").click(function(e) {
	SelCity(this, e);
});

function onfousInput(dom) {
	if($(dom).val() == '你的姓名' || $(dom).val() == '你的手机号' || $(dom).val() == '手机验证码' || $(dom).val() == '详细地址' || $(dom).val() == '省份/城市/县区') {
		$(dom).val('');
		$(dom).css('color', '#5e5e5e');
	}
}

function blurInput(dom) {
	if(!$(dom).val()) {
		$(dom).val($(dom).attr('data-type'));
		$(dom).css('color', '#d8d8d8');
	}
}

//验证码
function yanzhengma(dom) {
	if($(dom).html() == '获取验证码') {
		var time = 60;
		$(dom).html(time + 's');
		$(dom).css('backgroundColor', '#d5d5d5');
		repeat(time, function(time) {
			if(time != 0) {
				$('#yanzhengmaCode').html(time + 's');
			} else {
				$('#yanzhengmaCode').html('获取验证码');
				$('#yanzhengmaCode').css('backgroundColor', '#fccf00');
			}
		});
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

//立即预约
function yuyue() {
	var msg = '';

	if($('#name').val() == '你的姓名') {
		msg += '请输入你的姓名。<br/>';
	}
	if($('#phone').val() == '你的手机号') {
		msg += '请输入你的手机号。<br/>';
	} else {
		if(!regularPhoneNumber($('#phone').val())) {
			msg += '手机号格式不对。<br/>';
		}
	}

	if($('#yanzhengma').val() == '手机验证码') {
		msg += '请输入手机验证码。<br/>';
	}

	if($('#city').val() == '省份/城市/县区') {
		msg += '请选择地区。<br/>';
	}

	if($('#address_datail').val() == '详细地址') {
		msg += '请输入详细地址。<br/>';
	}

	if(msg) {
		$('#alertbackground').css('display', 'block');
		$('#alertContainer').css('display', 'block');
		$('#alertMsg').html(msg);
		return false;
	}

	//切换
	$('#firstContainer').css('display', 'none');
	$('#sendContainer').css('display', 'block');
	$('#header_right_text').css('display', 'none');
	$('#header_right_back').css('display', 'block');
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