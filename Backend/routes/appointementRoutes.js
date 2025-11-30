const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

router.get("/test", (req, res) => {
    res.send("Appointment route working")
})

router.get('/', async (req, res) => {
    try {
        const resp = await prisma.appointment.findMany({
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        details: true
                    }
                },
                patient: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        details: true
                    }
                }
            }
        })
        return res.status(200).json(resp);
    } catch (err) {
        console.error('Error fetching appointments:', err);
        return res.status(500).json({ error: "Server error", message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
        const resp = await prisma.appointment.findUnique({
            where: { id: id },
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        details: true
                    }
                },
                patient: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        details: true
                    }
                }
            }
        })
        if (!resp) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        return res.status(200).json(resp);
    } catch (err) {
        console.error('Error fetching appointment:', err);
        return res.status(500).json({ error: "Server error", message: err.message });
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
    const { doctorId, patientId, date, reason, status } = req.body

    try {
        const resp = await prisma.appointment.create({
            data: {
                doctorId: doctorId,
                patientId: patientId,
                date: new Date(date),
                reason: reason,
                status: status || 'scheduled'
            },
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        details: true
                    }
                },
                patient: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        details: true
                    }
                }
            }
        })
        return res.status(201).json(resp);
    } catch (err) {
        console.error('Error creating appointment:', err);
        return res.status(500).json({ error: "Server error", message: err.message });
    }
});


router.put('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const { doctorId, patientId, date, reason, status } = req.body
    let updateData = {}

    if (doctorId) {
        updateData.doctorId = doctorId
    }
    if (patientId) {
        updateData.patientId = patientId
    }
    if (date) {
        updateData.date = new Date(date)
    }
    if (reason) {
        updateData.reason = reason
    }
    if (status) {
        updateData.status = status
    }

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
            error: "No valid fields provided for update"
        });
    }

    try {
        const resp = await prisma.appointment.update({
            where: { id: id },
            data: updateData,
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        details: true
                    }
                },
                patient: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        details: true
                    }
                }
            }
        })

        return res.status(200).json(resp);
    } catch (err) {
        console.error('Error updating appointment:', err);
        return res.status(500).json({ error: "Server error", message: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
        const resp = await prisma.appointment.delete({
            where: { id: id }
        })
        return res.status(200).json({ message: `Deleted appointment ID: ${id}`, data: resp });
    } catch (err) {
        console.error('Error deleting appointment:', err);
        return res.status(500).json({ error: "Server error", message: err.message });
    }
});

module.exports = router;
