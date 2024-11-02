export const ENV = {
  DB_HOST: process.env.DB_HOST ?? 'localhost',
  DB_USER: process.env.DB_USER ?? 'user_service',
  DB_PASSWORD: process.env.DB_PASSWORD ?? 'user@service',
  DB_NAME: process.env.DB_NAME ?? 'user_service',
  DB_PORT: process.env.DB_PORT?.length ? parseInt(process.env.DB_PORT) : 3306
};
