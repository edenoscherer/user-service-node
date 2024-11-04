import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../services/jwt.service';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Ununauthorized' });
  }

  const [, token] = authorization.split(' ');

  try {
    const service = new JwtService();
    const verifyResult = service.verifyToken(token);
    if (!verifyResult || !verifyResult.id) {
      return res.status(401).json({ error: 'Ununauthorized' });
    }
    req.userId = verifyResult.id;

    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: 'Invalid token' });
  }
};
