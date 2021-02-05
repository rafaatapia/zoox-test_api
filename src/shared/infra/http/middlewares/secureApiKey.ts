import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

export default function secureApiKey(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const key = request.headers['x-api-key'] as string;
  // Como se trata de uma aplicação para testes estou utilizando valores
  // estáticos em um array. Porém, em uma aplicação real, os valores poderiam
  // estar salvos no banco e a varíavel seria populada por uma consulta na base.
  const validKeys = ['abc123', 'cba321'];

  if (!key) {
    throw new AppError('Api Key não informada.', 401);
  }

  if (validKeys.includes(key)) {
    return next();
  }
  throw new AppError('Api Key inválida', 401);
}
