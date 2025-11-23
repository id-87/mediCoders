const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma=new PrismaClient()

router.get("/test",(req,res)=>{
    res.send("Appointment route working")
})

router.get('/', async (req, res) => {
    try {
        const resp=await prisma.appointment.findMany()
        return res.send(resp);
    } catch (err) {
        return res.send("Server error");
    }
});

router.get('/:id', async (req, res) => {
    const id=Number(req.params.id)
    try {
        const resp=await prisma.appointment.findUnique({
            where:{id:id}
        })
        return res.send(resp);
    } catch (err) {
        return res.send("Server error");
    }
});


// model Appointment {
//   id         Int               @id @default(autoincrement())
//   doctorId   Int
//   patientId  Int
//   date       DateTime
//   reason     String?
//   status     AppointmentStatus @default(scheduled)

//   doctor     User              @relation("DoctorAppointments", fields: [doctorId], references: [id])
//   patient    User              @relation("PatientAppointments", fields: [patientId], references: [id])
// }

router.post('/', async (req, res) => {
    const{doctorId,patientId,date,reason,status}=req.body
    
    try {
        const resp=await prisma.appointment.create({
            data:{
                doctorId:doctorId,
                patientId:patientId,
                date:date,
                reason:reason,
                status:status
            }
        })
    } catch (err) {
        return res.send("Server error");
    }
});


router.put('/:id', async (req, res) => {
    const{doctorId,patientId,date,reason,status}=req.body
    let arr=[]
    if(doctorId){
        arr.push({"doctorId":doctorId})
    }
    if(patientId){
        arr.push({"patientId":patientId})
    }
    if(date){
        arr.push({"date":date})
    }
    if(reason){
        arr.push({"reason":reason})
    }
    if(status){
        arr.push({"status":status})
    }

    if (Object.keys(arr).length === 0) {
        return res.status(400).json({
            message: "No valid fields provided for update"
        });
    }


    try {
        const resp=await prisma.appointment.update({
            where:{id:id},data:arr
        })

        return res.send("Appointment updated successfully")
    } catch (err) {
        return res.send("Server error");
    }
});


router.delete('/:id', async (req, res) => {
    const id=Number(req.params.id)
    try {
        const resp=await prisma.appointment.delete({
            where:{id:id}
        })
        return res.send(`Delete appointment ID: ${req.params.id}`);
    } catch (err) {
        return res.send("Server error");
    }
});

module.exports = router;
