import express from 'express';
import { register, login, userProfile } from './authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user-profile', userProfile);

export default router;
