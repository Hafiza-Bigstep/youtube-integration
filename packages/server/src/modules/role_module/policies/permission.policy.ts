import { Request } from 'express';
import { inject, injectable } from 'inversify';
import { PermissionCreateDto, PermissionUpdateDto, TYPES } from '../types';
import { PermissionRepository } from '../repositories/permission.repository';

@injectable()
export class PermissionPolicy {
  private permissionRepository: PermissionRepository;

  constructor(
    @inject(TYPES.PermissionRepository)
    permissionRepository: PermissionRepository
  ) {
    this.permissionRepository = permissionRepository;
  }

  async createDto(req: Request): Promise<PermissionCreateDto> {
    const dto = {
      name: req.body.name,
      description: req.body.description,
    };

    const exists = await this.permissionRepository.exists(dto.name);

    if (exists) {
      throw new Error('Permission already exists');
    }

    return dto;
  }

  updateDto(req: Request): PermissionUpdateDto {
    return {
      description: req.body.description,
    };
  }
}
