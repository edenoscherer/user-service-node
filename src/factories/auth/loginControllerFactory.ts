import { LoginController } from '../../controllers/auth/login.controller';
import { GetUserMysqlRepository } from '../../repositories/users/getUserMysql.repository';
import { LoginService } from '../../services/auth/login.service';
import { JwtService } from '../../services/jwt.service';
import { GetUserService } from '../../services/users/getUser.service';

export const LoginControllerFactory = (): LoginController => {
  const getUserService = new GetUserService(new GetUserMysqlRepository());
  const jwtService = new JwtService();
  const service = new LoginService(getUserService, jwtService);
  return new LoginController(service);
};
