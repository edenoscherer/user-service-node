import { User } from '../../entities/user';
import { UpdateUserRepository } from '../../repositories/users/interfaces/updateUser.repository';
import { EncryptionService } from '../encryption.service';
import { GetUserService } from './getUser.service';

export class UpdateUserService {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly updateUserRepository: UpdateUserRepository
  ) {}

  async updateUser(id: number, user: Partial<User>, updatedBy?: number): Promise<boolean> {
    const userDb = await this.getUserService.getUser(id, false);

    if (user.password?.trim().length) {
      user.password = await EncryptionService.hash(user.password.trim());
    }

    return this.updateUserRepository.updateUser(id, {
      ...userDb,
      ...user,
      updatedAt: new Date(),
      updatedBy
    });
  }
}
