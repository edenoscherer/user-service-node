import { PoolConnection, ResultSetHeader } from 'mysql2/promise';
import { connection } from '../../services/db';
import { User } from '../../entities/user';
import { UpdateUserRepository } from './interfaces/updateUser.repository';

export class UpdateUserMysqlRepository implements UpdateUserRepository {
  private connection?: PoolConnection;

  private async getConnection(): Promise<PoolConnection> {
    if (this.connection) {
      return this.connection;
    }
    const conn = await connection.getConnection();
    this.connection = conn;
    return conn;
  }

  async updateUser(id: number, user: User): Promise<boolean> {
    const hasPasssword = user.password !== undefined;
    const sql = `UPDATE user_service.users
              SET name=?, birth_date=?, address=?, status=?, updated_at=?, updated_by=? ${hasPasssword ? ', password_hash=?' : ''}
              WHERE id=?`;
    const values = [
      user.name,
      user.birthDate,
      JSON.stringify(user.address),
      user.status,
      new Date(),
      user.updatedBy
    ];
    if (hasPasssword) {
      values.push(user.password);
    }
    const conn = await this.getConnection();
    const res = await conn.query<ResultSetHeader>(sql, [...values, id]);

    return res[0].affectedRows > 0;
  }
}
