import { Request } from 'express';
import { inject, injectable } from 'inversify';
import { CreateDto, TYPES, UpdateDto } from '../types';
import { RoleRepository } from '../repositories/role.repository';
import { PermissionRepository } from '../repositories/permission.repository';

@injectable()
export class RolePolicy {
  private roleRepository: RoleRepository;
  private permissionRepository: PermissionRepository;

  constructor(
    @inject(TYPES.RoleRepository) roleRepository: RoleRepository,
    @inject(TYPES.PermissionRepository)
    permissionRepository: PermissionRepository
  ) {
    this.roleRepository = roleRepository;
    this.permissionRepository = permissionRepository;
  }

  async createDto(req: Request): Promise<CreateDto> {
    const dto = {
      name: req.body.name.toUpperCase(),
      description: req.body.description,
    };

    const exists = await this.roleRepository.exists(dto.name);

    if (exists) {
      throw new Error('Role already exists');
    }

    return dto;
  }

  updateDto(req: Request): UpdateDto {
    return {
      description: req.body.description,
    };
  }

  async permission(req: Request) {
    const permissionName: string = req.body.name;
    const permission = await this.permissionRepository.findByName(
      permissionName
    );

    if (!permission) {
      throw new Error('Permission Not Found');
    }

    return permission;
  }
}
