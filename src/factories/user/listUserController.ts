import { ListUsersCotroller } from '../../controllers/users/listUsers.controller';
import { ListUsersMysqlRepository } from '../../repositories/users/listUsersMysql.repository';
import { ListUsersService } from '../../services/users/listUsers.service';

export const ListUserControllerFactory = (): ListUsersCotroller => {
  const repository = new ListUsersMysqlRepository();
  const userService = new ListUsersService(repository);
  return new ListUsersCotroller(userService);
};
