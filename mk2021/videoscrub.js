

document.querySelector("#video").onmousemove = (e) => {
    // console.log(e);

    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element.
    var xNormalized = x / rect.width;
    var yNormalized = y / rect.height;

    // e.srcElement.style.display = "none";

    var lengthInSeconds = e.srcElement.duration;

    e.srcElement.currentTime = xNormalized * lengthInSeconds;

    console.log(xNormalized * lengthInSeconds);

    // console.log(e.srcElement.duration);

    // console.log("Left? : " + xNormalized + " ; Top? : " + yNormalized + ".");
}


document.querySelector("#video").onmouseover = (e) => {
    e.srcElement.pause();
}

document.querySelector("#video").onmouseout = (e) => {
    e.srcElement.play();
}

