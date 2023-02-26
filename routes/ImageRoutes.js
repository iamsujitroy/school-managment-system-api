const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const {uploadSingleImageMiddleware} = require('../middleware/imageUploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/single-image', authMiddleware, uploadSingleImageMiddleware, imageController.uploadSingleImage);

module.exports = router;