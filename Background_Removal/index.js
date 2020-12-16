const img = document.getElementById('image');
const bgs = document.getElementById('image_back');
var effect = true;

if (effect){
  bgs.style.filter = 'grayscale(1)';
}


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
    frameMerger(backgroundDarkeningMask)
    }
async function frameMerger(background_rm){
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
  ctx.filter = 'blur(3px)';
  ctx.drawImage(bgs, 0, 0,bgs.width,bgs.height);
  
  }

   
loadAndPredict();