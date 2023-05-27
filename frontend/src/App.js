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
  const onTimerType=()=>{
    timerType === 'pomo'? setTimerType('break'):setTimerType('pomo')
  }
  return (//jsx from here
    <div className="container">
      <Header className = "header"/>
      {timerType === 'pomo' && <Timer timerType = {timerType} duration = {5} setTimerType = {setTimerType} onTimerType = {onTimerType}/>}
      {timerType === 'break' && <Timer timerType = {timerType} setTimerType = {setTimerType} duration = {5} onTimerType = {onTimerType}/> }
      {timerType === 'break' && <Workout timerType = {timerType} breakDuration = {breakDuration}/>}
    </div>
  );
}

export default App;
