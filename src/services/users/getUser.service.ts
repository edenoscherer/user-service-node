import { User } from '../../entities/user';
import { GetUserRepository } from '../../repositories/users/interfaces/getUser.repository';

export class GetUserService {
  constructor(private readonly repository: GetUserRepository) {}
  async getUser(id: number, showPass: boolean): Promise<User> {
    return this.repository.getUser(id, showPass);
  }
}
