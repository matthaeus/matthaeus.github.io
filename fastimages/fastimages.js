google.load('search', '1');

var fastImages, lastQuery;
var stopper = 0;

$(function () {	
	$('#searchBox').val('').focus();
	
	fastImages = new google.search.ImageSearch();
	fastImages.setSearchCompleteCallback(this, queryComplete, null);
	fastImages.setResultSetSize(8);
	fastImages.setRestriction(google.search.Search.RESTRICT_SAFESEARCH, google.search.Search.SAFESEARCH_OFF);
	fastImages.setNoHtmlGeneration();
	
	$('#searchBox').bind('keyup', function(e) {
		
		var inputValue = $(this).val();
		var newInputValue = inputValue.replace(/\s{2,}/g, ' ');

		if (newInputValue != '' && newInputValue != ' ' && inputValue != lastQuery) {
			$('#searchButton').addClass('go');
		} else {
			$('#searchButton').removeClass('go');
		}
		
		if (e.keyCode == 13) {
			changeHash($(this).val());
		}
	});
	
	$('#searchButton').click(function() {
		changeHash($('#searchBox').val());
	});

	
	$(window).hashchange(function() {
		stopper = 1;
		var hash = decodeURI(location.hash);
		hash = hash.replace( /^#/, '' );
		if (hash.replace(/\s{2,}/g, ' ') != '' && hash.replace(/\s{2,}/g, ' ') != '') {
			performQuery(hash);
			$('#searchBox').val(hash);
		}
	});
	
	$(window).hashchange();
});


function performQuery(query) {
	//console.log(query);
	$('#loadingMessage').show();
	document.title = 'Fastimages - ' + query; 
	//location.hash = encodeURI(query);
	$('#poweredBy').hide();
	$('#results').html('');
	fastImages.clearResults();
	stopper = 0;
	fastImages.execute(query);
	lastQuery = query;
	$('#searchBox').blur();
	$('#searchButton').removeClass('go');
	console.log('run query:', query);
}



function queryComplete() {
	console.log('query complete');
	console.log(fastImages);
	$('#loadingMessage').hide();
	var results8 = [];
	if (fastImages.results && fastImages.results.length > 0) {
		for (var i in fastImages.results) {
			//console.log()
			results8.push(fastImages.results[i]);
		}
		if (fastImages.cursor.currentPageIndex+1 > 8) {
			return false;
		} else {
			processResults(results8, fastImages.cursor.currentPageIndex);
			fastImages.gotoPage(fastImages.cursor.currentPageIndex+1);
		}
		$('#poweredBy').show();
	} else {
		$('#poweredBy').show();
	}
}


function processResults(results8, page) {
	var result;
	var tmpW, tmpH, ratio;
	//console.log(results8);
	//console.log(page);
	for (var i in results8) {
		//console.log(i);
		result = results8[i];
		if (result.width > window.innerWidth - 40) {
			tmpW = window.innerWidth - 40;
			ratio = tmpW/result.width;
			tmpH = Math.round(result.height * ratio);
			//console.log(i, tmpW, tmpH);
		} else {
			tmpW = result.width;
			tmpH = result.height;
		}
		if (stopper != 1) {
			$('<div class="result">'
				+'<a href="'+result.unescapedUrl+'" class="resultImage"><img src="'+ result.unescapedUrl+'" style="width:'+tmpW+'px;height:'+tmpH+'px;"/></a>'
				+'<p class="resultDescription">courtesy of <a href="'+result.originalContextUrl+'">'+result.visibleUrl+'</a>'
				+'</div>'
			).appendTo('#results');
		}
	}
	if (page == 7) {
		$('#poweredBy').show();
	}
}



function changeHash(hash) {
	location.hash = encodeURI(hash);
}



function checkForHash() {
	
}
