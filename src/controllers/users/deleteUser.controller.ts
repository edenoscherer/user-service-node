import { DeleteUserService } from '../../services/users/deleteUser.service';
import {
  Controller,
  createErrorResponse,
  ErrorResponse,
  HttpRequest,
  HttpResponse
} from '../controller';

export class DeleteUserController implements Controller {
  constructor(private readonly service: DeleteUserService) {}

  async handle(
    req: HttpRequest<undefined, undefined, { id: string }>
  ): Promise<HttpResponse<boolean | ErrorResponse>> {
    try {
      const id = req.params.id;
      const parsedId = parseInt(id);
      if (id.trim().length === 0 || isNaN(parsedId) || parsedId < 1) {
        return createErrorResponse(Error('Invlid user ID'), 400);
      }
      const result = await this.service.delete(parseInt(id), req.user?.id ?? null);

      return {
        statusCode: 200,
        body: result
      };
    } catch (error) {
      return createErrorResponse(error);
    }
  }
}
