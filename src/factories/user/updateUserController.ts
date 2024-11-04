import { UpdateUserController } from '../../controllers/users/updateUser.controller';
import { UpdateUserMysqlRepository } from '../../repositories/users/updateUserMysql.repository';
import { GetUserMysqlRepository } from '../../repositories/users/getUserMysql.repository';
import { GetUserService } from '../../services/users/getUser.service';
import { UpdateUserService } from '../../services/users/updateUser.service';

export const UpdateUserCotrollerFactory = (): UpdateUserController => {
  const repository = new UpdateUserMysqlRepository();
  const getUserService = new GetUserService(new GetUserMysqlRepository());
  const userService = new UpdateUserService(getUserService, repository);
  return new UpdateUserController(userService);
};
