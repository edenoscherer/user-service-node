import { PoolConnection, RowDataPacket } from 'mysql2/promise';
import { connection } from '../../services/db';
import {
  ListUsersRepository,
  ParamsCountUsers,
  ParamsListUsers
} from './interfaces/listUsers.repository';
import { User, UserDB } from '../../entities/user';

interface CountResult extends RowDataPacket {
  count: number;
}

export class ListUsersMysqlRepository implements ListUsersRepository {
  private connection?: PoolConnection;

  private async getConnection(): Promise<PoolConnection> {
    if (this.connection) {
      return this.connection;
    }
    const conn = await connection.getConnection();
    this.connection = conn;
    return conn;
  }

  async listUsers(params: ParamsListUsers): Promise<User[]> {
    const where = this.createWhere(params);
    const sql = `SELECT * from user_service.users
          where ${where.where.length ? where.where.join(' and ') : 'true'}
          LIMIT ${params.limit} OFFSET ${params.offset}`;
    const conn = await this.getConnection();
    const res = await conn.query<UserDB[]>(sql, where.whereParams);
    return res[0].map(user => {
      return {
        ...user,
        password_hash: undefined,
        password: undefined
      };
    });
  }

  async countUsers(params: ParamsCountUsers): Promise<number> {
    const where = this.createWhere(params);
    const sql = `SELECT count(*) as count from user_service.users where ${where.where.length ? where.where.join(' and ') : 'true'}`;
    const conn = await this.getConnection();
    const [countResult] = await conn.query<CountResult[]>(sql, where.whereParams);

    return countResult.length && countResult[0].count ? countResult[0].count : 0;
  }

  private createWhere(params: ParamsCountUsers): { where: string[]; whereParams: string[] } {
    const where: string[] = [];
    const whereParams: string[] = [];
    if (params.status?.trim().length) {
      where.push('status = ?');
      whereParams.push(params.status);
    }
    if (params.name?.trim().length) {
      where.push('name like ?');
      whereParams.push(`%${params.name}%`);
    }
    if (params.cpf?.trim().length) {
      where.push('cpf = ?');
      whereParams.push(params.cpf);
    }

    return {
      where,
      whereParams
    };
  }
}
