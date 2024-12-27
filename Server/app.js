import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from "cors";
import userRoute from './routes/user.js';
import frontpageRoute from './routes/frontpage.js';



const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieParser());
// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: true,
// }));

const corsOptions = {
  origin: [
    'https://progress-report-chi.vercel.app', 
    'http://localhost:5173'  // Keep local development URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// const corsOptions = {
//   origin: 'http://localhost:5173', 
//   credentials: true,
// };
app.use(cors(corsOptions));



const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1); 
  }   
};

app.use("/api/user", userRoute);
app.use("/api/frontpage", frontpageRoute);

connectToDatabase().then(() => {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})