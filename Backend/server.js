const express=require("express")
const { PrismaClient } = require('./generated/prisma');

const prisma=new PrismaClient()


const app=express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Healthy")
})


app.post("/register",async(req,res)=>{
    const{name,email,phone,password,type,details}=req.body
    const resp=await prisma.user.create({
        data:{
            name:name,
            email:email,
            phone:phone,
            password:password,
            type:type,
            details:details
        }
    })

})

app.listen(3000,()=>{
    console.log("server is running")
})