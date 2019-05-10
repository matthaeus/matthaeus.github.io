function updateFingerTips() {
  var i, count = 0, xDiff, yDiff, ratio;
  var fingers = touches;
  
  $('.finger').css('left', -100).css('top', -100);
  
  for (i in fingers) {
    if (fingers[i].pageX) {
      ratio = getDistance(fingers[i], fingerCenter) / (sizeCircleRadius[0][fMax] + 50);
      xDiff = (fingers[i].pageX - fingerCenter.x) / ratio;
      yDiff = (fingers[i].pageY - fingerCenter.y) / ratio;
      $('#finger' + i).css('left', fingerCenter.x + xDiff).css('top', fingerCenter.y + yDiff);
    }
    // count++;  
  }
  
  // for (i = count; i < 5; i++) {
  //   $('#finger' + i).css('left', -100).css('top', -100);
  // }
}




function redrawTutorial() {
  var tops = [6, -4, -7, -8];
  var lefts = [-2, 8, 10, 14];
  var radii = [120, 134, 150, 166];
  
  $('#tci').css('top', tops[tutorialstep]).css('left', lefts[tutorialstep]).css('width', radii[tutorialstep]).css('height', radii[tutorialstep]);
  
  if (tutorialstep == 0) {
    $('.tsi0').css('opacity', 0);
  } else if (tutorialstep == 1) {
    $('#tc2').css('opacity', 1);
  } else if   (tutorialstep == 2) {
    $('#tc3').css('opacity', 1);
  } else if   (tutorialstep == 3) {
    $('#tc4').css('opacity', 1);
  }
  
  tutorialstep = (tutorialstep == 3) ? 0 : tutorialstep + 1;
}





function roundToDec(number, decimals) {
  number = parseFloat(number);
  var multiplier = Math.pow(10, decimals);
  var result = Math.round(number * multiplier) / multiplier;
  if (decimals > 0) {
    var segments = result.toString().split('.');
    
    if (typeof segments[1] === 'undefined') {
      result += '.';
      for(var i = 0; i < decimals; i++) {
        result += '0';
      }
    }
    
    if (typeof segments[1] !== 'undefined') {
      for(var i = segments[1].length; i < decimals; i++) {
        result += '0';
      }
    }
    
  }
  return result;
}










function tutorialInit() {
  
  $('#helpButton').addClass('intro');
  
  $('#helpButton').bind('touchstart', function(event) {
    event.preventDefault();
    expandTutorial();
  });
  
}



function expandTutorial() {
  
}
