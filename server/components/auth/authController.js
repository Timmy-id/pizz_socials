import bcrypt from 'bcrypt';
import { registerUser, loginUser } from './authService.js';

export const register = async (req, res, next) => {
  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);

  req.body.password = await bcrypt.hash(password, salt);

  registerUser(req.body, (error, result) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: 'Success',
      data: result,
    });
  });
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  loginUser({ username, password }, (error, result) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: 'Success',
      data: result,
    });
  });
};

export const userProfile = (req, res, next) => {
  return res.status(200).json({ message: 'Authorized User' });
};
