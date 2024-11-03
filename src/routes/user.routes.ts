import { Router } from 'express';
import { ExpressControllerFactory } from '../services/expressControllerFactory';
import { CreateUserControllerFactory } from '../factories/user/createUserController';

export class UserRoutes {
  private readonly router: Router;

  constructor() {
    this.router = Router();
    this.setupUserRoutes();
  }

  private setupUserRoutes(): void {
    const makeExpressController = new ExpressControllerFactory();
    this.router.post('/', makeExpressController.create(CreateUserControllerFactory));
  }

  public getRoutes(): Router {
    return this.router;
  }
}
