import {useState,useEffect} from 'react'
import Exercises from '../components/Exercises'

const Workout =  ({remainingTime,breakDuration,timerType}) => {
  const [workouts,setWorkouts] = useState([])
  const [hasLoaded,setHasLoaded] = useState(false);
  const [warmups,setWarmups] = useState([])
  useEffect(()=>{
    const getWorkouts = async ()=>{
      const workoutsFromServer = await fetchWorkout();
      setWorkouts(workoutsFromServer[1])//index 1 of array from server is exercises
      setWarmups(workoutsFromServer[0])//index 0 of array from server is warmups
      setHasLoaded(true)//promises have come true. OK to run getRandomWorkouts to load Exercise components.
    }
    getWorkouts()

  },[])

  //grab data from workouts api
  const fetchWorkout = async () =>{
    const res = await fetch('http://localhost:8000/api/workouts');
    const data = await res.json();
    console.log(data);
    return data;
  }

  //grab a roundom item from array and then remove that item from the array
  function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];
    arr.splice(randomIndex,1)//removes workout so duplicates are added to workoutQue
    return item;
  }

  //returns a list of warmups and exercises that fit in the break duration
  const getRandomWorkouts = ()=>{
    let timeLeft = breakDuration-1;//warmups are 1 min. for now
    const workoutQue = [];
    console.log(timeLeft,workouts[0])
    let workoutsThatFit =  workouts.filter((element)=>element.duration <= timeLeft)
    if(workoutsThatFit.length === 0){
      console.log("no workouts fit")
      //alert('no workouts fit in your break time') ***DONT USE ALERTS THEY FREEZE THE TIMER AND CAUSE ISSUES?
    }else{//CLEAN THIS UP LATER
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
          {remainingTime > (breakDuration-1)?<Exercises index = {0} duration = {breakDuration} key = {warmups[0]._id} exercise = {warmups[0]}/>:
          workoutQue.map((exercise,index)=>{return <Exercises index = {index} duration = {breakDuration} key = {exercise._id} exercise = {exercise}/>;})}
      </>
    )
  
  }

  return (hasLoaded ? getRandomWorkouts():<p>Loading......</p>  )//needs hasLoaded state to wait for useEffect to fetch workouts
}

export default Workout