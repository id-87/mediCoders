const express=require("express")
const { PrismaClient } = require('@prisma/client');


const app=express()

app.get("/",(req,res)=>{
    res.send("Healthy")
})

app.listen(3000,()=>{
    console.log("server is running")
})