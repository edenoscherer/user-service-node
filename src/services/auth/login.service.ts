import { EncryptionService } from '../encryption.service';
import { JwtService } from '../jwt.service';
import { GetUserService } from '../users/getUser.service';

export class LoginService {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly jwtService: JwtService
  ) {}

  async login(cpf: string, password: string): Promise<string | false> {
    try {
      const user = await this.getUserService.getUserByCpf(cpf, true);
      const compareResult = await EncryptionService.compare(password, user.password ?? '');
      if (compareResult) {
        return this.jwtService.generateToken(user.id as number);
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
