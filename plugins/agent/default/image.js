const sharp = require('sharp');

/**
 * returns Promise<image buffer>
 * 
 * @param {image_buffer} buffer 
 */
function resizePreview(buffer)
{
  return new Promise((resolve, reject) => {
    try
    {
      const image = sharp(buffer);
      image.metadata((err, metadata) => {
        if(err)
        {
          throw err;
        }
  
        if(metadata.width > metadata.height)
        {
          resolve(
            image.resize({height: 283}).png().toBuffer()
          );
        }
        else
        {
          resolve(
            image.resize({width: 200}).png().toBuffer()
          );
        }
      })
    }
    catch(e)
    {
      reject(e);
    }
  })
}

module.exports = {
  resizePreview,
}