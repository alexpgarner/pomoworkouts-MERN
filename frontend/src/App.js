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
  return (//jsx from here
    <div className="container">
      <Header className = "header"/>
      <h1>{remainingTimeParent}</h1>
      {timerType === 'pomo' && <Timer onRemainingTime ={onRemainingTime} timerType = {timerType} duration = {5} setTimerType = {setTimerType} onTimerType = {onTimerType}/>}
      {timerType === 'break' && <Timer onRemainingTime ={onRemainingTime} timerType = {timerType} setTimerType = {setTimerType} duration = {5} onTimerType = {onTimerType}/> }
      {timerType === 'break' && <Workout timerType = {timerType} breakDuration = {breakDuration}/>}
    </div>
  );
}

export default App;
