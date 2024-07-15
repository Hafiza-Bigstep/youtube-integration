import { inject, injectable } from 'inversify';
import { PrismaClient, extendUser } from 'clients-db';
import { PrismaClientSymbol } from 'clients-db';
import { CreateDto, UpdateDto } from '../types';

@injectable()
export class UserRepository {
  private _prisma: ReturnType<typeof extendUser>;

  constructor(@inject(PrismaClientSymbol) private prisma: PrismaClient) {
    this._prisma = extendUser.call(prisma);
  }

  async create(dto: CreateDto) {
    return await this._prisma.user.create({
      data: {
        ...dto.user,
      },
    });
  }

  async findById(id: string) {
    return await this._prisma.user.findById(id);
  }

  async update(id: string, dto: UpdateDto) {
    return await this._prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...dto.user,
      },
    });
  }

  async delete(id: string) {
    await this._prisma.userProfile.delete({
      where: {
        userId: id,
      },
    });
    return await this._prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
