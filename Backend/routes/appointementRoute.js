console.log("get appointment by appointment id accessible by both doctor and patient")
//GET: /appointments/id
const express=require('express')
const router=express.Router()
const { PrismaClient } = require('@prisma/client');
const prisma=new PrismaClient()

// router.get("/appointments/",async(req,res)=>{
//     // const {id}=req.query.id
//     const resp=await prisma.appointment.findMany()
//     res.send(resp)

// })


router.get("/appointments/:id",async(req,res)=>{
    const {id}=req.params.id
    const resp=await prisma.appointment.findUnique({
        where:{id:id}
    })
    res.send(resp)

})