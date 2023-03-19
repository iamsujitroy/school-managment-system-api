const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const testimonialRoutes = require('./routes/testimonialRoutes');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');

// Initialize express app
const app = express();

// make uploads folder public
app.use(express.static('uploads'));


// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Load environment variables
dotenv.config();

// Set strictQuery to false to address the deprecation warning
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected Successfully!!");    
}).catch(err => {
    console.error('Could not connect to the database', err);
    process.exit();
});


// All routes
app.use('/testimonials', testimonialRoutes);
app.use('/user', userRoutes);
app.use('/upload', imageRoutes);



// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
