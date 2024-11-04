import { PoolConnection } from 'mysql2/promise';
import { connection } from '../../services/db';
import { GetUserRepository } from './interfaces/getUser.repository';
import { User, UserDB, userDBToUser } from '../../entities/user';

export class GetUserMysqlRepository implements GetUserRepository {
  private connection?: PoolConnection;

  private async getConnection(): Promise<PoolConnection> {
    if (this.connection) {
      return this.connection;
    }
    const conn = await connection.getConnection();
    this.connection = conn;
    return conn;
  }

  async getUser(id: number, showPass = false): Promise<User> {
    const sql = `SELECT * from user_service.users
          where id = ? LIMIT 1`;
    const conn = await this.getConnection();
    const res = await conn.query<UserDB[]>(sql, [id]);
    if (!res[0].length) {
      throw new Error('User not found');
    }
    const user = res[0][0];
    return userDBToUser(user, showPass);
  }

  async getUserByCpf(cpf: string, showPass = false): Promise<User> {
    const sql = `SELECT * from user_service.users
          where cpf = ? LIMIT 1`;
    const conn = await this.getConnection();
    const res = await conn.query<UserDB[]>(sql, [cpf]);
    if (!res[0].length) {
      throw new Error('User not found');
    }
    const user = res[0][0];
    return userDBToUser(user, showPass);
  }
}
