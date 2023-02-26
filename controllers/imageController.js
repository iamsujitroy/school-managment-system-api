const fs = require('fs');
const sharp = require('sharp');

const imageController = {};

imageController.uploadSingleImage = async (req, res) => {
  async function saveImageFromBuffer(bufferData, fileName) {
    // Create a new file with the given file name in the 'uploads/image' directory
    const filePath = `uploads/image/${fileName}`;
    await fs.promises.writeFile(filePath, bufferData);
    }     

    try {
      const { buffer } = req.file;
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const filename = 'image-' + uniqueSuffix + '.' + req.file.originalname.split('.').pop();
      saveImageFromBuffer(buffer, filename)

      const blurhash = req.blurhash;
      res.status(201).json({ success: true, message:"Image Uploaded successfully", imageUrl: `image/${filename}`, blurhash});
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

module.exports = imageController;
