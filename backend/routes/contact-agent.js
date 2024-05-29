import express from 'express';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/contact-agent', authMiddleware, async (req, res) => {
  const { propertyId, agentId, date } = req.body;
  const userId = req.user.userId;

  if (!userId || !propertyId || !agentId || !date) {
    console.error('Missing required fields:', { userId, propertyId, agentId, date });
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    console.log('Creating new contact with:', { userId, propertyId, agentId, date });

    const contact = new Contact({
      userId,
      propertyId,
      agentId,
      date,
    });

    await contact.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: agentId,
      subject: 'New Property Contact Request',
      text: `You have a new contact request for property ID: ${propertyId} on ${date}.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Contact request submitted successfully' });
  } catch (error) {
    console.error('Error during contact agent process:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

















