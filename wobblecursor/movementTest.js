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


	$('body').bind('mouseout', function(e) {
		$('#ball').hide();
	});

	$('body').bind('mouseover', function(e) {
		$('#ball').show();
	});



	$('body').bind('keydown', function(e) {
		e.preventDefault();
		paused = true;
		// console.log(e);
		if (e.keyCode == 32) {
			animator.stop();
			horizontalSpring.removeStepTrigger();
			verticalSpring.removeStepTrigger();
		} else if (e.keyCode = 76) {
			drawLog = !drawLog;
			if (drawLog) {
				$('.log').css('opacity', '1');
				$('#transformerR').css('outline', '2px solid #ff00ff');
				$('#transformerS').css('outline', '1px solid #00ff00');
			} else {
				$('.log').css('opacity', '0');
				$('#transformerR').css('outline', '0px solid #ff00ff');
				$('#transformerS').css('outline', '0px solid #00ff00');
			}
		}
	});

	$('body').bind('keyup', function(e) {
		e.preventDefault();
		paused = false;
		// console.log(e);
		if (e.keyCode == 32) {
			animator.play({});
		}
	});



	$('#stiffnessC').bind('mousemove', function(e) {
		$('#stiffnessCT').val($(this).val());
		horizontalSpring.setSpringParameters($('#stiffnessCT').val(), $('#massCT').val(), $('#frictionCT').val());
		verticalSpring.setSpringParameters($('#stiffnessCT').val(), $('#massCT').val(), $('#frictionCT').val());
	});

	$('#massC').bind('mousemove', function(e) {
		$('#massCT').val($(this).val());
		horizontalSpring.setSpringParameters($('#stiffnessCT').val(), $('#massCT').val(), $('#frictionCT').val());
		verticalSpring.setSpringParameters($('#stiffnessCT').val(), $('#massCT').val(), $('#frictionCT').val());

	});

	$('#frictionC').bind('mousemove', function(e) {
		$('#frictionCT').val($(this).val()/10);
		horizontalSpring.setSpringParameters($('#stiffnessCT').val(), $('#massCT').val(), $('#frictionCT').val());
		verticalSpring.setSpringParameters($('#stiffnessCT').val(), $('#massCT').val(), $('#frictionCT').val());

	});

	// $('.controlT').bind('change', function(e) {
	// 	horizontalSpring.setSpringParameters($('#stiffnessCT').val(), $('#massCT').val(), $('#frictionCT').val());
	// 	verticalSpring.setSpringParameters($('#stiffnessCT').val(), $('#massCT').val(), $('#frictionCT').val());

	// });


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


	// console.log(animatorStats.frameCount);

	


	// $('#horSpeed').css('-webkit-transform', 'scale('+ mouseMovement.currentSpeed.x +', 1)');
	// $('#verSpeed').css('-webkit-transform', 'scale(1, '+ mouseMovement.currentSpeed.y +')');

	

	// $('#horAcc').css('-webkit-transform', 'scale('+ mouseMovement.currentAcceleration.x +', 1)');
	// $('#verAcc').css('-webkit-transform', 'scale(1, '+ mouseMovement.currentAcceleration.y +')');
	// $('#currentAcc').css('-webkit-transform', 'rotate('+ mouseMovement.currentAcceleration.toAbsXYAngle() +'deg) scale('+ mouseMovement.currentAcceleration.length() +', 1)');

	// $('#currentFA').css('-webkit-transform', 'rotate('+ mouseMovement.currentAcceleration.negative().toAbsXYAngle() +'deg) scale('+ mouseMovement.currentAcceleration.negative().length() +', 1)');



	


	// $('#combinedSpeed').css('-webkit-transform', 'rotate('+ angle +'deg)');



	

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











