import { GetUserCotroller } from '../../controllers/users/getUser.controller';
import { GetUserMysqlRepository } from '../../repositories/users/getUserMysql.repository';
import { GetUserService } from '../../services/users/getUser.service';

export const GetUserCotrollerFactory = (): GetUserCotroller => {
  const repository = new GetUserMysqlRepository();
  const userService = new GetUserService(repository);
  return new GetUserCotroller(userService);
};
