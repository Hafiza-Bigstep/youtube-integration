import { inject, injectable } from 'inversify';
import { UserRepository } from '../repositories/user.repository';
import { CreateDto, TYPES, UpdateDto } from '../types';

@injectable()
export class UserService {
  private userRepository: UserRepository;
  constructor(@inject(TYPES.UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async create(user: CreateDto) {
    return await this.userRepository.create(user);
  }

  async findById(id: string) {
    return await this.userRepository.findById(id);
  }

  async update(id: string, dto: UpdateDto) {
    return await this.userRepository.update(id, dto);
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }
}
