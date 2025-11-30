const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
router.get("/test", (req, res) => {
    res.send("Patient route working")
})

router.get('/', async (req, res) => {
    try {
        const resp = await prisma.user.findMany({
            where: {
                type: "patient"
            }
        })
        return res.status(200).json(resp);
    } catch (err) {
        console.error('Error fetching patients:', err);
        return res.status(500).json({ error: "Server error", message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
        const resp = await prisma.user.findUnique({
            where: { id: id }
        })
        if (!resp) {
            return res.status(404).json({ error: "Patient not found" });
        }
        return res.status(200).json(resp);
    } catch (err) {
        console.error('Error fetching patient:', err);
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
                type: "patient",
                details: details
            }
        })
        // Don't send password back
        const { password: _, ...patientData } = resp
        return res.status(201).json(patientData);
    } catch (err) {
        console.error('Error creating patient:', err);
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
        const { password: _, ...patientData } = resp
        return res.status(200).json(patientData);
    } catch (err) {
        console.error('Error updating patient:', err);
        return res.status(500).json({ error: "Server error", message: err.message });
    }
});



router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
        const del = await prisma.user.delete({
            where: { id: id }
        })
        return res.status(200).json({ message: `Deleted patient ID: ${id}`, data: del });
    } catch (err) {
        console.error('Error deleting patient:', err);
        return res.status(500).json({ error: "Server error", message: err.message });
    }
});

module.exports = router;
