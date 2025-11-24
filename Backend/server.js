const express=require("express")
const { PrismaClient } = require('@prisma/client');
const authRoutes=require('./routes/authRoutes')
const doctorRoutes=require('./routes/doctorRoutes')
const patientRoutes=require('./routes/patientRoutes')
const appointmentRoutes=require('./routes/appointementRoutes')

const cors = require('cors');

const prisma=new PrismaClient()


const app=express()
app.use(express.json())
app.use(cors());
// app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Healthy")
})


app.get("/users",async(req,res)=>{
    const resp=await prisma.user.findMany()
    console.log(resp)
    return res.send(resp)
})


app.use('/auth',authRoutes)
app.use('/doctors',doctorRoutes)
app.use('/patients',patientRoutes)
app.use('/appointments',appointmentRoutes)

app.listen(3000,()=>{
    console.log("server is running")
})