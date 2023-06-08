import Settings from '../components/Settings'
import {Link} from 'react-router-dom'

const Header = ({onStartBTN,startBTN,onFocusDuration,focusDuration,onBreakDuration,breakDuration}) => {
  const style ={
    color: "white",
    fontWeight: "bold"
  }
  return (
    <div className = 'navbar'>
    <h1 style ={style}>PomoWorkouts</h1>
    <span>
      <Settings startBTN={startBTN} onStartBTN={onStartBTN} onFocusDuration = {onFocusDuration} focusDuration={focusDuration} onBreakDuration={onBreakDuration} breakDuration={breakDuration} />
      <button><Link to = '/login'>Log in</Link></button>
    </span>
    </div>
  )
}

export default Header