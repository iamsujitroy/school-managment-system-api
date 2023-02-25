const User = require("../models/user");
const dotenv = require('dotenv');
const authMiddleware = require('../middleware/authMiddleware');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


// Load environment variables
dotenv.config();
const secretKey = process.env.JWT_SECRET;


const userController = {};

// Register a new user
userController.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // Check whether the user already exists or not
    const user = await User.findOne({email})
    
    if (!user) {
    const user = new User({ name, email, password: hashPassword });
    await user.save();
    
    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '7d' });

    // Return the token as part of the response
    return res.status(200).json({ success: true, message: "Register successfully", token: token });
    }else{
    return res.status(201).json({ success:false, message: "user already exists! please try to login." });
    }
  } catch (err) {
    next(err);
  }
};

// Login user
userController.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await User.findOne({email})
    const isMatch = await bcrypt.compare(password, user.password);

    if(!user) res.status(401).json({ message: 'Invalid email or password' });
    if(!isMatch) res.status(401).json({ message: 'Invalid email or password' });
    if(user && isMatch){
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '7d' });
      // Return the token as part of the response
      res.status(200).json({ success: true, message: "login successfully" ,token: token });
    }
  } catch (err) {
    next(err);
  }
};

// Update password
userController.updateUserPassword = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find the user with the provided email id
    const user = await User.findOne({ email });

    // If the user is not found, return error
    if (!user) res.status(404).json({ message: "User not found" })

    // convert the password into hash password
    const hashPassword = await bcrypt.hash(password, saltRounds);
    
    // Update the user's password
    user.password = hashPassword;

    // Save the updated user object
    await user.save();

    // Return success message
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    // Handle any errors that might occur
    return next(err);
  }
};

// Logout user
userController.logoutUser = async (req, res, next) => {
  try {
    // Destroy user session
    req.session.destroy();

    // Clear JWT token cookie
    res.clearCookie('jwt');

    res.status(200).json({ message: 'User logged out successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = userController;
