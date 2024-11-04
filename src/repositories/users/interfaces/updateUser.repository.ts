import { User } from '../../../entities/user';

export interface UpdateUserRepository {
  updateUser(id: number, user: User): Promise<boolean>;
}
