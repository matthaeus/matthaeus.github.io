Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};




var autoAddressComplete;

$(function () {
	$('input').val('');
	autoAddressComplete = new AutoAddressComplete('aacInput');
});





function AutoAddressComplete(htmlElement) {
	var aac = this;
	aac.htmlElement = $('#' + htmlElement);
	aac.lastInputValue = '';
	aac.resultsUnlocked = false;
	aac.addressLookup = null;
	aac.actStatus = 'start';
	aac.busy = false;
	aac.mode = 'none';
	
	aac.initializeMap();
	aac.initializeInput();
}





AutoAddressComplete.prototype.initializeMap = function() {
	var aac = this;
	
	var bingMapOptions = {
						credentials: 'AtbxmJ_5QMLosLOsTm1xIWjFDa0lwnzUbr5sszZ_GtEZL-gsop8w2l9xCeH-_dFU',
        				center: new Microsoft.Maps.Location(48.2087105, 16.3726546),
        				mapTypeId: Microsoft.Maps.MapTypeId.road,
        				zoom: 1,
						disableUserInput: true,
						enableClickableLogo: false,
						enableSearchLogo: false,
						showCopyright: false,
						showDashboard: false,
						showScalebar: false
					};
	
	aac.map = new Microsoft.Maps.Map(document.getElementById("bingMap"), bingMapOptions);
}






AutoAddressComplete.prototype.initializeInput = function() {
	var aac = this;
	
	aac.htmlElement.bind('keyup', function(e) {
		if (e.keyCode == 13) {
			if (aac.queryDelay) clearTimeout(aac.queryDelay);
			aac.runQuery(aac.htmlElement.val());
			return null;
		}
		
		if (e.keyCode != 9 && e.keyCode != 16) {
			aac.inputKeyUp('main', aac.htmlElement.val());
			aac.changeMode('main');
		}
	});
	
	
	$('.outputBox').bind('keyup', function(e) {
		
		if (e.keyCode != 9 && e.keyCode != 16) {
			aac.changeMode('structured');
			aac.toggleStructuredInput(true);
			$('.mic_'+$(this).attr('id')).fadeTo('70',1);
		}
	});
	
	$('#additionalInfo').unbind('keyup').bind('keyup', function(e) {
		if (e.keyCode != 9 && e.keyCode != 16) {
			$('.mic_'+$(this).attr('id')).fadeTo('70',1);
		}
	});;
}






AutoAddressComplete.prototype.inputKeyUp = function(fromWhere , value) {
	var aac = this;
	
	if (fromWhere == 'main') {
		aac.setStatusTo('keyup in main');
		if (aac.analyzeMainInput(value)) {
			aac.setStatusTo('process main input');
			aac.newQuerySequence();
			aac.busy = true;
		}
		
	} else if (fromWhere = 'structured') {
		aac.setStatusTo('keyup in structured');
		if (aac.analyzeStructuredInput(value)) {
			aac.setStatusTo('process structured input');
			aac.newQuerySequence();
			aac.busy = true;
		}
	}
}







AutoAddressComplete.prototype.newQuerySequence = function(fromWhere) {
	var aac = this;
	if (aac.addressLookup != null) aac.addressLookup.abort();
	if (aac.queryDelay) clearTimeout(aac.queryDelay);
	aac.queryDelay = setTimeout(function() {aac.delayPassed();}, 500);
}





AutoAddressComplete.prototype.delayPassed = function() {
	var aac = this;
	
	if (aac.mode == 'main') {
		aac.runQuery(aac.htmlElement.val());
	}
}






AutoAddressComplete.prototype.runQuery = function(address) {
	var aac = this;

	url = 'callGeocoder.php?a='+encodeURIComponent(address);
	
	aac.addressLookup = $.ajax({
        type: "GET",
        url: url,
        success: function(msg){
			
    			try {
    				var msgJ = JSON.parse(msg);
    				if (msgJ.status == 'success') {
    					aac.response = JSON.parse(msgJ.content);
    					aac.busy = false;
    					aac.parseResponse(aac.response);
    				} else if (msgJ.status == 'curlfailed') {
    					aac.showError('unknown');
    				} else {
    					aac.showError('unknown');
    				}
    			} catch (error) {
    				aac.showError('unknown');
    			}
    			aac.addressLookup = null;
        }, 
		error: function(jqXHR, textStatus, errorThrown) {
			if (errorThrown != 'abort') {
				aac.showError('unknown');
			}
		}
     });
	
}






