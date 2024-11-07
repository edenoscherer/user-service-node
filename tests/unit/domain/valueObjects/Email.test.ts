/* eslint-disable @typescript-eslint/no-explicit-any */
import { Email } from '@/domain/valueObjects/Email';

describe('Email', () => {
  it('should create Email with valid value', () => {
    const validEmail = 'test@example.com';
    const email = Email.create(validEmail);
    expect(email.value).toBe(validEmail);
  });

  it('should throw error for invalid email format', () => {
    const invalidEmail = 'invalid-email';
    expect(() => Email.create(invalidEmail)).toThrow('Invalid email address');
  });

  it('should throw error for empty string', () => {
    expect(() => Email.create('')).toThrow('Invalid email address');
  });

  it('should throw error for null value', () => {
    expect(() => Email.create(null as any)).toThrow('Invalid email address');
  });

  it('should throw error for undefined value', () => {
    expect(() => Email.create(undefined as any)).toThrow('Invalid email address');
  });

  it('should be immutable', () => {
    const validEmail = 'test@example.com';
    const email = Email.create(validEmail);
    expect(() => {
      (email as any)._value = 'new-email@example.com';
    }).toThrow();
  });

  it('should correctly compare two equal Emails', () => {
    const emailValue = 'test@example.com';
    const email1 = Email.create(emailValue);
    const email2 = Email.create(emailValue);
    expect(email1.equals(email2)).toBe(true);
  });

  it('should correctly compare two different Emails', () => {
    const email1 = Email.create('test1@example.com');
    const email2 = Email.create('test2@example.com');
    expect(email1.equals(email2)).toBe(false);
  });

  it('should return the correct string representation of the Email', () => {
    const emailValue = 'test@example.com';
    const email = Email.create(emailValue);
    expect(email.toString()).toBe(emailValue);
  });
});
