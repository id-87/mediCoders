const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma=new PrismaClient()
const bcrypt=require('bcrypt')
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


router.post('/', async (req, res) => {
    const {name,email,phone,password,details}=req.body
    const hashp=await bcrypt.hash(password,10)
    try {
        const resp=await prisma.user.create({
            data:{
                name:name,
                email:email,
                phone:phone,
                password:hashp,
                type:"doctor",
                details:details
            }
        })
    } catch (err) {
        return res.send("Server error");
    }
});



router.put('/:id', async (req, res) => {
    const{name,email,phone,password,details}=req.body
    let arr=[]
    if(name){
        arr.push({"name":name})
    }
    if(email){
        arr.push({"email":email})
    }
    if(phone){
        arr.push({"phone":phone})
    }
    if(password){
        const hashp=await bcrypt.hash(password,10)
        arr.push({"password":hashp})
    }
    if(details){
        arr.push({"details":details})
    }

    if (Object.keys(arr).length === 0) {
        return res.status(400).json({
            message: "No valid fields provided for update"
        });
    }


    try {
        const resp=await prisma.user.update({
            where:{id:id},data:arr
        })

        return res.send("Patient's profile updated successfully")
    } catch (err) {
        return res.send("Server error");
    }
});


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
