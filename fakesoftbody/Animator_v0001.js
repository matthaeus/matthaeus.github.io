



function Animator(options) {

	var a = this;

	a.options = options;

	a.playing = false;

	a.frameRate = options.frameRate || 60;

	a.frameCount = 0;

	if (options.startOnCreation == true) {
		a.play();
	} 

	// m.init(options);

}






// Animator.prototype.init = function(options) {

// 	var m = this;



// }





Animator.prototype.play= function(options) {

	var a = this;


	a.onPlay = a.onPlay || options.onPlay || function(){};
	a.onNextFrame = a.onNextFrame || options.onNextFrame || function(){};
	a.onStop = a.onStop || options.onStop || function(){};


	if (!a.playing) {
		a.playing = true;
		a.onPlay();
		a.frame();
	}


}



Animator.prototype.frame = function() {
	
	var a = this;

	a.frameCount++;

	a.onNextFrame({
		frameCount: a.frameCount
	});

	clearTimeout(a.frameTrigger);
	if (a.playing) {
		a.frameTrigger = setTimeout(function() {
			a.frame();
		}, 1000/a.frameRate)
	}

}




Animator.prototype.stop = function() {
	
	var a = this;

	a.playing = false;

	clearTimeout(a.frameTrigger);
	// a.frameTrigger = undefined;

	a.onStop();

}






Animator.prototype.setFrameRate = function(newFrameRate) {

	var a = this;

	a.frameRate = newFrameRate;
}













