import { body, param } from 'express-validator';

const userValidation = [
  body('user.firstname', 'First name is required & must be a valid string')
    .isString()
    .trim()
    .notEmpty(),
  body('user.lastname', 'Last name is required & must be a valid string')
    .isString()
    .trim()
    .notEmpty(),
  body('user.username', 'Username is required & must be a valid string')
    .isString()
    .trim()
    .notEmpty(),
  body(
    'user.password',
    'Password is required & must be at least 6 characters long'
  )
    .isString()
    .trim()
    .isLength({ min: 6 }),
  body('user.email', 'Email must be a valid email address')
    .isEmail()
    .normalizeEmail(),
];

const profileValidation = [
  body('profile.bio', 'Bio must be a valid string').isString().trim(),
];

const idParamValidation = [
  param('id', 'Id must be a valid mongo id').isMongoId(),
];

const postUser = [...userValidation, ...profileValidation];

export { postUser, idParamValidation };
