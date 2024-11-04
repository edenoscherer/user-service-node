import { Router } from 'express';
import { ExpressControllerFactory } from '../services/expressControllerFactory';
import { CreateUserControllerFactory } from '../factories/user/createUserController';
import { ListUserControllerFactory } from '../factories/user/listUserController';
import { GetUserCotrollerFactory } from '../factories/user/getUserController';
import { UpdateUserCotrollerFactory } from '../factories/user/updateUserController';

export class UserRoutes {
  private readonly router: Router;

  constructor() {
    this.router = Router();
    this.setupUserRoutes();
  }

  private setupUserRoutes(): void {
    const makeExpressController = new ExpressControllerFactory();
    this.router.post('/', makeExpressController.create(CreateUserControllerFactory));
    this.router.get('/', makeExpressController.create(ListUserControllerFactory));
    this.router.get('/:id', makeExpressController.create(GetUserCotrollerFactory));
    this.router.put('/:id', makeExpressController.create(UpdateUserCotrollerFactory));
  }

  public getRoutes(): Router {
    return this.router;
  }
}
