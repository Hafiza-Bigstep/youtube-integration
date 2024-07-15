import { ContainerModule } from 'inversify';
import { ENVIRONMENTS } from './lib/constants';

export { ENVIRONMENTS, DEV_ENV } from './lib/constants';

export const AppEnvSymbol = Symbol.for('APP_ENV');

export const constantsModule = new ContainerModule((bind): void => {
  bind<ENVIRONMENTS>(AppEnvSymbol).toConstantValue(
    Object.values(ENVIRONMENTS).find(e => e === process.env['APP_ENV']) ??
      ENVIRONMENTS.LOCAL
  );
});
