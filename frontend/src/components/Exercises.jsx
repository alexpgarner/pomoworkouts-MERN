import {memo} from 'react'
export const Exercises = memo(({exercise,duration}) => {

  return (
    
    <div className='exercises'>
  
        <ul>
          <li className = 'exTitle'>Name: {exercise.name} </li>
          <li className = 'exTitle'>Target Muscle: {exercise.targetMuscleMain}</li>
          {exercise.description.map(element=><li key = {Math.floor(Math.random()*1000)}>{element}</li>)}
        </ul>
    </div>
	)
})

export default Exercises
