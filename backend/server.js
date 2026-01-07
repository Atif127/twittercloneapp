import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';
import connectMongodb from './db/connectMongodb.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //parsing req.body middleware
app.use(express.urlencoded({ extended: true })); //parsing urlencoded data

app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongodb();
});