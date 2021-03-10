import { NextFunction, Request, Response } from 'express';
const db = require('../models');

export async function addExam(req: Request, res: Response, next: NextFunction) {
  try {
    const { subject, maxMarks, questions, examDate } = req.body;

    if (!subject || !maxMarks || !questions || !examDate) {
      return next({
        status: 400,
        message: 'incomplete Exam Details Provided!!!',
      });
    }

    const newExam = await db.Exam.create(req.body);

    return res.status(200).json(newExam);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}
