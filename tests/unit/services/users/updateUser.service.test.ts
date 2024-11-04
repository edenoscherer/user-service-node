import { UpdateUserService } from '../../../../src/services/users/updateUser.service';
import { EncryptionService } from '../../../../src/services/encryption.service';
import { GetUserService } from '../../../../src/services/users/getUser.service';
import { UpdateUserRepository } from '../../../../src/repositories/users/interfaces/updateUser.repository';
import { generateUser } from '../../../factories/generateUser';

jest.mock('../../../../src/services/encryption.service');

describe('UpdateUserService', () => {
  let updateUserService: UpdateUserService;
  let userRepository: jest.Mocked<UpdateUserRepository>;
  let getUserService: jest.Mocked<GetUserService>;

  beforeEach(() => {
    jest.clearAllMocks();
    userRepository = {
      updateUser: jest.fn()
    } as unknown as jest.Mocked<UpdateUserRepository>;
    getUserService = {
      getUser: jest.fn()
    } as unknown as jest.Mocked<GetUserService>;
    updateUserService = new UpdateUserService(getUserService, userRepository);
  });

  it('should hash password when password is provided', async () => {
    const mockUser = generateUser();
    const hashedPassword = 'hashedNewPassword';
    getUserService.getUser.mockResolvedValue(mockUser);
    userRepository.updateUser.mockResolvedValue(true);
    jest.spyOn(EncryptionService, 'hash').mockResolvedValue(hashedPassword);

    await updateUserService.updateUser(1, { password: 'newpass' });

    expect(EncryptionService.hash).toHaveBeenCalledWith('newpass');
    expect(userRepository.updateUser).toHaveBeenCalledWith(1, {
      ...mockUser,
      password: hashedPassword,
      updatedAt: expect.any(Date),
      updatedBy: undefined
    });
  });

  it('should not hash password when password is empty string', async () => {
    const mockUser = generateUser();
    getUserService.getUser.mockResolvedValue(mockUser);
    userRepository.updateUser.mockResolvedValue(true);

    await updateUserService.updateUser(1, { password: '  ' });

    expect(EncryptionService.hash).not.toHaveBeenCalled();
    expect(userRepository.updateUser).toHaveBeenCalledWith(1, {
      ...mockUser,
      password: '  ',
      updatedAt: expect.any(Date),
      updatedBy: undefined
    });
  });

  it('should update user with updatedBy when provided', async () => {
    const mockUser = generateUser();
    getUserService.getUser.mockResolvedValue(mockUser);
    userRepository.updateUser.mockResolvedValue(true);

    await updateUserService.updateUser(1, { name: 'John Updated' }, 2);

    expect(userRepository.updateUser).toHaveBeenCalledWith(1, {
      ...mockUser,
      name: 'John Updated',
      updatedAt: expect.any(Date),
      updatedBy: 2
    });
  });

  it('should throw error when user is not found', async () => {
    getUserService.getUser.mockRejectedValue(new Error('User not found'));
    const mockUser = generateUser();

    await expect(updateUserService.updateUser(9999, mockUser)).rejects.toThrow('User not found');
  });
});
