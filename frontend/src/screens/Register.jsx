
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
import {useState} from 'react'


function Register() {
  const [valErrors,setValErrors]=useState([]);
  const onSubmit = async (e) =>{
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/register`,
                              {
                                method: 'POST',
                                mode: 'cors',
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify(
                                      {
                                      firstName : e.target.elements.firstName,
                                      lastName : e.target.elements.lastName,
                                      userName : e.target.elements.userName,
                                      email : e.target.elements.email
                                      }),
                              })
    const validationErrors = await res.json();
    setValErrors(validationErrors)
    console.log(res.status)
    console.log('PROMISE?')
    console.log("HELLO",validationErrors)
    // return validationErrors
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
                <form type = 'submit' handlesubmit = {onSubmit}>
                  <MDBRow>
                    <MDBCol col='6'>
                      <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text' name = 'firstName'/>
                    </MDBCol>

                    <MDBCol col='6'>
                      <MDBInput wrapperClass='mb-4' label='Last name' id='form2' type='text' name = 'lastName'/>
                    </MDBCol>
                  </MDBRow>
                  <MDBInput wrapperClass='mb-4' label='User Name' id='form3' type='text' name = 'userName'/>
                  <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' name = 'email'/>
                  <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' name = 'password'/>
                  <MDBInput wrapperClass='mb-4' label='Confirm Password' id='form4' type='password' name = 'confirmPassword'/>
                  <div className='d-flex justify-content-center mb-4'>
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
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

export default Register;
