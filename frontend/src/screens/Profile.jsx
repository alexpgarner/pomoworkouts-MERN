import {Navigate} from 'react-router-dom'
import {UserContext} from '../components/UserContext'
import { useContext } from 'react'
const Profile = () => {
  const userContext = useContext(UserContext);
  console.log("you are logged in (PROFILE PAGE)",userContext)
  if(userContext.user.loggedIn === undefined){//tried to get rid of flicker from fetch rerender
    return;
  }if (!userContext.user.loggedIn) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <div>
        <h2>Welcome to your Profile</h2>
        <p>User Name: {`${userContext.user._doc.userName}`}</p>
        <p>First Name: {`${userContext.user._doc.firstName}`}</p>
        <p>Last Name: {`${userContext.user._doc.lastName}`}</p>
        <p>Email: {`${userContext.user._doc.email}`}</p>
      </div>
    );
  }
}

export default Profile