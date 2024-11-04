import { User } from '../../entities/user';
import { GetUserService } from '../../services/users/getUser.service';
import {
  Controller,
  createErrorResponse,
  ErrorResponse,
  HttpRequest,
  HttpResponse
} from '../controller';

export class GetUserCotroller implements Controller {
  constructor(private readonly service: GetUserService) {}

  async handle(
    req: HttpRequest<undefined, undefined, { id: string }>
  ): Promise<HttpResponse<User | ErrorResponse>> {
    try {
      const id = req.params.id;
      const parsedId = parseInt(id);
      if (id.trim().length === 0 || isNaN(parsedId) || parsedId < 1) {
        return createErrorResponse(Error('Invlid user ID'), 400);
      }
      const result = await this.service.getUser(parseInt(id), false);

      return {
        statusCode: 200,
        body: result
      };
    } catch (error) {
      return createErrorResponse(error);
    }
  }
}
