import express from 'express';
import {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser
} from '../Controllers/UserController.js';

const router = express.Router();

router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
router.patch('/:id/follow', followUser);
router.patch('/:id/unfollow', unfollowUser);

export default router;
