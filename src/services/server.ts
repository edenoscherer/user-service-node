import express from 'express';
import morgan from 'morgan';
import { AppRouter } from '../routes/routes';

export class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(morgan('short'));
  }

  private setupRoutes(): void {
    this.app.use(new AppRouter().getRoutes());
  }

  public start(port: number): void {
    const server = this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    process.on('SIGTERM', () => {
      server.close(() => {
        console.log('Server shutdown complete');
      });
    });
  }
}
