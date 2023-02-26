const sharp = require('sharp');
const blurhash = require('blurhash');

const blurhashMiddleware = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }
    const { buffer } = req.file;
    const {data, info} = await sharp(buffer).ensureAlpha().raw().toBuffer({resolveWithObject:true});
    const encoded = await blurhash.encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4)
    req.blurhash = encoded;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = blurhashMiddleware;