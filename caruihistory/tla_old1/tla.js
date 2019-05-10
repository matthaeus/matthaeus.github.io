//https://dl.dropboxusercontent.com/u/4151675/tla/index.html
/*
- the threshold is a good idea. but to make it work, the finger size has to be remembered.
so when the uer lifts the fingers an outs them back on in the same size, it has to be regiestered
as the same mode.
this might be solved by delaying counting the fingers, because then sthe finger size is
not as easily changed between lifting and resetting the fingers.


*/


var frameRate = 60;
var H, S, L, wH, wW;
var touches = [];
var state = 'inner';
var fingerCount = 0;
var tutorialstep = 0;
var timer, tutorialtimer;

var fMax = 0;
var uS = 0;
var lastFMax = 0;
var lastUS = 0;
var noFingers = true;

var originY = -1;
var originUnit = 0;
var lastYDiff = 0;
var lastUnit;
var scaleOffset = 0;
var yOffset = 0;


var fingerCenter = {};
var radius = 0;

var circleOffset = 40;
var sizeCircleRadius = [[10, 120, 150, 170, 170],[0, 20, 50, 70, 70]];



$(function () {
  
  $(window).bind('resize', function() {
   wW = window.innerWidth;
   wH = window.innerHeight;
  console.log('window', wW, 'x', wH);
  });
  $(window).resize();

  
  // tutorialtimer = setInterval(function() {
  //   redrawTutorial();
  // }, 1400);
  
  document.getElementById('touchLayer').addEventListener('touchstart', function(event) {
    event.preventDefault();
    touches = event.touches;
    recalculateFingers();
  }, false);


  document.getElementById('touchLayer').addEventListener('touchmove', function(event) {
    event.preventDefault();
    touches = event.touches;
    // console.log(touches);
  }, false);
  
  
  document.getElementById('touchLayer').addEventListener('touchend', function(event) {
    event.preventDefault();
    touches = event.touches;
    recalculateFingers();
  }, false);
  

  
});






function recalculateFingers() {
  
  
  saveUnitValueChange();
  resetMovementTracking();
  

  if (typeof touches[0] === 'undefined') {
    clearInterval(timer);
    allFingersRemoved();
    return false;
    
  } else {
    if (noFingers == true) {
      noFingers = false;
      firstFingerPlaced();
    }
    clearInterval(timer);
    timer = setInterval(function() {
      getFingerInfo();
    }, 1000/frameRate);
  }
  
  fMax = touches.length-1;
  
  getFingerInfo();
  
  updateCircleState();
  
  
  // newFingersNewSize();
}






function resetMovementTracking() {
  originY = -1;
  lastYDiff = -9999999;
  lastUnit = -1;
  
  console.log('reset tracking ------------------------');
}







function getFingerInfo() {
  var fingers = touches;
  var i;
  var fingers2 = [];
  
  //-------------------------------------------- distance of fingers
  
  for (i in fingers) {
    if (fingers[i].pageX) {
      fingers2.push(fingers[i]);
    }
  }
  
  var fingersW, fingersH;

  if (fMax > 0) {
    fingers2.sort(function(a,b){
      return a.pageX - b.pageX;
    });
  }
  
  fingersW = fingers2[fMax].pageX - fingers2[0].pageX;
  fingerCenter.x = Math.floor(fingers2[0].pageX + (fingersW)/2);
  
  if (fMax > 0) {
    fingers2.sort(function(a,b){
      return a.pageY - b.pageY;
    });
  }
  
  fingersH = fingers2[fMax].pageY - fingers2[0].pageY;
  
  //------------------------------------------------ finger center calculated
  
  
  fingerCenter.y = Math.floor(fingers2[0].pageY + (fingersH)/2);
  
  //------------------------------------------------- determine active circle radius from finger distances
  
  radius = 0;
  var lastDist;
  for (i=0; i<=fMax; i++) {
    lastDist = getDistance(fingers2[i], fingerCenter);
    if (lastDist > radius) {
      radius = lastDist;
    }
  }
  
  
  //------------------------------------------------- determine state (finger size)
  
  
  if (state == 'inner' && radius > sizeCircleRadius[0][fMax]) {
    state = 'outer';
    uS = 1;
    $('.fatable').addClass('fat');
    saveUnitValueChange();
    resetMovementTracking()
    resetScale();
    updateCircleState();
    // newFingerSize();
    
    
  } else if (state == 'outer' && radius < sizeCircleRadius[1][fMax] + 50)  {
    state = 'inner';
    uS = 0;
    $('.fatable').removeClass('fat');
    saveUnitValueChange();
    resetMovementTracking()
    resetScale();
    updateCircleState();
    // newFingerSize();
  }
  
  
  updateCircles();
  trackMovement();
  
  
}



function updateCircleState() {

  $('#fingerCircleActive0').removeClass('outer');
  
  window.setTimeout(function(){
    $('#fingerCircleActive0').addClass('outer');
  }, 1);
  
  // resetTracking(); 
}






