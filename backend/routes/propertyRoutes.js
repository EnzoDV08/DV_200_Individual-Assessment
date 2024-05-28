import express from 'express';
import Property from '../models/Property.js';
import axios from 'axios'; // Added import for axios

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

// New route to get property details from Zillow API
router.get('/zillow/:zpid', async (req, res) => {
  const { zpid } = req.params;
  const options = {
    method: 'GET',
    url: 'https://zillow-com1.p.rapidapi.com/property',
    params: { zpid: zpid },
    headers: {
      'x-rapidapi-key': 'a6e7df9308msh4e56b7f7325928cp1c7c78jsnc83765063508',
      'x-rapidapi-host': 'zillow-com1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

