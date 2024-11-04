import { ListUsersService } from '../../../../src/services/users/listUsers.service';
import { ListUsersRepository } from '../../../../src/repositories/users/interfaces/listUsers.repository';
import { User, UserStatus } from '../../../../src/entities/user';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { ListUsersParams } from '../../../../src/services/users/listUsers.service';

describe('ListUsersService', () => {
  let listUsersService: ListUsersService;
  let listUsersRepository: ListUsersRepository;
  let params: ListUsersParams;

  const generateUser = (): User => ({
    id: faker.number.int(),
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
  });

  beforeEach(() => {
    params = {};
    listUsersRepository = {
      listUsers: jest.fn(),
      countUsers: jest.fn()
    };
    listUsersService = new ListUsersService(listUsersRepository);
  });

  it('should return empty array when no users exist', async () => {
    (listUsersRepository.countUsers as jest.Mock).mockResolvedValue(0);
    const result = await listUsersService.listAll(params);
    expect(result).toEqual({ data: [], page: 1, limit: 10, total: 0 });
    expect(listUsersRepository.countUsers).toHaveBeenCalledTimes(1);
    expect(listUsersRepository.listUsers).toHaveBeenCalledTimes(0);
  });

  it('should return array of users when users exist', async () => {
    const mockUsers = [generateUser(), generateUser()];
    (listUsersRepository.countUsers as jest.Mock).mockResolvedValue(2);
    (listUsersRepository.listUsers as jest.Mock).mockResolvedValue(mockUsers);
    const result = await listUsersService.listAll(params);
    expect(result).toEqual({ data: mockUsers, page: 1, limit: 10, total: 2 });
    expect(listUsersRepository.countUsers).toHaveBeenCalledTimes(1);
    expect(listUsersRepository.listUsers).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if repository fails', async () => {
    (listUsersRepository.countUsers as jest.Mock).mockRejectedValue(new Error('Database error'));
    await expect(listUsersService.listAll(params)).rejects.toThrow('Database error');
  });

  it('should return the page number 2 and consult the bank with offset 10', async () => {
    params.page = 2;
    const mockUsers = [generateUser(), generateUser()];
    (listUsersRepository.countUsers as jest.Mock).mockResolvedValue(2);
    (listUsersRepository.listUsers as jest.Mock).mockResolvedValue(mockUsers);
    const result = await listUsersService.listAll(params);
    expect(result).toEqual({ data: mockUsers, page: 2, limit: 10, total: 2 });
    expect(listUsersRepository.countUsers).toHaveBeenCalledTimes(1);
    expect(listUsersRepository.countUsers).toHaveBeenCalledWith({
      status: undefined,
      name: undefined,
      cpf: undefined
    });
    expect(listUsersRepository.listUsers).toHaveBeenCalledTimes(1);
    expect(listUsersRepository.listUsers).toHaveBeenCalledWith({
      limit: 10,
      offset: 10,
      status: undefined,
      name: undefined,
      cpf: undefined
    });
  });

  it('should return the page number 2 and consult the bank with limit 2', async () => {
    params.limit = 2;
    const mockUsers = [generateUser(), generateUser()];
    (listUsersRepository.countUsers as jest.Mock).mockResolvedValue(2);
    (listUsersRepository.listUsers as jest.Mock).mockResolvedValue(mockUsers);
    const result = await listUsersService.listAll(params);
    expect(result).toEqual({ data: mockUsers, page: 1, limit: 2, total: 2 });
    expect(listUsersRepository.countUsers).toHaveBeenCalledTimes(1);
    expect(listUsersRepository.countUsers).toHaveBeenCalledWith({
      status: undefined,
      name: undefined,
      cpf: undefined
    });
    expect(listUsersRepository.listUsers).toHaveBeenCalledTimes(1);
    expect(listUsersRepository.listUsers).toHaveBeenCalledWith({
      limit: 2,
      offset: 0,
      status: undefined,
      name: undefined,
      cpf: undefined
    });
  });
  it('should consult the bank with ACTIVE status', async () => {
    params.status = UserStatus.ACTIVE;
    const mockUsers = [generateUser(), generateUser()];
    (listUsersRepository.countUsers as jest.Mock).mockResolvedValue(2);
    (listUsersRepository.listUsers as jest.Mock).mockResolvedValue(mockUsers);
    const result = await listUsersService.listAll(params);
    expect(result).toEqual({ data: mockUsers, page: 1, limit: 10, total: 2 });
    expect(listUsersRepository.countUsers).toHaveBeenCalledTimes(1);
    expect(listUsersRepository.countUsers).toHaveBeenCalledWith({
      status: UserStatus.ACTIVE,
      name: undefined,
      cpf: undefined
    });
    expect(listUsersRepository.listUsers).toHaveBeenCalledTimes(1);
    expect(listUsersRepository.listUsers).toHaveBeenCalledWith({
      limit: 10,
      offset: 0,
      status: UserStatus.ACTIVE,
      name: undefined,
      cpf: undefined
    });
  });
  it('should consult the bank with name Edeno', async () => {
    params.name = 'edeno';
    const mockUsers = [generateUser(), generateUser()];
    (listUsersRepository.countUsers as jest.Mock).mockResolvedValue(2);
    (listUsersRepository.listUsers as jest.Mock).mockResolvedValue(mockUsers);
    const result = await listUsersService.listAll(params);
    expect(result).toEqual({ data: mockUsers, page: 1, limit: 10, total: 2 });
    expect(listUsersRepository.countUsers).toHaveBeenCalledTimes(1);
    expect(listUsersRepository.countUsers).toHaveBeenCalledWith({
      status: undefined,
      name: 'edeno',
      cpf: undefined
    });
    expect(listUsersRepository.listUsers).toHaveBeenCalledTimes(1);
    expect(listUsersRepository.listUsers).toHaveBeenCalledWith({
      limit: 10,
      offset: 0,
      status: undefined,
      name: 'edeno',
      cpf: undefined
    });
  });
  it('should consult the bank with cpf 0000', async () => {
    params.cpf = '0000';
    const mockUsers = [generateUser(), generateUser()];
    (listUsersRepository.countUsers as jest.Mock).mockResolvedValue(2);
    (listUsersRepository.listUsers as jest.Mock).mockResolvedValue(mockUsers);
    const result = await listUsersService.listAll(params);
    expect(result).toEqual({ data: mockUsers, page: 1, limit: 10, total: 2 });
    expect(listUsersRepository.countUsers).toHaveBeenCalledTimes(1);
    expect(listUsersRepository.countUsers).toHaveBeenCalledWith({
      status: undefined,
      name: undefined,
      cpf: '0000'
    });
    expect(listUsersRepository.listUsers).toHaveBeenCalledTimes(1);
    expect(listUsersRepository.listUsers).toHaveBeenCalledWith({
      limit: 10,
      offset: 0,
      status: undefined,
      name: undefined,
      cpf: '0000'
    });
  });
});
