import { User } from '../entities/user';
import { CreateUserRepository } from '../repositories/users/interfaces/createUser.repository';

export class CreateUserService {
  constructor(private readonly createUserRepository: CreateUserRepository) {}

  async create(user: User): Promise<User> {
    const id = await this.createUserRepository.createUser(user);

    return { ...user, id };
  }
}
