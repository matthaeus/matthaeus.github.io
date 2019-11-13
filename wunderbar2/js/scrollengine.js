ScrollEngine = function(options) {
	var se = this;
	
	se.options = options;
	se.trackWindowResize();
	se.lastPage = 0;
	se.Eu = 2.7182; //Math.E;
	se.mouseClicked = false;
	se.scrollButtonH = 16;
	//se.options.pageChangeThreshold = 0.1;
	se.scrollStatus = {on:false, active:0, now:0};
	se.proximities = [];
        se.lastScrollTop = $(window).scrollTop();
        se.accelerations = [0, 0, 0, 0, 0];

        se.aOrigPos = [];
	
	se.drawVisuals();
	se.getPageData();
	//se.buildPage();

	
	$(window).bind('scroll', function(event){
		se.trackScrolling(event);
	});
	
	$(window).bind('resize', function(){
		se.trackWindowResize();
		se.options.onWindowResize();
	});
	
	$(window).bind('mousedown mouseup', function(){
		se.mouseClicked != se.mouseClicked ;
	});
}



//ANALYZE AND TRACK PAGE
/////////////////////////////////////////////////////////////////////////


ScrollEngine.prototype.getPageData = function() {
	var se = this;
	
	se.getBodyHeight();
	
	se.pageCount = Math.round(se.bodyHeight / se.windowSize.h);
	se.barToBodyFactor = se.bodyHeight / (se.windowSize.h - se.scrollButtonH*2);
	
	se.getPageSizeOnBar();
	
	se.getPageOnBarMiddles();
	
	if (se.options.showLog) {
		se.buildLog();
	}

    //se.getAPos();
	
	
}

// ScrollEngine.prototype.getAPos = function() {
// 	var se = this;
// 	$('a').each(function() {
//            if (!$(this).attr('href')) {
//                se.aOrigPos.push(Math.round($(this).offset().top));
//            }
//         });
//         console.log(se.aOrigPos);
// }


ScrollEngine.prototype.getBodyHeight = function() {
	var se = this;
	se.bodyHeight = $('body').outerHeight();
}


ScrollEngine.prototype.getPageSizeOnBar = function() {
	var se = this;
	se.pageSizeOnBar = Math.round((se.windowSize.h - se.scrollButtonH*2) / se.pageCount);
}


ScrollEngine.prototype.getBarPosition = function() {
	var se = this;
	se.barPos = {};
	se.barPos.t = Math.round(se.scrollTop / se.barToBodyFactor) + se.scrollButtonH;
	se.barPos.m = Math.round(se.barPos.t + (se.pageSizeOnBar/2));
	se.barPos.b = Math.round(se.barPos.t + se.pageSizeOnBar);
}


ScrollEngine.prototype.trackWindowResize = function() {
	var se = this;
	se.windowSize = {w:window.innerWidth, h:window.innerHeight};
	$('.dummyContainer').css('height', se.windowSize.h); //this should be in index.js and not be part of the scrollengine
	se.getPageSizeOnBar();
	
	if (se.options.showLog) {
		se.adjustLog();
	}
}

ScrollEngine.prototype.getPageOnBarMiddles = function() {
	var se = this;
	se.pageOnBarMiddles = [];
	var se = this;
	var barProxC = se.pageCount;
	var barProxD = Math.round((se.windowSize.h - se.scrollButtonH*2) / barProxC);
	for (var i = 0; i < barProxC; i++) {
		se.pageOnBarMiddles[i] = se.scrollButtonH + (i + 1) * barProxD - (barProxD / 2);
	}
}






//TRACK SCROLLING
//////////////////////////////////////////////////////////////////////////


