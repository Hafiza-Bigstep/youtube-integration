import { ContainerModule } from 'inversify';
import { YoutubeService } from './services/youtube.service';
import { TYPES } from './types';
import { YoutubeController } from './controllers/youtube.controller';

const youtubeModule = new ContainerModule((bind): void => {
  bind<YoutubeController>(TYPES.YoutubeController).to(YoutubeController);
  bind<YoutubeService>(TYPES.YoutubeService)
    .to(YoutubeService)
    .inSingletonScope();
});

export { youtubeModule };
