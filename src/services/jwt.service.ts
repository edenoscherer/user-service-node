import { ENV } from '../config/env';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: number;
  iat: number;
  exp: number;
}

export class JwtService {
  private readonly JWT_SECRET: string;
  private readonly JWT_EXPIRATION: string;
  constructor() {
    this.JWT_SECRET = ENV.JWT_SECRET;
    this.JWT_EXPIRATION = ENV.JWT_EXPIRATION;
  }

  generateToken(id: number): string {
    return jwt.sign({ id }, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRATION
    });
  }

  verifyToken(token: string): { id: number } | false {
    const decoded = jwt.verify(token, this.JWT_SECRET) as TokenPayload | undefined;
    if (decoded?.id) {
      return { id: decoded.id };
    }
    return false;
  }
}
