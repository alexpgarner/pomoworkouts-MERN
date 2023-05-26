import './App.css';
import Header from './components/Header';
import Timer from './components/Timer';
import {useState,useEffect} from 'react'
function App() {
  //js here
  const [timerType,setTimerType] = useState('pomo')
  const [duration,setDuration] = useState(5)
  const onTimerType=()=>{
    timerType === 'pomo'? setTimerType('break'):setTimerType('pomo')
  }
  return (//jsx from here
    <div className="container">
      <Header className = "header"/>
      {timerType === 'pomo' && <Timer timerType = {timerType} duration = {25*60} setTimerType = {setTimerType} onTimerType = {onTimerType}/>}
      {timerType === 'break' && <Timer timerType = {timerType} setTimerType = {setTimerType} duration = {5*60} onTimerType = {onTimerType}/> }
    </div>
  );
}

export default App;
