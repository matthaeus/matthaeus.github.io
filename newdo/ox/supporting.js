

// Individual Stats ///////////////////////////////////////////////////////////


function individualStats() {
  // get first run
  var firstRun = syncStorage.firstRun;
  console.log('INDIVIDUAL STATS firstRun', firstRun);
  
  
  tUID = 'zUser_' + UID + '_' + getDateInWords(firstRun);
  console.log('INDIVIDUAL STATS tUID', tUID);
  
  // calculate rounded amount of days since first run
  daysSinceFirstRun = Math.floor((Date.now() - firstRun) / 1000 / 3600 / 24);
  dsfrLabel = 'Day ';
  for (var i = 0; i < 4 - daysSinceFirstRun.toString().length; i++) {
    dsfrLabel += '0';
  }
  dsfrLabel += daysSinceFirstRun.toString() + ': ';
  console.log('INDIVIDUAL STATS daysSinceFirstRun', daysSinceFirstRun);
  // pushGaEvent(['_trackEvent', 'General', 'Last day open', daysSinceFirstRun.toString(), parseInt(daysSinceFirstRun), true]);
  
  // get syncStorage.openOnDay
  var lastDayOpen = syncStorage.lastDayOpen;
  console.log('INDIVIDUAL STATS lastDayOpen', lastDayOpen);
  
  if (typeof lastDayOpen === 'undefined') {
    syncStorage.lastDayOpen = daysSinceFirstRun;
    chrome.storage.sync.set({'lastDayOpen': daysSinceFirstRun}, function(data) {});
    pushGaEvent(['_trackEvent', tUID, 'Last day open', data.lastDayOpen.toString(), parseInt(data.lastDayOpen), true]);
    
    console.log('INDIVIDUAL STATS lastDayOpen has been set for first time to', daysSinceFirstRun);
    // if openOnDay is undefined, Define it with 0 in syncStorage and add it to actual storage as well
    // send event
  } else {
    if (lastDayOpen < daysSinceFirstRun) {
      syncStorage.lastDayOpen = daysSinceFirstRun;
      chrome.storage.sync.set({'lastDayOpen': daysSinceFirstRun}, function(data) {});
      pushGaEvent(['_trackEvent', tUID, 'Last day open', data.lastDayOpen.toString(), parseInt(data.lastDayOpen), true]);
      console.log('INDIVIDUAL STATS lastDayOpen was set to', daysSinceFirstRun)
      //update lastDayOpen in both storages
      //send event
    } else {
      console.log('INDIVIDUAL STATS opened on same day as before',lastDayOpen, daysSinceFirstRun);
    }
  }
  
  pushGaEvent(['_trackEvent', tUID, 'Tab loaded', dsfrLabel + versionNumber,  parseInt(versionNumber), true]); 
}











////////////////////////////////////////////////////////////////////////////////







function initDebugMode() {
  console.log('timestamp now is', Date.now());

  $('<ul id="storageValues"></ul>').appendTo('#storageDebugger'); //<a href="#" id="storageResetter">reset storage</a>
  $('#storageDebugger').css('display', 'block');
  $('#storageResetter').bind('click', function() {
    resetStorageKeys();
  });
 
  window.setTimeout(function() {
    printStorage();
    // chrome.storage.onChanged.addListener(function (){
    //   printStorage();
    // });
  }, 500);
}




function printStorage() {
  $('#storageValues').html('');
  chrome.storage.sync.get(null, function(data) {
    var i;
    for (i in data) {
      $('<li id="'+ i +'">'+i+': <span>'+data[i]+'</span></li>').appendTo('#storageValues').each(function() {
        $('<span class="killStorage">X</span>').appendTo(this).each(function(){
          $(this).bind('click', function(){
            // console.log($(this).parent().attr('id'));            
            chrome.storage.sync.remove($(this).parent().attr('id'), function(data) {
              console.log('removed storage key');
              printStorage();
            });
          })
        });
      });
    }
  });
}





function resetStorageKeys() {
  chrome.storage.sync.clear(function() {
    // console.log('storage area was cleared');
  });
}








function pushGaEvent(eventArray) {
  console.log(eventArray);
  if (evTr == 1) {
    _gaq.push(eventArray);
  }
}











String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};












function fisherYates ( myArray ) {
  var i = myArray.length, j, tempi, tempj;
  if ( i == 0 ) return false;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     tempi = myArray[i];
     tempj = myArray[j];
     myArray[i] = tempj;
     myArray[j] = tempi;
   }
   return myArray;
}











