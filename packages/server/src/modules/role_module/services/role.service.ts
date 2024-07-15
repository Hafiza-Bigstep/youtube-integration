import { inject, injectable } from 'inversify';
import { RoleRepository } from '../repositories/role.repository';
import { CreateDto, TYPES, UpdateDto } from '../types';

@injectable()
export class RoleService {
  private roleRepository: RoleRepository;
  constructor(@inject(TYPES.RoleRepository) roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async create(dto: CreateDto) {
    return await this.roleRepository.create(dto);
  }

  async findById(id: string) {
    return await this.roleRepository.findById(id);
  }

  async update(id: string, dto: UpdateDto) {
    return await this.roleRepository.update(id, dto);
  }

  async delete(id: string) {
    return await this.roleRepository.delete(id);
  }

  async addPermission(roleId: string, permissionName: string) {
    return await this.roleRepository.addPermission(roleId, permissionName);
  }

  async deletePermission(roleId: string, permissionName: string) {
    return await this.roleRepository.deletePermission(roleId, permissionName);
  }
}
