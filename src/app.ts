import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';
import { errorHandler } from './middlewares/errorMiddleware';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.use(errorHandler); 

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('Error connecting to MongoDB: ', error));

app.listen(3000, () => {
  console.log('Server is running on port 5000');
});
