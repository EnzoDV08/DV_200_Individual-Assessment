// backend/routes/propertyRoutes.js
import express from 'express';
import Property from '../models/Property.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { title, description, price, location, imageUrl, createdBy } = req.body;
  try {
    const newProperty = new Property({ title, description, price, location, imageUrl, createdBy });
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
