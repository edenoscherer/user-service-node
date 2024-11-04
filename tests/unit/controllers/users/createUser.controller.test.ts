import { CreateUserController } from '../../../../src/controllers/users/createUser.controller';
import { CreateUserService } from '../../../../src/services/users/createUser.service';
import { User } from '../../../../src/entities/user';
import { HttpRequest } from '../../../../src/controllers/controller';
import { generateUser } from '../../../factories/generateUser';

describe('CreateUserController', () => {
  let createUserController: CreateUserController;
  let createUserService: CreateUserService;

  beforeEach(() => {
    createUserService = {
      create: jest.fn()
    } as unknown as CreateUserService;
    createUserController = new CreateUserController(createUserService);
  });

  it('should return 201 with created user when successful', async () => {
    const requestUser = generateUser();
    const loggedUserId = 123;
    const request: HttpRequest<User> = {
      body: requestUser,
      user: { id: loggedUserId },
      queryParams: undefined,
      params: undefined,
      headers: {}
    };

    const createdUser = { ...requestUser, id: 456 };
    (createUserService.create as jest.Mock).mockResolvedValue(createdUser);

    const response = await createUserController.handle(request);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(createdUser);
    expect(createUserService.create).toHaveBeenCalledWith({
      ...requestUser,
      createdBy: loggedUserId
    });
  });

  it('should handle request without logged user', async () => {
    const requestUser = generateUser();
    const request: HttpRequest<User> = {
      body: requestUser,
      queryParams: undefined,
      params: undefined,
      headers: {}
    };

    const createdUser = { ...requestUser, id: 456 };
    (createUserService.create as jest.Mock).mockResolvedValue(createdUser);

    const response = await createUserController.handle(request);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(createdUser);
    expect(createUserService.create).toHaveBeenCalledWith({
      ...requestUser,
      createdBy: undefined
    });
  });

  it('should return error response when service throws error', async () => {
    const request: HttpRequest<User> = {
      body: generateUser(),
      queryParams: undefined,
      params: undefined,
      headers: {}
    };
    const error = new Error('Service error');
    (createUserService.create as jest.Mock).mockRejectedValue(error);

    const response = await createUserController.handle(request);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      error: 'Error',
      message: 'Service error'
    });
  });
});
