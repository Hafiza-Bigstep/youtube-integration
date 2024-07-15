import { inject, injectable } from 'inversify';
import { CreateDto, TYPES, UpdateDto } from '../types';
import { PermissionRepository } from '../repositories/permission.repository';

@injectable()
export class PermissionService {
  private permissionRepository: PermissionRepository;
  constructor(
    @inject(TYPES.PermissionRepository)
    permissionRepository: PermissionRepository
  ) {
    this.permissionRepository = permissionRepository;
  }

  async create(dto: CreateDto) {
    return await this.permissionRepository.create(dto);
  }

  async findById(id: string) {
    return await this.permissionRepository.findById(id);
  }

  async update(id: string, dto: UpdateDto) {
    return await this.permissionRepository.update(id, dto);
  }

  async delete(id: string) {
    return await this.permissionRepository.delete(id);
  }
}
