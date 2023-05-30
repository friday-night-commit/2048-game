import type { Request, Response } from 'express';

export async function getUser(_req: Request, res: Response, next: (e: unknown) => void) {
  try {
    const header = '<h1>Hello User</h1>';
    res.json(header);
  } catch (e) {
    next(e);
  }
}
