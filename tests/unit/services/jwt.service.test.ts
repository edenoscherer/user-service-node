/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtService } from '../../../src/services/jwt.service';
import { ENV } from '../../../src/config/env';

describe('JwtService', () => {
  let jwtService: JwtService;
  let userId: number;

  beforeEach(() => {
    ENV.JWT_SECRET = 'test-secret';
    ENV.JWT_EXPIRATION = '1h';
    jwtService = new JwtService();
    userId = 123;
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should generate a valid JWT token with payload', () => {
    const token = jwtService.generateToken(userId);
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3);
  });

  it('should verify and decode a valid token', () => {
    const token = jwtService.generateToken(userId);
    const decoded = jwtService.verifyToken(token);
    console.log(decoded);
    expect(decoded).toBeDefined();
    expect((decoded as any).id).toBe(userId);
  });

  it('should throw error when verifying invalid token', () => {
    const invalidToken = 'invalid.token.string';
    expect(() => jwtService.verifyToken(invalidToken)).toThrow();
  });

  it('should throw error when verifying expired token', () => {
    ENV.JWT_EXPIRATION = '0s';
    jwtService = new JwtService();
    const token = jwtService.generateToken(userId);
    expect(() => jwtService.verifyToken(token)).toThrow();
  });
});
