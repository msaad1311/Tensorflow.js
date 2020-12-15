async function loadAndPredict() {
    const img = document.getElementById('image');
    const net = await bodyPix.load();
    // const segmentation = await net.segmentPerson(img)

    const {data:segmentation} = await net.segmentPerson(img);
    // const { data:imgData } = ctx.getImageData(0, 0, img.width, img.height);

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    const newImg = ctx.createImageData(img.width, img.height);
    const newImgData = newImg.data;
    
    for(let i=0; i<segmentation.length; i++) {
        const [r, g, b, a] = [img[i*4], img[i*4+1], img[i*4+2], img[i*4+3]];
        const gray = ((0.3 * r) + (0.59 * g) + (0.11 * b));
    [
        newImgData[i*4],
        newImgData[i*4+1],
        newImgData[i*4+2],
        newImgData[i*4+3]
    ] = !segmentation[i] ? [gray, gray, gray, 255] : [r, g, b, a];
  }

  ctx.putImageData(newImg, 0, 0);



    // const mask = bodyPix.toMask(segmentation);
    // mask.width = img.width;
    // mask.height = img.height;
    // const canvas = document.getElementById('canvas');
    // canvas.width = img.width;
    // canvas.height = img.height;
    // // console.log(canvas.width)
    // // console.log(img.width)
    // const ctx = canvas.getContext('2d');
    // ctx.putImageData(mask,0,0);
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