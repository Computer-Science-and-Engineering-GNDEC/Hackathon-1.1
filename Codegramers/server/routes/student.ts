import express from 'express';
import { getAllStudents } from '../handlers/student';
const router = express.Router();

/* prefixed with `user` */
router.get('/get', getAllStudents);
export default router;
