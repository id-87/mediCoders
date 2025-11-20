const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma=new PrismaClient()

router.get('/', async (req, res) => {
    try {
        const resp=await prisma.appointment.findMany()
        return res.send(resp);
    } catch (err) {
        return res.send("Server error");
    }
});

router.get('/:id', async (req, res) => {
    const{id}=Number(req.params.id)
    try {
        const resp=await prisma.appointment.findUnique({
            where:{id:id}
        })
        return res.send(resp);
    } catch (err) {
        return res.send("Server error");
    }
});


// router.post('/', async (req, res) => {
//     try {
//         return res.send("Create appointment");
//     } catch (err) {
//         return res.send("Server error");
//     }
// });


// router.put('/:id', async (req, res) => {
//     try {
//         return res.send(`Update appointment ID: ${req.params.id}`);
//     } catch (err) {
//         return res.send("Server error");
//     }
// });


router.delete('/:id', async (req, res) => {
    const{id}=Number(req.params.id)
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
