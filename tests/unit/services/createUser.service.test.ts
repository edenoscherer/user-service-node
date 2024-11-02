import { User, UserStatus } from '../../../src/entities/user';
import { CreateUserService } from '../../../src/services/createUser.service';
import { CreateUserRepository } from '../../../src/repositories/users/interfaces/createUser.repository';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { EncryptionService } from '../../../src/services/encryption.service';

const generateUser = (): User => {
  return {
    cpf: faker.string.numeric(11),
    name: faker.person.fullName(),
    birthDate: faker.date.birthdate(),
    address: {
      number: faker.location.buildingNumber(),
      street: faker.location.street(),
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      zipCode: faker.location.zipCode()
    },
    password: faker.internet.password(),
    status: faker.helpers.enumValue(UserStatus),
    createdAt: new Date(),
    createdBy: 1
  };
};

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
