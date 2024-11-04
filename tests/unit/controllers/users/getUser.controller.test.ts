import { ErrorResponse } from '../../../../src/controllers/controller';
import { GetUserCotroller } from '../../../../src/controllers/users/getUser.controller';
import { User } from '../../../../src/entities/user';
import { GetUserService } from '../../../../src/services/users/getUser.service';
import { generateUser } from '../../../factories/generateUser';

describe('GetUserController', () => {
  let controller: GetUserCotroller;
  let userService: jest.Mocked<GetUserService>;

  beforeEach(() => {
    userService = {
      getUser: jest.fn()
    } as unknown as jest.Mocked<GetUserService>;
    controller = new GetUserCotroller(userService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return user when valid ID is provided', async () => {
    const mockUser: User = generateUser();
    userService.getUser.mockResolvedValue(mockUser);

    const result = await controller.handle({
      params: { id: '1' },
      body: undefined,
      queryParams: undefined,
      headers: {}
    });

    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(mockUser);
    expect(userService.getUser).toHaveBeenCalledWith(1, false);
  });

  it('should return error response when ID is empty', async () => {
    const result = await controller.handle({
      params: { id: ' ' },
      body: undefined,
      queryParams: undefined,
      headers: {}
    });

    expect(result.statusCode).toBe(400);
    expect((result.body as ErrorResponse).message).toBe('Invlid user ID');
    expect(userService.getUser).not.toHaveBeenCalled();
  });

  it('should return error response when ID is less than 1', async () => {
    const result = await controller.handle({
      params: { id: '0' },
      body: undefined,
      queryParams: undefined,
      headers: {}
    });

    expect(result.statusCode).toBe(400);
    expect((result.body as ErrorResponse).message).toBe('Invlid user ID');
    expect(userService.getUser).not.toHaveBeenCalled();
  });

  it('should return error response when service throws error', async () => {
    userService.getUser.mockRejectedValue(new Error('User not found'));

    const result = await controller.handle({
      params: { id: '1' },
      body: undefined,
      queryParams: undefined,
      headers: {}
    });

    expect(result.statusCode).toBe(500);
    expect((result.body as ErrorResponse).message).toBe('User not found');
  });

  it('should return error response when ID is not a valid number', async () => {
    const result = await controller.handle({
      params: { id: 'abc' },
      body: undefined,
      queryParams: undefined,
      headers: {}
    });

    expect(result.statusCode).toBe(400);
    expect((result.body as ErrorResponse).message).toBe('Invlid user ID');
    expect(userService.getUser).not.toHaveBeenCalled();
  });
});
