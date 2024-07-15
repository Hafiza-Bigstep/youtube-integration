import { body } from 'express-validator';

const register = [
  body('firstname').isString(),
  body('lastname').isString(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
];

const login = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
];

export const authValidator = {
  register,
  login,
};
