const { Jimp } = require('jimp');

async function dither(input, output) {
  console.log('Loading image...');
  let img;
  try {
      img = await Jimp.read(input);
  } catch(e) {
      // Fallback if Jimp 0.x is used
      const j = require('jimp');
      img = await j.read(input);
  }
  
  img.greyscale();
  
  const w = img.bitmap.width;
  const h = img.bitmap.height;
  const data = img.bitmap.data;
  
  console.log(`Processing image: ${w}x${h}`);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (w * y + x) << 2;
      const oldPixel = data[idx]; // Grayscale value
      const alpha = data[idx + 3];
      
      if (alpha < 50) continue;
      
      const newPixel = oldPixel < 135 ? 0 : 255;
      const err = oldPixel - newPixel;
      
      data[idx] = newPixel;
      data[idx+1] = newPixel;
      data[idx+2] = newPixel;
      
      const applyError = (ex, ey, fraction) => {
        if (ex >= 0 && ex < w && ey >= 0 && ey < h) {
          const eidx = (w * ey + ex) << 2;
          const ealpha = data[eidx + 3];
          if (ealpha >= 50) {
            let val = data[eidx] + err * fraction;
            if (val < 0) val = 0;
            if (val > 255) val = 255;
            data[eidx] = val;
            data[eidx+1] = val;
            data[eidx+2] = val;
          }
        }
      };
      
      applyError(x + 1, y,     7 / 16);
      applyError(x - 1, y + 1, 3 / 16);
      applyError(x,     y + 1, 5 / 16);
      applyError(x + 1, y + 1, 1 / 16);
    }
  }
  
  for (let i = 0; i < data.length; i += 4) {
      if (data[i] === 255 && data[i+1] === 255 && data[i+2] === 255) {
          data[i+3] = 0;
      }
  }

  console.log('Writing output image...');
  await img.write(output);
  console.log('Done!');
}

dither('public/images/figma/hero-hand.png', 'public/images/figma/hero-hand-dithered.png').catch(console.error);
