import {Link,Navigate} from 'react-router-dom'
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';
import {UserContext} from '../components/UserContext'
import { useContext,useState } from 'react'

function Login() {
  const userContext = useContext(UserContext);
  const [valErrors,setValErrors]=useState([]);
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const onSubmit = async (e) =>{
    e.preventDefault();
    //console.log('click',e.target.elements.firstName.value,e.target.elements.lastName.value, e.target.elements.email.value )

    //NEED crendetials: "include" for cookies to be passed to and from browser
    const res = await fetch(`/user/login`,
                              {
                                method: 'POST',
                                credentials: 'include',
                                headers: {
                                  "Content-Type": "application/json",
                                  "Accept" : "application/json",
                                },
                                body: JSON.stringify(
                                      {
                                      password: e.target.elements.password.value,                                      
                                      email : e.target.elements.email.value
                                      }),
                              })
    let validationErrors;
    try{                    
      validationErrors = await res.json();
      setValErrors([...validationErrors])
      console.log(valErrors,typeof valErrors)
      console.log(res.status, valErrors)    
      console.log(validationErrors)  
    }catch(err){
      console.log(err)
      console.log(res.data)
      
    }
    if(validationErrors && validationErrors[0]==="AUTHORIZED"){
      window.location.replace("/Profile")
    }
  }
  const onInput = (e)=>{
    switch(e.target.name){
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        break;
    } 
  }
  if (userContext.user.loggedIn) {
    return <Navigate replace to="/profile" />;
  }else{
    return (
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50" style = {{background: 'white'}}>
        <h2 className="fw-bold mb-5">Timer to Workout!</h2>
        <form type='submit' onSubmit={onSubmit}>
        <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' onChange = {onInput} name = 'email' value = {email}/>
        <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange = {onInput} name = 'password' value = {password}/>

        <div className="d-flex justify-content-between mx-3 mb-4">
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
        </div>
        <div className='d-flex justify-content-start flex-column mb-4'>
          {valErrors.length ? valErrors.map((error)=>{
              return <span key = {Math.floor(Math.random()*1000)} style = {{color : 'red'}}>{error}</span>
            }):<></>}
       </div>
        <MDBBtn type = 'submit' className="mb-4" style = {{background: 'blue',color: 'white'}}>Sign in</MDBBtn>
        </form>
        <div className="text-center">
          <p>Not a member? <Link to='/register'>Register</Link></p>
          <p>or sign up with:</p>

          <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='facebook-f' size="sm"/>
            </MDBBtn>

            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='twitter' size="sm"/>
            </MDBBtn>

            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='google' size="sm"/>
            </MDBBtn>

            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='github' size="sm"/>
            </MDBBtn>

          </div>
        </div>

      </MDBContainer>
    );
  }
}

export default Login;