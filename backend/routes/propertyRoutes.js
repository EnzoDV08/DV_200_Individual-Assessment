import express from 'express';
import Property from '../models/Property.js';
import axios from 'axios';

const router = express.Router();

// Get all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new property
router.post('/', async (req, res) => {
  const { title, description, price, location, imageUrl, createdBy } = req.body;
  console.log('Request to add property:', req.body); // Log request body
  try {
    const newProperty = new Property({ title, description, price, location, imageUrl, createdBy });
    const savedProperty = await newProperty.save();
    console.log('Property saved:', savedProperty); // Log saved property
    res.status(201).json(savedProperty);
  } catch (err) {
    console.error('Error saving property:', err); // Log error
    res.status(500).json({ message: err.message });
  }
});

// Get property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get properties by user ID
router.get('/user/:userId', async (req, res) => {
  console.log('Fetching properties for user:', req.params.userId); // Log user ID
  try {
    const properties = await Property.find({ createdBy: req.params.userId });
    console.log('Properties found:', properties); // Log found properties
    res.json(properties);
  } catch (err) {
    console.error('Error fetching properties:', err); // Log error
    res.status(500).json({ message: err.message });
  }
});

// Delete a property by ID
router.delete('/:id', async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;






