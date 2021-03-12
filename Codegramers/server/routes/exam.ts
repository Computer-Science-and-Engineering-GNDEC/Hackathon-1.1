import express from 'express';
import {
  addExam,
  getSpecificExam,
  getUpcomingExmasOfTecher,
} from '../handlers/exam';
const router = express.Router();

/* NOTE: route prefixed with `exams` */
router
  .post('/', addExam)
  /* Get upcoming exams by teacher's ID */
  .get('/teacher/:teacherId', getUpcomingExmasOfTecher)
  /* Get a specific exam by exam ID and teacher ID */
  .get('/:examId/teacher/:teacherId', getSpecificExam);
export default router;
