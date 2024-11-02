import dotenv from 'dotenv';
import { existsSync } from 'fs';
import { join } from 'path';

const envFile =
  process.env.NODE_ENV === 'test'
    ? join(__dirname, '..', '..', '.env.test')
    : join(__dirname, '..', '..', '.env');

dotenv.config({ path: envFile });
console.log(envFile, existsSync(envFile));
export const ENV = {
  DB_HOST: process.env.DB_HOST ?? 'localhost',
  DB_USER: process.env.DB_USER ?? 'user_service',
  DB_PASSWORD: process.env.DB_PASSWORD ?? 'user@service',
  DB_NAME: process.env.DB_NAME ?? 'user_service',
  DB_PORT: process.env.DB_PORT?.length ? parseInt(process.env.DB_PORT) : 3306
};
