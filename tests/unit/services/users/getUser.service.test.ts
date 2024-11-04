import { GetUserService } from '../../../../src/services/users/getUser.service';
import { GetUserRepository } from '../../../../src/repositories/users/interfaces/getUser.repository';
import { generateUser } from '../../../factories/generateUser';

describe('GetUserService', () => {
  let getUserService: GetUserService;
  let repository: GetUserRepository;

  const mockUser = generateUser();

  beforeEach(() => {
    repository = {
      getUser: jest.fn()
    };
    getUserService = new GetUserService(repository);
  });

  it('should get user without password when showPass is false', async () => {
    (repository.getUser as jest.Mock).mockResolvedValue(mockUser);

    const result = await getUserService.getUser(1, false);

    expect(result).toEqual(mockUser);
    expect(repository.getUser).toHaveBeenCalledWith(1, false);
  });

  it('should get user with password when showPass is true', async () => {
    const userWithPassword = { ...mockUser, password: 'hashedPassword' };
    (repository.getUser as jest.Mock).mockResolvedValue(userWithPassword);

    const result = await getUserService.getUser(1, true);

    expect(result).toEqual(userWithPassword);
    expect(repository.getUser).toHaveBeenCalledWith(1, true);
  });

  it('should throw error when repository fails', async () => {
    const error = new Error('Database error');
    (repository.getUser as jest.Mock).mockRejectedValue(error);

    await expect(getUserService.getUser(1, false)).rejects.toThrow('Database error');
    expect(repository.getUser).toHaveBeenCalledWith(1, false);
  });
});
