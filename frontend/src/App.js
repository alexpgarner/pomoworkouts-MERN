import './App.css';
import Header from './components/Header';
import Timer from './components/Timer';
import Workout from './components/Workout';
import {useState,useEffect} from 'react'
function App() {
  //js here
  const [timerType,setTimerType] = useState('pomo')
  const [focusDuration,setFocusDuration] = useState(25);
  const [breakDuration,setBreakDuration] = useState(5);
  const [remainingTimeParent,setRemainingTimeParent] = useState(0)
  const onRemainingTime = (time)=>{
    setRemainingTimeParent(time);
  }
  const onTimerType=()=>{
    timerType === 'pomo'? setTimerType('break'):setTimerType('pomo')
  }

  const onFocusDuration = (time) =>{
    setFocusDuration(time)
  }

  const onBreakDuration = (time) =>{
    setBreakDuration(time)
  }
  return (//jsx from here
    <div className="container">
      <Header onBreakDuration = {onBreakDuration} breakDuration={breakDuration} onFocusDuration = {onFocusDuration} focusDuration = {focusDuration} className = "header"/>
      <h1>{remainingTimeParent}</h1>
      {timerType === 'pomo' && <Timer onRemainingTime ={onRemainingTime} timerType = {timerType} duration = {focusDuration} setTimerType = {setTimerType} onTimerType = {onTimerType}/>}
      {timerType === 'break' && <Timer onRemainingTime ={onRemainingTime} timerType = {timerType} setTimerType = {setTimerType} duration = {breakDuration} onTimerType = {onTimerType}/> }
      {timerType === 'break' && <Workout remainingTime = {remainingTimeParent} remainingtimerType = {timerType} breakDuration = {breakDuration}/>}
    </div>
  );
}

export default App;
