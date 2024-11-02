import { User, UserStatus } from '../../../src/entities/user';
import { CreateUserService } from '../../../src/services/createUser.service';
import { CreateUserRepository } from '../../../src/repositories/users/interfaces/createUser.repository';
import { faker } from '@faker-js/faker/locale/pt_BR';

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

  it('should create a user and return the user with an id', async () => {
    const user: User = generateUser();
    const createdUser: User = { ...user, id: 123 };

    (createUserRepository.createUser as jest.Mock).mockResolvedValue(123);

    const result = await createUserService.create(user);

    expect(createUserRepository.createUser).toHaveBeenCalledWith(user);
    expect(result).toEqual(createdUser);
  });

  it('should throw an error if createUserRepository.createUser fails', async () => {
    const user: User = generateUser();

    (createUserRepository.createUser as jest.Mock).mockRejectedValue(new Error('Repository error'));

    await expect(createUserService.create(user)).rejects.toThrow('Repository error');
  });
});
