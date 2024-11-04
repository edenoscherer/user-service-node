import { Router } from 'express';
import { UserRoutes } from './user.routes';
import { AuthRoute } from './auth.route';

export class AppRouter {
  private router: Router;
  private userRoutes: UserRoutes;
  private authRoutes: AuthRoute;

  constructor() {
    this.router = Router();
    this.userRoutes = new UserRoutes();
    this.authRoutes = new AuthRoute();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.use('/users/', this.userRoutes.getRoutes());
    this.router.use('/auth/', this.authRoutes.getRoutes());
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
