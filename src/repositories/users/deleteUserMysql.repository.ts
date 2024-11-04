import { PoolConnection, ResultSetHeader } from 'mysql2/promise';
import { DeleteUserRepository } from './interfaces/deleteUser.repository';
import { connection } from '../../services/db';
import { UserStatus } from '../../entities/user';

export class DeleteUserMysqlRepository implements DeleteUserRepository {
  private connection?: PoolConnection;

  private async getConnection(): Promise<PoolConnection> {
    if (this.connection) {
      return this.connection;
    }
    const conn = await connection.getConnection();
    this.connection = conn;
    return conn;
  }

  async deleteUser(id: number, deletedBy: number | null): Promise<boolean> {
    const sql = 'UPDATE user_service.users SET status=?, deleted_at=?, deleted_by=? WHERE id=?;';
    const conn = await this.getConnection();
    const res = await conn.query<ResultSetHeader>(sql, [
      UserStatus.DELETED,
      new Date(),
      deletedBy,
      id
    ]);

    return res[0].affectedRows > 0;
  }
}
