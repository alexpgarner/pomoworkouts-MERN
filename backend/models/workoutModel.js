const mongoose = require('mongoose')

const workoutSchema = mongoose.Schema({
    name : {
        type: String,
        required :[true, 'Please add workout name']
    },
    targetMuscleMain: {
        type: String,
        required :[true, 'Please add main muscle group targeted']
    },
    description:{
        type: String,
        required : [true, 'Please add workout decrition']
    },
    duration:{
        type: Number,
        required : [true, 'Please add time to complete workout in minutes.']
    }
}) 

module.exports = mongoose.model('Workouts',workoutSchema)