console.log("Patient Routes accessible only to patients")
// GET: /doctors
// GET: /doctors/:id
//POST: /appointments
//GET: /appointments

const express=require('express')
const router=express.Router()
const { PrismaClient } = require('@prisma/client');
const prisma=new PrismaClient()

router.get("/doctors",async(req,res)=>{
    const resp=await prisma.user.findMany({
        where:{type:"doctor"}
    })
    res.send(resp)
})
router.get("/doctors/:id",async(req,res)=>{
    const {id}=req.params.id

    const resp=await prisma.user.findUnique({
        where:{id:id}
    })
    res.send(resp)
})
router.post("/appointments",async(req,res)=>{
    const{doctorID,date,slot}=req.body
    const resp=await prisma.appointment.create({
        data:{
            doctorID:doctorID,
            date:date,
            slot:slot
        }
    })

})


router.get("/appointments/",async(req,res)=>{
    // const {id}=req.query.id
    const resp=await prisma.appointment.findMany()
    res.send(resp)

})