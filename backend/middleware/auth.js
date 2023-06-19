const cors = require('cors'); 
const corsOptions ={
  origin:'http://localhost:8000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
const express = require('express');
const app = express();
app.use(cors(corsOptions));

module.exports = {
    ensureAuth: function (req, res, next) {
      console.log("Auth?",req.isAuthenticated())
      if (req.isAuthenticated()) {
        return next();
      } else {
        // return res.json();
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
        res.redirect(`${process.env.CLIENT_URL}`);
      }
    },
    // ensureGuest: function (req, res, next) {
    //   if (!req.isAuthenticated()) {
    //     return next();
    //   } else {
    //     res.redirect(`${process.env.CLIENT_URL}/`);
    //   }
    // },
  };