const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
router.get("/test", (req, res) => {
    res.send("Doctor route working")
})

router.get('/', async (req, res) => {
    try {
        const getDoctors = await prisma.user.findMany({
            where: { type: "doctor" }
        })
        return res.status(200).json(getDoctors);
    } catch (err) {
        console.error('Error fetching doctors:', err);
        return res.status(500).json({ error: "Server error", message: err.message });
    }
});


router.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
        const docByID = await prisma.user.findUnique({
            where: { id: id }
        })
        if (!docByID) {
            return res.status(404).json({ error: "Doctor not found" });
        }
        return res.status(200).json(docByID);
    } catch (err) {
        console.error('Error fetching doctor:', err);
        return res.status(500).json({ error: "Server error", message: err.message });
    }
});


router.post('/', async (req, res) => {
    const { name, email, phone, password, details } = req.body
    try {
        const hashp = await bcrypt.hash(password, 10)
        const resp = await prisma.user.create({
            data: {
                name: name,
                email: email,
                phone: phone,
                password: hashp,
                type: "doctor",
                details: details
            }
        })
        // Don't send password back
        const { password: _, ...doctorData } = resp
        return res.status(201).json(doctorData);
    } catch (err) {
        console.error('Error creating doctor:', err);
        return res.status(500).json({ error: "Server error", message: err.message });
    }
});



router.put('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const { name, email, phone, password, details } = req.body
    let updateData = {}

    if (name) {
        updateData.name = name
    }
    if (email) {
        updateData.email = email
    }
    if (phone) {
        updateData.phone = phone
    }
    if (password) {
        const hashp = await bcrypt.hash(password, 10)
        updateData.password = hashp
    }
    if (details) {
        updateData.details = details
    }

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
            error: "No valid fields provided for update"
        });
    }

    try {
        const resp = await prisma.user.update({
            where: { id: id },
            data: updateData
        })
        // Don't send password back
        const { password: _, ...doctorData } = resp
        return res.status(200).json(doctorData);
    } catch (err) {
        console.error('Error updating doctor:', err);
        return res.status(500).json({ error: "Server error", message: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
        const del = await prisma.user.delete({
            where: { id: id }
        })
        return res.status(200).json({ message: `Deleted doctor ID: ${id}`, data: del });
    } catch (err) {
        console.error('Error deleting doctor:', err);
        return res.status(500).json({ error: "Server error", message: err.message });
    }
});

module.exports = router;
