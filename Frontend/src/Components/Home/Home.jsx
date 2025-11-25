import React from 'react'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'
import DoctorPortal from '../Portals/Doctor/DoctorPortal'
import PatientPortal from '../Portals/Patient/PatientPortal'
const Home = () => {
  return (
    <div>
      <h1>This is the home of MediCoders</h1>
      {/* <Login/> */}
      {/* <Signup/> */}
      <DoctorPortal/>
      <PatientPortal/>
    </div>
  )
}

export default Home
