export const Exercises = ({key,exercise}) => {
  return (
    <div className='exercises'>
        <h3>
          {exercise.name} 
          {exercise.targetMuscleMain}
          {exercise.duration}
          {exercise.description}
        </h3>
    </div>
	)
}

export default Exercises
