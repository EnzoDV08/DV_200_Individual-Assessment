// models/Contact.js
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  agentId: { type: String, required: true },
  date: { type: Date, required: true },
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;

