ScrollEngine.prototype.trackScrolling = function(event) {
	var se = this;
	clearTimeout(se.pageChangeDelay);
	
	se.scrollTop = $(window).scrollTop();        // 
	        // se.accelerations.shift();
	        // se.accelerations.push(se.scrollTop - se.lastScrollTop);
        //console.log(se.accelerations);

    se.lastScrollTop = se.scrollTop;

	se.getBarPosition();
	
    if (se.options.calcProx) {
        se.getProximities();
    }
	
	if (se.options.onScroll) {
		se.options.onScroll(se.barPos.m);
	}
	
	var tmpC = true;
	if ((se.scrollTop / se.windowSize.h) % 1 > 0.5 - se.options.pageChangeThreshold && (se.scrollTop / se.windowSize.h) % 1 < 0.5 + se.options.pageChangeThreshold) {
		tmpC = false;
	}
	if (tmpC) {
		//se.lastPage = se.newPage;
		se.newPage = Math.round((se.scrollTop / se.windowSize.h));
	}
	
	if (se.lastPageOnBar != se.newPage) {
		//console.log(se.lastPageOnBar, se.newPage)
		se.scrollStatus.activePage = se.newPage;
		se.options.onNewPageOnBar(se.scrollStatus.activePage);
		se.lastPageOnBar = se.newPage;
	}
		
	if (se.options.showLog) {
		se.updateLog();
	}
	
	if (se.options.onPageChange) {
		se.pageChangeDelay = setTimeout("scrollEngine.delayPassed()",se.options.pageChangeDelayDuration);
	}
	
	if (se.options.onScroll) {
		se.options.onScroll(Math.round($(window).scrollTop()/se.pageCount));
	}
	
	
	
	//se.positionLazyObjects();
	
}


// ScrollEngine.prototype.positionLazyObjects = function() {
// 	var se = this;
// 	$('a').each(function(i) {
//            if (!$(this).attr('href')) {
//                $(this).clone().appendTo('body')
//                $(this).css('position', 'absolute').css('top', se.aOrigPos[i] - se.accelerations[4]);
//                //se.aOrigPos.push(Math.round($(this).offset().top));
//            }
//         });
//         //console.log(se.aOrigPos);
// }


ScrollEngine.prototype.delayPassed = function() {
	var se = this;
	if (se.lastPage != se.newPage) {
		se.options.onDelayPassed(se.lastPage, se.newPage);
		se.lastPage = se.newPage;
	} else {
		se.options.onDelayPassedNoChange();
	}
	
	if (se.options.showLog) {
		se.updateLogStats();
	}
}


ScrollEngine.prototype.getProximities = function() {
	var se = this;
	var a = 400;
	var b = se.pageCount * 0.7;
	var x = 1;
	
	for (var i=0; i < se.pageOnBarMiddles.length; i++) {
		var iTop = se.pageOnBarMiddles[i];
		var x = Math.abs(iTop - se.barPos.m)/500;
		var newW = a * Math.pow(se.Eu, -b *x *x);  
		//console.log(x, newW);
		//var scrollPos = Math.round($(window).scrollTop() / se.pageCount);
		//var newW = Math.pow(2.3 * (1 - Math.abs(iTop - se.barPos.m) / (se.pageSizeOnBar * 3)), 7);
		//newW = (newW < 0) ? 10 : newW + 10;
		//console.log(1 - Math.abs(iTop - se.barPos.m) / se.pageSizeOnBar * 2);
		se.proximities[i] = Math.round(newW);
	}
	se.options.onProximitiesChange(se.proximities);
}






//PAGEPREVIEW REMOVE!!!
/////////////////////////////////////////////////////////////////////////////////////

ScrollEngine.prototype.openPagePreview = function() {
	//console.log('open preview')
	var se = this;
	se.scrollStatus.on = true;
	$('#previewShade').fadeIn(30);
	$('#previewShadeContent').fadeIn(30);
}


ScrollEngine.prototype.closePagePreview = function() {
	var se = this;
	se.scrollStatus.on = false;
	$('#previewShade').fadeOut(200);
	$('#previewShadeContent').fadeOut(200);
}




