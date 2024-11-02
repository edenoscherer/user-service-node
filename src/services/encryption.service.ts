import * as bcrypt from 'bcrypt';

export class EncryptionService {
  static async hash(plainText: string): Promise<string> {
    if (!plainText?.trim()) {
      throw new Error('Plain text cannot be empty or contain only whitespace');
    }
    const saltRounds = 10;
    const hashedText = await bcrypt.hash(plainText, saltRounds);
    return hashedText;
  }

  static async compare(plainText: string, hashedText: string): Promise<boolean> {
    if (!plainText || !hashedText) {
      throw new Error('Both plain text and hashed text are required');
    }
    const isMatch = await bcrypt.compare(plainText, hashedText);
    return isMatch;
  }
}
