import { UpdateUserController } from '../../../../src/controllers/users/updateUser.controller';
import { UpdateUserService } from '../../../../src/services/users/updateUser.service';
import { HttpRequest } from '../../../../src/controllers/controller';
import { User } from '../../../../src/entities/user';

describe('UpdateUserController', () => {
  let updateUserService: UpdateUserService;
  let updateUserController: UpdateUserController;

  beforeEach(() => {
    updateUserService = {
      updateUser: jest.fn()
    } as unknown as UpdateUserService;
    updateUserController = new UpdateUserController(updateUserService);
  });

  it('should return 200 and true when service.updateUser is successful', async () => {
    (updateUserService.updateUser as jest.Mock).mockResolvedValue(true);

    const req: HttpRequest<Partial<User>, undefined, { id: string }> = {
      params: { id: '1' },
      body: { name: 'John Doe' },
      user: { id: 2 },
      queryParams: undefined,
      headers: {}
    };

    const response = await updateUserController.handle(req);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(true);
    expect(updateUserService.updateUser).toHaveBeenCalledWith(1, { name: 'John Doe' }, 2);
  });

  it('should return 400 when id is empty', async () => {
    const req: HttpRequest<Partial<User>, undefined, { id: string }> = {
      params: { id: ' ' },
      body: { name: 'John Doe' },
      queryParams: undefined,
      headers: {}
    };

    const response = await updateUserController.handle(req);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: 'Error',
      message: 'Invlid user ID'
    });
  });

  it('should return 400 when id is not a number', async () => {
    const req: HttpRequest<Partial<User>, undefined, { id: string }> = {
      params: { id: 'abc' },
      body: { name: 'John Doe' },
      queryParams: undefined,
      headers: {}
    };

    const response = await updateUserController.handle(req);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: 'Error',
      message: 'Invlid user ID'
    });
  });

  it('should return 400 when id is less than 1', async () => {
    const req: HttpRequest<Partial<User>, undefined, { id: string }> = {
      params: { id: '0' },
      body: { name: 'John Doe' },
      queryParams: undefined,
      headers: {}
    };

    const response = await updateUserController.handle(req);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: 'Error',
      message: 'Invlid user ID'
    });
  });

  it('should return 500 when service.updateUser throws an error', async () => {
    const mockError = new Error('Service error');
    (updateUserService.updateUser as jest.Mock).mockRejectedValue(mockError);

    const req: HttpRequest<Partial<User>, undefined, { id: string }> = {
      params: { id: '1' },
      body: { name: 'John Doe' },
      queryParams: undefined,
      headers: {}
    };

    const response = await updateUserController.handle(req);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      error: 'Error',
      message: 'Service error'
    });
  });
});
