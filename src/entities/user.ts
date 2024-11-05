import { RowDataPacket } from 'mysql2';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED'
}

export interface Address {
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

export interface UserDB extends RowDataPacket {
  id?: number;
  cpf: string;
  name: string;
  birth_date: Date;
  address: Address;
  password_hash?: string;
  status: UserStatus;
  created_at?: Date;
  created_by?: number;
  updated_at?: Date;
  updated_by?: number;
  deleted_at?: Date;
  deleted_by?: number;
}

export const userDBToUser = (userDb: UserDB, showPass = false): User => {
  return {
    id: userDb.id,
    cpf: userDb.cpf,
    name: userDb.name,
    status: userDb.status,
    birthDate: userDb.birth_date,
    address: userDb.address,
    password: showPass ? userDb.password_hash : undefined,
    createdAt: userDb.created_at,
    createdBy: userDb.created_by,
    updatedAt: userDb.updated_at,
    updatedBy: userDb.updated_by,
    deletedAt: userDb.deleted_at,
    deletedBy: userDb.deleted_by
  };
};
