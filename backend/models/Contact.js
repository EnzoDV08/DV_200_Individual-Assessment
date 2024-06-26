import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  propertyId: { type: String, required: true }, 
  agentId: { type: String, required: true },
  date: { type: Date, required: true },
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;



















