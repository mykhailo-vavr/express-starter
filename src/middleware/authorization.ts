import { statusCodes } from '@/utils/api';
import { verify } from '@/utils/jwt';
import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('token');

    if (!token) {
      throw new Error('Access denied');
    }

    verify(token);

    next();
  } catch (error) {
    console.error(error);
    res.status(statusCodes.forbidden).send('Access denied');
  }
};
