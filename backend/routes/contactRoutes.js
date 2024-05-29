import express from 'express';
import mongoose from 'mongoose';
import Contact from '../models/Contact.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Contact agent route
router.post('/contact-agent', authMiddleware, async (req, res) => {
  const { propertyId, agentId, date } = req.body;

  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res.status(400).json({ message: 'Invalid property ID' });
  }

  if (!propertyId || !agentId || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the date is already booked for the property
    const existingContact = await Contact.findOne({ propertyId, date });
    if (existingContact) {
      return res.status(400).json({ message: 'Date already booked' });
    }

    const newContact = new Contact({
      userId: req.user._id,
      propertyId,
      agentId,
      date,
    });

    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error booking contact:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;




