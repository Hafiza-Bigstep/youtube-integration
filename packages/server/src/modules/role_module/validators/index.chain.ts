import { body, param } from 'express-validator';

export const postCreate = [
  body('name', 'Must be a valid string').isString().trim().notEmpty(),
  body('description', 'Must be a valid string').isString().trim().notEmpty(),
];

export const idParamValidation = [
  param('id', 'Id must be a valid mongo id').isMongoId(),
];

export const postPermissionCreate = [
  body('name', 'Must be a valid string').isString().trim().notEmpty(),
  body('description', 'Must be a valid string').isString().trim().notEmpty(),
];
