import { User } from '../entities/user';
import { CreateUserRepository } from '../repositories/users/interfaces/createUser.repository';
import { EncryptionService } from './encryption.service';

export class CreateUserService {
  constructor(private readonly createUserRepository: CreateUserRepository) {}

  async create(user: User): Promise<User> {
    let { password } = user;
    if (!password?.trim().length) {
      throw new Error('Password is required and cannot be blank');
    }
    password = await EncryptionService.hash(password.trim());

    const id = await this.createUserRepository.createUser({ ...user, password });

    return { ...user, id };
  }
}
