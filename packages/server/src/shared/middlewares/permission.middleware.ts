import { injectable, inject } from 'inversify';
import { TYPES } from '../../modules/role_module/types';
import { RoleRepository } from '../../modules/role_module/repositories/role.repository';

@injectable()
export class PermissionMiddleware {
  roleRepository: RoleRepository;

  constructor(@inject(TYPES.RoleRepository) roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async can(roleId: string, permissionName: string) {
    const permission = await this.roleRepository.hasPermission(
      roleId,
      permissionName
    );
    if (!permission) {
      throw new Error('Insufficient Permission');
    }

    return permission;
  }
}
