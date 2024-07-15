/* eslint-disable @typescript-eslint/no-explicit-any */
import { validationResult } from 'express-validator';
import { Request, Response } from 'express';
import _ from 'underscore';
import { ValidationError } from './utils/apiError';

const execValidation = (req: Request, res: Response, next: any) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = _.uniq(result.array(), function (item: any) {
      return item.param + '_' + item.location;
    });
    const validationError = new ValidationError(errors);
    return res
      .status(validationError.statusCode)
      .json(validationError.toJson());
  }
  return next();
};

const validate = (validationChains: any) => {
  return [...validationChains, execValidation];
};

export default { validate };
