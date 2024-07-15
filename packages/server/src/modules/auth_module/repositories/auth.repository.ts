import { inject, injectable } from 'inversify';
import type { PrismaClient } from 'clients-db';
import { PrismaClientSymbol } from 'clients-db';
import { IRegisterUser } from '../types/IRegisterUser';
import bcrypt from 'bcrypt';
import _ from 'underscore';
@injectable()
export class AuthRepository {
  constructor(@inject(PrismaClientSymbol) private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
  }

  public async login(name: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: name.toLowerCase(),
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const profile = await this.prisma.userProfile.findUnique({
      where: {
        userId: user.id,
      },
    });

    return { ..._.omit(user, ['password']), ..._.omit(profile, 'id') };
  }

  public async registerUser(data: IRegisterUser) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        password: hashPassword,
      },
    });

    const profile = await this.prisma.userProfile.create({
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        userId: user.id,
      },
    });

    return {
      ..._.omit(user, ['password']),
      ..._.omit(profile, 'id'),
    };
  }
}
