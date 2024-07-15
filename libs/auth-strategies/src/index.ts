import { ContainerModule } from 'inversify';
import { AuthStrategyFactory } from './authStrategy.factory';
import { TYPES, AuthStrategy } from './types';

export const authStrategyModule = new ContainerModule((bind): void => {
  bind<AuthStrategyFactory>(TYPES.StrategyFactory)
    .to(AuthStrategyFactory)
    .inSingletonScope();
});

export { TYPES as AuthStrategyTypes, AuthStrategyFactory, AuthStrategy };
export * from './strategies';
