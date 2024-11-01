import { MyTestFunction } from '../../src';

describe('MyTestFunction', () => {
  it('should return greeting with provided name', () => {
    const result = MyTestFunction('John');
    expect(result).toBe('hello John');
  });

  it('should handle empty string', () => {
    const result = MyTestFunction('');
    expect(result).toBe('hello ');
  });

  it('should handle special characters in name', () => {
    const result = MyTestFunction('John@123');
    expect(result).toBe('hello John@123');
  });

  it('should handle whitespace in name', () => {
    const result = MyTestFunction('John Doe');
    expect(result).toBe('hello John Doe');
  });
});
