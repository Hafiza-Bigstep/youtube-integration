import { ContainerModule } from 'inversify';
import { RoleService } from './services/role.service';
import { TYPES } from './types';
import { RolePolicy } from './policies/role.policy';
import { RoleRepository } from './repositories/role.repository';
import { RoleController } from './controllers/role.controller';
import { PermissionController } from './controllers/permission.controller';
import { PermissionPolicy } from './policies/permission.policy';
import { PermissionRepository } from './repositories/permission.repository';
import { PermissionService } from './services/permission.service';

const roleModule = new ContainerModule((bind): void => {
  bind<RoleController>(TYPES.RoleController).to(RoleController);
  bind<PermissionController>(TYPES.PermissionController).to(
    PermissionController
  );
  bind<RoleService>(TYPES.RoleService).to(RoleService).inSingletonScope();
  bind<PermissionService>(TYPES.PermissionService)
    .to(PermissionService)
    .inSingletonScope();
  bind<RolePolicy>(TYPES.RolePolicy).to(RolePolicy).inSingletonScope();
  bind<PermissionPolicy>(TYPES.PermissionPolicy)
    .to(PermissionPolicy)
    .inSingletonScope();
  bind<RoleRepository>(TYPES.RoleRepository)
    .to(RoleRepository)
    .inSingletonScope();
  bind<PermissionRepository>(TYPES.PermissionRepository)
    .to(PermissionRepository)
    .inSingletonScope();
});

export { roleModule };
