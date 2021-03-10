import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

/* Required using mongo hook with TS */
interface ITeacher extends mongoose.Document {
  email: string;
  name?: string;
  password: string;
  profileImageURL?: string;
  subjects?: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'Subject';
    }
  ];
  role: string;
}

const teacherSchema = new mongoose.Schema<ITeacher>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  profileImageURL: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
    },
  ],
  role: {
    type: String,
    readonly: true,
    default: 'teacher',
  },
});

teacherSchema.pre<ITeacher>('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;

    /* Since it is asynchronous, we need to specify when to move on */
    return next();
  } catch (error) {
    return next(error);
  }
});

teacherSchema.methods.comparePassword = async function (enteredPassword, next) {
  try {
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
  } catch (error) {
    next(error);
  }
};

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
