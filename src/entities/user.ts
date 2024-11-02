import { RowDataPacket } from 'mysql2';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED'
}

interface Address {
  number?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface User {
  id?: number;
  cpf: string;
  name: string;
  birthDate: Date;
  address: Address;
  password?: string;
  status: UserStatus;
  createdAt?: Date;
  createdBy?: number;
  updatedAt?: Date;
  updatedBy?: number;
  deletedAt?: Date;
  deletedBy?: number;
}

export interface UserDB extends RowDataPacket, User {}
