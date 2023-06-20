const express = require('express');
const app = express();
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

//use .env from config folder
require('dotenv').config({ path: "./backend/config/.env" });
const flash = require('express-flash')
const PORT = process.env.PORT || 5000;

const logger = require('morgan')

const cors=require("cors");
const corsOptions ={
   origin:['http://localhost:3000','http://localhost:8000/profile'],
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
console.log(process.env.PORT)
// app.use(cors());//deal with CORS errors?

//Passport config
require('./config/passport')(passport)
//Connect to database
connectDB()


//middleware
app.use(express.json())
app.use(express.urlencoded({extended : false}))

// Setup Sessions - stored in MongoDB
app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,

      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  );

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes for SErver to listen to.
app.use('/api/workouts', require('./routes/workoutRoutes'))
app.use('/', require('./routes/loginRoutes'))

//overrides default error handler
app.use(errorHandler)

//Server running
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
