$(document).ready(function(){
	$("#demosMenu").change(function(){
		console.log($(this).find("option:selected").attr("id")+ '.html')
	  window.location.href = $(this).find("option:selected").attr("id") + '.html';
	});
});