ScrollEngine.prototype.switchPagePreview = function() {
	var se = this;
	var t = $('#page'+se.newPage+' > .pagePreview').html();
	//$('#previewShadeContent').fadeOut(70).delay(1000).html(t).fadeIn(70);;
	//document.getElementById('previewShadeContent').innerHTML = $('#page'+se.newPage+' > .pagePreview').html();
	$('#previewShadeContent').html(t);
	
}


ScrollEngine.prototype.drawVisuals = function() {
	var se = this;
	//$('<div id="barLogPointer1" class="barLogPointer"></div>').appendTo('#body');
	$('<div id="previewShade"></div>').appendTo('#body').hide();
	$('<div id="pscc"><div id="pscc2"></div></div>').appendTo('#body');
	$('<div id="previewShadeContent"></div>').appendTo('#pscc2').hide();
}









//LOG
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////



ScrollEngine.prototype.buildLog = function() {
	var se = this;
	
	//one container for all the displayed log info
	$('<div id="seLog"></div>').appendTo('body');
	
	//page on bar middles proximity indicators
	for (var i = 0; i < se.pageOnBarMiddles.length; i++) {
		$('<div id="sbProx'+i+'" class="sbProx"></div>').appendTo('#seLog').css('top', se.pageOnBarMiddles[i]);
	}
	
	//representation of pages next to scrollbar
	for (i = 0; i < se.pageCount; i += 2) {
		$('<div id="sbPage'+i+'" class="sbPage"></div>').appendTo('#seLog').css('top', (i*se.pageSizeOnBar) + se.scrollButtonH + (se.pageSizeOnBar * se.options.pageChangeThreshold)).css('height', se.pageSizeOnBar - (se.pageSizeOnBar * se.options.pageChangeThreshold *2)).css('background-color', '#cccccc');
		$('<div id="sbPage'+(i+1)+'" class="sbPage"></div>').appendTo('#seLog').css('top', ((i+1)*se.pageSizeOnBar) + se.scrollButtonH + (se.pageSizeOnBar * se.options.pageChangeThreshold)).css('height', se.pageSizeOnBar - (se.pageSizeOnBar * se.options.pageChangeThreshold *2)).css('background-color', '#aaaaaa');
	}
	
	//twin of the scrollbar handle
	$('<div id="barTwin" class="barTwin"></div>').appendTo('#seLog');
	
	//indicator for the middle of the scrollbar
	$('<div id="barMiddle" class=""></div>').appendTo('#seLog');
	
	//the stats window that displays information as text
	// $(''
	// 	+'<div id="seLogStats" class="">'
	// 	+'</div>'
	// ).appendTo('#seLog');
}


ScrollEngine.prototype.updateLog = function() {
	var se = this;
	se.updateBarProx();
	se.updateBarTwin();
	se.updateLogStats();
}



ScrollEngine.prototype.updateBarProx = function() {
	var se = this;
	$('.sbProx').each(function(i){
		$(this).css('width', se.proximities[i]);
	});
}	



ScrollEngine.prototype.updateBarTwin= function() {
	var se = this;
	$('#barTwin').css('height', se.pageSizeOnBar);
	
	$('#barTwin').css('top', se.barPos.t);
	
	$('#barMiddle').css('top', se.barPos.m);
}


ScrollEngine.prototype.adjustLog = function() {
	var se = this;
	//do all kinds of stuff in here that updates things connected to the log
}



ScrollEngine.prototype.updateLogStats = function() {
	var se = this;
	var newStats = 'window height: '+ se.windowSize.h;
	newStats += '<br>total body height:' + se.bodyHeight;
	newStats += '<br>last page viewed:' + se.lastPage;
	newStats += '<br>active page on scrollbar: ' + se.scrollStatus.activePage;
	newStats += '<br>delay before page change: ' + se.options.pageChangeDelayDuration;
	//newStats += '<br>number: ' + se.options.pageChangeDelayDuration;
	
	
	// $('#seLogStats').html(newStats);
}








