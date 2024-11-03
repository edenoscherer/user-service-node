import { CreateUserController } from '../../controllers/users/createUser.controller';
import { CreateUserMysqlRepository } from '../../repositories/users/createUserMysql.repository';
import { CreateUserService } from '../../services/createUser.service';

export const CreateUserControllerFactory = (): CreateUserController => {
  const repository = new CreateUserMysqlRepository();
  const userService = new CreateUserService(repository);
  return new CreateUserController(userService);
};
