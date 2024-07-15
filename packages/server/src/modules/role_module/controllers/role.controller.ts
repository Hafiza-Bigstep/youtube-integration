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

import { RoleService } from '../services/role.service';
import { RolePolicy } from '../policies/role.policy';
import { TYPES } from '../types';
import { LogTypes, LoggerFactory } from 'logger';
import { ValidationMiddleware } from '../../../shared/middlewares/validator.middleware';
import { idParamValidation, postCreate } from '../validators/index.chain';
import { PermissionMiddleware } from '../../../shared/middlewares/permission.middleware';
import {
  ApiOperationDelete,
  ApiOperationGet,
  ApiOperationPatch,
  ApiOperationPost,
  ApiPath,
} from 'swagger-express-ts';
import openAPI from './role.openapi';

@ApiPath({
  path: '/role',
  name: 'Role',
  security: { basicAuth: [] },
})
@controller('/role')
export class RoleController extends BaseHttpController {
  private roleService: RoleService;
  private rolePolicy: RolePolicy;
  private logger;
  private permissionMiddleware: PermissionMiddleware;

  constructor(
    @inject(TYPES.RoleService) roleService: RoleService,
    @inject(TYPES.RolePolicy) rolePolicy: RolePolicy,
    @inject(LogTypes.LoggerFactory) loggerFactory: LoggerFactory,
    @inject('PermissionMiddleware') permissionMiddleware: PermissionMiddleware
  ) {
    super();
    this.roleService = roleService;
    this.rolePolicy = rolePolicy;
    this.logger = loggerFactory.createLogger('RoleController');
    this.permissionMiddleware = permissionMiddleware;
  }

  @ApiOperationPost(openAPI.create)
  @httpPost('/', ValidationMiddleware.validate(postCreate))
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = await this.rolePolicy.createDto(req);
      const result = await this.roleService.create(dto);
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
      const dto = this.rolePolicy.updateDto(req);
      const result = await this.roleService.update(id, dto);

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
      const result = await this.roleService.findById(id);

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
      const result = await this.roleService.delete(id);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  @httpPost(
    '/:id/permissions',
    ValidationMiddleware.validate(idParamValidation)
  )
  public async addPermission(
    @requestParam('id') id: string,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const role = await this.roleService.findById(id);
      const permission = await this.rolePolicy.permission(req);

      const result = await this.roleService.addPermission(
        role.id,
        permission.name
      );
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  @httpDelete(
    '/:id/permissions',
    ValidationMiddleware.validate(idParamValidation)
  )
  public async deletePermission(
    @requestParam('id') id: string,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const role = await this.roleService.findById(id);
      const permission = await this.rolePolicy.permission(req);

      const result = await this.roleService.deletePermission(
        role.id,
        permission.name
      );
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
