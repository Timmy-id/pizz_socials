import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';

dotenv.config();

const app = express();

const MONGO_URI = process.env.MONGO_URL;

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/users', UserRoute);
app.use('/api/v1/posts', PostRoute);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Database connected'))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((error) => console.log({ error: error }));
