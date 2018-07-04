

$(function(){
	
var content = [];
var wordCount = -1;
var contentL = 0;
var revealed = 0;
var revTarget = 0;
var timer = 'undefined';
var contentY = $('#content').offset().top;
	
	
$.ajax({
	type: 'GET',
	url: 'content.txt', //?a=getUserInfo",
	success: function(msg){
   	//try {
	parseContent(msg);
   	}
});


function parseContent(msg) {
	//$('#content').html('');
	msg = msg.replace(/(\r\n|[\r\n])/g, "<br> ");
	content = msg.split(' ');
	contentL = content.length;
	addWord();
	
	
	//addWord();
}


// function addWord() {
// 	wordCount++;
// 	if (wordCount >= contentL) {
// 		$('.last').unbind('mouseover');
// 		$('#act').unbind('mouseover');
// 		return false;
// 	}
// 	
// 	$('.last').unbind('mouseover');
// 	$('.last').removeClass('last');
// 	
// 	//$('<span class="last">'+ content[wordI] +' </span>').appendTo('#content').hide().fadeIn();
// 	$('<span class="last">'+ content[wordCount] +' </span>').insertBefore('#act').hide().fadeIn();
// 	$('#log').html($('#content').height());
// 	// $('.last').fadeIn();
// 	
// 	$('.last').bind('mouseover', function(){
// 		addWord();
// 	});
// }

// $('#act').bind('mouseover', function(){
// 	addWord();
// });

function doFill() {
	if (!addWord()) {
		return false;
	};

	if ($('#content').height() > revTarget) {
		timer = 'undefined';
		$('.last').remove();
		wordCount--;
		return false;
	} else {
		$('.last').hide().css('opacity', 1).fadeIn().removeClass('last');	
		clearTimeout(timer);
		timer = setTimeout(function() {doFill();}, 30);
	}
}


function addWord() {
	wordCount++;
	
	if (wordCount >= contentL) {
		$(document).unbind('mousemove');
		return false;
	}
	
	$('<span class="last '+wordCount+'">'+ content[wordCount] +' </span>').appendTo('#content');
	
	if (wordCount == 0) {
		$('.last').hide().css('opacity', 1).fadeIn(1000).removeClass('last');
		$('.0').bind('mouseover', function(){
			$(this).unbind('mouseover');
			
			$(document).bind('mousemove', function(e) {
				var y = e.clientY - contentY + 48;
				if (y > revealed) {
					revTarget = y;
					//console.log(revTarget);
					if (timer == 'undefined') {
						doFill();
					}
				}
			});
		});
	}
	
	return true;
}


















	

});















