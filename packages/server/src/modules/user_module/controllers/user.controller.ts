import { NextFunction, Request, Response } from 'express';
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

import { UserService } from '../services/user.service';
import { UserPolicy } from '../policies/user.policy';
import { TYPES } from '../types';
import { LogTypes, LoggerFactory } from 'logger';
import { ValidationMiddleware } from '../../../shared/middlewares/validator.middleware';
import { idParamValidation, postUser } from '../validators/index.chain';
import {
  ApiOperationDelete,
  ApiOperationGet,
  ApiOperationPatch,
  ApiOperationPost,
  ApiPath,
} from 'swagger-express-ts';
import openAPI from './user.openapi';

@ApiPath({
  path: '/users',
  name: 'User',
  security: { basicAuth: [] },
})
@controller('/users')
export class UserController extends BaseHttpController {
  private userService: UserService;
  private userPolicy: UserPolicy;
  private logger;

  constructor(
    @inject(TYPES.UserService) userService: UserService,
    @inject(TYPES.UserPolicy) userPolicy: UserPolicy,
    @inject(LogTypes.LoggerFactory) loggerFactory: LoggerFactory
  ) {
    super();
    this.userService = userService;
    this.userPolicy = userPolicy;
    this.logger = loggerFactory.createLogger('UserController');
  }

  @ApiOperationPost(openAPI.create)
  @httpPost('/', ValidationMiddleware.validate(postUser))
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = this.userPolicy.createDto(req);
      const result = await this.userService.create(dto);
      return this.json(result, 200);
    } catch (err) {
      next(err);
    }
  }

  @ApiOperationPatch(openAPI.update)
  @httpPatch('/:id', ValidationMiddleware.validate(idParamValidation))
  public async update(
    @requestParam('id') id: string,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const dto = this.userPolicy.updateDto(req);
      const result = await this.userService.update(id, dto);

      return this.json(result, 200);
    } catch (err) {
      next(err);
    }
  }

  @ApiOperationGet(openAPI.getById)
  @httpGet('/:id', ValidationMiddleware.validate(idParamValidation))
  public async getById(
    @requestParam('id') id: string,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.userService.findById(id);

      return this.json(result, 200);
    } catch (err) {
      next(err);
    }
  }

  @ApiOperationDelete(openAPI.delete)
  @httpDelete('/:id', ValidationMiddleware.validate(idParamValidation))
  public async delete(
    @requestParam('id') id: string,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.userService.delete(id);

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}
