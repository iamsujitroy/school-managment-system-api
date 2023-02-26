const multer = require('multer');

// Configure storage options
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/image');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
//   }
// });

const storage = multer.memoryStorage();

// Create multer middleware
const upload = multer({ storage });

// Create image upload middleware
const uploadMultipleImageMiddleware = (req, res, next) => {
  upload.array('images', 10)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'Error uploading images', error: err });
    }
    next();
  });
};

// Create single image upload middleware
const uploadSingleImageMiddleware = (req, res, next) => {
  upload.single('image')(req, res, err => {
    if (err) {
      return res.status(400).json({ message: 'Image upload failed', error: err });
    }
    next();
  });
};

module.exports = { uploadMultipleImageMiddleware, uploadSingleImageMiddleware };