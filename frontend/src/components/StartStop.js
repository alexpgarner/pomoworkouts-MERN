import Button from '../components/Button'
const StartStop = ({startBTN,onStartBTN}) => {
  //console.log(startBTN)
  return (
    <>
        <Button className = 'btn' color = 'white' text = {!startBTN? 'START':'STOP'} onClick = {onStartBTN}/>
    </>
  )
}

export default StartStop