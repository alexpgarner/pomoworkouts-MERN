import {useState,useEffect} from 'react'
import Exercises from '../components/Exercises'
const Workout =  ({breakDuration,timerType}) => {
  const [workouts,setWorkouts] = useState([])
  const [hasLoaded,setHasLoaded] = useState(false);
  useEffect(()=>{
    const getWorkouts = async ()=>{
      const workoutsFromServer = await fetchWorkout();
      setWorkouts(workoutsFromServer)
      setHasLoaded(true)
    }
    getWorkouts()

  },[])

  const fetchWorkout = async () =>{
    const res = await fetch('http://localhost:8000/api/workouts');
    const data = await res.json();
    console.log(data);
    return data;
  }


  function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];
    arr.splice(randomIndex,1)
    return item;
  }
  const getRandomWorkouts = ()=>{
    let timeLeft = breakDuration;
    const workoutQue = [];
    console.log(timeLeft,workouts[0])
    let workoutsThatFit =  workouts.filter((element)=>element.duration <= timeLeft)
    if(workoutsThatFit.length === 0){
      console.log("no workouts fit")
      //alert('no workouts fit in your break time') 
    }else{
      while(timeLeft>0 && workoutsThatFit.length>0){
        let randomWorkout =[]
        console.log(workoutsThatFit)
        try{
          randomWorkout = getRandomItem(workoutsThatFit)
        }catch(err){
          console.log('Not enough workouts to fill break time')
          console.log(err)
          break;
        }
        timeLeft -= randomWorkout.duration;
        workoutQue.push(randomWorkout)
        workoutsThatFit = workoutsThatFit.filter((element)=>element.duration <= timeLeft)
      }
    }
    return (
      <>    
          {workoutQue.map((exercise)=>{
              return <Exercises key = {exercise._id} exercise = {exercise}/>;})
          }
      </>
    )
  
  }
  return (hasLoaded ? getRandomWorkouts():<p>Loading......</p>  )//needs hasLoaded state to wait for useEffect to fetch workouts
}

export default Workout