import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import _ from 'underscore';
import { ValidationError } from 'errors';

class ValidationMiddleware {
  static validate(validationChains: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      for (const validation of validationChains) {
        await validation.run(req);
      }

      const result = validationResult(req);
      if (result.isEmpty()) {
        return next();
      }

      const errors = Object.entries(result.mapped()).map(([_, value]) => value);
      const validationError = new ValidationError(errors);

      next(validationError);
    };
  }
}

export { ValidationMiddleware };
