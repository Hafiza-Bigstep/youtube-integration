import { inject, injectable } from 'inversify';
import { PrismaClient, extendPermission } from 'clients-db';
import { PrismaClientSymbol } from 'clients-db';
import { PermissionCreateDto, UpdateDto } from '../types';

@injectable()
export class PermissionRepository {
  private _prisma: ReturnType<typeof extendPermission>;
  constructor(@inject(PrismaClientSymbol) private prisma: PrismaClient) {
    this._prisma = extendPermission.call(prisma);
  }

  async create(dto: PermissionCreateDto) {
    return await this._prisma.permission.create({
      data: dto,
    });
  }

  async findById(id: string) {
    return await this._prisma.permission.findById(id);
  }

  async findByName(name: string) {
    return await this._prisma.permission.findByName(name);
  }

  async update(id: string, dto: UpdateDto) {
    return await this._prisma.permission.update({
      where: {
        id: id,
      },
      data: dto,
    });
  }

  async delete(id: string) {
    return await this._prisma.permission.delete({
      where: {
        id: id,
      },
    });
  }

  async exists(name: string) {
    return await this._prisma.permission.findByName(name);
  }
}
