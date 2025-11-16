const express=require('express')
const bcrypt=require('bcrypt')
const { PrismaClient } = require('@prisma/client');
const prisma=new PrismaClient()
    const router=express.Router()

    router.post('/login',async(req,res)=>{
        const {email,password}=req.body
        try{
            if(!email || !password){
            return res.send("Username and password both are required")
        }
        const user=await prisma.user.findUnique({
            where:{email:email}
        })
        
        if(!user){
            return res.send("Signup first")
        }
        const auth=await bcrypt.compare(password,user.password)
        if(auth){
            return res.send("login successful")
            // authentication token session wagera generate karna hai ab

        }
        else{
            return res.send("Credentials invalid")
        }


        }
        catch(err){
            console.log(err)
            return res.send("server error")
        }
        
        
    })

    router.post("/register",async(req,res)=>{
        const{name,email,phone,password,type,details}=req.body
        const hashp=await bcrypt.hash(password,10)
        const resp=await prisma.user.create({
            data:{
                name:name,
                email:email,
                phone:phone,
                password:hashp,
                type:type,
                details:details
            }
        })
        return res.send(resp)
    
    
    
    })


module.exports=router