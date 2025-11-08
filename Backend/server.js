const express=require("express")
const { PrismaClient } = require('./generated/prisma');
const authRoutes=require('./routes/authRoutes')


const prisma=new PrismaClient()


const app=express()
app.use(express.json())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Healthy")
})


app.get("/users",async(req,res)=>{
    const resp=await prisma.user.findMany()
    console.log(resp)
    return res.send(resp)
})


app.use('/auth',authRoutes)

app.listen(3000,()=>{
    console.log("server is running")
})
