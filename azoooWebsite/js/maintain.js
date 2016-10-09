//点击更多
function more(dom) {
	if($(dom).attr('data-more')) {
		if($(dom).attr('data-more') == 0) {
			$(dom).parent().css({
				'height': 'auto',
				'overflow': 'visible'
			});
			$(dom).attr('data-more', 1);
		} else {
			//						$(dom).parent().css('height','50px');
			$(dom).parent().css({
				'height': '50px',
				'overflow': 'hidden'
			});
			$(dom).attr('data-more', 0);
		}
	} else {
		$(dom).parent().css({
			'height': 'auto',
			'overflow': 'visible'
		});
		$(dom).attr('data-more', 1);
	}
}

//			var brand = [{id : 1,name : '苹果'},{id : 2,name : '华为'},{id : 3,name : '小米'},{id : 4,name : 'oppo'},{id : 5,name : '魅族'},{id : 6,name : '三星'}];
//			
//			var model = [{id : 1,mid : 'pg1',name : 'iPone 6S'},{id : 1,mid : 'pg2',name : 'iPone 6'},{id : 2, mid : 'hw1', name : '荣耀9'},{id : 2, mid : 'hw2', name : '荣耀8'}];
//			
//			var color = [{mid : 'pg1',name : '银色'},{mid : 'pg1',name : '深空色'},{mid : 'pg2',name : '深空色'},{mid : 'hw1',name : '银色'},{mid : 'hw1',name : '黑色'},{mid : 'hw2',name : '灰色'}];
//			
//			//数组去重
//			Array.prototype.unique1 = function()
//			{
//				var n = []; //一个新的临时数组
//				for(var i = 0; i < this.length; i++) //遍历当前数组
//				{
//					//如果当前数组的第i已经保存进了临时数组，那么跳过，
//					//否则把当前项push到临时数组里面
//					if (n.indexOf(this[i]) == -1) n.push(this[i]);
//				}
//				return n;
//			}
//			//找出有颜色的品牌
//			findColor('银色');
//			function findColor(name){
//				var barndArr = [] , modelArr = [];
//				for(var i = 0; i < brand.length; i++){
//					for(var j = 0; j < model.length; j++){
//						if(model[j].id == brand[i].id){
//							for(var k =0; k < color.length; k++){
//								if(color[k].mid == model[j].mid){
//									if(color[k].name == name){
//										barndArr.push(brand[i].name);
//										modelArr.push(model[j].name);
//									}								
//								}
//							}				
//						}
//					}				
//				}				
////				console.log(JSON.stringify(barndArr.unique1()));
////				console.log(JSON.stringify(modelArr.unique1()));
//				return {
//					barndArr : barndArr.unique1(),
//					modelArr : modelArr.unique1()
//				}
//			}


//城市选择器初始化
$("#city").click(function(e) {
	SelCity(this, e);
});

function onfousInput(dom) {
	if($(dom).val() == '您的姓名' || $(dom).val() == '您的手机号' || $(dom).val() == '街道门牌号，地区信息不用再填') {
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