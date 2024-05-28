// models/Contact.js
import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  propertyId: {
    type: String,
    required: true,
  },
  agentId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;



