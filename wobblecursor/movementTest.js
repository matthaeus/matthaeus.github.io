// var frameRate = 60;
// var H, S, L, wH, wW;
// var touches = [];
// var state = 'inner';
// var fingerCount = 0;
// var noFingers = true;
// var click = false;
// var macSpring;
// var lastScrollPos = 0;
// var speed = 0;

var horizontalSpring;
var mousePos = {x: 0, y: 0};
var animator = new Animator({ frameRate: 60 });
var mouseMovement = new Movement();
var paused = false;
var massPosV = new Vector(0,0,0);
var mouseClicked = true;
var drawLog = false;

var cursorShowing = false;

var s = 48;
var m = 10;
var f = 2.4;



$(function () {


	horizontalSpring = new mSpring({
    	onSpringStart: function() {},

    	onSpringChange: function(massPos, springData) {
    		massPosV.x = massPos;
    		updateMassV();
    	},
    
    	onSpringRest: function() {} 
  	});

	horizontalSpring.setSpringParameters(s, m, f);


	verticalSpring = new mSpring({
    	onSpringStart: function() {},

    	onSpringChange: function(massPos, springData) {
    		massPosV.y = massPos;
    		updateMassV();
    	},
    
    	onSpringRest: function() {} 
    });
	verticalSpring.setSpringParameters(s, m, f);


	$('body').bind('mousedown', function(e) {
		e.preventDefault();
		// console.log('mousedown');
		// mouseClicked = true;
		// console.log('sdfsdfsd');
		nextFrame();
	});

	$('body').bind('mouseup', function(e) {
		e.preventDefault();
		// console.log('mouseup');
		// mouseClicked = false;
		animator.stop();
	});


	$('body').bind('mousemove', function(e) {
		e.preventDefault();
		mousePos = {x: e.pageX, y: e.pageY};

		if (!animator.playing && paused == false && mouseClicked == true) {
			// console.log('PLAY');
			animator.play({
				onNextFrame: nextFrame
			});
		}

	});


	$('.clickable').bind('mouseover', function(e) {
		$('#ball').css('background-image', 'url(\'wobblecursor/pointer.png\')');
	});

	$('.clickable').bind('mouseout', function(e) {
		$('#ball').css('background-image', 'url("wobblecursor/cursor.png")');
	});


	$('body').bind('mouseout', function(e) {
		$('#ball').hide();
	});

	$('body').bind('mouseover', function(e) {
		$('#ball').show();
	});


	$('#cursorToggle').bind('click', function(e) {
		if (!cursorShowing) {
			cursorShowing = true;
			$("#transformerR").css("display", "inline-block");
			$("body").css("cursor", "none");
			$("a").css("cursor", "none");
			$("a:hover").css("cursor", "none");
			$("#cursorToggle:hover").css("cursor", "none");
			$("#cursorToggleBox").addClass('enabled');
			$("#cursorToggle").addClass('enabled');
		} else {
			cursorShowing = false;
			$("#transformerR").css("display", "none");
			$("body").css("cursor", "default");
			$("a").css("cursor", "pointer");
			$("a:hover").css("cursor", "pointer");
			$("#cursorToggle:hover").css("cursor", "pointer");
			$("#cursorToggleBox").removeClass('enabled');
			$("#cursorToggle").removeClass('enabled');
		}
	});



});






var nextFrame = function(animatorStats) {


	horizontalSpring.start(undefined, undefined, undefined, mousePos.x);
	verticalSpring.start(undefined, undefined, undefined, mousePos.y);

	mouseMovement.recalculate(new Vector(mousePos.x, mousePos.y));

	var movX = Math.abs(mouseMovement.currentSpeed.x)
	var movY = Math.abs(mouseMovement.currentSpeed.y)

	var speed = Math.sqrt(Math.pow(movX, 2) + Math.pow(movY, 2));
	speed = Math.min(Math.max(speed, 0), 100)
	var inverseSpeed = 100 - speed
	// console.log(speed);


	// s = 48 + 300*(inverseSpeed/100);

	if (speed == 0) {
		// console.log(speed);
		s = 70;
		m = 2;
		f = 2.4;
	} else {
		s = 48;
		m = 10;
		f = 2.4;
	}

	// console.log(s);

	horizontalSpring.setSpringParameters(s, m, f)
	verticalSpring.setSpringParameters(s, m, f)

	

	if (mouseMovement.currentSpeed.length() == 0 && mouseMovement.lastSpeed.length() == 0) {

		animator.stop();
	}

};



function updateMassV() {

	var massV = new Vector(mouseMovement.currentPosition.x, mouseMovement.currentPosition.y).subtract(massPosV).negative();
	var tAngle = massV.toAbsXYAngle();
	var tScale = massV.length();

	$('.mouseCenter').css('left', mouseMovement.currentPosition.x).css('top', mouseMovement.currentPosition.y);
	$('.lastMouseCenter').css('left', mouseMovement.lastPosition.x).css('top', mouseMovement.lastPosition.y);
	$('.beforeLastMouseCenter').css('left', mouseMovement.beforeLastPosition.x).css('top', mouseMovement.beforeLastPosition.y);

	$('#currentSpeed').css('-webkit-transform', 'rotate('+ mouseMovement.currentSpeed.toAbsXYAngle() +'deg) scale('+ mouseMovement.currentSpeed.length() +', 1)');

	$('#lastSpeed').css('-webkit-transform', 'rotate('+ mouseMovement.lastSpeed.toAbsXYAngle() +'deg) scale('+ mouseMovement.lastSpeed.length() +', 1)');



	$('#massV').css('-webkit-transform', 'rotate('+ massV.toAbsXYAngle() +'deg) scale('+ massV.length() +', 1)');

	$('#massV').css('left', mouseMovement.currentPosition.x).css('top', mouseMovement.currentPosition.y);


	// var tAngle = mouseMovement.currentAcceleration.toAbsXYAngle()
	// var tScale = mouseMovement.currentAcceleration.length();

	$('#mass').css('left', massPosV.x).css('top', massPosV.y);

	$('#ball').css('-webkit-transform', 'rotate('+ -tAngle +'deg)');
	$('#transformerR').css('-webkit-transform', 'rotate('+ tAngle +'deg)'); //scale('+((tScale/100+1))+', 1)
	$('#transformerR').css('left', mouseMovement.currentPosition.x-50).css('top', mouseMovement.currentPosition.y-50)

	// $('#transformerS').css('-webkit-transform', 'scale('+((tScale/(100/animator.frameRate*40)+1))+', 1)'); //scale('+((tScale/100+1))+', 1)
	$('#transformerS').css('-webkit-transform', 'scale('+ (1 + tScale/80) +', '+ 1/(1 + tScale/100) +')');
	// console.log(tScale, tScale/200);


	if (drawLog) {

	} else  {
		$('.log').css('opacity', '0');
	}


	// if (mouseMovement.currentPosition.equals(mouseMovement.lastPosition)) {
	// 	animator.stop();
	// }

}






// var verticalSpringStep = function() {}











