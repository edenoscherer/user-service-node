import { User, UserStatus } from '../../src/entities/user';
import { faker } from '@faker-js/faker/locale/pt_BR';

export const generateUser = (): User => {
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
