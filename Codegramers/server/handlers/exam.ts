import { NextFunction, Request, Response } from 'express';
const db = require('../models');

export async function addExam(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, subject, maxMarks, questions, examDate, teachers } = req.body;

    if (
      !name ||
      !subject ||
      !maxMarks ||
      !questions ||
      !examDate ||
      !teachers
    ) {
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

    const currentTeacher = await db.Teacher.findById(teachers[0]);
    currentTeacher.upcoming.push(newExam._id);
    currentTeacher.save();

    return res.status(200).json(newExam);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

export async function getUpcomingExmasOfTecher(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { teacherId } = req.params;

    if (!teacherId)
      return next({
        status: 400,
        message: 'no teacher ID provided for fetching upcoming exams',
      });

    const upcomingExams = await db.Teacher.findById(teacherId, { upcoming: 1 });
    res.status(200).json(upcomingExams);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

export async function getSpecificExam(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { examId, teacherId } = req.params;

    const upcomingExams = await db.Teacher.findById(teacherId, { upcoming: 1 });

    if (upcomingExams === null)
      return next({
        status: 400,
        message: `given teacher does not exist`,
      });

    if (upcomingExams.upcoming.includes(examId)) {
      const exam = await db.Exam.findById(examId, { teachers: 0 });
      return res.status(200).json(exam);
    } else {
      return next({
        status: 401,
        message: `this teacher does not permission to view this exam.. please contact admin`,
      });
    }
  } catch (e) {
    console.log(e);
    return next(e);
  }
}
