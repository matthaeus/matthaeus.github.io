ScrollIndex = function() {
	var si = this;
	si.pageNames = [];
	si.entriesTopPos = [];
	si.springs = [];
	si.lastSpring = 'none';
	
	//si.drawVisuals();
	si.buildIndex();
}



ScrollIndex.prototype.buildIndex = function() {
	var si = this;
	
	$('<div id="scrollIndex"></div>').appendTo('body');
	
	$('.pageIndexTitle').each(function(){
		si.pageNames.push($(this).html());
	});
	
	var pageNumber;
	for (pageNumber in si.pageNames) {
		//var topPos = parseInt((pageNumber + 1) * (scrollEngine.windowSize.h / si.pageNames.length) - (scrollEngine.windowSize.h / si.pageNames.length) * 0.8);
		var topPos = scrollEngine.pageOnBarMiddles[pageNumber];
		si.entriesTopPos.push(topPos);
		$('<div id="siEntry'+pageNumber+'" class="siEntry">'+si.pageNames[pageNumber]+'</div>')
			.appendTo('#scrollIndex')
			.css("top", topPos);
		$('#siEntry'+pageNumber).css('top', topPos - $('#siEntry'+pageNumber).height() / 2);
		
		var tmpOptions = {};
		tmpOptions.onSpringChange = function(distance) {
			$('#siEntry'+this.identifier).css('font-size', 10+distance/4 + 'px');
			//console.log(this.identifier);
			var tmpIdentifier = this.identifier;
			//console.log($('#siEntry'+tmpIdentifier).offset());
			$('#siEntry'+tmpIdentifier).css('top', scrollIndex.entriesTopPos[tmpIdentifier] - parseInt($('#siEntry'+tmpIdentifier).css('height'))/2);
			//$('#siEntry'+tmpIdentifier).css('top', si.entriesTopPos[tmpIdentifier] - parseInt($(this).css('height'))/2);
		};
		tmpOptions.identifier = pageNumber;
		si.springs.push(new JsSpring(tmpOptions));
	}
}



ScrollIndex.prototype.showIndex = function(position) {
	var si = this;
	// if (!si.visible) {
	// 	$('#scrollIndex').animate({
	// 		'right': '0'
	// 	}, 200);
	// }
	si.visible = true;
	$('#scrollIndex').show();
}


ScrollIndex.prototype.hideIndex = function(position) {
	var si = this;
	si.visible = false;
	// $('#scrollIndex').animate({
	// 	'right': '-500'
	// }, 200);
	$('#scrollIndex').fadeOut(300);
}





ScrollIndex.prototype.trackScroll = function(position) {
	var si = this;
	// //console.log(position);
	// $('.siEntry').each(function(){
	// 	var top = parseInt($(this).css('top'));
	// 	var newS = Math.pow((scrollEngine.windowSize.h - (Math.abs(position - top))) / 100, 5)/299;
	// 	newS = (newS < 10) ? 10 : newS;
	// 	$(this).css('font-size', newS+'px');
	// });	
}


ScrollIndex.prototype.changeProximities = function(prox) {
	var si = this;
	si.prox = prox;
	
	$('.siEntry').each(function(i){
		var top = parseInt($(this).css('top'));
		//var newS = Math.pow((scrollEngine.windowSize.h - (Math.abs(position - top))) / 100, 5)/299;
		var newS = prox[i]/10 + 10;
		//newS = (newS < 5) ? 5 : newS;
		$(this).css('font-size', newS+'px')
		$(this).css('top', si.entriesTopPos[i] - parseInt($(this).css('height'))/2);
	});	
}


ScrollIndex.prototype.newPageOnBar = function(newPage) {
	var si = this;
	
	//console.log(newPage);
	
	var openSpring = si.springs[newPage];
	openSpring.start(0, 0, 0, 200);
	$('#siEntry'+newPage).css('font-weight', 'bold');
	
	if (si.lastSpring != 'none') {
		si.springs[si.lastSpring].start(0,200,0,0);
		$('#siEntry'+si.lastSpring).css('font-weight', 'normal');
	}
	
	si.lastSpring = newPage;
	
	// $('.siEntry').each(function(i){
	// 	$(this).css('font-weight', 'normal')
	// 	//$(this).css('top', si.entriesTopPos[i] - parseInt($(this).css('height'))/2);
	// });
	// $('#siEntry'+newPage).css('font-weight', 'bold');
}











