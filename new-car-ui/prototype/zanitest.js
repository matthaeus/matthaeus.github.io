var timer;
var on = false;
var frameRate = 2;

$(function () {
  
  // timer = setInterval(function() {
  //   changeState();
  // }, 1000/frameRate);

  
  document.getElementById('body').addEventListener('click', function(event) {
    changeState()
  }, false);

  
});


function changeState() {
  
  if (on == true) {
    on = false;
    $('.mc').removeClass('on');
  } else {
    on = true;
    $('.mc').addClass('on');
  }
  
}