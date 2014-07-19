var video;
var stream;

navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

function successCallback(stream) {
  window.stream = stream; // stream available to console
  video.src = window.URL.createObjectURL(stream);
}

function errorCallback(error){
  console.log("navigator.getUserMedia error: ", error);
}

var hdConstraints  = {
  video: {
    mandatory: {
      minWidth: 1280,
      minHeight: 720
    }
  }
};

getMedia(hdConstraints)

function getMedia(constraints){
  video = document.querySelector("#video-bg");
  if (!!stream) {
    video.src = null;
    stream.stop();
  }
  navigator.getUserMedia(constraints, successCallback, errorCallback);
}

