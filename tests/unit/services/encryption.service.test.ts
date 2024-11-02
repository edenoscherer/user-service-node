import { EncryptionService } from '../../../src/services/encryption.service';
import bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('EncryptionService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('hash', () => {
    it('should successfully hash a plain text string', async () => {
      const plainText = 'myPassword123';
      const hashedText = 'hashedPassword123';
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedText);

      const result = await EncryptionService.hash(plainText);

      expect(bcrypt.hash).toHaveBeenCalledWith(plainText, 10);
      expect(result).toBe(hashedText);
    });

    it('should throw error for empty string', async () => {
      await expect(EncryptionService.hash('')).rejects.toThrow(
        'Plain text cannot be empty or contain only whitespace'
      );
    });

    it('should throw error for string with only whitespace', async () => {
      await expect(EncryptionService.hash('   ')).rejects.toThrow(
        'Plain text cannot be empty or contain only whitespace'
      );
    });

    it('should throw error for undefined input', async () => {
      await expect(EncryptionService.hash(undefined as unknown as string)).rejects.toThrow(
        'Plain text cannot be empty or contain only whitespace'
      );
    });

    it('should handle bcrypt hash failure', async () => {
      const plainText = 'myPassword123';
      (bcrypt.hash as jest.Mock).mockRejectedValue(new Error('Hashing failed'));

      await expect(EncryptionService.hash(plainText)).rejects.toThrow('Hashing failed');
    });
  });
  describe('compare', () => {
    it('should return true when plain text matches hashed text', async () => {
      const plainText = 'myPassword123';
      const hashedText = 'hashedPassword123';
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await EncryptionService.compare(plainText, hashedText);

      expect(bcrypt.compare).toHaveBeenCalledWith(plainText, hashedText);
      expect(result).toBe(true);
    });

    it('should return false when plain text does not match hashed text', async () => {
      const plainText = 'wrongPassword';
      const hashedText = 'hashedPassword123';
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await EncryptionService.compare(plainText, hashedText);

      expect(bcrypt.compare).toHaveBeenCalledWith(plainText, hashedText);
      expect(result).toBe(false);
    });

    it('should throw error when plain text is empty', async () => {
      const hashedText = 'hashedPassword123';

      await expect(EncryptionService.compare('', hashedText)).rejects.toThrow(
        'Both plain text and hashed text are required'
      );
    });

    it('should throw error when hashed text is empty', async () => {
      const plainText = 'myPassword123';

      await expect(EncryptionService.compare(plainText, '')).rejects.toThrow(
        'Both plain text and hashed text are required'
      );
    });

    it('should throw error when both inputs are empty', async () => {
      await expect(EncryptionService.compare('', '')).rejects.toThrow(
        'Both plain text and hashed text are required'
      );
    });

    it('should handle bcrypt compare failure', async () => {
      const plainText = 'myPassword123';
      const hashedText = 'hashedPassword123';
      (bcrypt.compare as jest.Mock).mockRejectedValue(new Error('Comparison failed'));

      await expect(EncryptionService.compare(plainText, hashedText)).rejects.toThrow(
        'Comparison failed'
      );
    });
  });
});
