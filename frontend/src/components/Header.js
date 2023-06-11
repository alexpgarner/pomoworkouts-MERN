import Settings from '../components/Settings'
import {Link} from 'react-router-dom'
import {UserContext} from './UserContext'
import { useContext } from 'react'
const Header = ({onStartBTN,startBTN,onFocusDuration,focusDuration,onBreakDuration,breakDuration}) => {
  const style ={
    color: "white",
    fontWeight: "bold"
  }
  const userContext = useContext(UserContext);
  const logOut = async(e)=>{
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/logout`,{method: 'GET', credentials: 'include'})
    const data = await res.json();
    
    userContext.setUser(data)
    console.log(data,userContext.user)
  }
  return (
    <div className = 'navbar'>
    <h1 style ={style}><Link to='/' style ={{textDecoration: "none",color: 'white'}}>PomoWorkouts</Link></h1>
    <span>
      {userContext.user?.loggedIn&&<button><Link to = '/profile'>Profile</Link></button>}
      <Settings startBTN={startBTN} onStartBTN={onStartBTN} onFocusDuration = {onFocusDuration} focusDuration={focusDuration} onBreakDuration={onBreakDuration} breakDuration={breakDuration} />
      {userContext.user?.loggedIn === false ? <button><Link to = '/login'>Log in</Link></button> : <button onClick = {logOut}><Link to = '/'>Log out</Link></button>}
    </span>
    </div>
  )
}

export default Header