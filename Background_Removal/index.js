const img = document.getElementById('image');
img.style.height = "358px";
img.style.width = "636px";
console.log(img.width)

async function loadAndPredict() {
    const net = await bodyPix.load();
    const segmentation = await net.segmentPerson(img);
    console.log(segmentation);
    console.log(segmentation.data)
    const coloredPartImage = bodyPix.toMask(segmentation);
    console.log(coloredPartImage)
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.putImageData(coloredPartImage,0,0);

    // reshaped_arr = nj.array(segmentation.data).reshape(img.height,img.width)
    // console.log(reshaped_arr.shape)
    // console.log(reshaped_arr.filter(reshaped_arr => reshaped_arr === 2).length)
    // const coloredPartImage = bodyPix.toMask(segmentation);
    // const maskBackground = true;
    // // Convert the segmentation into a mask to darken the background.
    // const backgroundDarkeningMask = bodyPix.toMaskImageData(segmentation, maskBackground);

    // const opacity = 1;
    // // const flipHorizontal = false;
    // // const maskBlurAmount = 0;
    // const canvas = document.getElementById('canvas');
    // // // Draw the mask image on top of the original image onto a canvas.
    // // // The colored part image will be drawn semi-transparent, with an opacity of
    // // // 0.7, allowing for the original image to be visible under.
    // bodyPix.drawMask(canvas, img, backgroundDarkeningMask, opacity);
    }
   
loadAndPredict();