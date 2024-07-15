import { ContainerModule } from 'inversify';
import { UserService } from './services/user.service';
import { TYPES } from './types';
import { UserPolicy } from './policies/user.policy';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './controllers/user.controller';

const userModule = new ContainerModule((bind): void => {
  bind<UserController>(TYPES.UserController).to(UserController);
  bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
  bind<UserPolicy>(TYPES.UserPolicy).to(UserPolicy).inSingletonScope();
  bind<UserRepository>(TYPES.UserRepository)
    .to(UserRepository)
    .inSingletonScope();
});

export { userModule };
