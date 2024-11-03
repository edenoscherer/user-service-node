import { User } from '../../entities/user';
import { CreateUserService } from '../../services/createUser.service';
import {
  Controller,
  createErrorResponse,
  ErrorResponse,
  HttpRequest,
  HttpResponse
} from '../controller';

export class CreateUserController implements Controller {
  constructor(private readonly service: CreateUserService) {}

  async handle(req: HttpRequest<User>): Promise<HttpResponse<User | ErrorResponse>> {
    try {
      const createdUser = await this.service.create({
        ...req.body,
        createdBy: req.user?.id
      });

      return {
        statusCode: 201,
        body: createdUser
      };
    } catch (error) {
      return createErrorResponse(error);
    }
  }
}
