var scrollEngine, scrollIndex;

$(function(){
	
	$('.page').hide();
	$('.page').first().show();
	$('.page').each(function(){
		$('<div class="dummyContainer"></div>').appendTo('body').css('height', window.innerHeight);
	});

	$('.fullScreenImage').css('height', window.innerHeight).css('width', window.innerWidth);
	
	var seOptions = {};
	
	seOptions.showLog = true;
    seOptions.calcProx = seOptions.showLog;
	seOptions.pageChangeThreshold = 0.10;
	seOptions.pageChangeDelayDuration = 250; //milliseconds
	
	seOptions.onPageChange = function(newPage) {
		//console.log(newPage);
	}
	
	seOptions.onScroll = function(position) {
		scrollIndex.trackScroll(position);
		scrollIndex.showIndex();
	};
	
	seOptions.onNewPageOnBar = function(newPage) {
		scrollIndex.newPageOnBar(newPage);
	}
	
	seOptions.onDelayPassed = function(lastPage, newPage) {
		$('#page'+newPage).hide().css('z-index', 5).fadeIn(300);
		$('#page'+lastPage).css('z-index', 1).fadeOut(300);
		// window.location.hash = 'page'+newPage;
		scrollIndex.hideIndex();
	}

	seOptions.onNewHashReached = function(hashName) {
	}
	
	seOptions.onDelayPassedNoChange = function() {
		//scrollIndex.hideIndex();	
	}
	
	seOptions.onWindowResize = function() {
		//Scroll Index positions need to be changed here!
		$('.fullScreenImage').css('height', window.innerHeight).css('width', window.innerWidth);
	}
	
	seOptions.onProximitiesChange = function(proximities) {
		//scrollIndex.changeProximities(proximities);
		//console.log(proximities)
	}
	
	scrollEngine = new ScrollEngine(seOptions);
	
	
	scrollIndex = new ScrollIndex();
	
});




















