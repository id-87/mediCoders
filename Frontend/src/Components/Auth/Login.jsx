import React from 'react'
import axios from "axios";

import { useState } from 'react';
const Login = () => {
    const [formData,setFormData]=useState({
            
            email:"",
            password:""
        })

    function handleChange(e){
        setFormData({
            ...formData,[e.target.name]: e.target.value,
        });
    }
    async function handleSubmit(e){
        e.preventDefault(); 

    try {
      const response = await axios.post("https://medicoders.onrender.com/auth/login", formData);
      console.log("Success:", response.data);
      alert("Login Successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:<input type="text" id='email' name='email' value={formData.email} onChange={handleChange} /></label>
        <label htmlFor="password">Password:<input type="password" id='password' name='password' value={formData.password} onChange={handleChange} /></label>
        <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Login
