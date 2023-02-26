// Import required packages
const mongoose = require('mongoose');

// Define the schema for the Testimonial model
const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  image: {
    type: String,
  }
});

// Create the Testimonial model using the schema
const Testimonial = mongoose.model('Testimonial', testimonialSchema);

// Export the Testimonial model
module.exports = Testimonial;