function updateCircles() {

  $('#fingerCenter').css('left',fingerCenter.x).css('top', fingerCenter.y);
  $('#level').css('top', fingerCenter.y).css('width', fingerCenter.x-36);
  $('#tag').css('top', fingerCenter.y + 14);

  placeCircle('#fingerCircle', fingerCenter.x, fingerCenter.y, sizeCircleRadius[uS][fMax] + circleOffset + 50);
  scaleCircle('#fingerCircle', sizeCircleRadius[uS][fMax] + circleOffset + 50);
  
  placeCircle('#fingerCircleActive0', fingerCenter.x, fingerCenter.y, radius + circleOffset);
  scaleCircle('#fingerCircleActive0', radius + circleOffset)
  
}






















// only happens after all finger info hast been gotten 
function trackMovement() {
  
  var unitSize = units[fMax][uS].unitSize;
  
  if (originY == -1) {
    resetScale();
  }
  
  var currentY = fingerCenter.y;

  var currentUnit = Math.floor(((currentY+yOffset) - (currentY+yOffset) % unitSize) / unitSize);
  
  console.log('currentUnit', currentUnit);
  
  if (originY == -1) {
    originY = currentY;
    originUnit = currentUnit;
    console.log('originuint', originUnit);
    console.log('originy', originY);
  }

  
  
  var yDiff = originY - currentY;
  
  if (yDiff == lastYDiff) {
    return false;
    
  } else {
    lastYDiff = yDiff;
  }
  
  
  if (currentUnit == lastUnit) {
    return false;
  } else {
    lastUnit = currentUnit;
    updateScale();
  } 

  
}











function resetScale() {
  console.log('RESET SCALE');
  lastFMax = fMax;
  lastUS = uS;
  var unitSize = units[fMax][uS].unitSize;
  
  //-------------------------------------------------- determine scale offset
  
  scaleOffset = (unitSize - fingerCenter.y % unitSize) + Math.floor(unitSize/2);
  if (scaleOffset > unitSize) {
    scaleOffset -= unitSize;
  }
  console.log('scaleOffset', scaleOffset);
  
  yOffset = scaleOffset;
  
  
  
  $('#scale').css('top', -scaleOffset+'px');
  
  $('.scaleUnit').css('height', unitSize + 'px');
  // $('#scaleIndicator').css('height', units[fMax][uS].unitSize);
  $('.scaleUnit.touched').removeClass('touched');
  $('.scaleUnit.originTouched').removeClass('originTouched');
  
  displayNewStatus(units[fMax][uS].now + units[fMax][uS].suffix, units[fMax][uS].now);
  
}







function updateScale() {
  console.log('UPDATE SCALE');
  
  var unitSize = units[fMax][uS].unitSize;
  
  var yDiffInUnits = originUnit - lastUnit; 

  $('.scaleUnit.touched').removeClass('touched');

  if (yDiffInUnits == 0) {
    // $('.scaleUnit:nth-child('+ (originUnit+1) +')').addClass('touched');
    
  } else if (yDiffInUnits < 0) {
    $('.scaleUnit:nth-child(n+' + (originUnit+2) +'):nth-child(-n+'+ (originUnit-yDiffInUnits+1) +')').addClass('touched');
    
  } else if (yDiffInUnits > 0) {
    $('.scaleUnit:nth-child(n+' + (originUnit-yDiffInUnits+1) +'):nth-child(-n+'+ (originUnit) +')').addClass('touched');
  }
  
  $('.scaleUnit:nth-child('+ (originUnit+1) +')').addClass('originTouched').addClass('touched');

  
  
  units[fMax][uS].now = parseFloat(units[fMax][uS].last) + yDiffInUnits * units[fMax][uS].increment;
  units[fMax][uS].now = roundToDec(units[fMax][uS].now, units[fMax][uS].decimals);
  
  displayNewStatus(units[fMax][uS].now + units[fMax][uS].suffix, units[fMax][uS].now);
  
}





function saveUnitValueChange() {
  
  units[lastFMax][lastUS].last = units[lastFMax][lastUS].now;

}




// function updateUnitValue() {
//   
//   return false;
// 
// }





function firstFingerPlaced() {
  noFingers = false;
  
  $('.MC').addClass('active');
  
  // $('body').css('background', '#505050');
  $('.fadeAway').removeClass('fadeAway');
  
}






function allFingersRemoved() {
  noFingers = true;
  console.log('no fingers');
  
  $('.MC').removeClass('active');
  
  $('.scaleUnit.touched').addClass('fadeAway');
  $('.scaleUnit.originTouched').addClass('fadeAway');
  
  $('.scaleUnit.touched').removeClass('touched');
  // $('.scaleUnit.originTouched').removeClass('originTouched');
  

  // $('body').css('background', '#303030');
}


























function displayNewStatus(statusString, stringNoUnits) {
  
  $('#topDisplay').html(statusString);
  $('#tag .rectangle').html(stringNoUnits);

}









function placeCircle(id, x, y, radius) {
  $(id).css('left', x + 'px').css('top', y + 'px').css('margin', '-' + radius + 'px');
};


function scaleCircle(id, radius) {
  $(id).css('height', radius*2+'px').css('width', radius*2+'px');
}


function getDistance(point1, point2) {
  var xDist, yDist;
  xDist = Math.abs(point1.pageX - point2.x);
  yDist = Math.abs(point1.pageY - point2.y);
  return Math.sqrt(xDist*xDist + yDist*yDist);
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





