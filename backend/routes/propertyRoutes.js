import express from 'express';
import Property from '../models/Property.js';
import authMiddleware from '../middleware/auth.js';

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
router.post('/', authMiddleware, async (req, res) => {
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
    const property = await Property.findById(req.params.id).populate('createdBy', 'username email');
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get properties by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const properties = await Property.find({ createdBy: req.params.userId });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a property by ID
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property.createdBy.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'Not authorized to delete this property' });
    }
    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;








