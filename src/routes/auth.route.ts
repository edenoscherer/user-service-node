import { Router } from 'express';
import { ExpressControllerFactory } from '../services/expressControllerFactory';
import { LoginControllerFactory } from '../factories/auth/loginControllerFactory';

export class AuthRoute {
  private readonly router: Router;

  constructor() {
    this.router = Router();
    this.setupUserRoutes();
  }

  private setupUserRoutes(): void {
    const makeExpressController = new ExpressControllerFactory();
    this.router.post('/login', makeExpressController.create(LoginControllerFactory));
  }

  public getRoutes(): Router {
    return this.router;
  }
}
