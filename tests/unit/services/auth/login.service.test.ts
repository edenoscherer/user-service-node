import { LoginService } from '../../../../src/services/auth/login.service';
import { EncryptionService } from '../../../../src/services/encryption.service';
import { JwtService } from '../../../../src/services/jwt.service';
import { GetUserService } from '../../../../src/services/users/getUser.service';
import { generateUser } from '../../../factories/generateUser';

describe('LoginService', () => {
  let loginService: LoginService;
  let getUserService: jest.Mocked<GetUserService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(() => {
    getUserService = {
      getUserByCpf: jest.fn()
    } as unknown as jest.Mocked<GetUserService>;

    jwtService = {
      generateToken: jest.fn()
    } as unknown as jest.Mocked<JwtService>;

    jest.spyOn(EncryptionService, 'compare');

    loginService = new LoginService(getUserService, jwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return JWT token when credentials are valid', async () => {
    const mockUser = generateUser();
    mockUser.password = 'hashedPassword';
    const expectedToken = 'jwt-token';

    getUserService.getUserByCpf.mockResolvedValue(mockUser);
    (EncryptionService.compare as jest.Mock).mockResolvedValue(true);
    jwtService.generateToken.mockReturnValue(expectedToken);

    const result = await loginService.login('12345678900', 'password123');

    expect(result).toBe(expectedToken);
    expect(getUserService.getUserByCpf).toHaveBeenCalledWith('12345678900', true);
    expect(EncryptionService.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
    expect(jwtService.generateToken).toHaveBeenCalledWith(mockUser.id);
  });

  it('should return false when password comparison fails', async () => {
    const mockUser = generateUser();
    mockUser.password = 'hashedPassword';

    getUserService.getUserByCpf.mockResolvedValue(mockUser);
    (EncryptionService.compare as jest.Mock).mockResolvedValue(false);

    const result = await loginService.login('12345678900', 'wrongPassword');

    expect(result).toBe(false);
    expect(jwtService.generateToken).not.toHaveBeenCalled();
  });

  it('should return false when user service throws error', async () => {
    getUserService.getUserByCpf.mockRejectedValue(new Error('User not found'));

    const result = await loginService.login('12345678900', 'password123');

    expect(result).toBe(false);
    expect(EncryptionService.compare).not.toHaveBeenCalled();
    expect(jwtService.generateToken).not.toHaveBeenCalled();
  });

  it('should return false when user has no password', async () => {
    const mockUser = generateUser();
    mockUser.password = undefined;

    getUserService.getUserByCpf.mockResolvedValue(mockUser);
    (EncryptionService.compare as jest.Mock).mockResolvedValue(false);

    const result = await loginService.login('12345678900', 'password123');

    expect(result).toBe(false);
    expect(EncryptionService.compare).toHaveBeenCalledWith('password123', '');
    expect(jwtService.generateToken).not.toHaveBeenCalled();
  });
});
