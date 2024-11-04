import { User } from '../../entities/user';
import { UpdateUserService } from '../../services/users/updateUser.service';
import {
  Controller,
  createErrorResponse,
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
      const id = req.params.id;
      const parsedId = parseInt(id);
      if (id.trim().length === 0 || isNaN(parsedId) || parsedId < 1) {
        return createErrorResponse(Error('Invlid user ID'), 400);
      }
      const user = req.body;
      const result = await this.service.updateUser(parseInt(id), user, req.user?.id);

      return {
        statusCode: 200,
        body: result
      };
    } catch (error) {
      return createErrorResponse(error);
    }
  }
}
