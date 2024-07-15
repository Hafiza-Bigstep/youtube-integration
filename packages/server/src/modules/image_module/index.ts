import { ContainerModule } from 'inversify';
import { TYPES } from './types';
import { ImageController } from './controllers/image.controller';
import { interfaces, TYPE } from 'inversify-express-utils';

const imageModule = new ContainerModule((bind): void => {
  bind<interfaces.Controller>(TYPE.Controller)
    .to(ImageController)
    .inRequestScope()
    .whenTargetNamed(TYPES.ImageController);
});

export { imageModule };
