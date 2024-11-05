import { User } from '../../entities/user';
import { UpdateUserService } from '../../services/users/updateUser.service';
import { updateUserSchema } from '../../validations/users/updateUser.schema';
import {
  Controller,
  createErrorResponse,
  createValidateErrorResponse,
  ErrorResponse,
  HttpRequest,
  HttpResponse
} from '../controller';

export class UpdateUserController implements Controller {
  constructor(private readonly service: UpdateUserService) {}

  async handle(
    req: HttpRequest<Partial<User>, undefined, { id: string }>
  ): Promise<HttpResponse<boolean | ErrorResponse>> {
    try {
      const { error } = updateUserSchema.validate({ id: req.params.id, ...req.body });
      if (error) {
        return createValidateErrorResponse(error);
      }
      const id = parseInt(req.params.id);
      const user = req.body;
      const result = await this.service.updateUser(id, user, req.user?.id);

      return {
        statusCode: 200,
        body: result
      };
    } catch (error) {
      return createErrorResponse(error);
    }
  }
}
