import Button from '../components/Button'
const StartStop = ({startBTN,onStartBtn}) => {
  //console.log(startBTN)
  return (
    <>
        <Button className = 'btn' color = 'white' text = {!startBTN? 'START':'STOP'} onClick = {onStartBtn}/>
    </>
  )
}

export default StartStop