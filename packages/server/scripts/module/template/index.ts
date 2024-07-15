import { ContainerModule } from 'inversify';
import { $$service_class_name$$ } from './services/$$service_file_name$$.service';
import { TYPES } from './types';
import { $$policy_class_name$$ } from './policies/$$policy_file_name$$.policy';
import { $$repository_class_name$$ } from './repositories/$$repository_file_name$$.repository';
import { $$controller_class_name$$ } from './controllers/$$controller_file_name$$.controller';

const $$module_var_name$$ = new ContainerModule((bind): void => {
  bind<$$controller_class_name$$>(TYPES.$$controller_class_name$$).to(
    $$controller_class_name$$
  );
  bind<$$service_class_name$$>(TYPES.$$service_class_name$$)
    .to($$service_class_name$$)
    .inSingletonScope();
  bind<$$policy_class_name$$>(TYPES.$$policy_class_name$$)
    .to($$policy_class_name$$)
    .inSingletonScope();
  bind<$$repository_class_name$$>(TYPES.$$repository_class_name$$)
    .to($$repository_class_name$$)
    .inSingletonScope();
});

export { $$module_var_name$$ };
