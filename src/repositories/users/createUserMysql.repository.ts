import { ResultSetHeader } from 'mysql2';
import { User } from '../../entities/user';
import { connection } from '../../services/db';
import { CreateUserRepository } from './interfaces/createUser.repository';

export class CreateUserMysqlRepository implements CreateUserRepository {
  async createUser(user: User): Promise<number> {
    // const db = (await connection.getConnection()) as unknown as Database;
    const conn = await connection.getConnection();
    const sql = `INSERT INTO user_service.users
              (cpf, name, birth_date, address, password_hash, status, created_at, created_by)
            VALUES(:cpf, :name, :birthDate, :address, :passwordHash, :status, :createdAt, :createdBy);`;
    const res = await conn.query<ResultSetHeader>(sql, {
      cpf: user.cpf,
      name: user.name,
      birthDate: user.birthDate,
      address: JSON.stringify(user.address),
      passwordHash: user.password,
      status: user.status,
      createdAt: user?.createdAt,
      createdBy: user?.createdBy
    });

    return res[0].insertId;
  }
}
