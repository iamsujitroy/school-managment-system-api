const imageController = {};

imageController.uploadSingleImage = async (req, res) => {
    try {
      const image = `image/${req.file.filename}`;
      res.status(201).json({ success: true, message:"Image Uploaded successfully", imageUrl: image });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

module.exports = imageController;
