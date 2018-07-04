var H, S, L;

function newColors() {
	H = Math.floor(Math.random()*361);
	S = Math.floor(Math.random()*81);
	L = Math.floor(Math.random()*101);

	$('body').css('background-color', 'hsl('+H+','+S+'%,'+L+'%)');

	//console.log('hsl('+H+','+S+'%,'+L+'%)');

	adjustText();
}



function changeColors(newH, newS, newL) {
	H = (newH > 360) ? 0 : newH;
	S = (newS > 80) ? 0 : newS;
	L = (newL > 100) ? 0 : newL;
	
	$('body').css('background-color', 'hsl('+H+','+S+'%,'+L+'%)');
	
	adjustText();
};



function adjustText() {
	if (L < 50) {
		$('body').css('color', '#ffffff')
		$('#titleImage').css('background', 'url(\'tftfnew.png\') no-repeat 0px -16px');
	} else {
		$('body').css('color', '#000000')
		$('#titleImage').css('background', 'url(\'tftfnew.png\') no-repeat 0px 0px');
	}
}



$(document).bind('mousemove', function() {
	changeColors(H+0.25, S, L);
});



newColors();



