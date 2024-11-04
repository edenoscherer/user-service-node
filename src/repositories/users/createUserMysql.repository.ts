import { ResultSetHeader } from 'mysql2';
import { User } from '../../entities/user';
import { connection } from '../../services/db';
import { CreateUserRepository } from './interfaces/createUser.repository';

export class CreateUserMysqlRepository implements CreateUserRepository {
  async createUser(user: User): Promise<number> {
    const conn = await connection.getConnection();
    const sql = `INSERT INTO user_service.users
              (cpf, name, birth_date, address, password_hash, status, created_by)
            VALUES(?, ?, ?, ?, ?, ?, ?);`;
    const res = await conn.query<ResultSetHeader>(sql, [
      user.cpf,
      user.name,
      user.birthDate,
      JSON.stringify(user.address),
      user.password,
      user.status,
      user?.createdBy
    ]);

    return res[0].insertId;
  }
}
