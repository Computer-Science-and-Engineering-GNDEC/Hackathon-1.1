import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

/* Required using mongo hook with TS */
interface IExam extends mongoose.Document {
  subject: string;
  maxMarks: string;
  marksObtained?: string;
  questions: [
    {
      question: string;
      correctAnswes: [];
      incorrect_answers?: [];
      marks: string;
    }
  ];
  examDate: Date;
}

const examSchema = new mongoose.Schema<IExam>({
  subject: {
    required: true,
    type: String,
  },
  maxMarks: {
    required: true,
    type: String,
  },
  marksObtained: {
    // required: true,
    type: String,
  },
  /*
   * MCQ
   * Single integer type
   * One line ()
   */
  questions: {
    required: true,
    type: [
      {
        question: String,
        correctAnswes: [],
        incorrect_answers: [],
        mark: String,
      },
    ],
  },

  examDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
