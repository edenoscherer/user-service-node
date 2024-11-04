import { UserStatus } from '../../entities/user';
import { ListUsersResult, ListUsersService } from '../../services/listUsers.service';
import {
  Controller,
  createErrorResponse,
  ErrorResponse,
  HttpRequest,
  HttpResponse
} from '../controller';

export interface ListUsersParams {
  name?: string;
  cpf?: string;
  status?: UserStatus;
  page?: string;
  limit?: string;
}

export class ListUsersCotroller implements Controller {
  constructor(private readonly service: ListUsersService) {}

  async handle(
    req: HttpRequest<undefined, ListUsersParams>
  ): Promise<HttpResponse<ListUsersResult | ErrorResponse>> {
    try {
      const queryParams = {
        name: req.queryParams.name,
        cpf: req.queryParams.cpf,
        status: req.queryParams.status,
        page: req.queryParams.page?.length ? parseInt(req.queryParams.page) : undefined,
        limit: req.queryParams.limit?.length ? parseInt(req.queryParams.limit) : undefined
      };
      const result = await this.service.listAll(queryParams);

      return {
        statusCode: 200,
        body: result
      };
    } catch (error) {
      return createErrorResponse(error);
    }
  }
}
