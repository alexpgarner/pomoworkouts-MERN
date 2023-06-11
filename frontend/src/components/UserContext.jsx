import {createContext,useState,useEffect} from 'react';
export const UserContext = createContext();



const Context = ({children}) => {
  const [user,setUser] = useState({loggedIn: false})
  useEffect(()=>{
    console.log('Context Rendered')
    // console.log('use effect context ran',`Fetching from ${process.env.REACT_APP_SERVER_URL}/profile`,'loggin:',user.loggedIn)
    fetch(`${process.env.REACT_APP_SERVER_URL}/profile`, { credentials: 'include'})
      .then(res=>{
        //console.log(res.json())})
        return res.json()}) 
      .then(data=>{
        console.log(data)
        setUser({...data})
      })
  },[])
  
  return (
    <UserContext.Provider value = {{user,setUser}}>{children}</UserContext.Provider>
  )
}

export default Context;