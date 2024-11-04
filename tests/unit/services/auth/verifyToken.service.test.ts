/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENV } from '../../../../src/config/env';
import { VerifyTokenService } from '../../../../src/services/auth/verifyToken.service';
import { JwtService } from '../../../../src/services/jwt.service';

describe('VerifyTokenService', () => {
  const jwtSecret = 'test-secret';

  let verifyTokenService: VerifyTokenService;
  let jwtService: JwtService;

  beforeEach(() => {
    ENV.JWT_SECRET = jwtSecret;
    jwtService = new JwtService();
    verifyTokenService = new VerifyTokenService(jwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully verify a valid token', () => {
    const payload = { id: 123 };
    const token = jwtService.generateToken(payload.id);

    const result = verifyTokenService.verify(token);

    expect(result).toMatchObject(payload);
  });

  it('should throw error when token is invalid', () => {
    const invalidToken = 'invalid-token';

    expect(() => {
      verifyTokenService.verify(invalidToken);
    }).toThrow();
  });

  it('should throw error when token is expired', () => {
    const payload = { userId: 123, role: 'user' };
    ENV.JWT_EXPIRATION = '0s';
    const token = new JwtService().generateToken(payload.userId);

    expect(() => {
      verifyTokenService.verify(token);
    }).toThrow();
  });

  it('should throw error when JWT_SECRET is not set', () => {
    const token = new JwtService().generateToken(123);
    ENV.JWT_SECRET = undefined as any;

    expect(() => {
      new VerifyTokenService(new JwtService()).verify(token);
    }).toThrow('secret or public key must be provided');
  });
});
