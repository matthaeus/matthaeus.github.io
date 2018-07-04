var wW, wH;
var lastX = -100; 
var lastY = -100;
var trigger;


$(function () {	
  
  
	wW = $('#demo').width()+20;
	
	
  // console.log(window.getComputedStyle(getEl('#footer'),null).getPropertyValue('position'));

	
  $(window).bind('resize', function(){
   wW = $('#demo').width()+20;
   snapTo(Math.floor(wW/2),420, [100,8.5,1]);
  });
  
  
	setTimeout(function() {
    snapTo(Math.floor(wW/2),420, [100,8.5,1], 0, 200, -50);
    // elementSpringTo('#backSection', 200, 0, [100,8,3.5], 500, 0, 100)
  },1000);
	
  // setTimeout(function() {
  //   snapTo(Math.floor(wW/2),420, [100,8.5,1]);
  // },1100);
	

  $('#circle').draggable({
     start: function(event, ui) {
       elementSpringStop('#circle');
     },
     stop: function(event, ui) {
       snapBack([100,8.5,2]);
     }
   });
  
  
  $('#demo').bind('click', function(e){
    snapTo(e.pageX, e.pageY, [100,8.5,2]);
    e.preventDefault();
  });



  
  $('.c').bind('mouseover', function() {
    var i = $(this).attr('cdi');
    $('.c').removeClass('active');
    $('#code'+i).addClass('active');
    $('.cD').removeClass('active');
    $('.code'+i).addClass('active');
    // $('.codeDetail').css('visibility', 'hidden');
    // $('.codeDetail:nth-child('+ (parseInt(i)+1) +')').css('visibility', 'visible');
    elementSpringTo('#codeDetailsSlider', 0-(i*800), 0, [100,8,3.5], 500, 0, 100);
  });
  
  
});




function snapTo(x,y, springChar, delay, xSpeed, ySpeed) {
  lastX = x;
  lastY = y;
  $('#anchor').css('left', x-44).css('top', y-44);
  elementSpringTo('#circle', x-46, y-46, springChar, delay, xSpeed, ySpeed);
}



function snapBack(springChar) {
  elementSpringTo('#circle', lastX-46, lastY-46, springChar);
}




