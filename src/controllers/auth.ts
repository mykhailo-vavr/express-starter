import pool from '@/db/pool';
import { controllerWrapper, statusCodes } from '@/utils/api';
import { hashPassword, validatePassword } from '@/utils/auth';
import { sign } from '@/utils/jwt';
import { Request, Response } from 'express';

export const signUpController = controllerWrapper(async (req: Request, res: Response) => {
  const { username, email, password } = req.body as Record<string, string>;

  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

  if (user.rowCount !== 0) {
    res.status(statusCodes.unauthorized).send(`User with email ${email} is already exists`);
    return;
  }

  const hashedPassword = await hashPassword(password);

  await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [
    username,
    email,
    hashedPassword,
  ]);

  console.info('User was created successfully');

  res.status(statusCodes.ok).json('User was created successfully');
});

export const signInController = controllerWrapper(async (req, res) => {
  const { email, password } = req.body as Record<string, string>;

  const user = await pool.query<{ password: string }>('SELECT password FROM users WHERE email = $1', [email]);

  if (user.rowCount !== 0) {
    res.status(statusCodes.unauthorized).send('Password or email are incorrect');
    return;
  }

  const validPassword = await validatePassword(password, user.rows[0].password);

  if (!validPassword) {
    res.status(statusCodes.unauthorized).send('Password or email are incorrect');
    return;
  }

  const token = sign({ user: { email } });

  res.status(statusCodes.ok).json({ token });
});

export const verifyController = controllerWrapper(async (req, res) => {
  res.json(true);
});
