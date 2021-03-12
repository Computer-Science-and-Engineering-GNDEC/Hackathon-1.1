import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

/* Required using mongo hook with TS */
interface IStudent extends mongoose.Document {
  email: string;
  name?: string;
  password: string;
  profileImageURL?: string;
  tests?: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'Test';
    }
  ];
  role: string;
}

const studentSchema = new mongoose.Schema<IStudent>({
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
  test: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test',
    },
  ],
  role: {
    type: String,
    readonly: true,
    default: 'students'
  },
});

studentSchema.pre<IStudent>('save', async function (next) {
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

studentSchema.methods.comparePassword = async function (enteredPassword, next) {
  try {
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
  } catch (error) {
    next(error);
  }
};

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
