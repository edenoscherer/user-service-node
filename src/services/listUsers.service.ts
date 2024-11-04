import { User, UserStatus } from '../entities/user';
import { ListUsersRepository } from '../repositories/users/interfaces/listUsers.repository';

export interface ListUsersParams {
  name?: string;
  cpf?: string;
  status?: UserStatus;
  page?: number;
  limit?: number;
}
export interface ListUsersResult {
  data: User[];
  page: number;
  limit: number;
  total: number;
}

export class ListUsersService {
  constructor(private readonly listUsersRepository: ListUsersRepository) {}
  async listAll(params: ListUsersParams): Promise<ListUsersResult> {
    const page = params.page || 1;
    const limit = params.limit && params.limit < 100 ? params.limit : 10;
    const offset = (page - 1) * limit;

    const count = await this.listUsersRepository.countUsers({
      name: params.name,
      cpf: params.cpf,
      status: params.status
    });
    if (count === 0) {
      return { data: [], page, limit, total: count };
    }

    const users = await this.listUsersRepository.listUsers({
      name: params.name,
      cpf: params.cpf,
      status: params.status,
      limit,
      offset
    });
    return { data: users, page, limit, total: count };
  }
}
