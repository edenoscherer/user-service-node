import { ENV } from './config/env';
import { migrate } from './migrate';
import { Server } from './services/server';
const main = async () => {
  await migrate().catch(error => console.error('Migration error:', error));
  const server = new Server();
  server.start(ENV.PORT);
};

main().catch(error => console.error('Start server error:', error));
