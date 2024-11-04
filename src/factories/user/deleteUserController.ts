import { DeleteUserController } from '../../controllers/users/deleteUser.controller';
import { DeleteUserMysqlRepository } from '../../repositories/users/deleteUserMysql.repository';
import { GetUserMysqlRepository } from '../../repositories/users/getUserMysql.repository';
import { GetUserService } from '../../services/users/getUser.service';
import { DeleteUserService } from '../../services/users/deleteUser.service';

export const DeleteUserCotrollerFactory = (): DeleteUserController => {
  const repository = new DeleteUserMysqlRepository();
  const getUserService = new GetUserService(new GetUserMysqlRepository());
  const userService = new DeleteUserService(getUserService, repository);
  return new DeleteUserController(userService);
};
