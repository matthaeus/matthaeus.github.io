var orderedResults = [];
var firstCat = '';
var queryW = '';
var isUpper = false;
var timer;
var timeSteps = 0;

$(function(){
  
	
  $('#submit').bind('click', function(){
    getResults();
  });
  
  $('#query').bind('keyup', function(e) {
		if (e.keyCode == 13) {
			getResults();
			$(this).blur();
		}
  });
  
  $('#query').bind('focus', function(e) {
		$(this).addClass('active');
		$('#redLine').hide();
  });
  
  $('#query').bind('blur', function(e) {
		$(this).removeClass('active');
		$('#redLine').show();
  });
  
  $('#font').bind('keyup', function(){
    var newFont = $(this).val() + '\'Helvetica Neue\', \'Helvetica\', \'Arial\', sans-serif';
    $('body').css('font-family', newFont);
    $('#query').css('font-family', newFont);
  });
  
  $('#query').focus();
  
  
  
  function getResults() {
   
    var query = $('#query').val();
    isUpper = false;
    if (query[0] == query[0].toUpperCase()) {
     isUpper = true;
     // console.log()
    }
    queryW = testWordW(query);
    query = encodeURI(query);
    
    clearScreen();
    addMessage('searching...');
    setLoader(true);
    
    $.getJSON('http://words.bighugelabs.com/api/2/f8dcc937f6362348148b2822789abe63/'+ query +'/json?callback=?', function(data) {
      setLoader(false);
      drawResults(data);
      }).error(function() {
        setLoader(false);
        clearScreen();
        addMessage('no results'); 
      });
  }
  
  function addMessage(message) {
    $('<li>'+message+'</li>').appendTo('ul.results');
    $('#redLine').css('margin-left', queryW).css('height', 0);
  }
  
  function setLoader(switcher) {
    if (switcher == true) {
      timer = setInterval(function() {
        // 
        // if (timeSteps > 3) {
        //   addMessage('connection error');
        //   clearInterval(timer);
        // } else {
          addMessage('searching...');
          // timeSteps++;
        // }
      }, 1000);
    } else {
      clearInterval(timer);
    }
  }
  
  
  function drawResults(data) {
    
    clearScreen();
    for (var i in data) {
      // console.log(i, data[i]);
      if (data[i]['syn']) {
        drawCatSelector(i);
      }
      var results = [];
      for (var m in data[i]['syn']) {
        results.push(data[i]['syn'][m]);
        // console.log(data[i]['syn'][m]);
      }
      orderResults(results, i);
    }
    if ($('ul.categories > li').length < 1) {
      addMessage('no results');
      return false; 
    }
    for (var i in data) {
      if (data[i]['syn']) {
        showResults(i);
        break;
      }
    }
    console.log()
    
  }
  
  function clearScreen() {
    // console.log('clearing screeb');
    $('ul.categories').html('');
    $('ul.results').html('');
  }
  
  
  
  
  function drawCatSelector(name) {
    //$('ul.categories').html('');
    $('<li id="cat'+name+'">'+name+'</li>').appendTo('ul.categories');
    $('#cat'+name).bind('click', function() {showResults(name);});
  }
  
  
  
  
  function drawCatSelector(name) {
    $('<li id="cat'+name+'">'+name+'s</li>').appendTo('ul.categories');
    $('#cat'+name.split(' ').join('')).bind('click', function() {showResults(name);});
  }
  
  
  
  function orderResults(results, catName) {
    var tmpStore = [];
    for (var i in results) {
      var word = results[i];
      if (isUpper == true) {
        word = replaceFirstChar(word, word[0].toUpperCase());
      }
      tmpStore.push([word,testWordW(word)]);
      // tmpStore[word] = testWordW(word);
      // console.log(tmpStore[i][0], tmpStore[i][1]);
    }
    tmpStore.sort(function(a,b) {
      return a[1] - b[1];
    });
    // console.log(tmpStore);
    orderedResults[catName] = tmpStore;
  }
  
  function testWordW(word) {
    $('#tester').html(word);
    return $('#tester').width();
  }
  
  
  function showResults(catName) {
    // changeSpacer();
    $('#redLine').css('margin-left', queryW).css('height', 0);
    // console.log('showing', catName);
    
    $('ul.categories > li').removeClass('active');
    $('#cat'+catName.split(' ').join('')).addClass('active');
    
    $('ul.results').html('');
    for (var i in orderedResults[catName]) {
      var word = orderedResults[catName][i][0];
      
      $('<li id="result'+i+'">'+word+'</li>').appendTo('ul.results');
      //console.log(orderedResults[catName][i][0], orderedResults[catName][i][1], 'vs', queryW)
      if (orderedResults[catName][i][1] > queryW) {
        
        $('#result'+i).addClass('tooLong');
      }
      
      //$('#result'+word).bind('click', function() {showResults(name);});
    }
    
    $('#redLine').css('margin-left', queryW+113).css('height', $(document).height()-50);
  }
	
	
	function changeSpacer() {
     // $('#spacer').css('height', $(window).height()-150);
	}
	
	$(window).resize(function() {
	  changeSpacer();
  });
  
  
  function replaceFirstChar(startString, stringToPutIn) {
    var endString = startString.slice(1);
    endString = stringToPutIn.concat(endString);
    return endString;
  }
	
});




















