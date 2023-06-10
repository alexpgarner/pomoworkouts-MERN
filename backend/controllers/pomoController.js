const passport = require("passport");
const dotenv = require('dotenv').config();
const cors = require('cors'); 
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
const express = require('express');
const app = express();
app.use(cors(corsOptions));

exports.getProfile = (req,res) =>{
  //console.log(req.user)
  const user = {
    ...req.user,
    loggedIn: true
  }
  console.log('GETPROFILE RAN')
  //console.log(user)
  // res.set('Access-Control-Allow-Origin', '*')
  // res.set('Access-Control-Allow-Credentials', 'true')
  res.json(user);
  // return res.redirect('http://localhost:3000/register')
}