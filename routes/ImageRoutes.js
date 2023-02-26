const express = require('express');

const router = express.Router();
const imageController = require('../controllers/imageController');
const {uploadSingleImageMiddleware} = require('../middleware/imageUploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const blurhashMiddleware = require('../middleware/blurhashMiddleware');


router.post('/single-image', authMiddleware, uploadSingleImageMiddleware, blurhashMiddleware, imageController.uploadSingleImage);

module.exports = router;