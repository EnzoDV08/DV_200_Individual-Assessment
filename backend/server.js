import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';
import userRoutes from './routes/userRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import contactRoutes from './routes/contactRoutes.js'; // Correct import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/properties', propertyRoutes);
app.use('/contact', contactRoutes); // Correct endpoint

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});