AutoAddressComplete.prototype.parseResponse = function(response) {
	var aac = this;
	if (response.resourceSets[0].estimatedTotal > 0) {
		aac.unlockResults(true);
		var newAddress = response.resourceSets[0].resources[0];
		
		aac.panMap(newAddress.point.coordinates[0], newAddress.point.coordinates[1]);
        aac.placeMarker(true, newAddress.point.coordinates[0], newAddress.point.coordinates[1]);
		
		aac.outputStructuredAddress(newAddress.address);
		
		aac.setStatusTo('new main result');
	} else {
		aac.setStatusTo('no main result');
	}
	
}




AutoAddressComplete.prototype.outputStructuredAddress = function(newAddress) {
	var aac = this;
	var numberFirst = false;
	
	//console.log(newAddress);
	
	if (!isNaN(newAddress.formattedAddress[0])) {
		numberFirst = true;
	}
	
	$('.outputBox').val('');
	$('.mic').show();
	var addressElements = ['addressLine', 'adminDistrict', 'adminDistrict2', 'countryRegion', 'locality', 'postalCode'];
	
	for (var i in addressElements) {
		var key = addressElements[i];
		if (typeof newAddress[key] != 'undefined') {
			$('#'+key).val(newAddress[key]);
			aac.toggleMissingIndicator(key, false);
		} else {
			aac.toggleMissingIndicator(key, true)
		}
	}
	aac.toggleMissingIndicator('additionalInfo', true);
}





AutoAddressComplete.prototype.noAddressMatch = function() {
	var aac = this;
	$('.outputBox').val('');
	aac.showError('Couldn\'t find address. Please enter manually below.');
	aac.setMessage(true, 'No matching address found.', false);
	if (aac.unlockResults) aac.resetMap();
}





AutoAddressComplete.prototype.showError = function(errorMsg) {
	var aac = this;
	//console.log(errorMsg);
}









AutoAddressComplete.prototype.panMap = function(lat, lon) {
	var aac = this;	
	var zoom = 16;
	var newViewOptions = {
							zoom: zoom,
							animate: false,
							center: new Microsoft.Maps.Location(lat, lon)
						};
	
	aac.map.setView(newViewOptions);
}






AutoAddressComplete.prototype.resetMap = function() {
	var aac = this;	
	var zoom = 1;
	var newViewOptions = {
							zoom: zoom,
							animate: false,
							center: new Microsoft.Maps.Location(48.2087105, 16.3726546)
						};
	
	aac.map.setView(newViewOptions);
	
	aac.map.entities.pop();
	var center = new Microsoft.Maps.Location(48.2087105, 16.3726546);
}






AutoAddressComplete.prototype.placeMarker = function(visibility, lat, lon) {
	var aac = this;
	
	aac.map.entities.pop();
	
	var center = new Microsoft.Maps.Location(lat, lon);
	var pin = new Microsoft.Maps.Pushpin(center, {
													icon: 'pin_a.png', 
													width: 18, 
													height: 18, 
													draggable: false,
													anchor: new Microsoft.Maps.Point(7, 7)
													}); 
	aac.map.entities.push(pin);
}









AutoAddressComplete.prototype.analyzeMainInput = function(value) {
	var aac = this;
	
	var newInputValue = value.replace(/\s{2,}/g, ' ');
	
	if (newInputValue == '' || newInputValue == ' ') {
		aac.setStatusTo('idle');
		aac.busy = false;
		return false;
	}
	
	
	return true;
}





AutoAddressComplete.prototype.analyzeStructuredInput = function(value) {
	var aac = this;
	//TBC
	return true;
}











AutoAddressComplete.prototype.setStatusTo = function(status) {
	var aac = this;
	
		
	if (aac.busy == true) {
		return true;
	}

	
	if (status == 'manual input') {
		
		
	} else if (status == 'start') {
		//reset everything
		
	} else if (status == 'idle') {
		aac.setMessage({
						active: false,
						message: '',
						messageDelay: 0,
						icon: 'empty.png',
						iconAnimation: 'fadeIn'
						});
		
	} else if (status == 'keyup in main') {
		aac.toggleMainInput(true);
		aac.setMessage({
						active: true,
						message: 'Searching',
						messageDelay: 50,
						icon: 'loadingsmall.gif',
						iconAnimation: 'fadeIn'
						});
		
	} else if (status == 'process main input') {
		aac.toggleStructuredInput(false);
		aac.toggleMap(false);
		$('.mic').stop().fadeTo('100',1);
	
	} else if (status == 'new main result') {
		aac.toggleStructuredInput(true);
		aac.toggleMap(true);
		aac.setMessage({
						active: true,
						message: 'Success. Please check and complete data below.',
						messageDelay: 50,
						icon: 'found.png',
						iconAnimation: 'fadeIn'
						});
		
	} else if (status == 'no main result') {
		aac.toggleStructuredInput(true);
		aac.toggleMap(true);
		aac.resetMap();
		aac.setMessage({
						active: true,
						message: 'Couldn\'t find this address. Try again or type it in below.',
						messageDelay: 50,
						icon: 'none.png',
						iconAnimation: 'fadeIn'
						});
		
	} else if (status == 'process structured input') {
		aac.toggleMainInput(false);
		aac.toggleMap(false);
		//aac.toggleStructured
		aac.setMessage({
						active: true,
						message: 'Looking up your address',
						messageDelay: 50,
						icon: 'loadingsmall.gif',
						iconAnimation: 'fadeIn'
						});
		
	} else if (status == 'new structured result') {
		
	}
	
	aac.actStatus = status;
}




