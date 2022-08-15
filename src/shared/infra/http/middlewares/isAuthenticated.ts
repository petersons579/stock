import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { TokenPayload } from './Interface';
import AppError from '../../../errors/AppError';
import authConfig from '../../../../config/auth';

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('JWT Token não existe!', 401);

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('JWT Token invalido!', 401);
  }
}
