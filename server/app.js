import express from 'express';
import { unless } from 'express-unless';
import logger from 'morgan';
import dotenv from 'dotenv';
import errorHandler from './errors.js';
import AuthRoute from './components/auth/authRoute.js';
import { authenticateToken } from './components/auth/authMiddleware.js';
import './config/db.js';

dotenv.config();

const app = express();

authenticateToken.unless = unless;
app.use(
  authenticateToken.unless({
    path: [
      { url: '/api/v1/auth/login', methods: ['POST'] },
      { url: '/api/v1/auth/register', methods: ['POST'] },
    ],
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', AuthRoute);
app.use(errorHandler);

export default app;
