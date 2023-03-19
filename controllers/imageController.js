const imageController = {};

imageController.uploadSingleImage = async (req, res) => {
  try {
    if (process.env.API_BASE_URL) {
      const image = `${process.env.API_BASE_URL}/image/${req.file.filename}`;
      res
        .status(201)
        .json({
          success: true,
          message: "Image Uploaded successfully",
          imageUrl: image,
        });
    } else {
      res
        .status(201)
        .json({
          success: false,
          message: "server error: API base URL not found",
        });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = imageController;
