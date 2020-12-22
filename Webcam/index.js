const imgs = document.getElementById("webcam");
const canvas = document.getElementById("canvas");
canvas.width = imgs.width;
canvas.height = imgs.height;
const draw = canvas.getContext("2d");
// const webcam = new Webcam(img, 'user', canvasElement);
let bgs = document.getElementById("webcam");
let effect_blur = document.getElementById("blurrer");
let effect_gray = document.getElementById("grayer");
let blurEffect = false;
let grayEffect = false;

video = document.getElementById("webcam");
if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
    video.srcObject = stream;
  });
}

main();

function main() {
  if (video.readyState == 4) {
    console.log("video is ready for processing");
    body_segment();
  } else {
    console.log("nope it is not ready yet");
    setTimeout(main, 1000 / 30);
  }
}

async function body_segment() {
  const frame = document.getElementById("webcam");

  // load HTML canvas
  const canvas = document.getElementById("canvas");
  canvas.width = frame.width;
  canvas, (height = frame.height);
  const draw = canvas.getContext("2d");
  // draw.globalAlpha = 0.3;
  console.log(frame.width);
  // load body segmentation model
  const model = await bodyPix.load({
    architecture: "ResNet50",
    outputStride: 16,
    multiplier: 1,
    quantBytes: 4,
  });

  while (1) {
    // draw frame on canvas
    // draw.drawImage(frame, 0, 0);

    // extract person from frame
    const result = await model.segmentPerson(frame, {
      flipHorizontal: false,
      internalResolution: "medium",
      segmentationThreshold: 0.75,
    });
    const foregroundColor = { r: 0, g: 0, b: 0, a: 255 };
    const backgroundColor = { r: 0, g: 0, b: 0, a: 0 };
    const backgroundDarkeningMask = bodyPix.toMask(
      result,
      foregroundColor,
      backgroundColor,
      false
    );
    backImages = document.getElementsByClassName("backgrounds");
    for (backgroundImages of backImages) {
      backgroundImages.addEventListener("click", function () {
        bgs = document.getElementById(this.id);
        bgs.style.opacity = "1";
        // frameMerger(backgroundDarkeningMask,blurEffect,grayEffect,frame)
      });
    }

    effect_blur.addEventListener("change", function () {
      if (effect_blur.checked) {
        blurEffect = true;
        // bgs.style.filter = "blur(3px)";
      } else {
        blurEffect = false;
      }
    });
    // frameMerger(backgroundDarkeningMask,false,false,frame)
    // console.log(result.width)
    // console.log(backgroundDarkeningMask)
    // draw.putImageData(backgroundDarkeningMask,0,0);

    // loop to process the next frame
    // console.log('next frame')
    draw.globalCompositeOperation = "destination-over";
    draw.putImageData(backgroundDarkeningMask, 0, 0);
    draw.globalCompositeOperation = "source-in";
    draw.drawImage(frame, 0, 0, frame.width, frame.height);
    draw.globalCompositeOperation = "destination-over";
    if (blurEffect) {
        // bgs.style.filter = 'blur(3px)';
      draw.filter = "blur(3px)";
    }
    // if (grayEffect) {
    //   draw.filter = "grayscale(1)";
    // }
    // if (blurEffect && grayEffect) {
    //   draw.filter = "blur(3px) grayscale(1)";
    // }
    draw.drawImage(bgs, 0, 0, frame.width, frame.height);
    await tf.nextFrame();
  }
}

// async function loadAndPredict() {
//     // draw.globalAlpha = 1;
//     draw.drawImage(img,0,0,img.width,img.height);

//     const net = await bodyPix.load({
//         architecture: 'MobileNetV1',
//         outputStride: 16,
//         multiplier: 0.75,
//         quantBytes: 2
//       });
//       console.log('model loaded')
//       console.log(img.height)
//     const segmentation = await net.segmentPerson(img, {
//         flipHorizontal: true,
//         internalResolution: 'medium',
//         segmentationThreshold: 0.75
//     });
//     console.log('segmentation loaded')
//     const foregroundColor = { r: 0, g: 0, b: 0, a: 255 };
//     const backgroundColor = { r: 0, g: 0, b: 0, a: 0 };
//     const backgroundDarkeningMask = bodyPix.toMask(segmentation, foregroundColor, backgroundColor, false);
//     console.log(backgroundDarkeningMask)
//     // draw.putImageData(backgroundDarkeningMask,0,0);

//     if (!(blurEffect && grayEffect)){
//       frameMerger(backgroundDarkeningMask,blurEffect,grayEffect);
//     }
//     effect_blur.addEventListener('change', function () {
//       if (effect_blur.checked) {
//         blurEffect=true;
//         frameMerger(backgroundDarkeningMask,blurEffect,grayEffect);
//       } else {
//         blurEffect=false;
//         frameMerger(backgroundDarkeningMask,blurEffect,grayEffect);
//       }
//     })

//     effect_gray.addEventListener('change', function () {
//       if (effect_gray.checked) {
//         grayEffect=true;
//         frameMerger(backgroundDarkeningMask,blurEffect,grayEffect);
//       } else {
//         grayEffect=false;
//         frameMerger(backgroundDarkeningMask,blurEffect,grayEffect);
//       }
//     })
//     backImages=document.getElementsByClassName("backgrounds")
//     for (backgroundImages of backImages){
//       backgroundImages.addEventListener('click',function(){
//       bgs = document.getElementById(this.id);
//       bgs.style.opacity="1";
//       frameMerger(backgroundDarkeningMask,blurEffect,grayEffect)
//       })
//     }

//     }
function frameMerger(background_rm, blurr, grayy, img) {
  if (!background_rm) {
    return;
  }
  // console.log(bgs);
  //   canvas = document.getElementById('canvas');

  //   canvas.width = img.width;
  //   canvas.height = img.height;
  let draw = canvas.getContext("2d");

  draw.globalCompositeOperation = "destination-over";
  draw.putImageData(background_rm, 0, 0);
  draw.globalCompositeOperation = "source-in";
  //   // // ctx.putImageData(img, 0, 0);
  draw.drawImage(img, 0, 0, img.width, img.height);
  draw.globalCompositeOperation = "destination-atop";
  //   if (blurr){
  //     draw.filter='blur(3px)';
  //   }
  //   if (grayy){
  //     draw.filter='grayscale(1)';
  //   }
  //   if (blurr && grayy){
  //     draw.filter='blur(3px) grayscale(1)';
  //   }
  draw.drawImage(bgs, 0, 0, img.width, img.height);
}
