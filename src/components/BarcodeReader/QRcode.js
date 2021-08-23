import jsQR from "jsqr";

const qrcode = ({ onInit, onDetect }) => {
  var video = document.createElement("video");
  var canvasElement = document.getElementById("canvas");
  var canvas = canvasElement.getContext("2d");
  let offsetX = 0;
  let offsetY = 0;

  function drawLine(begin, end, color) {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
  }

  // Use facingMode: environment to attemt to get the front camera on phones
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
      video.srcObject = stream;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.play().then(() => {
        onInit(stream);

        if (video.videoHeight > video.videoWidth) {
          const aspectRatio = video.videoWidth / video.videoHeight;
          canvasElement.height = video.videoHeight * aspectRatio;
          canvasElement.width = 400;
          offsetY = (canvasElement.height - canvasElement.width) / 2;
        } else {
          const aspectRatio = video.videoHeight / video.videoWidth;
          canvasElement.height = 400;
          canvasElement.width = video.videoWidth * aspectRatio;
          offsetX = (canvasElement.width - canvasElement.height) / 2;
        }
      });
      requestAnimationFrame(tick);
    });

  function tick() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvasElement.hidden = false;

      canvas.drawImage(
        video,
        -offsetX,
        -offsetY,
        canvasElement.width,
        canvasElement.height
      );
      var imageData = canvas.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      if (code) {
        onDetect(code.data);

        drawLine(
          code.location.topLeftCorner,
          code.location.topRightCorner,
          "#FF3B58"
        );
        drawLine(
          code.location.topRightCorner,
          code.location.bottomRightCorner,
          "#FF3B58"
        );
        drawLine(
          code.location.bottomRightCorner,
          code.location.bottomLeftCorner,
          "#FF3B58"
        );
        drawLine(
          code.location.bottomLeftCorner,
          code.location.topLeftCorner,
          "#FF3B58"
        );
      }
    }
    requestAnimationFrame(tick);
  }
};
export default qrcode;
