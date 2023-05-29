const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors());
connectDB()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended : false}))


app.use('/api/workouts', require('./routes/workoutRoutes'))


//overrides default error handler
app.use(errorHandler)

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
