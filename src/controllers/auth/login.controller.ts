import { LoginService } from '../../services/auth/login.service';
import {
  Controller,
  createErrorResponse,
  ErrorResponse,
  HttpRequest,
  HttpResponse
} from '../controller';

export class LoginController implements Controller {
  constructor(private readonly service: LoginService) {}
  async handle(
    req: HttpRequest<{ cpf: string; password: string }>
  ): Promise<HttpResponse<{ token: string } | ErrorResponse>> {
    try {
      const result = await this.service.login(req.body.cpf, req.body.password);
      if (result) {
        return {
          statusCode: 200,
          body: { token: result }
        };
      }
      return {
        statusCode: 404,
        body: {
          error: 'AuthError',
          message: 'Login ou senha incorretos!'
        }
      };
    } catch (error) {
      return createErrorResponse(error);
    }
  }
}
