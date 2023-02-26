const Testimonial = require("../models/testimonial");

const testimonialController = {};

// Get all testimonials
testimonialController.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single testimonial by ID
testimonialController.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (testimonial) {
      res.status(200).json(testimonial);
    } else {
      res.status(404).json({ message: "Testimonial not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new testimonial
testimonialController.createTestimonial = async (req, res) => {
  try {
    const { name, designation, message, image } = req.body;
    const testimonial = new Testimonial({ name, designation, message, image}); // save the filename in the database
    await testimonial.save();
    
    res.status(201).json({ success: true, message:"Testimonial added successfully", data: testimonial });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing testimonial by ID
testimonialController.updateTestimonial = async (req, res) => {
  try {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        designation: req.body.designation,
        message: req.body.message,
        image: req.body.image,
      },
      { new: true }
    );

    if (updatedTestimonial) {
      res.status(200).json(updatedTestimonial);
    } else {
      res.status(404).json({ message: "Testimonial not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a testimonial by ID
testimonialController.deleteTestimonial = async (req, res) => {
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(
      req.params.id
    );
    if (deletedTestimonial) {
      res.status(200).json({ message: "Testimonial deleted" });
    } else {
      res.status(404).json({ message: "Testimonial not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = testimonialController;
