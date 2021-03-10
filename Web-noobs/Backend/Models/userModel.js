const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user should have a name"],
  },

  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "A user must have an email"],
    validate: [validator.isEmail, "Invalid Email provided!!"],
  },

  password: {
    type: String,
    required: [true, "Please enter a password for your account!"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return (el = this.password);
      },
      message: "Your passwords do not match!!",
    },
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
