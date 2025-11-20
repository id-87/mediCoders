console.log("Doctor Routes")
// Patch route: /doctor/profile-  doctor profile
// Post route: /doctor/availability-availability of doctor in the format:
        //{"date":"","slots":["","",""]}
// Get route: /doctor/appointments- viewing doctors appointments
// Patch Route: /doctor/appointments/:id/status- for updating a specific appointment

const express=require('express')
const router=express.Router()
const { PrismaClient } = require('@prisma/client');
const prisma=new PrismaClient()

// router.patch('/profile',async(req,res)=>{
//         res.send("doctors profile")
// })
router.post('/availability',async(req,res)=>{
        
        res.send("available slots fed into database")
})