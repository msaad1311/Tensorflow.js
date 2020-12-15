async function loadAndPredict() {
    const img = document.getElementById('image');
    const net = await bodyPix.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        quantBytes: 2
      });
    const segmentation = await net.segmentPerson(img)


    const mask = bodyPix.toMask(segmentation);
    mask.width = img.width;
    mask.height = img.height;
    const canvas = document.getElementById('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    // // console.log(canvas.width)
    // // console.log(img.width)
    const ctx = canvas.getContext('2d');
    ctx.putImageData(mask,0,0);
    // // ctx.drawImage(mask,0,0,636,358);

    // const opacity = 1;
    // const flipHorizontal = false;
    // const maskBlurAmount = 0;
    // // const canvas = document.getElementById('canvas');
    // // // Draw the mask image on top of the original image onto a canvas.
    // // // The colored part image will be drawn semi-transparent, with an opacity of
    // // // 0.7, allowing for the original image to be visible under.
    // bodyPix.drawMask(canvas, img, mask, opacity,maskBlurAmount,flipHorizontal);
    }
   
loadAndPredict();