import { ContainerModule } from 'inversify';
import { TEMPLATE_NAME, TYPES } from './types';
import { MailService } from './mailService';

export const mailerModule = new ContainerModule((bind): void => {
  bind<MailService>(TYPES.MailService).to(MailService).inSingletonScope();
});

export { TYPES as MailerTypes, MailService, TEMPLATE_NAME };
