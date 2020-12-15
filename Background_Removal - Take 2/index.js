/**
 * Loads an image into canvas.
 * Ideally, this function should return Promises to better
 * handle callbacks but for simplicity sake it's eliminated.
 */
function loadImage(src) {
    const img = new Image();
    img.crossOrigin = '';
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    console.log('into the ecent')
    // Load the image on canvas
    img.addEventListener('load', function(){
      // Set canvas width, height same as image
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      pop();
    });
    
    img.src = src;
    console.log(src)
  }
  
  
  /**
   * Applies color pop an image
   */
  async function pop() {
    console.log('enter the pop')
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    
    // Loading the model
    const net = await bodyPix.load({
      architecture: 'MobileNetV1',
      outputStride: 16,
      multiplier: 0.75,
      quantBytes: 2
    });
    
    // Segmentation
    const { data:map } = await net.segmentPerson(canvas, {
      internalResolution: 'low',
    });
    
    
    // Extracting image data
    const { data:imgData } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Creating new image data
    const newImg = ctx.createImageData(canvas.width, canvas.height);
    const newImgData = newImg.data;
    
    for(let i=0; i<map.length; i++) {
      const [r, g, b, a] = [imgData[i*4], imgData[i*4+1], imgData[i*4+2], imgData[i*4+3]];
  
      const gray = ((0.3 * r) + (0.59 * g) + (0.11 * b));
      [
        newImgData[i*4],
        newImgData[i*4+1],
        newImgData[i*4+2],
        newImgData[i*4+3]
      ] = !map[i] ? [gray, gray, gray, 255] : [r, g, b, a];
    }
    
    
    // Draw the new image back to canvas
    ctx.putImageData(newImg, 0, 0);
    
  }
  
loadImage('./images/human.jpg');