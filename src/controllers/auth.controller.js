// use these functions to manipulate our database
const { findByUsername, addNewUser } = require('../models/users/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// This function handles the POST /addUser route
// checks if the password and confirmPassword are equal if not send back
// a proper error message
// hash the password, then add the new user to our database using the v addNewUser method
// make sure to handle any error that might occured
exports.addUser = (req, res) => {
  const { password, username, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.send({ status: 'error' });
  }

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.send({ status: 'error' });
    }

    try {
      await addNewUser(username, hash);

      res.redirect('/login');
    } catch (error) {
      res.render('register', {
        activePage: { register: true },
        error: error.message
      });
    }
  });
};

// this function handles the POST /authenticate route
// it finds the user in our database by his username that he inputed
// then compares the password that he inputed with the one in the db
// using bcrypt and then redirects back to the home page
// make sure to look at home.hbs file to be able to modify the home page when user is logged in
// also handle all possible errors that might occured by sending a message back to the cleint
exports.authenticate = async (req, res) => {
  try {
    const { password, phone } = req.body;

    const user = await findByUsername(phone);

    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res.send({ status: 'error' });
      }

      if (!result) {
        return res.send({ status: 'error' });
      }

      jwt.sign(user.phone, process.env.JWT_SECRET, function (err, token) {
        if (err) {
          return res.send({ status: 'error' });
        }

        res.status(200).send({
          token
          // unique id
          // and more user data
        });
      });
    });
  } catch (error) {
    return res.send({ status: 'error' });
  }
};

exports.logout = (req, res, next) => {
  // impelemnt
  next();
};
