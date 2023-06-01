// import Form from 'react-bootstrap/Form';
import { CountdownCircleTimer,useCountdown } from 'react-countdown-circle-timer'
import StartStop from './StartStop';
import Button from './Button'
import {useState,useEffect} from 'react'

const Timer = ({onKey,keyID,onStartBTN,startBTN,onWarmup,onRemainingTime,timerType,onTimerType,duration}) => {
	const [globalTimeTest,setGLobalTime] =useState(0)
	
	

	//updates parentRemainingtime when globalTimeTest state changes
	useEffect(()=>{
		onRemainingTime(globalTimeTest)
	},[globalTimeTest]);
	
	//call back for cicleTimer onUpdate to set a global variable to change parent states
	const onGlobal = (time)=>{
    setGLobalTime(time)
  }



	//renders time inside Countdown Circle
	const renderTime = ({remainingTime}) => {
		
		if (remainingTime === 0) {
			return <div className="timer">Time to take a break</div>;
		}

		// globalTimeTest = remainingTime;
		// console.log(globalTimeTest)

		
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

	//when Pomodoro button clicked. Changes timer to Pomo and pauses
	//if timer already pomo then resets and pauses
	const onPomoClick = ()=>{
		if(timerType=='break'){
			onTimerType()
		}
		onKey()//I forgot why...oh yeah resets timer
		if(startBTN === true){
			onStartBTN()
			//setStartBTN(false)//shouuld use a callback function
		}
		onWarmup()
	}

		//when Workout button clicked. Changes timer to Pomo and pauses
	//if timer already workout then resets and pauses
	const onWorkoutClick = ()=>{

		if(timerType=='pomo'){
			onTimerType()
		}
		onKey()
		if(startBTN === true){
			onStartBTN()
			//setStartBTN(false)
		}
		onWarmup()
	}
	//props to allow progress bar to change colors relative to duration of timer
	const colorDurations = [duration,duration*3/4,duration/2,0];

  return (
    <div className = 'timer-wrapper'>
				<div className = 'btn-timer-select'>
					<Button className = 'btn-select' text = 'Pomodoro' onClick={onPomoClick}/>
					<Button className = 'btn-select' text = 'Workout/Break' onClick={onWorkoutClick}/>
				</div>
				<div>{globalTimeTest}</div>
				<CountdownCircleTimer
						key = {keyID}
        	  isPlaying = {startBTN}
        	  duration={duration}
        	  colors={["#54f542", "#F7B801", "#A30000", "#A30000"]}
        	  colorsTime={colorDurations}
						onUpdate = {(remainingTime)=>{onGlobal(remainingTime)}}
        	  onComplete={()=>{
							onStartBTN();
							console.log(timerType)
							//setTimerType(timerType === 'pomo'?'break':'pomo')//when timer completes. Changes timerType to load next timer.
							onTimerType();
							console.log('completed')
							// return { shouldRepeat: false, delay: 1 }//do I need this?
						}}
        	>
					{renderTime}
				</CountdownCircleTimer>
				<StartStop startBTN = {startBTN} onStartBTN = {onStartBTN}/>
    </div>
  )
}

export default Timer