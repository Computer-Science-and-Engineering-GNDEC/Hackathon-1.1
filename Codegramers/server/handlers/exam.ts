import { NextFunction, Request, Response } from 'express';
const db = require('../models');

export async function addExam(req: Request, res: Response, next: NextFunction) {
  try {
    const { subject, maxMarks, questions, examDate, teachers } = req.body;

    if (!subject || !maxMarks || !questions || !examDate || !teachers) {
      return next({
        status: 400,
        message: 'incomplete Exam Details Provided!!!',
      });
    }

    questions.forEach((question: any, i: number) => {
      if (!question.correctAnswers || !question.correctAnswers.length)
        return next({
          status: 400,
          message: `invalid question format of question number ${i + 1}`,
        });
    });

    const newExam = await db.Exam.create(req.body);
    console.log(newExam);

    return res.status(200).json(newExam);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}
