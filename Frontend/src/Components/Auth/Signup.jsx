import React from 'react'
import axios from "axios";

import { useState } from 'react';
const Signup = () => {
    const [dropdownValue, setDropdownValue] = useState("");
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        phone:"",
        password:"",
        type:"",
        details:""
    })

    const handleChange = (e) => {
    setFormData({
            ...formData,[e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault(); // stops page refresh

    try {
      const response = await axios.post("http://localhost:5000/register", formData);
      console.log("Success:", response.data);
      alert("User registered!");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };












  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name<input type="text" id='name' name='name' value={formData.name} onChange={handleChange} /></label>
        <label>Email<input type="text" id='email' name='email' value={formData.email} onChange={handleChange}/></label>
        <label>Phone<input type="text" id='phone' name='phone' value={formData.phone} onChange={handleChange}/></label>
        <label>Password<input type="password" id='password' name='password' value={formData.password} onChange={handleChange}/></label>
        <label>
        User Type:
        <select
          id='type'
          name='type'
          value={formData.userType}
        onChange={handleChange}
        >
          {/* <option value="">-- Select --</option> */}
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
          
        </select>
      </label>
        <label>Details<input type="text" id='details' name='details'  value={formData.details} onChange={handleChange}/></label>
      </form>
    </div>
  )
}

export default Signup
