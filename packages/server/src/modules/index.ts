import { Container } from 'inversify';

import { authModule } from './auth_module';
import { userModule } from './user_module';
import { roleModule } from './role_module';
import { imageModule } from './image_module';

import { loggingModule } from 'logger';

import { mailerModule } from 'mailer';

import {
  authStrategyModule,
  BearerStrategy,
  AuthStrategyTypes,
  AuthStrategyFactory,
} from 'auth-strategies';

import { prismaClientModule } from 'clients-db';
import { PermissionMiddleware } from '../shared/middlewares/permission.middleware';
import { ValidationMiddleware } from '../shared/middlewares/validator.middleware';
import { AuthMiddleware } from '../shared/middlewares/auth.middleware';
import { FileUploadMiddleware } from '../shared/middlewares/file.middleware';

const mainContainer = new Container();

mainContainer.load(prismaClientModule);
mainContainer.load(authModule);
mainContainer.load(loggingModule);
mainContainer.load(userModule);
mainContainer.load(authStrategyModule);
mainContainer.load(roleModule);
mainContainer.load(imageModule);
mainContainer.load(mailerModule);

mainContainer
  .bind<PermissionMiddleware>('PermissionMiddleware')
  .to(PermissionMiddleware);
mainContainer
  .bind<ValidationMiddleware>('ValidationMiddleware')
  .to(ValidationMiddleware);

mainContainer
  .bind<FileUploadMiddleware>('FileUploadMiddleware')
  .to(FileUploadMiddleware);

const authStrategy = mainContainer.get<AuthStrategyFactory>(
  AuthStrategyTypes.StrategyFactory
);

mainContainer
  .bind<BearerStrategy>(AuthStrategyTypes.AuthStrategy)
  .toDynamicValue(() => {
    const bearerStrategy = new BearerStrategy('jwtsecret');
    authStrategy.register('Bearer', bearerStrategy);
    return bearerStrategy;
  });

mainContainer
  .bind<AuthMiddleware>('BearerAuthMiddleware')
  .toDynamicValue(() => {
    return new AuthMiddleware(authStrategy.get('Bearer'));
  });

export { mainContainer };
