import { DeleteUserController } from '../../../../src/controllers/users/deleteUser.controller';
import { DeleteUserService } from '../../../../src/services/users/deleteUser.service';
import { ErrorResponse } from '../../../../src/controllers/controller';

describe('DeleteUserController', () => {
  let controller: DeleteUserController;
  let userService: jest.Mocked<DeleteUserService>;

  beforeEach(() => {
    userService = {
      delete: jest.fn()
    } as unknown as jest.Mocked<DeleteUserService>;
    controller = new DeleteUserController(userService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully delete user when valid ID is provided', async () => {
    userService.delete.mockResolvedValue(true);

    const result = await controller.handle({
      params: { id: '1' },
      body: undefined,
      queryParams: undefined,
      headers: {},
      user: { id: 123 }
    });

    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(true);
    expect(userService.delete).toHaveBeenCalledWith(1, 123);
  });

  it('should handle deletion without logged in user', async () => {
    userService.delete.mockResolvedValue(true);

    const result = await controller.handle({
      params: { id: '1' },
      body: undefined,
      queryParams: undefined,
      headers: {}
    });

    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(true);
    expect(userService.delete).toHaveBeenCalledWith(1, null);
  });

  it('should return error response when service fails', async () => {
    userService.delete.mockRejectedValue(new Error('Failed to delete user'));

    const result = await controller.handle({
      params: { id: '1' },
      body: undefined,
      queryParams: undefined,
      headers: {}
    });

    expect(result.statusCode).toBe(500);
    expect((result.body as ErrorResponse).message).toBe('Failed to delete user');
  });

  it('should return error for non-numeric ID', async () => {
    const result = await controller.handle({
      params: { id: 'abc' },
      body: undefined,
      queryParams: undefined,
      headers: {}
    });

    expect(result.statusCode).toBe(400);
    expect((result.body as ErrorResponse).message).toBe('Invlid user ID');
    expect(userService.delete).not.toHaveBeenCalled();
  });

  it('should return error for negative ID', async () => {
    const result = await controller.handle({
      params: { id: '-1' },
      body: undefined,
      queryParams: undefined,
      headers: {}
    });

    expect(result.statusCode).toBe(400);
    expect((result.body as ErrorResponse).message).toBe('Invlid user ID');
    expect(userService.delete).not.toHaveBeenCalled();
  });
});
