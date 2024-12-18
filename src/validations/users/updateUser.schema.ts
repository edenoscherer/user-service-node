import Joi from 'joi';
import { User } from '../../entities/user';

export const updateUserSchema = Joi.object<User>({
  id: Joi.number().integer().required().min(1),
  name: Joi.string().optional().min(2).max(100),
  cpf: Joi.string().optional().min(11).max(11),
  birthDate: Joi.date().optional(),
  address: Joi.object({
    number: Joi.string().required().min(1).max(10),
    street: Joi.string().required().min(2).max(100),
    city: Joi.string().required().min(2),
    state: Joi.string().required().min(2),
    zipCode: Joi.string().required().min(8).max(9)
  }).optional(),
  password: Joi.string().optional().min(8).max(100),
  status: Joi.string().optional().valid('ACTIVE', 'INACTIVE', 'DELETED').default('ACTIVE'),
  createdAt: Joi.date().optional(),
  createdBy: Joi.number().integer().optional()
});
