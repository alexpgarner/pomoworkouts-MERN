
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';
import {useState,useEffect} from 'react'
import {UserContext} from '../components/UserContext'
import { useContext } from 'react'
import {Link,Navigate} from 'react-router-dom'
function Register() {

  const userContext = useContext(UserContext);

  const [valErrors,setValErrors]=useState([]);
  const [key, setKey] = useState(0);
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [userName,setUserName] = useState('')

  useEffect(()=>{
    console.log(userContext.user.loggedIn)
    if(valErrors[0]==='Logged In'){
      userContext.setUser({loggedIn: true})
    }
  },[valErrors])
  if (userContext.user.loggedIn) {
    return <Navigate replace to="/profile" />;
  }else{
  const onKey=()=>{
    setKey(prevKey => prevKey + 1)
  }
  const onSubmit = async (e) =>{
    e.preventDefault();
    //console.log('click',e.target.elements.firstName.value,e.target.elements.lastName.value, e.target.elements.email.value )

    //NEED crendetials: "include" for cookies to be passed to and from browser
    const res = await fetch(`/user/register`,
                              {
                                method: 'POST',
                                mode: 'cors',
                                redirect: "follow",
                                credentials: 'include',
                                headers: {
                                  "Content-Type": "application/json",
                                  "Accept" : "application/json",
                                  'Access-Control-Allow-Origin': '*',
                                },
                                body: JSON.stringify(
                                      {
                                      firstName : e.target.elements.firstName.value,
                                      lastName : e.target.elements.lastName.value,
                                      userName : e.target.elements.userName.value,
                                      password: e.target.elements.password.value,
                                      confirmPassword: e.target.elements.confirmPassword.value,
                                      email : e.target.elements.email.value
                                      }),
                              })
    try{                    
      const validationErrors = await res.json();
      setValErrors([...validationErrors])
      console.log(valErrors,typeof valErrors)
      console.log(res.status, valErrors)    
      console.log(validationErrors)  
    }catch(err){
      console.log(err)
      console.log(res.data)
      //window.location.replace("/Profile")
    }
   
    // setValidationErrors(prev => [...prev, ...invalidValues])
  
  }
  const onInput = (e)=>{
    switch(e.target.name){
      case 'firstName':
        setFirstName(e.target.value);
        break;
      case 'lastName':
        setLastName(e.target.value);
        break;
      case 'userName':
        setUserName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'confirmPassword':
        setConfirmPassword(e.target.value);
        break;
      default:
        break;
    } 
  }


  return (
    <MDBContainer className='my-5' >
      <MDBCard style = {{background: "rgb(255, 60, 0)"}}>

        <MDBRow className='g-0 d-flex align-items-center'>

          <MDBCol md='4'>
            <MDBCardImage src='icons/tomatoe-workout.jpg' alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
          </MDBCol>

          <MDBCol col='8'>

            <MDBCard className='my-5 cascading-right' style={{background: 'rgba(255,255,255,255)'}}>
              <MDBCardBody className='p-5 shadow-5 text-center'>

                <h2 className="fw-bold mb-5">Sign up now</h2>
                {/* <form action={`${process.env.REACT_APP_SERVER_URL}/register`} method="POST"> */}
                <form type = 'submit' onSubmit = {onSubmit}>
                  <MDBRow>
                    <MDBCol col='6'>
                      <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text' onChange = {onInput} name = 'firstName' value={firstName}/>
                    </MDBCol>

                    <MDBCol col='6'>
                      <MDBInput wrapperClass='mb-4' label='Last name' id='form2' type='text' onChange = {onInput} name = 'lastName'value={lastName}/>
                    </MDBCol>
                  </MDBRow>
                  <MDBInput wrapperClass='mb-4' label='User Name' id='form3' type='text' onChange = {onInput} name = 'userName'value={userName}/>
                  <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' onChange = {onInput} name = 'email' value={email}/>
                  <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' onChange = {onInput} name = 'password' value={password}/>
                  <MDBInput wrapperClass='mb-4' label='Confirm Password' id='form4' type='password' onChange = {onInput} name = 'confirmPassword'value={confirmPassword}/>
                  <div className='d-flex justify-content-center mb-4'>
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />

                  </div>
                  <div className='d-flex justify-content-start flex-column mb-4'>
                    {valErrors.length ? valErrors.map((error)=>{
                        return <span key = {Math.floor(Math.random()*1000)} style = {{color : 'red'}}>{error}</span>
                      }):<></>}
                  </div>

                  <MDBBtn className='w-100 mb-4' type = 'submit'  size='md' style = {{background: 'blue',color: 'white'}}>sign up</MDBBtn>
                </form>
                <div className="text-center">

                  <p>or sign up with:</p>

                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='facebook-f' size="sm"/>
                  </MDBBtn>

                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='twitter' size="sm"/>
                  </MDBBtn>

                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='google' size="sm"/>
                  </MDBBtn>

                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='github' size="sm"/>
                  </MDBBtn>

                </div>

              </MDBCardBody>
            </MDBCard>
          </MDBCol>

        </MDBRow>

      </MDBCard>
    </MDBContainer>
  );
}
}
export default Register;
