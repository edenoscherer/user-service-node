import { UserStatus } from '../../entities/user';
import { DeleteUserRepository } from '../../repositories/users/interfaces/deleteUser.repository';
import { GetUserService } from './getUser.service';

export class DeleteUserService {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly repository: DeleteUserRepository
  ) {}
  async delete(id: number, deletedBy: number | null): Promise<boolean> {
    const user = await this.getUserService.getUser(id, false);
    if (user.status === UserStatus.DELETED) {
      throw new Error('User is already deleted');
    }
    return this.repository.deleteUser(id, deletedBy);
  }
}
