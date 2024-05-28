import express from 'express';
import Contact from '../models/Contact.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/contact-agent', auth, async (req, res) => {
  const { propertyId, agentId, date } = req.body;

  try {
    const newContact = new Contact({ propertyId, agentId, date, userId: req.user.id });
    await newContact.save();
    res.status(201).send('Contact request saved');
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;









