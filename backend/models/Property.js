// backend/models/Property.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const PropertySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { collection: 'properties' });

const Property = model('Property', PropertySchema);
export default Property;
