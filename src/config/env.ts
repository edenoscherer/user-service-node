import dotenv from 'dotenv';
import { join } from 'path';

const envFile =
  process.env.NODE_ENV === 'test'
    ? join(__dirname, '..', '..', '.env.test')
    : join(__dirname, '..', '..', '.env');

dotenv.config({ path: envFile });
export const ENV = {
  NODE_ENV: process.env.NODE_ENV ?? 'dev',
  PORT: process.env.PORT?.length ? parseInt(process.env.PORT) : 3000,
  DB_HOST: process.env.MYSQL_HOST ?? 'localhost',
  DB_USER: process.env.MYSQL_USER ?? 'user_service',
  DB_PASSWORD: process.env.MYSQL_PASSWORD ?? 'user@service',
  DB_NAME: process.env.MYSQL_DATABASE ?? 'user_service',
  DB_PORT: process.env.MYSQL_PORT?.length ? parseInt(process.env.MYSQL_PORT) : 3306,
  JWT_SECRET: process.env.JWT_SECRET ?? 'secret',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION ?? '15m'
};
