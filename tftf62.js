var actProject = 0;

var projects = ['intro', 'aaui', 'springto', 'ox', 'grow', 'synomin', 'giveacolor', 'wunderbar', 'aaa', 'whisper',  'fastimages', 'imok'];

var wW, wH, overlaySpring;
var controlSprings =[];
var previewSpring;
var fingerPos = 0;



$(function () {	


  createLinks();

  // document.getElementById('log').innerHTML = 'sdfdsf';

  // document.ontouchstart = function(e) {
  //   document.getElementById('log').innerHTML = 'start';
  //   console.log(e.x);
  //   fingerPos = e.x;
  // };


  // document.ontouchmove = function(e) {
  //   document.getElementById('log').innerHTML = e.x;
  // };


  // document.ontouchcancel = function(e) {
  //   document.getElementById('log').innerHTML = 'start';
  //   console.log(e.x);
  //   if (e.x < fingerPos - 100) {
  //     e.preventDefault();
  //     console.log('next');
  //     nextProject();
  //   } else if (e.x > fingerPos + 100) {
  //     e.preventDefault();
  //     console.log('prev');
  //     prevProject();
  //   }
  // };


  // if (window.addEventListener) {
  //     window.addEventListener('DOMMouseScroll', wheel, false);
  // }
  // window.onmousewheel = document.onmousewheel = wheel;


  // window.onmousewheel = function(e) {
  //   e.preventDefault();
  //   if (1) {
  //     if (e.wheelDeltaX < 0) {
  //       nextProject();
  //     } else if (e.wheelDeltaX > 0) {
  //       prevProject();
  //     }
  //     console.log(e.wheelDeltaX);
  //   }
  // };



  
  
  initialize();
  
  // $(window).bind('scroll', function(e){
  //   e.preventDefault();
  //   // console.log(e);
  //   console.log('scrolled');
  // });
  
  
  // $(window).bind('click', function(e){
  //   actProject = (actProject == projects.length-1) ? 0 : actProject + 1;
  //   switchToProject(actProject);
  // });
  
  
  $(window).bind('keydown', function(e){
    // console.log(e);
		if (e.keyCode == '39') {
		  nextProject();
		} else if (e.keyCode  == '37') {
		  prevProject();
		}
	});
	
	
	
  
  
  
  $(window).bind('resize', function(){
		wW = window.innerWidth;
		wH = window.innerHeight;
		$('#overlay').css('width', wW*projects.length + 'px');
		$('.overlayPiece').css('width', wW + 'px');
		$('.overlayPiece').css('height', wH + 'px');
		
  	overlaySpring.start(undefined, undefined, undefined, -actProject * wW);
	});
	
	$('.headerPrev').bind('click', function(){
	  prevProject();
	});
	
	$('.headerNext').bind('click', function(){
	  nextProject();
	});
	
	$('#introOverlay .continue').bind('click', function(){
	  nextProject();
	});
	

  wW = window.innerWidth;
  wH = window.innerHeight;
  $('#overlay').css('width', wW*projects.length + 'px');
  $('.overlayPiece').css('width', wW + 'px');
  $('.overlayPiece').css('height', wH + 'px');
  // $('.overlayPiece').css('display', 'none');
    $('.overlayPiece .stageTable').css('width', '99%');
  
  overlaySpring.start(undefined, undefined, undefined, -actProject * wW);

  setTimeout(function() {
    $('.overlayPiece .stageTable').css('width', '100%');
  }, 1);
	
	
	
   
  
  
  window.scrollTo(0, 1);

  
});



function initialize() {
  
  buildHeaderControls();
  
  overlaySpring = new mSpring({
  	onSpringStart: function() {
  	},
  	onSpringChange: function(massPos, springData) {
      // document.getElementById('overlay').style.left = massPos + 'px';
      // console.log(massPos);
      $('#overlay').css('-webkit-transform', 'translate3d('+ massPos +'px, 0px, 0px)');
      $('#overlay').css('-moz-transform', 'translate3d('+ massPos +'px, 0px, 0px)');
      $('#overlay').css('-o-transform', 'translate3d('+ massPos +'px, 0px, 0px)');
      $('#overlay').css('transform', 'translate3d('+ massPos +'px, 0px, 0px)');
  	},
  	onSpringRest: function() {
  	}	
  });
  
  overlaySpring.setSpringParameters(300, 26, 10);

  
}




