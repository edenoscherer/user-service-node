import { User } from '../../../entities/user';

export interface GetUserRepository {
  getUser(id: number, showPass: boolean): Promise<User>;
  getUserByCpf(cpf: string, showPass: boolean): Promise<User>;
}
