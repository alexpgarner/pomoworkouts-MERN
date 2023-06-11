import {Navigate} from 'react-router-dom'
import {UserContext} from '../components/UserContext'
import { useContext } from 'react'
const Profile = () => {
  const userContext = useContext(UserContext);
  console.log("you are logged in (PROFILE PAGE)",userContext.user.loggedIn)
  if(userContext.user.loggedIn === undefined){
    return;
  }if (!userContext.user.loggedIn) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <div>
        <p>Welcome to your Profile</p>
      </div>
    );
  }
}

export default Profile