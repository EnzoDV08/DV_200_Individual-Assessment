import express from 'express';
import Contact from '../models/Contact.js';
import Property from '../models/Property.js';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Contact agent route
router.post('/contact-agent', authMiddleware, async (req, res) => {
  const { propertyId, date } = req.body;
  try {
    // Check if the date is already booked for the property
    const existingContact = await Contact.findOne({ property: propertyId, date });
    if (existingContact) {
      return res.status(400).json({ message: 'Date already booked' });
    }

    const newContact = new Contact({
      user: req.user.userId,
      property: propertyId,
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
