import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { validateEmail } from '../helpers/validateEmail';
const db = require('../models');

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    // Create a user
    console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password)
      return next({
        status: 400,
        message: 'Email and password are necessary',
      });

    if (!validateEmail(email))
      return next({
        status: 400,
        message: 'Email Provided is not valid!',
      });

    const newUser = await db.Teacher.create(req.body);
    const { id, name, profileImageURL, isAdmin } = newUser;

    // Create a token (signing a token)
    /* SECRET_KEY should not be null */
    const SECRET_KEY = 'secret'; // take from env var instead
    const token = jwt.sign({ id, name, profileImageURL, isAdmin }, SECRET_KEY);

    return res.status(200).json({
      id,
      name,
      profileImageURL,
      // isAdmin,
      token,
    });
  } catch (error) {
    // See what kind of error
    /* If validation fails */
    if (error.code === 11000) {
      error.message = 'Sorry, that email is already taken';
    }

    return next({
      status: 400,
      message: error.message,
    });
  }
}

// export async function signIn(req: Request, res: Response, next: NextFunction) {
//   try {
//     // Finding a user
//     const { email, password } = req.body;

//     if (!validateEmail(email))
//       return next({
//         status: 400,
//         message: 'Email Provided is not valid!',
//       });

//     // if ((!email && !mobile) || !password)
//     //   return next({
//     //     status: 400,
//     //     message: 'Incomplete details (mobile/email/password)',
//     //   });

//     const user = await db.User.findOne({ email });
//     // else user = await db.User.findOne({ mobile });

//     // If no user found
//     if (!user)
//       return next({
//         status: 404,
//         message: 'Given User does not exist in DB',
//       });

//     const { profileImageURL, isAdmin } = user;

//     /* Comare Password
//      * We added a utility `comparePassword` function to each User
//      */
//     const isMatch = await user.comparePassword(password);

//     if (isMatch) {
//       const token = jwt.sign(
//         { email, profileImageURL, isAdmin },
//         process.env.SECRET_KEY!,
//         {
//           expiresIn: '7d',
//         }
//       );

//       return res.status(200).json({ email, token, profileImageURL, isAdmin });
//     } else {
//       return next({
//         // 401 - Unauthorized
//         status: 401,
//         message: 'Invalid Credentials',
//       });
//     }
//   } catch (error) {
//     return next(error);
//   }
// }
