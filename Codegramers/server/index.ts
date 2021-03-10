// load env var
require('dotenv').config();

import express from 'express';
import cors from 'cors';
import CustomError from './@types/error';
import errorHandler from './handlers/error';
import { getAllStudents } from './handlers/student';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/user', getAllStudents);

/* WHEN NO ROUTE SATISFY THE GIVEN CONDITION */
app.use((req, res, next) => {
  const error: CustomError = new Error('Not Found');
  error.status = 404;
  next(error);
});

/* Use our little generic error handler */
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
