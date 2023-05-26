// import Form from 'react-bootstrap/Form';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import StartStop from './StartStop';
import Button from './Button'
import {useState,useEffect} from 'react'

const Timer = ({timerType,onTimerType,duration,setTimerType}) => {

	const [startBTN,setStartBTN] = useState(false)
	// const [timerType,setTimerType] = useState('pomo')
	// let timerType = 'pomo';
	// useEffect(() => {
	// 	setStartBTN(false)
		
	// },[startBTN])
	//when Start stop clicked

	const onStartBtn = ()=>{
		setStartBTN(!startBTN);
	}

	//renders time inside Countdown Circle
	const renderTime = ({ remainingTime }) => {
		if (remainingTime === 0) {

			return <div className="timer">Time to take a break</div>;
		}
		
		
		return (
			<div className="timer">
				<div className="text">{timerType === 'pomo'?"FOCUS TIME" : "WORKOUT BREAK"}</div>
				<div className="value">{children({remainingTime})}</div>
			</div>
		);
	};

	//renders time in 00:00 inside cirlce
	const children = ({ remainingTime }) => {
		// const hours = Math.floor(remainingTime / 3600)
		const minutes = Math.floor((remainingTime % 3600) / 60)
		const seconds = remainingTime % 60
	
		
		return `${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	}

  return (
    <div className = 'timer-wrapper'>
				<div className = 'btn-timer-select'><Button className = 'btn-select' text = 'Pomodoro'/><Button className = 'btn-select' text = 'Workout/Break'/></div>

				<CountdownCircleTimer
        	  isPlaying = {startBTN}
        	  duration={duration}
        	  colors={["#54f542", "#F7B801", "#A30000", "#A30000"]}
        	  colorsTime={[{duration}, 6, 3, 0]}
						
        	  onComplete={()=>{
							setStartBTN(false);
							console.log(timerType)
							if(timerType === 'pomo'){
								setTimerType('break')
							}else{
								setTimerType('pomo')
							}

							//onTimerType();
							console.log('completed')
							return { shouldRepeat: false, delay: 1 }
							
						}}
					
        	>
					{renderTime}
					</CountdownCircleTimer>
				<StartStop startBTN = {startBTN} onStartBtn = {onStartBtn}/>
    </div>
  )
}

export default Timer