



function Movement(options) {

	var m = this;

	m.init(options);

}





Movement.prototype.init = function(options) {

	var m = this;

	m.options = options;

	m.beforeLastPosition = new Vector(0,0,0);
	m.lastPosition = new Vector(0,0,0);
	m.currentPosition =  new Vector(0,0,0);
	
	m.lastSpeed =  new Vector(0,0,0);
	m.currentSpeed =  new Vector(0,0,0);
	
	m.lastAcceleration =  new Vector(0,0,0);
	m.currentAcceleration =  new Vector(0,0,0);

	m.lastMoveAngles = {theta: 0, phi: 0};
	m.currentMoveAngle = {theta: 0, phi: 0};

}





Movement.prototype.recalculate = function(v) {

	var m = this;

	m.beforeLastPosition = m.lastPosition;
	m.lastPosition = m.currentPosition;
	m.lastAcceleration = m.currentAcceleration;
	m.lastSpeed = m.currentSpeed;
	m.lastMoveAngle = m.currentMoveAngle;


	m.currentPosition = v;
	m.currentSpeed = m.currentPosition.subtract(m.lastPosition);
	m.currentAcceleration = m.currentSpeed.subtract(m.lastSpeed);
	// m.currentMoveAngle = m.currentSpeed.toAngles();

	// console.log(m.currentPosition.print(), m.lastPosition.print(), m.currentSpeed.print(), m.currentSpeed.length());

	// console.log(m.currentPosition.print(), m.lastPosition.print(), m.currentSpeed.print(), Math.floor(m.currentMoveAngle.theta * (180/Math.PI)), Math.floor(m.currentMoveAngle.phi * (180/Math.PI)));



	// console.log(m.currentMoveAngle);

}




















