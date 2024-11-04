import { User } from '../../../../src/entities/user';
import { CreateUserService } from '../../../../src/services/users/createUser.service';
import { CreateUserRepository } from '../../../../src/repositories/users/interfaces/createUser.repository';
import { EncryptionService } from '../../../../src/services/encryption.service';
import { generateUser } from '../../../factories/generateUser';

describe('CreateUserService', () => {
  let createUserService: CreateUserService;
  let createUserRepository: CreateUserRepository;

  beforeEach(() => {
    createUserRepository = {
      createUser: jest.fn()
    };
    createUserService = new CreateUserService(createUserRepository);
  });

  it('should throw an error when password is empty string', async () => {
    const user: User = { ...generateUser(), password: '' };
    await expect(createUserService.create(user)).rejects.toThrow(
      'Password is required and cannot be blank'
    );
  });

  it('should throw an error when password is undefined', async () => {
    const user: User = { ...generateUser(), password: undefined };
    await expect(createUserService.create(user)).rejects.toThrow();
  });

  it('should create a user and return the user with an id', async () => {
    const user: User = generateUser();
    const hashedPassword = 'hashedPassword123';

    jest.spyOn(EncryptionService, 'hash').mockResolvedValue(hashedPassword);
    (createUserRepository.createUser as jest.Mock).mockResolvedValue(123);

    await createUserService.create(user);

    expect(EncryptionService.hash).toHaveBeenCalledWith(user.password);
    expect(createUserRepository.createUser).toHaveBeenCalledWith({
      ...user,
      password: hashedPassword
    });
  });

  it('should preserve all user properties except password when creating user', async () => {
    const user: User = generateUser();
    const hashedPassword = 'hashedPassword123';

    jest.spyOn(EncryptionService, 'hash').mockResolvedValue(hashedPassword);
    (createUserRepository.createUser as jest.Mock).mockResolvedValue(123);

    const result = await createUserService.create(user);

    expect(result).toEqual({
      ...user,
      id: 123,
      password: user.password
    });
  });

  it('should throw an error if createUserRepository.createUser fails', async () => {
    const user: User = generateUser();

    (createUserRepository.createUser as jest.Mock).mockRejectedValue(new Error('Repository error'));

    await expect(createUserService.create(user)).rejects.toThrow('Repository error');
  });
});
