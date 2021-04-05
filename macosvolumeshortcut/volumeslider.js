
var isOnVolume = false;
var bg = document.querySelector("#background");
var instructions = document.querySelector("#instructions");
var lastScrollX = -1;
var lastScrollY = -1;

var volumePercent = 50;

var ui = document.querySelector("#ui");
var slider = document.querySelector("#slider");
var handle = document.querySelector("#sliderHandle");
var sliderIcon = document.querySelector("#sliderIcon");
var volumeIcon = document.querySelector("#volumeIcon");
var hover = document.querySelector("#hover");

var handleMin = 15;
var handleMax = 263;
var sliderMin = handleMin + 5;
var sliderMax = handleMax + 5;

var firstScroll = false;

var hideTimer;

var elasticTimer;

var elasticActive = false;

var targetPos = 0;
var pos = 0;
var velocity = 0;
var springM = 120;
var springF = 40;
var springS = 6;
var springImpulse = 0;




document.querySelector("#hover").onmouseover = (e) => {
    isOnVolume = true;
    // ui.classList = "show";
    hover.classList = "on";
    // if (!firstScroll) {
    //     document.querySelector("#instructions").style.opacity = 0;
    //     firstScroll = true;
    // }
}

document.querySelector("#hover").onmouseout = (e) => {
    clearTimeout(hideTimer);
    isOnVolume = false;
    ui.classList = "";
    hover.classList = "";
}


function hideUI() {
    clearTimeout(hideTimer);
    // isOnVolume = false;
    ui.classList = "";
    hover.classList = "on";
}





window.onresize = (e) => {
    // console.log(window.innerWidth, window.innerHeight)
    bg.style.left = window.innerWidth/2 - 1280 + "px";
    bg.style.bottom = window.innerHeight/2 - 950 + "px";
    // instructions.style.top = window.innerHeight/2 - 200 + "px";
}



window.onscroll = (e) => {
    
    if (isOnVolume == true) {
        var dx = window.scrollX - lastScrollX;
        var dy = window.scrollY - lastScrollY;

        if (lastScrollX != -1 && lastScrollY != -1) {
            clearTimeout(hideTimer);
            hideTimer = setTimeout(() => {
                hideUI();
            }, 900);
            // console.log(dx, dy);
            ui.classList = "show";
            hover.classList = "scroll";
            if (Math.abs(dx) > Math.abs(dy)) {
                volumePercent = clamp(volumePercent - dx / 10, 0, 100);
            } else {
                volumePercent = clamp(volumePercent + dy / 10, 0, 100);
            }
            

            if (volumePercent != 0 && volumePercent != 100) {
                stopElastic();
            } else if ((volumePercent == 100 || volumePercent == 0) && Math.max(Math.abs(dx), Math.abs(dy)) > 0) {
                if (Math.abs(dx) > Math.abs(dy)) {
                    addElasticImpulse(dx/800);
                } else {
                    addElasticImpulse(-dy/800);
                }
                
            }
            
            redrawUI();
        }
    }
    lastScrollX = window.scrollX;
    lastScrollY = window.scrollY;
}









function activateElastic() {
    elasticActive = true;
    elasticTimer = setTimeout(() => {
        elasticStep();
    }, 1000/60);
    elasticStep();
}


function stopElastic() {
    elasticActive = false;
    clearTimeout(elasticTimer);
    pos = 0;
}


function addElasticImpulse(fX) {
    // console.log(fX);
    if (Math.abs(fX) > 0.15) springImpulse += fX;
    if (!elasticActive) {
        activateElastic();
    }
}


function elasticStep() {
    // console.log("elastic step");
    if (!elasticActive) return; 
    var distance = pos - targetPos;
    var dampingForce = velocity * -springF;
    var springForce = distance * -springS;
    var totalForce = springForce + dampingForce;
    var acceleration = totalForce / springM + springImpulse;
    springImpulse = 0;
    velocity += acceleration;
    pos += velocity;

    
    checkElasticIdle();
    
    redrawUI();

    elasticTimer = setTimeout(() => {
        elasticStep();
    }, 1000/60);
}


function checkElasticIdle() {
    // console.log(Math.abs(pos - targetPos), Math.abs(velocity));
    if (Math.abs(pos - targetPos) < 0.1 && Math.abs(velocity) < 0.1) {
        stopElastic();
        pos = targetPos;
        redrawUI();
    }
}



function redrawUI() {
    var iconIndex = clamp(Math.ceil(volumePercent / 28), 0, 3);

    slider.style.width = sliderMin + (0.01 * volumePercent * (sliderMax - sliderMin)) + 'px';
    handle.style.left = handleMin + (0.01 * volumePercent * (handleMax - handleMin)) + 'px';
    sliderIcon.classList = "volume" + iconIndex;
    volumeIcon.classList = "volume" + iconIndex;

    // console.log(pos);
    // sliderIcon.style.left = 17 - pos + "px";
    hover.style.right = 159 + Math.floor(pos*1) + "px";
    // console.log(pos);
    volumeIcon.style.right = 167 + Math.floor(pos*1.6) + "px";
    // ui.style.right = 160 + pos + "px";

    handle.style.borderRadius = "11px";
    sliderIcon.style.left = "17px";
    // hover.style.right = "160px";
    // volumeIcon.style.right = "168px";

    // hover.style.right = 160 + pos + "px";
    // volumeIcon.style.right = 168 + pos + "px";
}



window.onresize();

redrawUI();

window.onload = (e) => {
    setTimeout(() => {
        window.scrollTo(document.body.clientWidth/2, document.body.clientHeight/2);
    }, 0.1);
    
}



function clamp (value, min, max) {
    return Math.min(Math.max(value, min), max);
}

