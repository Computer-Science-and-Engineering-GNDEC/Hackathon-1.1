import express from 'express';
import { getAllStudents } from '../handlers/student';
import { signUp } from '../handlers/teacher';
const router = express.Router();

/* prefixed with `user` */
router.get('/get', getAllStudents).post('/auth/signup', signUp);

export default router;
