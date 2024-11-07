/* eslint-disable @typescript-eslint/no-explicit-any */
import { CPF } from '@/domain/valueObjects/CPF';

describe('CPF', () => {
  it('should create CPF with valid value', () => {
    const validCPF = '123.456.789-09';
    const cpf = CPF.create(validCPF);
    expect(cpf.value).toBe(validCPF);
  });

  it('should throw error for invalid CPF format', () => {
    const invalidCPF = '123.456.789-00';
    expect(() => CPF.create(invalidCPF)).toThrow('Invalid CPF');
  });

  it('should throw error for empty string', () => {
    expect(() => CPF.create('')).toThrow('Invalid CPF');
  });

  it('should throw error for null value', () => {
    expect(() => CPF.create(null as any)).toThrow('Invalid CPF');
  });

  it('should throw error for undefined value', () => {
    expect(() => CPF.create(undefined as any)).toThrow('Invalid CPF');
  });

  it('should throw error for CPF with all digits equal', () => {
    const invalidCPF = '111.111.111-11';
    expect(() => CPF.create(invalidCPF)).toThrow('Invalid CPF');
  });
});