function newColors() {
  
  var vals = [303, 2, 276, 11, 163, 196, 102, 298, 108, 224, 352, 364, 365, 104, 95, 361, 161, 248, 238, 135, 131, 156, 43, 206, 105, 222, 373, 386, 162, 58, 145, 144, 326, 133, 296, 332, 335, 324, 146, 81, 64, 87, 254, 375, 195, 124, 310, 233, 308, 313, 349, 397, 201, 284, 111, 67, 177, 157, 183, 288, 30, 351, 306, 245, 348, 172, 17, 211, 77, 96, 280, 167, 378, 368, 223, 32, 136, 8, 389, 191, 190, 74, 366, 188, 242, 262, 38, 382, 168, 370, 357, 66, 265, 148, 322, 285, 210, 31, 101, 359, 178, 12, 143, 49, 151, 207, 250, 193, 305, 22, 110, 249, 203, 381, 93, 220, 57, 140, 88, 68, 39, 301, 377, 271, 184, 253, 221, 323, 174, 44, 232, 45, 343, 315, 37, 252, 269, 192, 338, 268, 320, 205, 48, 329, 275, 394, 100, 204, 54, 62, 115, 369, 35, 109, 328, 379, 82, 215, 154, 89, 398, 282, 294, 176, 350, 42, 152, 261, 230, 390, 391, 243, 302, 52, 137, 388, 345, 126, 80, 0, 228, 312, 53, 396, 395, 107, 121, 258, 113, 356, 279, 266, 50, 114, 173, 120, 225, 129, 311, 164, 46, 139, 84, 3, 60, 264, 216, 7, 181, 291, 251, 217, 150, 175, 25, 334, 197, 21, 79, 171, 336, 260, 292, 16, 78, 6, 123, 229, 141, 169, 319, 353, 186, 337, 342, 112, 117, 24, 270, 179, 259, 99, 9, 153, 56, 214, 103, 71, 286, 227, 346, 55, 23, 277, 70, 158, 267, 28, 219, 309, 290, 149, 160, 374, 283, 116, 106, 327, 61, 142, 47, 26, 29, 15, 340, 331, 247, 384, 182, 231, 75, 218, 65, 226, 299, 325, 33, 354, 317, 5, 51, 295, 72, 300, 73, 212, 297, 63, 239, 198, 90, 20, 318, 200, 367, 159, 208, 385, 274, 289, 18, 34, 199, 257, 241, 202, 246, 4, 119, 128, 263, 138, 86, 132, 399, 10, 281, 330, 13, 256, 321, 59, 165, 363, 97, 387, 36, 83, 355, 118, 27, 234, 380, 278, 98, 122, 272, 339, 76, 187, 244, 360, 125, 155, 314, 333, 307, 240, 134, 91, 235, 237, 180, 147, 41, 69, 255, 393, 273, 130, 94, 358, 362, 392, 372, 92, 287, 376, 14, 209, 85, 127, 194, 213, 170, 19, 371, 347, 383, 316, 236, 1, 293, 166, 344, 40, 304, 185, 341, 189];
  
  var nowDate = new Date();
  var days = Math.floor(nowDate.getMonth() * 30.5 + nowDate.getDate());
  var days = Math.floor(Math.random() * 300);

	H = Math.floor(vals[days] % 365);
	S = Math.floor(vals[days] % 101);
  L = Math.floor((vals[days+1]) % 101);

	$('.headerCont').css('color', 'hsl('+H+','+S+'%,'+ L +'%)');

  adjustText();
}


function adjustText() {
  var lMod = 50;
  var angMod  = 0;
	if (L < 50) {
    $('.controls').css('color', 'hsl('+(H+angMod)%360+','+S+'%,'+ (L+lMod/3) +'%)');
    // $('#header').css('background-color', 'hsl('+H+','+S+'%,'+(L+lMod)+'%)');
    
	} else {
    $('.controls').css('color', 'hsl('+(H+angMod)%360+','+S+'%,'+ (L-lMod/3) +'%)');
    // $('#header').css('background-color', 'hsl('+H+','+S+'%,'+(L-lMod)+'%)');
	}
	
	// var fontFamilies = ['knockout', 'verlag', 'verlag', 'didot', 'didot', 'roboto condensed', 'roboto condensed'];
    // var fontWeights = ['100', '400', '200', '400', '600', '300', '200'];
  var fontFamilies = ['knockout', 'roboto condensed', 'roboto condensed'];
	var fontWeights = ['100', '400', '200'];
	
	var fontRand = Math.floor(Math.random() * fontFamilies.length);
	
	$('.bmTitle').css('font-family', fontFamilies[fontRand]);
	$('.bmTitle').css('font-weight', fontWeights[fontRand]);
	
}





function getDateInWords(timestamp, style) {
  //YYYY/Month/DD
  var tmpDate = new Date(timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var dayNumber = (tmpDate.getDate().length == 1) ? '0' + tmpDate.getDate() : tmpDate.getDate();
  return tmpDate.getFullYear() + '/' + months[tmpDate.getMonth()] + '/' + dayNumber;
}



function getDateInNumbers(timestamp, style) {
  //YYYY/MM/DD
  var tmpDate = new Date(timestamp);
  var monthNumber = (tmpDate.getMonth()+1 < 10) ? '0' + (tmpDate.getMonth()+1) : tmpDate.getMonth()+1;
  var dayNumber = (tmpDate.getDate() < 10) ? '0' + tmpDate.getDate() : tmpDate.getDate();
  return tmpDate.getFullYear().toString() + monthNumber.toString() + dayNumber.toString();
}






function randomUserId(len)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < len; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}







var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-38170194-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
