import { inject, injectable } from 'inversify';
import { IRegisterUser } from '../types/IRegisterUser';
import { AuthRepository } from '../repositories/auth.repository';
import { TYPES } from '../types';
import { AuthStrategyTypes, BearerStrategy } from 'auth-strategies';

@injectable()
export class AuthService {
  private authRepository: AuthRepository;
  private authStrategy: BearerStrategy;
  constructor(
    @inject(TYPES.AuthRepository) authRepository: AuthRepository,
    @inject(AuthStrategyTypes.AuthStrategy) authStrategy: BearerStrategy
  ) {
    this.authRepository = authRepository;
    this.authStrategy = authStrategy;
  }
  public async register(data: IRegisterUser) {
    try {
      const newUser = await this.authRepository.registerUser(data);
      return newUser;
    } catch (error) {
      console.error('User registration failed:', error);
      throw error;
    }
  }

  public async login(name: string, password: string) {
    const user = await this.authRepository.login(name, password);
    const token = this.authStrategy.token({
      id: user.id,
      name: `${user.firstname} ${user.lastname}`,
    });
    return token;
  }
}
