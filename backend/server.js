const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const mongoose = require('mongoose')
const passort = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const flash = requrie('express-flash')
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const logger = require('morgan')

app.use(cors());//deal with CORS errors?

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


//overrides default error handler
app.use(errorHandler)

//Server running
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
