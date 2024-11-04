import { JwtService } from '../jwt.service';

export class VerifyTokenService {
  constructor(private readonly service: JwtService) {}

  verify(token: string): { id: number } | false {
    return this.service.verifyToken(token);
  }
}
