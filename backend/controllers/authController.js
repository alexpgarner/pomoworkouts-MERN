const passport = require("passport");
const validator = require("validator");
const User = require("../models/userModel");
const dotenv = require('dotenv').config();
// exports.getLogin = (req, res) => {
//   if (req.user) {
//     return res.redirect("/profile");
//   }
//   res.render("login", {
//     title: "Login",
//   });
// };

exports.postLogin = (req, res, next) => {
  //console.log(req.body)
  console.log(req.body.email,typeof req.body.email)
  console.log(req.body.password,typeof req.body.password)
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect(`${process.env.CLIENT_URL}`);
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log('ERROR LOGIN')
      req.flash("errors", info);
      return res.redirect(`${process.env.CLIENT_URL}/login`);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log('logged IN',user)
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(`${process.env.CLIENT_URL}/profile`);
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

// exports.getSignup = (req, res) => {
//   if (req.user) {
//     return res.redirect(`${process.env.CLIENT_URL}/profile`);
//   }
//   res.render("signup", {
//     title: "Create Account",
//   });
// };
exports.postSignup = async (req, res, next) => {
  const validationErrors = [];
  // console.log(req.body,'Email')
  if (!validator.isEmail(req.body.email)){
    validationErrors.push("Please enter a valid email address.");
    // console.log(validationErrors,'Please enter email')
  }
  // console.log('here')
  if (!validator.isLength(req.body.password, { min: 8 })){
    validationErrors.push("Password must be at least 8 characters long");
    // console.log(validationErrors,'Please enter password')
  }
  // console.log('here2')
  if (req.body.password !== req.body.confirmPassword){
    validationErrors.push("Passwords do not match" );
  }
  if (validationErrors.length) {
    // req.flash("errors", validationErrors);
    //res.redirect(`${process.env.CLIENT_URL}/register`)
    console.log('Errors',validationErrors)
    return res.json(validationErrors); //instead of flashing message try returning errors with response
    // return res.redirect(`${process.env.CLIENT_URL}/register`)
    // return res.redirect(`${process.env.CLIENT_URL}/register`);
    
  }
  // console.log("postSIgnup",validationErrors)
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
        // req.flash("errors", {
        //   msg: "Account with that email address or username already exists.",
        // });
        // return res.redirect(`${process.env.CLIENT_URL}/register`);
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          console.log(user,req.session,"logged in and registered")
          // return res.json(["Logged In"])
          // res.redirect(`/profile`);
          res.redirect(`${process.env.CLIENT_URL}/profile`);
        });
        // passport.authenticate("local", (err, user, info) => {
        //   if (err) {
        //     return next(err);
        //   }
        //   if (!user) {
        //     console.log('ERROR LOGIN')
        //     req.flash("errors", info);
        //     return res.redirect(`${process.env.CLIENT_URL}/login`);
        //   }
        //   req.logIn(user, (err) => {
        //     if (err) {
        //       return next(err);
        //     }
        //     console.log('logged IN and registered')
        //     req.flash("success", { msg: "Success! You are logged in." });
        //     res.redirect(`${process.env.CLIENT_URL}/profile`);
        //     // res.redirect(req.session.returnTo || `${process.env.CLIENT_URL}/profile`);
        //     // res.redirect(`${process.env.CLIENT_URL}/profile`);
        //   });
        // })(req, res, next);
      });
    }
  );
};
// exports.postSignup = (req, res, next) => {
//   const validationErrors = [];
//   console.log(req.body.email,typeof req.body.email )
//   if (!validator.isEmail(req.body.email))
//     validationErrors.push({ msg: "Please enter a valid email address." });
//   if (!validator.isLength(req.body.password, { min: 8 }))
//     validationErrors.push({
//       msg: "Password must be at least 8 characters long",
//     });
//   if (req.body.password !== req.body.confirmPassword)
//     validationErrors.push({ msg: "Passwords do not match" });

//   if (validationErrors.length) {
//     req.flash("errors", validationErrors);
//     return res.redirect(`${process.env.CLIENT_URL}/register`);
//   }
//   req.body.email = validator.normalizeEmail(req.body.email, {
//     gmail_remove_dots: false,
//   });

//   const user = new User({
//     userName: req.body.userName,
//     email: req.body.email,
//     password: req.body.password,
//   });
  
//   console.log(user)
//   User.findOne({ $or: [{ email: req.body.email }, { userName: req.body.userName }] })
//     .then((existingUser) => {
//         console.log('made it here?',existingUser)
//         if (existingUser) {
//         req.flash("errors", {
//           msg: "Account with that email address or username already exists.",
//         });
//         console.log(`${process.env.CLIENT_URL}/register`)
//         // return res.send({message:'username and email already exist'})
//         return res.redirect(`${process.env.CLIENT_URL}/register`);
//       }else{
//         console.log('presave')
//         user.save()
//         .then(()=>{
//             req.logIn(user, (err) => {
//             if (err) {
//               return next(err);
//             }
//             console.log("Logged in")
//             res.redirect(`${process.env.CLIENT_URL}/profile`);
//           })
//           //res.send({message: "USer SAVED"})
//         })
//         .catch((err) => {
//           if (err) {
//             return next(err);
//           }
// ;
//       })
//     }})
// }

