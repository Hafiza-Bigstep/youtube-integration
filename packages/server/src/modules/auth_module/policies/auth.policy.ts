import { Request } from '../../../types';
import { IRegisterUser } from '../types/IRegisterUser';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { AuthRepository } from '../repositories/auth.repository';

@injectable()
export class AuthPolicy {
  private authRepository: AuthRepository;
  constructor(@inject(TYPES.AuthRepository) authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }
  public async register(req: Request): Promise<IRegisterUser> {
    const data: IRegisterUser = {
      firstname: req.body.firstnme,
      lastname: req.body.lastname,
      email: req.body.email.toLowerCase(),
      password: req.body.password,
    };

    const existingUser = await this.authRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }
    return data;
  }

  public async login(
    req: Request
  ): Promise<{ email: string; password: string }> {
    const credentials = {
      email: req.body.email.toLowerCase(),
      password: req.body.password,
    };

    const user = await this.authRepository.findUserByEmail(credentials.email);
    if (!user) {
      throw new Error('User not found');
    }

    return credentials;
  }
}
