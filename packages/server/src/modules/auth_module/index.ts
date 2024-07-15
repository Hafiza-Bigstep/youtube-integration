import { ContainerModule } from 'inversify';
import { AuthService } from './services/auth.service';
import { TYPES } from '../auth_module/types';
import { AuthPolicy } from './policies/auth.policy';
import { AuthRepository } from './repositories/auth.repository';
import { AuthController } from './controllers/auth.controller';
import { interfaces, TYPE } from 'inversify-express-utils';

const authModule = new ContainerModule((bind): void => {
  bind<interfaces.Controller>(TYPE.Controller)
    .to(AuthController)
    .whenTargetNamed(TYPES.AuthController);

  bind<AuthService>(TYPES.AuthService).to(AuthService).inSingletonScope();
  bind<AuthPolicy>(TYPES.AuthPolicy).to(AuthPolicy).inSingletonScope();
  bind<AuthRepository>(TYPES.AuthRepository)
    .to(AuthRepository)
    .inSingletonScope();
});

export { authModule };
