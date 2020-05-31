import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Redis from 'redis';
import { findUser } from '../models/User.model';
import { keysAsync, getAsync } from '../database/redis';

// This function handles the POST /addUser route
// checks if the password and confirmPassword are equal if not send back
// a proper error message
// hash the password, then add the new user to our database using the v addNewUser method
// make sure to handle any error that might occured
// exports.addUser = (req, res) => {
//   const { password, username, confirmPassword } = req.body;

//   if (password !== confirmPassword) {
//     return res.status(401).send({ status: 'error' });
//   }

//   bcrypt.hash(password, 10, async (err, hash) => {
//     if (err) {
//       return res.status(401).send({ status: 'error' });
//     }

//     try {
//       await addNewUser(username, hash);

//       res.redirect('/login');
//     } catch (error) {
//       res.render('register', {
//         activePage: { register: true },
//         error: error.message
//       });
//     }
//   });
// };

// this function handles the POST /authenticate route
// it finds the user in our database by his username that he inputed
// then compares the password that he inputed with the one in the db
// using bcrypt and then redirects back to the home page
// make sure to look at home.hbs file to be able to modify the home page when user is logged in
// also handle all possible errors that might occured by sending a message back to the cleint
exports.authenticate = async (req, res) => {
  try {
    const { password, phone } = req.body;

    const user = await findUser(phone);

    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        console.log('Bcrypt error:', err);
        return res.status(401).send({ status: 'error' });
      }

      if (!result) {
        console.log('Bcrypt response is empty');
        return res.status(401).send({ status: 'error' });
      }

      jwt.sign(user.phone, process.env.JWT_SECRET, function (err, token) {
        if (err) {
          console.log('JWT sign error:', err);
          return res.status(401).send({ status: 'error' });
        }

        delete user.password;

        res
          .status(200)
          .send({ token, user, status: 'success', userAuthentication: true });
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({ status: 'error' });
  }
};

exports.logout = (req, res, next) => {
  // impelemnt
  res.send('helloz');
};

exports.sendCoords = async (req, res) => {
  const coords = await getAsync(1);

  const keys = await keysAsync('*');
  console.log(coords);
  const parsedCoords = JSON.parse(coords);

  res.send([parsedCoords]);
};
