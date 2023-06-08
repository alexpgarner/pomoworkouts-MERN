import Settings from '../components/Settings'
import {Link} from 'react-router-dom'
import {UserContext} from './UserContext'
import { useContext } from 'react'
const Header = ({onStartBTN,startBTN,onFocusDuration,focusDuration,onBreakDuration,breakDuration}) => {
  const style ={
    color: "white",
    fontWeight: "bold"
  }
  const user = useContext(UserContext);
  return (
    <div className = 'navbar'>
    <h1 style ={style}><Link to='/' style ={{textDecoration: "none",color: 'white'}}>PomoWorkouts</Link></h1>
    <span>
      {user?.loggedIn&&<button><Link to = '/profile'>Profile</Link></button>}
      <Settings startBTN={startBTN} onStartBTN={onStartBTN} onFocusDuration = {onFocusDuration} focusDuration={focusDuration} onBreakDuration={onBreakDuration} breakDuration={breakDuration} />
      {user?.loggedIn === false ? <button><Link to = '/login'>Log in</Link></button> : <button><Link to = '/login'>Log out</Link></button>}
    </span>
    </div>
  )
}

export default Header