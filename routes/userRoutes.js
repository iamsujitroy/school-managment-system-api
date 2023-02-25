const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', userController.registerUser);
// Login a new user
router.post('/login', userController.loginUser);
// Update Password
router.put('/update/password', userController.updateUserPassword);
// Login a new user
router.post('/logout', authMiddleware, userController.logoutUser);

module.exports = router;