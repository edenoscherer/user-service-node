import { ENV } from './config/env';
import { Server } from './services/server';

const server = new Server();
server.start(ENV.PORT);
