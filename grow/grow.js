var slideImages = [];
var zI = 3
var actImage = 1;
var ratio = 16/11;


$(function () {	
	// var imgW = window.innerWidth - 40;
	// var imgH = imgW / ratio;
	// $('.slideImage').css('width', imgW + 'px').css('height', imgH + 'px');
	// $('#slideShow').css('width', imgW + 'px').css('height', imgH + 'px');
	
	$('#1').show();
	
	$('#nextButton').click(function() {
		actImage = (actImage == 6) ? 1 : actImage + 1;
		$('.last').removeClass('last').hide();
		$('.active').removeClass('active').addClass('last');
		$('#'+(actImage)).stop(true).hide().css('z-index', zI).fadeTo(750, 1).addClass('active');;
		zI++;
	});
	
	$('#prevButton').click(function() {
		actImage = (actImage == 1) ? 6 : actImage - 1;
		$('.last').removeClass('last').hide();
		$('.active').removeClass('active').addClass('last');
		$('#'+(actImage)).stop(true).hide().css('z-index', zI).fadeTo(750, 1).addClass('active');;
		zI++;
	});
	
	$(window).bind('resize', function(){
		var wW = window.innerWidth;
		var wH = window.innerHeight;
		
		var imgW = window.innerWidth - 40;
		var imgH = imgW / ratio;
		
		if (imgH + 200 > wH) {
			imgH = wH - 200;
			imgW = imgH * ratio;
		}
		
		$('.slideImage').css('width', imgW + 'px').css('height', imgH + 'px');
		$('#slideShow').css('width', imgW + 'px').css('height', imgH + 'px');
	});
	
	$(window).resize();
	
});

