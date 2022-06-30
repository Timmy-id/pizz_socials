import { User } from '../user/userModel.js';
import bcrypt from 'bcrypt';
import { generateAccessToken } from './authMiddleware.js';

export const registerUser = async (params, callback) => {
  if (params.username === undefined) {
    return callback({ message: 'Username is required' });
  }
  if (params.password === undefined) {
    return callback({ message: 'Password is required' });
  }
  if (params.firstname === undefined) {
    return callback({ message: 'First name is required' });
  }
  if (params.lastname === undefined) {
    return callback({ message: 'Last name is required' });
  }

  const existingUser = await User.findOne({
    username: params.username,
  });

  if (existingUser) {
    return callback({
      message: 'User already exists',
    });
  }

  const user = new User(params);

  user
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
};

export const loginUser = async ({ username, password }, callback) => {
  const user = await User.findOne({ username });

  if (user != null) {
    if (await bcrypt.compare(password, user.password)) {
      const token = generateAccessToken(username);

      return callback(null, { ...user.toJSON(), token });
    } else {
      return callback({
        message: 'Invalid username or password',
      });
    }
  } else {
    return callback({
      message: 'Invalid username or password',
    });
  }
};
