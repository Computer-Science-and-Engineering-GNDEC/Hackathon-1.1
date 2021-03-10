import express from 'express';
import { addExam } from '../handlers/exam';
const router = express.Router();

/* prefixed with `exams` */
router.post('/', addExam);
export default router;
