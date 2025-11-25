import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/Home/LandingPage';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import DoctorPortal from './Components/Portals/Doctor/DoctorPortal';
import PatientPortal from './Components/Portals/Patient/PatientPortal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/doctor" element={<DoctorPortal />} />
        <Route path="/patient" element={<PatientPortal />} />
      </Routes>
    </Router>
  );
}

export default App;
