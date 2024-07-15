import { inject, injectable } from 'inversify';
import { PrismaClient, extendRole } from 'clients-db';
import { PrismaClientSymbol } from 'clients-db';
import { CreateDto, UpdateDto } from '../types';
@injectable()
export class RoleRepository {
  private _prisma: ReturnType<typeof extendRole>;
  constructor(@inject(PrismaClientSymbol) private prisma: PrismaClient) {
    this._prisma = extendRole.call(prisma);
  }

  async create(dto: CreateDto) {
    return await this._prisma.role.create({
      data: dto,
    });
  }

  async findById(id: string) {
    return await this._prisma.role.findById(id);
  }

  async update(id: string, dto: UpdateDto) {
    return await this._prisma.role.update({
      where: {
        id: id,
      },
      data: dto,
    });
  }

  async delete(id: string) {
    return await this._prisma.role.delete({
      where: {
        id: id,
      },
    });
  }

  async exists(name: string) {
    return await this._prisma.role.findFirst({
      where: {
        name,
      },
    });
  }

  async addPermission(roleId: string, permissionName: string) {
    return await this._prisma.role.addPermission(roleId, permissionName);
  }

  async deletePermission(roleId: string, permissionName: string) {
    return await this._prisma.role.deletePermission(roleId, permissionName);
  }

  async hasPermission(roleId: string, permissionName: string) {
    return await this._prisma.role.hasPermission(roleId, permissionName);
  }
}
