import { ContainerModule } from 'inversify';
import { DefaultLoggerFactory } from './logger.factory';
import { TYPES } from './types';

export const loggingModule = new ContainerModule((bind): void => {
  bind<DefaultLoggerFactory>(TYPES.LoggerFactory)
    .to(DefaultLoggerFactory)
    .inSingletonScope();
});

export { TYPES as LogTypes, DefaultLoggerFactory as LoggerFactory };
