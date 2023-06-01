import Settings from '../components/Settings'
const Header = ({onStartBTN,startBTN,onFocusDuration,focusDuration,onBreakDuration,breakDuration}) => {
  return (
    <div className = 'navbar'>
    <h1>PomoWorkouts</h1>
    <span>
      <Settings startBTN={startBTN} onStartBTN={onStartBTN} onFocusDuration = {onFocusDuration} focusDuration={focusDuration} onBreakDuration={onBreakDuration} breakDuration={breakDuration} />
      <button>Log in</button>
    </span>
    </div>
  )
}

export default Header