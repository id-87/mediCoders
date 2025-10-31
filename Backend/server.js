const express=require("express")
const bcrypt=require("bcrypt")
const app=express()

app.post("/register",async(req,res)=>{
    const {Name,Email,PhoneNumber,Password,Type,Details}=req.body
    const hashp=bcrypt.hash(Password,10)



})
app.get("/",(req,res)=>{
    res.send("Healthy")
})

app.listen(3000,()=>{
    console.log("Server is running")
})