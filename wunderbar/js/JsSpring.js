


	//         var ballY = 300;
	//         var handY = 290;
	//         var animationTrigger;
	//         var speed = 0;
	//         var distance, springForce, acceleration, dampingForce, totalForce;
	//         var stiffness = 70;
	//         var mass = 30;
	//         var friction = 2;
	// 
	//         $(document).bind('click', function(e) {
	// 
	// positionHand(e);
	//         });
	// 
	//         function positionHand(e) {
	//            handY = parseInt(e.clientY);
	//            $('#hand').css('top', handY - (parseInt($('#hand').innerHeight())/2) + 'px');
	//         }



// // hier wirds interessant
// animationTrigger = setTimeout('moveBall()', 10);
// 
// function moveBall() {
//     distance = ballY - handY;
//     dampingForce = -friction * speed;
//     springForce = -stiffness * distance;
// 
//     totalForce = springForce + dampingForce;
// 
//     acceleration = totalForce / mass;
// 
//     speed += acceleration;
// 
//     ballY += speed/120;
// 
//     $('#ball').css('top', ballY - (parseInt($('#ball').innerHeight())/2) + 'px');
// 
//     animationTrigger = setTimeout('moveBall()', 10);
//     showLog();
// }


function JsSpring(options) {
	var spring = this;
	this.options = options;
	
	spring.identifier = options.identifier;
	
	//triggers one calculation cycle to change the spring. will be assigned a setTimeout() function
	this.stepTrigger = false;
	
	//initiates the spring Class
	spring.init();
	
	//connects a new html element to this spring
	//spring.connectElement(options.elementId);
	
	//assings the function that is called each time the spring changes.
	spring.onSpringChange = options.onSpringChange;
	
	//assigns the funtion that is called when the spring goes to a rest state.
	//spring.onSpringRest = options.onSpringRest;
	
	//sets the constant spring parameters
	//spring.setSpringParameters(70, 30, 2);
}



JsSpring.prototype.init = function () {
	var spring = this;
	
	spring.anchor = 0;
    spring.end = 0;
    spring.acceleration = 0;
	spring.distance = 0;
	spring.speed = 0;
	spring.springForce = 0;
	spring.dampingForce = 0;
	spring.totalForce = 0;
	spring.restPos = 0;
	spring.pos = 0;
	
	//sets the constant spring parameters to a useful standard
	spring.setSpringParameters(120, 4, 5);
}



JsSpring.prototype.setSpringParameters = function (stiffness, mass, friction) {
	var spring = this;
	
	spring.stiffness = stiffness;
    spring.mass = mass;
    spring.friction = friction;
}



JsSpring.prototype.start = function (acceleration, pos, speed, restPos) {
	var spring = this;
	
	spring.acceleration += acceleration || 0;
	
	spring.pos = pos;
	
	spring.speed += speed || 0;
	
	spring.restPos = restPos;
	
	spring.step();
}



JsSpring.prototype.step = function () {
	var spring = this;
	
	spring.distance = spring.pos - spring.restPos;
	
    spring.dampingForce = -spring.friction * spring.speed;
    
	spring.springForce = -spring.stiffness * spring.distance;

    spring.totalForce = spring.springForce + spring.dampingForce;

    spring.acceleration = spring.totalForce / spring.mass;

    spring.speed += spring.acceleration;

    spring.pos += spring.speed/100;

	//console.log(spring.speed/100);
	if (spring.distance < 1 && Math.abs(spring.speed) < 1) {
		spring.clearStepTrigger();
	} else {
		spring.setStepTrigger(10);
	}
	
	spring.onSpringChange(Math.round(spring.pos));
	
	//console.log('pos', spring.pos, 'distance', spring.distance);
	
    //showLog();
}



//this sets the interval in which the state of the spring is calculated
JsSpring.prototype.setStepTrigger = function (interval) {
	var spring = this;
	
	clearTimeout(spring.stepTrigger);
	spring.stepTrigger = setTimeout(function () {spring.step()}, interval);
}



//this stops the spring from continuing to calculate it sstate
JsSpring.prototype.clearStepTrigger = function () {
	var spring = this;
	
	//console.log('spring '+spring.identifier+' stopped')
	clearTimeout(spring.stepTrigger);
}