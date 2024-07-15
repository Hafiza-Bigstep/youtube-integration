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
import { TYPES } from '../types';
import { LogTypes, LoggerFactory } from 'logger';
import { ValidationMiddleware } from '../../../shared/middlewares/validator.middleware';
import {
  idParamValidation,
  postPermissionCreate,
} from '../validators/index.chain';
import { PermissionService } from '../services/permission.service';
import { PermissionPolicy } from '../policies/permission.policy';
import {
  ApiOperationDelete,
  ApiOperationGet,
  ApiOperationPatch,
  ApiOperationPost,
  ApiPath,
} from 'swagger-express-ts';
import openAPI from './permission.openapi';

@ApiPath({
  path: '/permission',
  name: 'Permission',
  security: { basicAuth: [] },
})
@controller('/permission')
export class PermissionController extends BaseHttpController {
  private permissionService: PermissionService;
  private permissionPolicy: PermissionPolicy;
  private logger;

  constructor(
    @inject(TYPES.PermissionService) permissionService: PermissionService,
    @inject(TYPES.PermissionPolicy) permissionPolicy: PermissionPolicy,
    @inject(LogTypes.LoggerFactory) loggerFactory: LoggerFactory
  ) {
    super();
    this.permissionService = permissionService;
    this.permissionPolicy = permissionPolicy;
    this.logger = loggerFactory.createLogger('PermissionController');
  }

  @ApiOperationPost(openAPI.create)
  @httpPost('/', ValidationMiddleware.validate(postPermissionCreate))
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = await this.permissionPolicy.createDto(req);
      const result = await this.permissionService.create(dto);
      return this.json(result, 200);
    } catch (error) {
      next(error);
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
      const dto = this.permissionPolicy.updateDto(req);
      const result = await this.permissionService.update(id, dto);

      return this.json(result, 200);
    } catch (error) {
      next(error);
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
      const result = await this.permissionService.findById(id);

      return this.json(result, 200);
    } catch (error) {
      next(error);
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
      const result = await this.permissionService.delete(id);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
