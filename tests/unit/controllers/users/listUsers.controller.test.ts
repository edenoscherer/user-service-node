import {
  ListUsersCotroller,
  ListUsersParams
} from '../../../../src/controllers/users/listUsers.controller';
import { ListUsersService } from '../../../../src/services/users/listUsers.service';
import { HttpRequest } from '../../../../src/controllers/controller';
import { UserStatus } from '../../../../src/entities/user';

describe('ListUsersController', () => {
  let listUsersService: ListUsersService;
  let listUsersController: ListUsersCotroller;

  beforeEach(() => {
    listUsersService = {
      listAll: jest.fn()
    } as unknown as ListUsersService;
    listUsersController = new ListUsersCotroller(listUsersService);
  });

  it('should return 200 and the result when service.listAll is successful', async () => {
    const mockResult = { users: [], total: 0 };
    (listUsersService.listAll as jest.Mock).mockResolvedValue(mockResult);

    const req: HttpRequest<undefined, ListUsersParams> = {
      queryParams: {
        name: 'John',
        cpf: '12345678900',
        status: UserStatus.ACTIVE,
        page: '1',
        limit: '10'
      },
      body: undefined,
      params: undefined,
      headers: {}
    };

    const response = await listUsersController.handle(req);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(mockResult);
    expect(listUsersService.listAll).toHaveBeenCalledWith({
      name: 'John',
      cpf: '12345678900',
      status: UserStatus.ACTIVE,
      page: 1,
      limit: 10
    });
  });

  it('should return an error response when service.listAll throws an error', async () => {
    const mockError = new Error('Service error');
    (listUsersService.listAll as jest.Mock).mockRejectedValue(mockError);

    const req: HttpRequest<undefined, ListUsersParams> = {
      queryParams: {},
      body: undefined,
      params: undefined,
      headers: {}
    };

    const response = await listUsersController.handle(req);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      error: 'Error',
      message: 'Service error'
    });
  });

  it('should parse page and limit as numbers', async () => {
    const mockResult = { users: [], total: 0 };
    (listUsersService.listAll as jest.Mock).mockResolvedValue(mockResult);

    const req: HttpRequest<undefined, ListUsersParams> = {
      queryParams: {
        page: '2',
        limit: '5'
      },
      body: undefined,
      params: undefined,
      headers: {}
    };

    const response = await listUsersController.handle(req);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(mockResult);
    expect(listUsersService.listAll).toHaveBeenCalledWith({
      name: undefined,
      cpf: undefined,
      status: undefined,
      page: 2,
      limit: 5
    });
  });

  it('should handle missing query parameters', async () => {
    const mockResult = { users: [], total: 0 };
    (listUsersService.listAll as jest.Mock).mockResolvedValue(mockResult);

    const req: HttpRequest<undefined, ListUsersParams> = {
      queryParams: {},
      body: undefined,
      params: undefined,
      headers: {}
    };

    const response = await listUsersController.handle(req);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(mockResult);
    expect(listUsersService.listAll).toHaveBeenCalledWith({
      name: undefined,
      cpf: undefined,
      status: undefined,
      page: undefined,
      limit: undefined
    });
  });
});