function buildHeaderControls() {
  var bullets = $('#bulletList');
  var tmpEl;
  for (var i = 0; i < projects.length; i++) {
    tmpEl = $('<li class="bullet" id="bullet'+i+'"></li>').appendTo(bullets);
    tmpEl.data('index', i);
    
    tmpEl.bind('click', function(){
      switchToProject($(this).data('index'));
    });
    
    
    tmpEl.bind('mouseover', function(){
      previewProject($(this).data('index'));
    });
    
    tmpEl.bind('mouseout', function(){
      unPreviewProject($(this).data('index'));
    });
  }
  
  $('#headerControlsMobile h1').text((parseInt(actProject)+1) + '/' + projects.length);
  
  
  $('#bullet0').addClass('active');
  
  
  previewSpring = new mSpring({
  	onSpringStart: function() {
  	},
  	onSpringChange: function(massPos, springData) {
      $('#bulletPreview').css('-webkit-transform', 'translate3d('+ massPos +'px, 0px, 0px)');
  	},
  	onSpringRest: function() {
  	}	
  });
  
  previewSpring.setSpringParameters(10, 20, 1);
  
  
}



function previewProject(projectIndex){
  $('#bulletPreview'+projectIndex).addClass('active');
  previewSpring.start(undefined, undefined, undefined, 400);
}


function unPreviewProject(projectIndex){
  $('#bulletPreview'+projectIndex).removeClass('active');
}




function switchToProject(projectIndex) {
  
  
  actProject = projectIndex;
  
  $('#headerControlsMobile h1').text((parseInt(actProject)+1) + '/' + projects.length);
  
  
  $('.bullet').removeClass('active');
  $('#bullet'+projectIndex).addClass('active');
  $('.projectBg').addClass('hidden');
  $('#' + projects[projectIndex]).removeClass('hidden');
  
  var newAnchorPos = -projectIndex * wW;
	overlaySpring.start(undefined, undefined, undefined, newAnchorPos);
	
	var newCol = $('#' + projects[projectIndex]).attr('cc');
  changeColorsTo('#' + newCol);
  
  var newBgCol = $('#' + projects[projectIndex]).attr('bgcc');
  changeSpecialColors('#' + newBgCol);
  
  $('#floatingP').css('opacity', 1);
  
  // location.hash = '';
  // location.hash = encodeURI(actProject+1);
  
}


function nextProject() {
  actProject = (actProject == projects.length-1) ? 0 : actProject + 1;
  switchToProject(actProject);
}

function prevProject() {
  actProject = (actProject == 0) ? projects.length-1  : actProject - 1;
  switchToProject(actProject);
}






function changeColorsTo(color) {
  $('.bullet').css('border-color', color);
  $('.bullet').css('box-shadow', '0px 1px 0px '+ color)
  $('#headerControls > h1').css('color', color);
  $('.bullet').css('background', 'transparent');
  $('.bullet.active').css('background', color);
  
  $('#headerControlsMobile > h1').css('color', color);
  $('#headerControlsMobile > div').css('color', color);
  $('#headerControlsMobile > div').css('border-color', color);
  $('#headerControlsMobile').css('border-color', color);
  $('.bigPN').css('background', color);
  
  $('.floatingPN').css('border-color', color);
  $('.floatingPN').css('color', color);
  $('.floatingPN').css('box-shadow', '0px 2px 0px ' + color);
}


function changeSpecialColors(color) {
  $('.bigPN').css('color', color);
  // console.log(color);
  //tooltip foreground here too
}







function createLinks() {

  $('#aauiOverlay .wideScreen').bind('click', function() {
    window.location.href = 'http://youtu.be/XVbuk3jizGM';
  });

  $('#springtoOverlay .wideScreen').bind('click', function() {
    window.location.href = 'http://matthaeuskrenn.com/springto';
  });
  
  $('#oxOverlay .wideScreen').bind('click', function() {
    window.location.href = 'https://chrome.google.com/webstore/detail/ox-bookmarks-youll-be-hap/afaahdbjknpmcapecaaclhdmjnlcmbmh';
  });
  
  $('#growOverlay .wideScreen').bind('click', function() {
    window.location.href = 'http://matthaeuskrenn.com/grow';
  });
  
  $('#synominOverlay .wideScreen').bind('click', function() {
    window.location.href = 'http://matthaeuskrenn.com/synomin';
  });
  
  $('#giveacolorOverlay .wideScreen').bind('click', function() {
    window.location.href = 'http://giveacolor.com';
  });
  
  $('#wunderbarOverlay .wideScreen').bind('click', function() {
    window.location.href = 'http://matthaeuskrenn.com/wunderbar';
  });
  
  $('#aaaOverlay .wideScreen').bind('click', function() {
    window.location.href = 'http://matthaeuskrenn.com/addressautocomplete';
  });
  
  $('#whisperOverlay .wideScreen').bind('click', function() {
    window.location.href = 'http://matthaeuskrenn.com/whisper';
  });
  
  $('#fastimagesOverlay .wideScreen').bind('click', function() {
    window.location.href = 'http://matthaeuskrenn.com/fastimages';
  });
  
  $('#imokOverlay .wideScreen').bind('click', function() {
    window.location.href = 'http://matthaeuskrenn.com/imok ';
  });
}









function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}


function wheel(e) {
  preventDefault(e);
}

  








