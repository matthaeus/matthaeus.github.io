
var isOnVolume = false;
var bg = document.querySelector("#background");
var lastScrollX = -1;
var lastScrollY = -1;

var volumePercent = 50;

var ui = document.querySelector("#ui");
var slider = document.querySelector("#slider");
var handle = document.querySelector("#sliderHandle");
var sliderIcon = document.querySelector("#sliderIcon");
var volumeIcon = document.querySelector("#volumeIcon");
var hover = document.querySelector("#hover");

// document.querySelector("#video").onmousemove = (e) => {

// }


document.querySelector("#hover").onmouseover = (e) => {
    isOnVolume = true;
    // ui.classList = "show";
    hover.classList = "on";
}

document.querySelector("#hover").onmouseout = (e) => {
    isOnVolume = false;
    ui.classList = "";
    hover.classList = "";
}



window.onresize = (e) => {
    // console.log(window.innerWidth, window.innerHeight)
    bg.style.left = window.innerWidth/2 - 1270 + "px";
    bg.style.bottom = window.innerHeight/2 - 950 + "px";

}


document.querySelector("#hover").onclick = (e) => {
    isOnVolume = true;
    ui.classList = "show";
    hover.classList = "scroll";
}


window.onresize();





function redrawVolumeSlider(dx, dy) {
    var handleMin = 15;
    var handleMax = 263;
    var sliderMin = handleMin + 5;
    var sliderMax = handleMax + 5;
    volumePercent = clamp(volumePercent, 0, 100);
    // console.log('volumepercent', volumePercent);
    slider.style.width = sliderMin + (0.01 * volumePercent * (sliderMax - sliderMin)) + 'px';
    handle.style.left = handleMin + (0.01 * volumePercent * (handleMax - handleMin)) + 'px';
    var iconIndex = clamp(Math.ceil(volumePercent / 28), 0, 3);
    sliderIcon.classList = "volume" + iconIndex;
    volumeIcon.classList = "volume" + iconIndex;

    if (volumePercent == 100 && Math.abs(dx) > 0) {
        var newRadius = clamp(11 - Math.abs(dx)/20, 0, 11);
        // sliderIcon.style.left = 17 - dx/30 + "px";
        hover.style.right = 160 + dx/30 + "px";
        volumeIcon.style.right = 168 + dx/25 + "px";
        // ui.style.right = 160 + dx/30 + "px";

    } else if (volumePercent == 0 && Math.abs(dx) > 0) {
        hover.style.right = 160 + dx/30 + "px";
        volumeIcon.style.right = 168 + dx/25 + "px";
        // ui.style.right = 160 + dx/30 + "px";
    } else {
        handle.style.borderRadius = "11px";
        sliderIcon.style.left = "17px";
        hover.style.right = "160px";
        volumeIcon.style.right = "168px";
    }

    // hover.style.right = 160 + dx/25 + "px";
    // volumeIcon.style.right = 168 + dx/30 + "px";
}



function clamp (value, min, max) {
    return Math.min(Math.max(value, min), max);
}





window.onscroll = (e) => {
    if (isOnVolume == true) {
        var dx = window.scrollX - lastScrollX;
        var dy = window.scrollY - lastScrollY;

        if (lastScrollX != -1 && lastScrollY != -1) {
            // console.log(dx, dy);
            ui.classList = "show";
            hover.classList = "scroll";
            volumePercent -= dx / 10;
            redrawVolumeSlider(dx, dy);
        }
    }
    lastScrollX = window.scrollX;
    lastScrollY = window.scrollY;
}




//  console.log("initial width", document.body.clientWidth);


window.onload = (e) => {
    setTimeout(() => {
        window.scrollTo(document.body.clientWidth/2, 0);
    }, 0.1);
    
}

// document.querySelector("#background").onmousemove = (e) => {
//     console.log("move on bg");
// }

redrawVolumeSlider();
// lastScrollX = window.scrollX;
// lastScrollY = window.scrollY;