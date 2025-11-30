import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api';
import '../../medical-theme.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }


  function decodeJWT(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', formData);
      console.log('=== LOGIN DEBUG ===');
      console.log('Full API Response:', JSON.stringify(response.data, null, 2));

      const responseData = response.data || {};
      const { atoken, rtoken, type, userType, user } = responseData;


      if (atoken && rtoken) {
        localStorage.setItem('accessToken', atoken);
        localStorage.setItem('refreshToken', rtoken);
      }


      let accountType = type || userType;


      if (!accountType && user) {
        console.log('User object found:', user);
        accountType = user.type || user.userType || user.role || user.accountType;
      }


      if (!accountType) {
        accountType = responseData.role || responseData.accountType;
      }


      if (!accountType && atoken) {
        console.log('Decoding JWT token to extract user type...');
        const decoded = decodeJWT(atoken);
        console.log('Decoded JWT payload:', decoded);
        if (decoded) {
          accountType = decoded.type || decoded.userType || decoded.role;
        }
      }

      console.log('Detected User Type:', accountType);
      console.log('Type check - is doctor?', accountType === 'doctor');
      console.log('Type check - is patient?', accountType === 'patient');

      if (accountType) {
        localStorage.setItem('userType', accountType);
      }

      alert('Login Successful!');


      if (accountType === 'doctor') {
        console.log('✓ Redirecting to DOCTOR portal');
        navigate('/doctor');
      } else if (accountType === 'patient') {
        console.log('✓ Redirecting to PATIENT portal');
        navigate('/patient');
      } else {
        console.log('⚠ No user type detected, defaulting to patient portal');
        console.log('Available fields in response:', Object.keys(responseData));
        navigate('/patient');
      }
    } catch (error) {
      console.error('Login Error:', error);
      console.error('Error Response:', error.response?.data);
      alert('Login failed. Please check your credentials.');
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-light)' }}>
      <div className="card" style={{ maxWidth: '450px', width: '100%', margin: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '8px', color: 'var(--primary-color)' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-light)' }}>Login to access your MediCodes account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Login
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', color: 'var(--text-light)' }}>
          Don't have an account? <Link to="/signup" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Sign Up</Link>
        </div>

        <div style={{ marginTop: '15px', textAlign: 'center' }}>
          <Link to="/" style={{ color: 'var(--text-light)', fontSize: '14px' }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
