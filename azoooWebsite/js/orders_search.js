$('#orders_searchBtn').click(function(){
	if($('#orders_input').val() == '输入订单号查询' || !$('#orders_input').val()){
		alert('请输入订单号');
		return false;
	}
	myc.showProgress({
		title:'查询中'
	});
	//查询订单信息
	$.ajax({
		type: "post",
		url: orders_url,
		dataType: "json",
		data: {
			orderSn : $('#orders_input').val()
		},
		success: function(rsp) {
//			console.log(rsp);
			myc.hideProgress();
			if(rsp.status == 0) {
				setTimeout(function(){
					alert(rsp.msg);
				},200);
			}else if(rsp.status == 1){
				var order = rsp.order;
				$('.ordersInfo').find('.ordersInfo_row').eq(0).find('div').eq(0).html('订单状态：' + order.message);
				$('.ordersInfo').find('.ordersInfo_row').eq(0).find('div').eq(1).html('下单时间：' + order.addTime);
				$('.ordersInfo').find('.ordersInfo_row').eq(1).find('div').eq(0).html('预约地址：' + order.orderAddr);
				$('.ordersInfo').find('.ordersInfo_row').eq(1).find('div').eq(1).html('预约时间：' + order.orderTime);
				$('.ordersInfo').find('.ordersInfo_row').eq(2).find('div').eq(0).html('预约人：' + order.nickName);
				$('.ordersInfo').find('.ordersInfo_row').eq(2).find('div').eq(1).html('预约电话：' + order.orderPhone);
				$('.ordersInfo').find('.ordersInfo_row').eq(3).find('div').eq(0).html('维修师傅：' + order.masterName);
				$('.ordersInfo').find('.ordersInfo_row').eq(3).find('div').eq(1).html('师傅电话：' + order.masterPhone);
				$('.ordersInfo').find('.ordersInfo_row').eq(4).find('div').eq(0).html('维修设备：' + order.phoneBrand + order.phoneModel);
				$('.ordersInfo').find('.ordersInfo_row').eq(4).find('div').eq(1).html('故障信息：' + order.repair);
				$('.ordersInfo').find('.ordersInfo_bottom').eq(0).find('div').eq(0).html('维修价格：' + order.totalPrice);
				$('.ordersInfo').find('.ordersInfo_bottom').eq(0).find('div').eq(1).html('优惠：' + order.couponPrice);
				$('.ordersInfo').find('.ordersInfo_bottom').eq(0).find('div').eq(2).html('实付价格：' + order.totalPrice);
				$('.ordersInfoCon').css('display','block');
			}
		},
		error: function() {
			alert('网络出错,请重新查询');
		},complete:function(){
			myc.hideProgress();
		}
	});
	//关闭查询订单信息内容
	$('.ordersInfo_close').click(function(){
		$('.ordersInfoCon').css('display','none');
	});
});
function onfousInputs(dom) {
	if($(dom).val() == '输入订单号查询'){
		$(dom).val('');
		$(dom).css('color', '#8b8b8b');
		$(dom).css('background-color', '#fff');
	}
}

function blurInputs(dom) {
	if(!$(dom).val()) {
		$(dom).val($(dom).attr('data-type'));
	}
	if($(dom).val() == '输入订单号查询'){
		$(dom).css('background-color', '#f5f6f6');
		$(dom).css('color', '#8b8b8b');
	}
}

var scrollOutTime = null;
var scrollFlag = true;
$(window).scroll(function () {   
	if(scrollOutTime){
		clearTimeout(scrollOutTime);
	}
	if(scrollFlag){
		$('.header').animate({opacity:'0.5'},200);
		scrollFlag = false;
	}
  
  scrollOutTime = setTimeout(function(){
  	$('.header').animate({opacity:'1'},200);
  	scrollFlag = true;
  },500);
});
