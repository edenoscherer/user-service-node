import mysql from 'mysql2/promise';
import { ENV } from '../config/env';

export interface Database {
  query<T>(sql: string, params?: unknown[]): Promise<[T]>;
  execute(sql: string): Promise<void>;
  beginTransaction(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  release(): Promise<void>;
}

export const connection = mysql.createPool({
  host: ENV.DB_HOST,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  port: ENV.DB_PORT
});
