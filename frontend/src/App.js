import './App.css';
import Header from './components/Header';
import Timer from './components/Timer';
import Workout from './components/Workout';
import {useState,useEffect} from 'react'
function App() {
  //js here
  const [timerType,setTimerType] = useState('pomo')
  const [focusDuration,setFocusDuration] = useState(25);
  const [breakDuration,setBreakDuration] = useState(20);
  const [remainingTimeParent,setRemainingTimeParent] = useState(25)
  const [warmUp,setWarmup] = useState(true)
  const [startBTN,setStartBTN] = useState(false)
  const [key, setKey] = useState(0);
  useEffect(()=>{
    console.log(timerType,remainingTimeParent,breakDuration)
    if(timerType === 'break' && (remainingTimeParent <= (breakDuration-1))){
      setWarmup(false)
      console.log("warmup over")
    }
  },[remainingTimeParent])

  //resets timer needed it in parent so changing duration in settings resetts timer (remaining time will be duration-1 and cause an error if 1 min is enterned witout)
  const onKey=()=>{
    setKey(prevKey => prevKey + 1)
  }
	const onStartBTN = ()=>{
		setStartBTN(!startBTN);
	}

  //allows me to keep track of timer remaining time in parent component
  const onRemainingTime = (time)=>{
    setRemainingTimeParent(time);
  }

  //Changes whether to show warmup or workouts
  const onWarmup=()=>{
    setWarmup(true)
  
  }
  const onTimerType=()=>{
    timerType === 'pomo'? setTimerType('break'):setTimerType('pomo')
  }

  const onFocusDuration = (time) =>{
    if(time>=1){
      setFocusDuration(time)
      onKey()//resets remainingTime
    }else{
      alert('duration must be a greater than 1 min')
    }
  }

  const onBreakDuration = (time) =>{
    if(time>=1){
      setBreakDuration(time)
      onKey()//resets remaingTime?
    }else{
      alert('duration must be a  greater than 1 min')
    }
  }
  return (//jsx from here
    <div className="container">
      <Header onStartBTN={onStartBTN} startBTN={startBTN} onBreakDuration = {onBreakDuration} breakDuration={breakDuration} onFocusDuration = {onFocusDuration} focusDuration = {focusDuration} className = "header"/>
      <h1>{remainingTimeParent}</h1>
      {timerType === 'pomo' && <Timer keyID={key} onKey ={onKey} onStartBTN={onStartBTN} startBTN ={startBTN} onWarmup = {onWarmup} onRemainingTime ={onRemainingTime} timerType = {timerType} duration = {focusDuration} setTimerType = {setTimerType} onTimerType = {onTimerType}/>}
      {timerType === 'break' && <Timer keyID={key} onKey ={onKey} onStartBTN={onStartBTN} startBTN ={startBTN} onWarmup = {onWarmup} onRemainingTime ={onRemainingTime} timerType = {timerType} setTimerType = {setTimerType} duration = {breakDuration} onTimerType = {onTimerType}/> }
      {timerType === 'break' && <Workout warmUp ={warmUp} remainingtimerType = {timerType} breakDuration = {breakDuration}/>}
    </div>
  );
}

export default App;
