import React, { useEffect } from 'react'
import axios from "axios";

import { useState } from 'react';
const Login = () => {
    const [formData,setFormData]=useState({
            
            email:"",
            password:""
        })

        const[user, setUser] = useState("Loading");

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
      const { atoken, rtoken } = response.data || {};
      if (atoken && rtoken) {
        localStorage.setItem("accessToken", atoken);
        // atoken -> patient, doctor
        localStorage.setItem("refreshToken", rtoken);
        // setUser(user);
      } else {
        // setUser(null);
      }
      // console.log(response)
      alert("Login Successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
    }

    // useEffect(() => {
    //   if(user){
    //     if
    //   }
    // }, [user])
  return (
    // {
      user === "Loading" ? <h2>Loading</h2> : user ? (user.type === "patient" ? <div></div> : <p></p>) : <h1>Login</h1>
    // }
    // <div>
    //     <form onSubmit={handleSubmit}>
    //     <label htmlFor="email">Email:<input type="text" id='email' name='email' value={formData.email} onChange={handleChange} /></label>
    //     <label htmlFor="password">Password:<input type="password" id='password' name='password' value={formData.password} onChange={handleChange} /></label>
    //     <button type='submit'>Submit</button>
    //     </form>
    // </div>
  )
}

export default Login
