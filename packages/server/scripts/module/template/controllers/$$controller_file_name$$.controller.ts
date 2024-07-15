import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPatch,
  httpPost,
  httpDelete,
  requestParam,
  BaseHttpController,
} from 'inversify-express-utils';

import { $$service_class_name$$ } from '../services/$$service_file_name$$.service';
import { $$policy_class_name$$ } from '../policies/$$policy_file_name$$.policy';
import { TYPES } from '../types';
import { LogTypes, LoggerFactory } from 'logger';
import { ValidationMiddleware } from '../../../shared/middlewares/validator.middleware';
import { idParamValidation, postCreate } from '../validators/index.chain';

@controller('/$$controller_route_name$$')
export class $$controller_class_name$$ extends BaseHttpController {
  private $$service_var_name$$: $$service_class_name$$;
  private $$policy_var_name$$: $$policy_class_name$$;
  private logger;

  constructor(
    @inject(TYPES.$$service_class_name$$)
    $$service_var_name$$: $$service_class_name$$,
    @inject(TYPES.$$policy_class_name$$)
    $$policy_var_name$$: $$policy_class_name$$,
    @inject(LogTypes.LoggerFactory) loggerFactory: LoggerFactory
  ) {
    super();
    this.$$service_var_name$$ = $$service_var_name$$;
    this.$$policy_var_name$$ = $$policy_var_name$$;
    this.logger = loggerFactory.createLogger('$$controller_class_name$$');
  }

  @httpPost('/', ValidationMiddleware.validate(postCreate))
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = this.$$policy_var_name$$.createDto(req);
      const result = await this.$$service_var_name$$.create(dto);
      return this.json(result, 200);
    } catch (error) {
      next(error);
    }
  }

  @httpPatch('/:id', ValidationMiddleware.validate(idParamValidation))
  public async update(
    @requestParam('id') id: string,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const dto = this.$$policy_var_name$$.updateDto(req);
      const result = await this.$$service_var_name$$.update(id, dto);

      return this.json(result, 200);
    } catch (error) {
      next(error);
    }
  }

  @httpGet('/:id', ValidationMiddleware.validate(idParamValidation))
  public async getById(
    @requestParam('id') id: string,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.$$service_var_name$$.findById(id);

      return this.json(result, 200);
    } catch (error) {
      next(error);
    }
  }

  @httpDelete('/:id', ValidationMiddleware.validate(idParamValidation))
  public async delete(
    @requestParam('id') id: string,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.$$service_var_name$$.delete(id);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
