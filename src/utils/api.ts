import { Request, Response, NextFunction } from 'express';

export const statusCodes = { ok: 200, unauthorized: 401, forbidden: 403, notFound: 404, internalServerError: 500 };

export const controllerWrapper =
  (callback: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch(next);
  };
