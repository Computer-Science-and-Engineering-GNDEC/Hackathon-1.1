import { NextFunction, Request, Response } from 'express';
const db = require('../models');

export async function getAllStudents(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const ans = await db.Student.find();

    return res.status(200).json(ans);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}
