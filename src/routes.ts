import { Router } from 'express';

export class AppRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.get('*', (_, res) => {
      res.status(200).send({ service: true });
    });
  }

  public getRoutes(): Router {
    return this.router;
  }
}
