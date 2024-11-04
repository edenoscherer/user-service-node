import { User } from '../../entities/user';
import { CreateUserService } from '../../services/users/createUser.service';
import { createUserSchema } from '../../validations/users/createUser.schema';
import {
  Controller,
  createErrorResponse,
  createValidateErrorResponse,
  ErrorResponse,
  HttpRequest,
  HttpResponse
} from '../controller';

export class CreateUserController implements Controller {
  constructor(private readonly service: CreateUserService) {}

  async handle(req: HttpRequest<User>): Promise<HttpResponse<User | ErrorResponse>> {
    try {
      const { error } = createUserSchema.validate(req.body);
      if (error) {
        return createValidateErrorResponse(error);
      }
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
