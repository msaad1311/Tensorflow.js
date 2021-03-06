let bgs = document.getElementById('image');
const img = document.getElementById('image');
let effect_blur = document.getElementById('blurrer');
let effect_gray = document.getElementById('grayer');
let blurEffect=false;
let grayEffect=false;

async function loadAndPredict() {
    const net = await bodyPix.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        quantBytes: 4
      });
    const segmentation = await net.segmentPerson(img, {
        flipHorizontal: false,
        internalResolution: 'full',
        segmentationThreshold: 0.8
    });
    const foregroundColor = { r: 0, g: 0, b: 0, a: 255 };
    const backgroundColor = { r: 0, g: 0, b: 0, a: 0 };
    const backgroundDarkeningMask = bodyPix.toMask(segmentation, foregroundColor, backgroundColor, false);
    
    if (!(blurEffect && grayEffect)){
      frameMerger(backgroundDarkeningMask,blurEffect,grayEffect);
    }
    effect_blur.addEventListener('change', function () {
      if (effect_blur.checked) {
        blurEffect=true;
        frameMerger(backgroundDarkeningMask,blurEffect,grayEffect);
      } else {
        blurEffect=false;
        frameMerger(backgroundDarkeningMask,blurEffect,grayEffect);
      }
    })

    effect_gray.addEventListener('change', function () {
      if (effect_gray.checked) {
        grayEffect=true;
        frameMerger(backgroundDarkeningMask,blurEffect,grayEffect);
      } else {
        grayEffect=false;
        frameMerger(backgroundDarkeningMask,blurEffect,grayEffect);
      }
    })
    backImages=document.getElementsByClassName("backgrounds")
    for (backgroundImages of backImages){
      backgroundImages.addEventListener('click',function(){
      bgs = document.getElementById(this.id);
      bgs.style.opacity="1";
      frameMerger(backgroundDarkeningMask,blurEffect,grayEffect)
      })
    }
    
    }
function frameMerger(background_rm,blurr,grayy){
  if (!background_rm){
    return
  }
  // console.log(bgs);
  const canvas = document.getElementById('canvas');
  
  canvas.width = img.width;
  canvas.height = img.height;
  let ctx = canvas.getContext('2d');
  
  ctx.globalCompositeOperation='destination-over';
  ctx.putImageData(background_rm, 0, 0);
  ctx.globalCompositeOperation = 'source-in';
  // // ctx.putImageData(img, 0, 0);
  ctx.drawImage(img, 0, 0, img.width, img.height);
  ctx.globalCompositeOperation = 'destination-atop';
  if (blurr){
    ctx.filter='blur(3px)';
  }
  if (grayy){
    ctx.filter='grayscale(1)';
  }
  if (blurr && grayy){
    ctx.filter='blur(3px) grayscale(1)';
  }
  ctx.drawImage(bgs, 0, 0,img.width,img.height);
  
  }

   
loadAndPredict();
