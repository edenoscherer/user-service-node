import { Router } from 'express';
import { UserRoutes } from './user.routes';

export class AppRouter {
  private router: Router;
  private userRoutes: UserRoutes;

  constructor() {
    this.router = Router();
    this.userRoutes = new UserRoutes();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.use('/users/', this.userRoutes.getRoutes());
    this.setupHealthCheck();
  }
  private setupHealthCheck(): void {
    this.router.get('/health', (_, res) => {
      res.status(200).json({ status: 'healthy' });
    });
  }

  public getRoutes(): Router {
    return this.router;
  }
}
