import { DeleteUserService } from '../../../../src/services/users/deleteUser.service';
import { GetUserService } from '../../../../src/services/users/getUser.service';
import { User, UserStatus } from '../../../../src/entities/user';
import { generateUser } from '../../../factories/generateUser';
import { DeleteUserRepository } from '../../../../src/repositories/users/interfaces/deleteUser.repository';

describe('DeleteUserService', () => {
  let deleteUserService: DeleteUserService;
  let userRepository: jest.Mocked<DeleteUserRepository>;
  let getUserService: jest.Mocked<GetUserService>;

  beforeEach(() => {
    userRepository = {
      deleteUser: jest.fn()
    };
    getUserService = {
      getUser: jest.fn()
    } as unknown as jest.Mocked<GetUserService>;

    deleteUserService = new DeleteUserService(getUserService, userRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully delete a user when valid ID is provided', async () => {
    const mockUser = generateUser();
    mockUser.status = UserStatus.ACTIVE;
    getUserService.getUser.mockResolvedValue(mockUser);
    userRepository.deleteUser.mockResolvedValue(true);

    await deleteUserService.delete(1, 15);

    expect(getUserService.getUser).toHaveBeenCalledWith(1, false);
    expect(userRepository.deleteUser).toHaveBeenCalledWith(1, 15);
  });

  it('should throw error when user is not found', async () => {
    getUserService.getUser.mockRejectedValue(new Error('User not found'));

    await expect(deleteUserService.delete(1, null)).rejects.toThrow('User not found');
    expect(userRepository.deleteUser).not.toHaveBeenCalled();
  });

  it('should throw error when repository delete fails', async () => {
    const mockUser: User = generateUser();
    mockUser.status = UserStatus.ACTIVE;
    getUserService.getUser.mockResolvedValue(mockUser);
    userRepository.deleteUser.mockRejectedValue(new Error('Database error'));

    await expect(deleteUserService.delete(1, null)).rejects.toThrow('Database error');
  });

  it('should generate an error when a user is already deleted', async () => {
    const mockUser: User = generateUser();
    mockUser.status = UserStatus.DELETED;
    getUserService.getUser.mockResolvedValue(mockUser);

    await expect(deleteUserService.delete(1, 15)).rejects.toThrow('User is already deleted');

    expect(getUserService.getUser).toHaveBeenCalledWith(1, false);
    expect(userRepository.deleteUser).not.toHaveBeenCalled();
  });
});
