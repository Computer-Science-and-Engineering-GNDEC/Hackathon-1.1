const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { promisify } = require("util");
const User = require("../Models/userModel");
const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");
const Email = require("../util/email");

//const { STATUS_CODES } = require('http');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers("x-forwarded-proto") === "https",
  });
  //Remove the password from the output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    emailToken: crypto.randomBytes(64).toString("hex"),
    isVerified: false,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });
  const verificationUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/verifyEmail/${newUser.emailToken}`;
  const message = "Signup-HelpDesk";
  res.status(200).json({
    status: "success",
    data: {
      newUser,
    },
  });
  await new Email(newUser, verificationUrl, message).sendverificationEmail();
});

exports.verifyEmail = catchAsync(async (req, res, next) => {
  const url = `${req.protocol}://${req.get("host")}/me`;
  const message = "Email-Verification";
  const user = await User.findOne({ emailToken: req.params.token });
  if (!user) {
    return next(new AppError("This token is either invalid or expired", 401));
  }
  user.isVerified = true;
  user.emailToken = null;
  await user.save({ validateBeforeSave: false });
  res.redirect("/login");
  await new Email(user, url, message).sendWelcome();
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  //Check if email and password are submitted by the client
  if (!email || !password) {
    return next(
      new AppError("Please provide your email and your password", 400)
    );
  }
  //Check if user exists and the password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect Email or password", 401));
  }
  //check if user is verified or not
  if (!user.isVerified) {
    return next(
      new AppError("Please verify your account first through your email!")
    );
  }

  //Return a web token to the client
  createSendToken(user, 200, req, res);
});
//Logging out
//CHECKING IF THE USER IS LOGGED IN OR NOT

exports.protect = catchAsync(async (req, res, next) => {
  //getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError("You are not loggen in.Please login to access this", 401)
    );
  }

  //verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //check if user still exits
  const currentUSer = await User.findById(decoded.id);
  if (!currentUSer) {
    return next(new AppError("This user no longer exists!"));
  }

  //check if user changed password after the token was issued
  if (currentUSer.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "User changed the password recently!.Please login again to continue",
        401
      )
    );
  }
  req.user = currentUSer;
  res.locals.user = currentUSer;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    http: true,
  });
  res.status(200).json({ status: "success" });
};

//Only for rendered pages and there will be no error
exports.isLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      //check if user still exits
      const currentUSer = await User.findById(decoded.id);
      if (!currentUSer) {
        return next();
      }

      //check if user changed password after the token was issued
      if (currentUSer.changedPasswordAfter(decoded.iat)) {
        return next();
      }
      res.locals.user = currentUSer;
      return next();
    }
  } catch (err) {
    return next();
  }
  next();
};
