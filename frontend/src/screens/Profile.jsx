import {Navigate} from 'react-router-dom'
import {UserContext} from '../components/UserContext'
import { useContext } from 'react'
const Profile = () => {
  const user = useContext(UserContext);
  console.log("you are logged in (PROFILE PAGE)",user.loggedIn)
  if (!user.loggedIn) {
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