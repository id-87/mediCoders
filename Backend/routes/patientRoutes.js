const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma=new PrismaClient()

router.get('/', async (req, res) => {
    try {
        const resp=await prisma.user.findMany({
            where:{
                type:"patient"
            }
        })
        return res.send("Get all patients");
    } catch (err) {
        return res.send("Server error");
    }
});

router.get('/:id', async (req, res) => {
    const id=Number(req.params.id)
    try {
        const resp=await prisma.user.findUnique({
            where:{id:id}
        })
        return res.send(resp);
    } catch (err) {
        return res.send("Server error");
    }
});


// router.post('/', async (req, res) => {
//     try {
//         return res.send("Create patient");
//     } catch (err) {
//         return res.send("Server error");
//     }
// });


// router.put('/:id', async (req, res) => {
//     try {
//         return res.send(`Update patient ID: ${req.params.id}`);
//     } catch (err) {
//         return res.send("Server error");
//     }
// });


router.delete('/:id', async (req, res) => {
    const id=Number(req.params.id)
    try {
        const del=await prisma.user.delete({
            where:{id:id}
        })
        return res.send(del);
    } catch (err) {
        return res.send("Server error");
    }
});

module.exports = router;
