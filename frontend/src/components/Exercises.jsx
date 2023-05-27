export const Exercises = ({exercise}) => {
  return (
    <div className='exercises'>
        <ul>
          <li>Name: {exercise.name} </li>
					<li>Duration: {exercise.duration}min</li>
					<li>type: {exercise.type}</li>
          <li>Target Muscle: {exercise.targetMuscleMain}</li>
          {exercise.description.map(element=><li key = {Math.floor(Math.random()*1000)}>{element}</li>)}
        </ul>
    </div>
	)
}

export default Exercises
