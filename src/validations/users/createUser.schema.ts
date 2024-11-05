import Joi from 'joi';
import { User } from '../../entities/user';

export const createUserSchema = Joi.object<User>({
  name: Joi.string().required().min(2).max(100),
  cpf: Joi.string().required().min(11).max(11),
  birthDate: Joi.date().required(),
  address: Joi.object({
    number: Joi.string().required().min(1).max(10),
    street: Joi.string().required().min(2).max(100),
    city: Joi.string().required().min(2),
    state: Joi.string().required().min(2),
    zipCode: Joi.string().required().min(8).max(9)
  }).required(),
  password: Joi.string().required().min(8).max(100),
  status: Joi.string().required().valid('ACTIVE', 'INACTIVE', 'DELETED').default('ACTIVE')
});
