export const Exercises = ({index,exercise,duration}) => {
  return (
    
    <div className='exercises'>
        {index==0 && <h2>Lets {exercise.type.toUpperCase()} for {exercise.type == 'exercise'?duration-1:exercise.duration} {exercise.duration<=1?"minute":"minutes"}!</h2>}
        <ul>
          <li className = 'exTitle'>Name: {exercise.name} </li>
          <li className = 'exTitle'>Target Muscle: {exercise.targetMuscleMain}</li>
          {exercise.description.map(element=><li key = {Math.floor(Math.random()*1000)}>{element}</li>)}
        </ul>
    </div>
	)
}

export default Exercises
