const asyncHandler = require('express-async-handler')
const Workout = require('../models/workoutModel')
//@desc GET workouts
//@route /api/workouts
//@access Public
const getWorkouts = asyncHandler(async(req,res)=>{
    const workouts = await Workout.find()
    res.status(200).json(workouts)
})

//@desc POST workouts
//@route /api/workouts/:id
//@access PRIVATE
const createWorkout =asyncHandler(async(req,res)=>{
    if(!req.body.name){
        res.status(400)
        throw new Error('Please add a workout name')
    }
    
    const workout = await Workout.create({
        name : req.body.name,
        targetMuscleMain : req.body.targetMuscleMain,
        description: req.body.description,
        duration: req.body.duration
    })
    res.status(200).json(workout)
})

//@desc PUT workouts
//@route /api/workouts/:id
//@access PRIVATE
const updateWorkout =asyncHandler(async(req,res)=>{
    res.status(200).json({"message": `Updated Workout id ${req.params.id}`})
})

//@desc DELETE goals
//@route /api/workouts/:id
//@access PRIVATE
const deleteWorkout =asyncHandler(async(req,res)=>{
    res.status(200).json({"message": `Deleted Workout id ${req.params.id}`})
})
module.exports = {
    getWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout
}