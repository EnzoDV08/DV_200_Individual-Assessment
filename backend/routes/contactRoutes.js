// routes/contactRoutes.js
import express from 'express';
import Contact from '../models/Contact.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/contact-agent', authMiddleware, async (req, res) => {
  const { propertyId, agentId, date } = req.body;

  // Log incoming request
  console.log('Incoming request:', req.body);

  // Check if all fields are provided
  if (!propertyId || !agentId || !date) {
    console.log('Missing required fields');
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Skip ObjectId validation since propertyId is a string
  // if (!mongoose.Types.ObjectId.isValid(propertyId)) {
  //   console.log('Invalid property ID:', propertyId);
  //   return res.status(400).json({ message: 'Invalid property ID' });
  // }

  try {
    // Check if the date is already booked for the property
    const existingContact = await Contact.findOne({ propertyId, date });
    if (existingContact) {
      console.log('Date already booked for property:', propertyId, 'on date:', date);
      return res.status(400).json({ message: 'Date already booked' });
    }

    // Create a new contact
    const newContact = new Contact({
      userId: req.user.userId,
      propertyId,
      agentId,
      date,
    });

    await newContact.save();
    console.log('New contact created:', newContact);
    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error booking contact:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;






