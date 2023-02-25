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
  testimonial: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

// Create the Testimonial model using the schema
const Testimonial = mongoose.model('Testimonial', testimonialSchema);

// Export the Testimonial model
module.exports = Testimonial;