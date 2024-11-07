/* eslint-disable @typescript-eslint/no-explicit-any */
import { UUID } from '@/domain/valueObjects/UUID';
import { v4 as uuidv4 } from 'uuid';

describe('UUID', () => {
  it('should create UUID with valid value', () => {
    const validUUID = uuidv4();
    const uuid = new UUID(validUUID);
    expect(uuid.value).toBe(validUUID);
  });

  it('should throw error for invalid UUID format', () => {
    const invalidUUID = 'invalid-uuid';
    expect(() => new UUID(invalidUUID)).toThrow();
  });

  it('should throw error for empty string', () => {
    expect(() => new UUID('')).toThrow();
  });

  it('should throw error for null value', () => {
    expect(() => new UUID(null as any)).toThrow();
  });

  it('should throw error for undefined value', () => {
    expect(() => new UUID(undefined as any)).toThrow();
  });

  it('should be immutable', () => {
    const validUUID = uuidv4();
    const uuid = new UUID(validUUID);
    expect(() => {
      (uuid as any).value = 'new-value';
    }).toThrow();
  });

  it('should accept uppercase UUID', () => {
    const uppercaseUUID = uuidv4().toUpperCase();
    const uuid = new UUID(uppercaseUUID);
    expect(uuid.value).toBe(uppercaseUUID);
  });

  it('should create a new UUID using static create method', () => {
    const uuid = UUID.create();
    expect(uuid.value).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });

  it('should correctly compare two equal UUIDs', () => {
    const uuidValue = uuidv4();
    const uuid1 = new UUID(uuidValue);
    const uuid2 = new UUID(uuidValue);
    expect(uuid1.equals(uuid2)).toBe(true);
  });

  it('should correctly compare two different UUIDs', () => {
    const uuid1 = new UUID(uuidv4());
    const uuid2 = new UUID(uuidv4());
    expect(uuid1.equals(uuid2)).toBe(false);
  });
});
