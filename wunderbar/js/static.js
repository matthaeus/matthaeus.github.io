var scrollEngine, scrollIndex;

$(function() {

	var seOptions = {};

	seOptions.showLog = false;
        seOptions.calcProx = false;
	seOptions.pageChangeThreshold = 0.15;
	seOptions.pageChangeDelayDuration = 500; //milliseconds

	seOptions.onPageChange = function(newPage) {
		//console.log(newPage);
	}

	seOptions.onScroll = function(position) {
		//scrollIndex.trackScroll(position);
		//scrollIndex.showIndex();
	};

	seOptions.onNewPageOnBar = function(newPage) {
		//scrollIndex.newPageOnBar(newPage);
	}

	seOptions.onDelayPassed = function(lastPage, newPage) {
		$('#page'+lastPage).hide();
		$('#page'+newPage).show();
		window.location.hash = 'page'+newPage;
		//scrollIndex.hideIndex();
	}

	seOptions.onNewHashReached = function(hashName) {

	}

	seOptions.onProximitiesChange = function(proximities) {
		//scrollIndex.changeProximities(proximities);
		//console.log(proximities)
	}

	scrollEngine = new ScrollEngine(seOptions);


	//scrollIndex = new ScrollIndex();

});




















