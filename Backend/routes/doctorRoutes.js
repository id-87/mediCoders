const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma=new PrismaClient()

router.get("/test",(req,res)=>{
    res.send("Doctor route working")
})

router.get('/', async (req, res) => {
        
    try {
        const getDoctors=await prisma.user.findMany({
                where:{type:"doctor"}
        })
        return res.send(getDoctors);
    } catch (err) {
        return res.send("Server error");
    }
});


router.get('/:id', async (req, res) => {
        const id=Number(req.params.id)
    try {
        const docByID=await prisma.user.findUnique({
                where:{id:id}
        })
        return res.send(docByID);
    } catch (err) {
        return res.send("Server error");
    }
});


// router.post('/', async (req, res) => {
//     try {
//         return res.send("Create doctor");
//     } catch (err) {
//         return res.send("Server error");
//     }
// });


// router.put('/:id', async (req, res) => {
//         const{id}=Number(req.params.id)
//     try {
//         return res.send(`Update doctor ID: ${req.params.id}`);
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
