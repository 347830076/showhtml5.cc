(function(){
  //定义公共变量
  var datepickerWrapper;
  var monthData;
  var input = document.querySelector('.datepicker');


   //引入模版
  var datepicker = window.datepicker;

   //渲染日历组件需要到html文本
  datepicker.bulidUi = function(year, month){
   	   //monthData得到的是对象
       monthData = datepicker.getMonthData(year, month);
       var html = '<div class="header">' + 
	    '<a href="#" class="ui-datepicker-btn ui-datepicker-btn-previous"><</a>'+
	    '<a href="#" class="ui-datepicker-btn ui-datepicker-btn-back">></a>'+
	    '<span class="ui-datepicker-month">'+monthData.year+'-'+monthData.month+'</span>' +
	   '</div>' +
	   '<div class="ui-datepicker-body">'+
	   	'<table>' +
	   		'<thead>'+
	   			'<tr>'+
	   				'<th>一</th>'+
	   				'<th>二</th>' +
	   				'<th>三</th>' +
	   				'<th>四</th>' +
	   				'<th>五</th>' +
	   				'<th>六</th>' +
	   				'<th>七</th>' +
	   			'</tr>' +
	   		'</thead>' +
	   		'<tbody>';
             for(var i=0; i<monthData.days.length; i++){
            	if(i % 7 == 0) html += '<tr>'
	   			html += '<td data-date="'+ monthData.days[i].date+'">' + monthData.days[i].showDate + '</td>'
	   		if(i % 7 == 6) html += '</tr>';
	   		}
	   html += '</tbody>'+'</table>' + '</div>';
	   return html;
   }

  //渲染组件
   function render(dirction){
   	  var htmlR;
      if (dirction == 'previous'){
         htmlR = datepicker.bulidUi(monthData.year, ++monthData.month);
      } else if (dirction == 'back'){
      	 htmlR = datepicker.bulidUi(monthData.year, --monthData.month);
      } else {
   	     htmlR = datepicker.bulidUi();
    	} 

      datepickerWrapper = document.createElement('div');
      datepickerWrapper.className = 'ui-datepicker-wrapper';
      datepickerWrapper.innerHTML = htmlR;
      document.body.appendChild(datepickerWrapper);

      //给日历上一月和下一月绑定事件
      datepickerWrapper.onclick = function(e){
      	 
      	 if (e.target.classList.contains('ui-datepicker-btn-previous')){
      	 	document.body.removeChild(datepickerWrapper);
           render('previous');
           datepickerWrapper.classList.add('show');
         }
         if (e.target.classList.contains('ui-datepicker-btn-back')){
         	document.body.removeChild(datepickerWrapper);
           render('back');
           datepickerWrapper.classList.add('show');
         }

         
         if (e.target.tagName.toLowerCase() !== 'td') return;
         console.log(e.target.dataset.date);
         var date = new Date(monthData.year, monthData.month-1, e.target.dataset.date);
         
         input.value = format(date);
         console.log(date);
      }    
   }
     

//format()
function format(date){
	var ret = '';
    var padding = function(num){
      if (num <= 9){
      	return '0' + num;
      }
      return num;
    }

	ret += date.getFullYear() + '-';
	ret += padding(date.getMonth() + 1) + '-';
	ret += padding(date.getDate());

	return ret;
}


   
  //组件对外暴露的唯一接口
  datepicker.init = function(input){
      
      render();
      // 给input绑定事件，当input被点击时，datepicker组件出现和隐藏；
      var input = document.querySelector('.datepicker');
      input.onclick = function(){
      	if(datepickerWrapper.classList.contains('show')) {
      		datepickerWrapper.classList.remove('show');
      	}else{
      		datepickerWrapper.classList.add('show');
      		//给datepicker定位在input的下方；
      		var top = input.offsetTop + input.offsetHeight,
      		    left = input.offsetLeft;
      		    datepickerWrapper.style.top = top + 'px';
      		    datepickerWrapper.style.left = left + 'px';
      	}
      }  

  }
})();