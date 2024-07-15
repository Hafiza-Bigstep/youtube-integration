import { body, param } from 'express-validator';

const postCreate = [];

const idParamValidation = [
  param('id', 'Id must be a valid mongo id').isMongoId(),
];

export { postCreate, idParamValidation };
