//var hash;
var stepCount = 1;
var pickNew = 2;

$(function(){
	
	

	


function hashCheck() {
	//hash = decodeURI(location.hash);	
	// hash = hash.replace( /^#/, '');
	//hash = hash.slice(0, 1);
	// console.log('asdfsdfsad');
	// console.log('xxx', typeof hash);
	if (typeof hash !== 'undefined' && hash.replace(/\s{2,}/g, ' ') != '' && hash.replace(/\s{2,}/g, ' ') != '') {
		// console.log('hash is', hash);
		//console.log('decodes', utf8Decode(hash));
		buildFromHash();
	} else {
		buildVanilla();
	}
}


function randomString() {
	var chars = "cdef";
	var string_length = 6;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}


function randomHSL(h, s, l) {
	var H = Math.floor(Math.random()*h+1) / 360;
	var S = Math.floor(Math.random()*s+1) / 100;
	var L = Math.floor(Math.random()*l+1) / 100;
	// console.log(H, S, L);
	return [H, S, L];
}

function resetEverything() {
	$('#color').css('background', '#fff');
	$('#finalResult').val('');
	$('#newMessageInput').val('');
	$('#newMessageText').val('');
}


function buildVanilla() {
	//console.log('vanilla');
	
	$('#picker').farbtastic('#color');
	$.farbtastic('#picker').linkTo(function(color){
		$('body').css('background-color', color);
		// $('#colSwitch').css('background-color', color);
		$('#color').val(color);
		//var L = 100-$.farbtastic('#picker').hsl[2]*100;
		//$('#newMessageText').css('color', 'hsl(0, 0%, '+ L +'%)');
		if (pickNew == 1 && $.farbtastic('#picker').hsl[1] == 0) {
			$.farbtastic('#picker').setColor('#ff0000');
			// return false;
		}
		if ($.farbtastic('#picker').hsl[2] < 0.50) {
			$('#about').css('color', '#fff');
			$('#newMessageText').addClass('bright');
			$('#colSwitch').css('background', 'url(\'colswitch2.png\') no-repeat center center');
		} else {
			$('#about').css('color', '#000');
			$('#newMessageText').removeClass('bright');
			$('#colSwitch').css('background', 'url(\'colswitch.png\') no-repeat center center');
		}
		pickNew--;
	});
	$('#color').css('color', '#333');
	$.farbtastic('#picker').setColor('#eeeeee');
	
	
	$("#color").bind("keyup change", function(){
		if ($(this).val()[0] != "#") {
			$(this).val("#" + $(this).val());
		}
		if ($(this).val().length == 4 || $(this).val().length == 7) {
			$.farbtastic("#picker").setColor($(this).val());
		} 
	});
	
	
	$('#step0').bind('click', function() {
		resetEverything();
		$('.step0').fadeOut(200, function() {
			$('#step1').css('display', 'inline-block').hide().fadeIn(200);
			$('#next').css('display', 'inline-block').hide().fadeIn(200);
			$('#prev').css('display', 'inline-block').hide().fadeIn(200);
		});
	});
	
	
	$('#next').bind('click', function() {
		stepCount++;
		
		if (stepCount == 3) {
			$('#prev').fadeOut(200);
			// if($('#newMessageText').val() == 'Add a message') {
			// 	$('#newMessageText').val('');
			// }
			$('#next').fadeOut(200, function() {
				$('#share').css('display', 'inline-block').hide().fadeIn(200);
				document.getElementById('finalResult').focus();
				document.getElementById('finalResult').select();
				$('.textControl').fadeOut(200);
				//$('#newMessageText').attr('readonly', 'readonly');
			});
			prepToSend();
		} else {
			// if (stepCount == 1) {
			// 	$('#next > img').fadeOut(200, function() {
			// 		$('#next > img').attr('src', 'next.png');
			// 		$('#next > img').fadeIn(200);
			// 	});
			// }
			$('#step'+(stepCount-1)).fadeOut(200, function() {
				$('#step'+stepCount).css('display', 'inline-block').hide().fadeIn(200);
				if (stepCount == 2) {
					$('#prev').removeClass('disabled').addClass('clickable');
					$('#prev').stop().fadeTo(200, 1);
					$('#newMessageInput').focus();
				} 
			});
		}
	});
	
	$('#prev').bind('click', function() {
		if ($(this).hasClass('disabled')) return false;
		stepCount--;
		
		if (stepCount == 1) {
			$('#prev').addClass('disabled').removeClass('clickable');
			$('#prev').stop().fadeTo(200, 0.15);
			// $('#next > img').fadeOut(200, function() {
			// 	$('#next > img').attr('src', 'start.png');
			// 	$('#next > img').fadeIn(200);
			// });
			
		} else if (stepCount == 2) {
			$('#share').fadeOut(200, function() {
				$('#next').css('display', 'inline-block').hide().fadeIn(200);
				$('.textControl').fadeIn(200);
				//$('#newMessageText').removeAttr('readonly');
			});
		}
		
		if (stepCount != 2) {
			$('#step'+(stepCount+1)).fadeOut(200, function() {
				$('#step'+stepCount).css('display', 'inline-block').hide().fadeIn(200);
			});
		}
		
	});


	$('#newMessageInput').bind('keyup change', function() {
		$('#newMessageText').val($(this).val());
	});
	
	$('#colSwitch').bind('click', function() {
		if (!$('#newMessageText').hasClass('bright')) {
			$('#newMessageText').addClass('bright');
			$('#colSwitch').css('background', 'url(\'colswitch2.png\') no-repeat center center');
		} else {
			$('#newMessageText').removeClass('bright');
			$('#colSwitch').css('background', 'url(\'colswitch.png\') no-repeat center center');
		}
	});
	
	$('#finalResult').bind('click', function() {
		document.getElementById('finalResult').focus();
		document.getElementById('finalResult').select();
	});
	
	
	$('#shareFB').bind('click', function() {
		var url = 'http://www.facebook.com/sharer/sharer.php';
		url += '?u='+encodeURIComponent('http://giveacolor.com/view/' + getFinalURL($('#newMessageText').val()));
		url += '&t=' + encodeURIComponent($('#newMessageText').val());
		window.open(url,"Facebook","height=320,width=500");
	});
	
	
	$('#shareTwitter').bind('click', function() {
		var url = 'http://twitter.com/intent/tweet';
		url += '?url='+encodeURIComponent('http://giveacolor.com/view/' + getFinalURL($('#newMessageText').val()));
		url += '&text=' + encodeURIComponent($('#newMessageText').val());
		window.open(url,'Twitter',"height=270,width=500");
	});
	
	
	$('.step1').css('display', 'inline-block').hide();
	$('.step2').css('display', 'inline-block').hide();
	$('.step3').css('display', 'inline-block').hide();
	// $('#start').css('display', 'inline-block').show();
	$('#next').css('display', 'inline-block').hide();
	$('#prev').css('display', 'inline-block').hide();
	$('#message').hide();
	$('#stageTable').css('display', 'table').show();
}



function buildFromHash() {

	// hash = location.hash;
	// 	hash = hash.slice(1);
	// 	hash = decodeURIComponent(hash);
	// 	hash = hexDecode(hash);
	var tc = hash.slice(0, 3);
	var c = hash.slice(3, 10);
	var t = hash.slice(10);
	var offset = 0;
	
	if (!t) {
		offset = 1000;
	}
	
	
	// if (tc != 'fff' && tc !='000') {
	// 	showError('Unfotunately, this URL seems not to be valid.');
	// 	return false;
	// }
	
	// document.title = t + ' - Give a Color';
	
	$('#about').css('color', '#'+tc)
	
	if (tc == '000') {
		$('body').css('background', '#ffffff');
	} else {
		$('body').css('background', '#000000');
	}
	
	$('#stageTableReplay').css('display', 'table').show();

	setTimeout(function() {
		$('#message').hide().css('color', '#'+tc).html(t).fadeIn(750);
	}, 1000 - offset);
	
	setTimeout(function() {
		$('#colorTile').css('background-color', c).fadeIn(750);
	}, 2500 - offset);
	
	$('#ad > a').css('color', '#'+tc);
	
	setTimeout(function() {
		$('#stageTableAd').css('display', 'table').show();
		$('#ad').fadeIn(1000);
	}, 6000 - offset);

	//$('#colorTile').css('background', c).show();
	//$('#message').html(t);
	
}

// function showError(errorMsg) {
// 	console.log(errorMsg);
// 	$('#errorMsg').html(errorMsg);
// 	$('#stageTableError').css('display', 'table').show();
// }



function prepToSend() {
	var text = '';
	var text = $('#newMessageText').val();
	//var data = {t: text,c: col, tc: TC};
	//console.log();
	//location.hash = encodeURIComponent(JSON.stringify(data));
	//location.hash = encodeURIComponent(mix(TC+col+text));
	var endURL = 'http://giveacolor.com/view/'+encodeURIComponent(getFinalURL(text));
	$('#finalResult').val(endURL);
	$('#finalLink').attr('href', endURL);
	// console.log($('#finalResult').val());
	//var data = text + col + TC;
}


function getFinalURL(text) {
	var col = $.farbtastic('#picker').color;
	var TC = ($('#newMessageText').hasClass('bright')) ? 'fff' : '000';
	//console.log(TC+col+text);
	return hexEncode(utf8Encode(TC+col+text));
}




// 
// 
// 
// $('#newMessageText').bind('focus', function(){
// 	if($(this).val() == 'Add a message' && stepCount != 3) {
// 		$(this).val('');
// 	}
// });
// 
// $('#newMessageText').bind('blur', function(){
// 	if($(this).val() == '' && stepCount != 3) {
// 		$(this).val('Add a message');
// 	}
// });




$('.clickable').bind('mousedown', function() {
	$(this).addClass('clicked');
});


$(document).bind('mouseup', function() {
	$('.clicked').removeClass('clicked');
});


hashCheck();

	
	
	
	
	
	
// /* Hexadecimal conversion methods.
//  * Copyright (c) 2006 by Ali Farhadi.
//  * released under the terms of the Gnu Public License.
//  * see the GPL for details.
//  *
//  * Email: ali[at]farhadi[dot]ir
//  * Website: http://farhadi.ir/
//  */
// 
// //Encodes data to Hex(base16) format
// function hexEncode(data){
// 	var b16_digits = '0123456789abcdef';
// 	var b16_map = new Array();
// 	for (var i=0; i<256; i++) {
// 		b16_map[i] = b16_digits.charAt(i >> 4) + b16_digits.charAt(i & 15);
// 	}
// 	
// 	var result = new Array();
// 	for (var i=0; i<data.length; i++) {
// 		result[i] = b16_map[data.charCodeAt(i)];
// 	}
// 	
// 	return result.join('');
// }
// 
// //Decodes Hex(base16) formated data
// function hexDecode(data){
// 	var b16_digits = '0123456789abcdef';
// 	var b16_map = new Array();
// 	for (var i=0; i<256; i++) {
// 		b16_map[b16_digits.charAt(i >> 4) + b16_digits.charAt(i & 15)] = String.fromCharCode(i);
// 	}
// 	if (!data.match(/^[a-f0-9]*$/i)) return false;// return false if input data is not a valid Hex string
// 	
// 	if (data.length % 2) data = '0'+data;
// 		
// 	var result = new Array();
// 	var j=0;
// 	for (var i=0; i<data.length; i+=2) {
// 		result[j++] = b16_map[data.substr(i,2)];
// 	}
// 
// 	return result.join('');
// }









// 
// 
// function mix(str) {
// 	var strL = str.length;
// 	var reverseStr = [];
// 	var source, destination;
// 	var mixedStr = [];
// 	
// 	for (var i=0; i<strL; i++) {
// 		reverseStr[i] = str[strL - i - 1];
// 	}
// 	reverseStr = reverseStr.join('');
// 	
// 	//1234567
// 	//7654321
// 	
// 	//123456
// 	//654321
// 	
// 	// console.log(str);
// 	// console.log(reverseStr);
// 	
// 	for (i=0; i<strL; i=i+2) {
// 		mixedStr[i] = str[i];
// 	}
// 	
// 	var shiftA = 0;
// 	var shiftB = 1;
// 	
// 	if (strL % 2 != 0) {
// 		shiftA = 1;
// 		shiftB = 0;
// 	}
// 	
// 	for (i=0+shiftA; i<strL; i=i+2) {
// 		mixedStr[i+shiftB] = reverseStr[i];
// 	}
// 	
// 	// console.log(mixedStr.join(''));
// 	//unmix(mixedStr.join('')); 
// 	return mixedStr.join('');
// }
// 
// function unmix(str) {
// 	var strL = str.length;
// 	var fS = [];
// 	var bS = [];
// 	var fS2 = [];
// 	var orig = [];
// 	
// 	for (var i=0; i<strL; i=i+2) {
// 		fS[i] = str[i];
// 	}
// 	
// 	for (i=1; i<strL; i=i+2) {
// 		bS[i] = str[i];
// 	}
// 	
// 	for (var i=0; i<bS.length; i++) {
// 		fS2[i] = bS[bS.length - i - 1];
// 	}
// 	
// 	// console.log(fS.join('')+bS.join(''));
// 	
// 	// console.log(bS.join(''));
// 	// console.log(fS2.join(''));
// 	
// 	for (i in fS) {
// 		orig[i*2] = fS[i]; 
// 	}
// 	
// 	for (i in fS2) {
// 		orig[i*2 + 1] = fS2[i]; 
// 	}
// 	
// 	return orig.join('');
// 	
// 	//var mixedStr = [];
// 	
// 	
// 	//reverseStr = reverseStr.join('');
// 	
// }
// 


//Encodes data to Hex(base16) format
function hexEncode(data){
	var b16_digits = '0123456789abcdef';
	var b16_map = new Array();
	for (var i=0; i<256; i++) {
		b16_map[i] = b16_digits.charAt(i >> 4) + b16_digits.charAt(i & 15);
	}
	
	var result = new Array();
	for (var i=0; i<data.length; i++) {
		result[i] = b16_map[data.charCodeAt(i)];
	}
	// console.log(hexDecode(result.join('')));
	return result.join('');
}

//Decodes Hex(base16) formated data
function hexDecode(data){
	var b16_digits = '0123456789abcdef';
	var b16_map = new Array();
	for (var i=0; i<256; i++) {
		b16_map[b16_digits.charAt(i >> 4) + b16_digits.charAt(i & 15)] = String.fromCharCode(i);
	}
	if (!data.match(/^[a-f0-9]*$/i)) return false;// return false if input data is not a valid Hex string
	
	if (data.length % 2) data = '0'+data;
		
	var result = new Array();
	var j=0;
	for (var i=0; i<data.length; i+=2) {
		result[j++] = b16_map[data.substr(i,2)];
	}

	return result.join('');
}




/* UTF8 encoding/decoding functions
 * Copyright (c) 2006 by Ali Farhadi.
 * released under the terms of the Gnu Public License.
 * see the GPL for details.
 *
 * Email: ali[at]farhadi[dot]ir
 * Website: http://farhadi.ir/
 */

//an alias of String.fromCharCode
function chr(code)
{
	return String.fromCharCode(code);
}

//returns utf8 encoded charachter of a unicode value.
//code must be a number indicating the Unicode value.
//returned value is a string between 1 and 4 charachters.
function code2utf(code)
{
	if (code < 128) return chr(code);
	if (code < 2048) return chr(192+(code>>6)) + chr(128+(code&63));
	if (code < 65536) return chr(224+(code>>12)) + chr(128+((code>>6)&63)) + chr(128+(code&63));
	if (code < 2097152) return chr(240+(code>>18)) + chr(128+((code>>12)&63)) + chr(128+((code>>6)&63)) + chr(128+(code&63));
}

//it is a private function for internal use in utf8Encode function 
function _utf8Encode(str)
{	
	var utf8str = new Array();
	for (var i=0; i<str.length; i++) {
		utf8str[i] = code2utf(str.charCodeAt(i));
	}
	return utf8str.join('');
}

//Encodes a unicode string to UTF8 format.
function utf8Encode(str)
{	
	var utf8str = new Array();
	var pos,j = 0;
	var tmpStr = '';
	
	while ((pos = str.search(/[^\x00-\x7F]/)) != -1) {
		tmpStr = str.match(/([^\x00-\x7F]+[\x00-\x7F]{0,10})+/)[0];
		utf8str[j++] = str.substr(0, pos);
		utf8str[j++] = _utf8Encode(tmpStr);
		str = str.substr(pos + tmpStr.length);
	}
	
	utf8str[j++] = str;
	return utf8str.join('');
}

//it is a private function for internal use in utf8Decode function 
function _utf8Decode(utf8str)
{	
	var str = new Array();
	var code,code2,code3,code4,j = 0;
	for (var i=0; i<utf8str.length; ) {
		code = utf8str.charCodeAt(i++);
		if (code > 127) code2 = utf8str.charCodeAt(i++);
		if (code > 223) code3 = utf8str.charCodeAt(i++);
		if (code > 239) code4 = utf8str.charCodeAt(i++);
		
		if (code < 128) str[j++]= chr(code);
		else if (code < 224) str[j++] = chr(((code-192)<<6) + (code2-128));
		else if (code < 240) str[j++] = chr(((code-224)<<12) + ((code2-128)<<6) + (code3-128));
		else str[j++] = chr(((code-240)<<18) + ((code2-128)<<12) + ((code3-128)<<6) + (code4-128));
	}
	return str.join('');
}

//Decodes a UTF8 formated string
function utf8Decode(utf8str)
{
	var str = new Array();
	var pos = 0;
	var tmpStr = '';
	var j=0;
	while ((pos = utf8str.search(/[^\x00-\x7F]/)) != -1) {
		tmpStr = utf8str.match(/([^\x00-\x7F]+[\x00-\x7F]{0,10})+/)[0];
		str[j++]= utf8str.substr(0, pos) + _utf8Decode(tmpStr);
		utf8str = utf8str.substr(pos + tmpStr.length);
	}
	
	str[j++] = utf8str;
	return str.join('');
}

	

	
	

});















