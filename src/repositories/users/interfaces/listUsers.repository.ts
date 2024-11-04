import { User, UserStatus } from '../../../entities/user';

export interface ParamsCountUsers {
  name?: string;
  cpf?: string;
  status?: UserStatus;
}

export interface ParamsListUsers extends ParamsCountUsers {
  limit: number;
  offset: number;
}

export interface ListUsersRepository {
  listUsers(params: ParamsListUsers): Promise<User[]>;
  countUsers(params: ParamsCountUsers): Promise<number>;
}
