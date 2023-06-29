const passport = require("passport");
const validator = require("validator");
const User = require("../models/userModel");
const dotenv = require('dotenv').config();

exports.postLogin = (req, res, next) => {
  //console.log(req.body)
  console.log(req.body.email,typeof req.body.email)
  console.log(req.body.password,typeof req.body.password)
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push("Please enter a valid email address.");
  if (validator.isEmpty(req.body.password))
    validationErrors.push("Password cannot be blank.");

  if (validationErrors.length) {
    console.log('Errors',validationErrors)
    return res.json(validationErrors); //instead of flashing message try returning errors with response
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log('ERROR LOGIN',info)
      return res.json([info.msg]);
      // return res.redirect(`${process.env.CLIENT_URL}/login`);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log('logged IN',user,res.getHeaders())
      res.json(["AUTHORIZED"]);
      // res.redirect(`${process.env.CLIENT_URL}/profile`);
      // res.redirect(req.session.returnTo || `${process.env.CLIENT_URL}/profile`);
      // res.redirect(`${process.env.CLIENT_URL}/profile`);
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  console.log('logout route')
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.clearCookie('connect.sid', {
      path: '/'
    });
    console.log('session destroyed')
    res.send({loggedIn : false})
    // res.redirect(`${process.env.CLIENT_URL}`);
  });
};

exports.postSignup = async (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)){
    validationErrors.push("Please enter a valid email address.");
  }
  if (!validator.isLength(req.body.password, { min: 8 })){
    validationErrors.push("Password must be at least 8 characters long");
  }
  if (req.body.password !== req.body.confirmPassword){
    validationErrors.push("Passwords do not match" );
  }
  if (validationErrors.length) {
    console.log('Errors',validationErrors)
    return res.json(validationErrors); //instead of flashing message try returning errors with response
  }
 
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        return res.json(["Account with that email address or username already exists."])
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          console.log(user,req.session,res.getHeaders(),"logged in and registered")
          res.json(["AUTHORIZED"])
        });
      });
    }
  );
};