AutoAddressComplete.prototype.unlockResults = function(status) {
	var aac = this;
	
	if (status) {
		aac.resultsUnlocked = true;
		$('#results').removeClass('inactive');
		$('.outputBox').removeClass('inactive');
	} else {
		aac.resultsUnlocked = false;		
		$('#results').addClass('inactive');
		$('.outputBox').addClass('inactive');
	}
}





AutoAddressComplete.prototype.toggleMainInput = function(status) {
	var aac = this;
	if (status) {
		$('#aac').removeClass('inactive');
		$('.message').removeClass('inactive');
	} else {
		$('#aac').addClass('inactive');
		$('.message').addClass('inactive');
		aac.htmlElement.val('Start Over');
		aac.htmlElement.bind('mousedown', function(e) {
			//console.log('start over');
			aac.startOver();
		});
	}
}





AutoAddressComplete.prototype.toggleMap = function(status) {
	var aac = this;
	if (status) {
		$('#mapContainer').removeClass('inactive');
	} else {
		$('#mapContainer').addClass('inactive');
	}
}





AutoAddressComplete.prototype.toggleStructuredInput = function(status) {
	var aac = this;
	if (status) {
		$('#resultFields').removeClass('inactive');
	} else {
		$('#resultFields').addClass('inactive');
	}
}








AutoAddressComplete.prototype.setMessage = function(options) {
	var aac = this;

	if (options.active == true) {
		$('.message').removeClass('inactive');
	} else {
		$('.message').addClass('inactive');
	}
	
	$('.messagePic').css('background', 'url(\''+ options.icon +'\') no-repeat top left').show(); //then change background, needs empty.gif first, then fade in
	
	
	if (options.message !== false) {
		$('.messageText').hide();
		$('.messageText').html(options.message);
		$('.messageText').delay(options.messageDelay).fadeIn();
	}
	
	
}







AutoAddressComplete.prototype.changeMode = function(modeName) {
	var aac = this;
	
	if (aac.mode == modeName) return;

	if (modeName == 'main') {
		$('#resultFields').animate({
		    width: '270px'
		  }, 200, function() {
			$('#bingMap').hide().css('width', '210px').fadeIn();
		});
	} else if (modeName == 'structured') {
		$('#bingMap').animate({
		    width: '0px'
		  }, 180);
		
		$('#resultFields').animate({
		    width: '494px'
		  }, 200);
		aac.toggleMainInput(false);
		if (aac.addressLookup != null) aac.addressLookup.abort();
		aac.setMessage({
						active: false,
						message: 'Waiting for new input.',
						messageDelay: 50,
						icon: 'found.png',
						iconAnimation: 'fadeIn'
						});
	}
	
	aac.mode = modeName;
}



AutoAddressComplete.prototype.toggleResetButton = function(status) {
	var aac = this;
	if (status) {
		$('#resultFields').removeClass('inactive');
	} else {
		$('#resultFields').addClass('inactive');
	}
}



AutoAddressComplete.prototype.startOver = function() {
	var aac = this;
	aac.htmlElement.unbind('mousedown');
	$('.outputBox').val('');
	aac.htmlElement.val('').focus();
	aac.resetMap();
	aac.changeMode('main');
	aac.toggleMap(false);
	aac.toggleStructuredInput(false);
	aac.toggleMainInput(true);
	$('.mic').stop().fadeTo('100',1);
	
	
	aac.setMessage({
					active: false,
					message: '',
					messageDelay: 0,
					icon: 'empty.png',
					iconAnimation: 'fadeIn'
					});
}



AutoAddressComplete.prototype.toggleMissingIndicator = function(fieldId, status) {
	var aac = this;
	
	if (status) {
		$('.mic_'+fieldId).stop().fadeTo('100',0);		
	} else {
		$('.mic_'+fieldId).stop().fadeTo('100',1);
	}
}






AutoAddressComplete.prototype.showError = function(errorType) {
	var aac = this;
	
	if (errorType == 'unknown') {
		aac.setMessage({
						active: true,
						message: 'I am Error. Please try again later.',
						messageDelay: 50,
						icon: 'none.png',
						iconAnimation: 'fadeIn'
						});
	} else {

	}
}


