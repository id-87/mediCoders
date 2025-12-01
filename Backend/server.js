const express = require("express")
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./routes/authRoutes')
const doctorRoutes = require('./routes/doctorRoutes')
const patientRoutes = require('./routes/patientRoutes')
const appointmentRoutes = require('./routes/appointementRoutes')

const cors = require('cors');

const prisma = new PrismaClient()


const app = express()
app.use(express.json())
app.use(cors({
    origin: true, // Allow all origins for local development
    credentials: true
}));

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});



app.get("/", (req, res) => {
    res.send("Healthy")
})


app.get("/users", async (req, res) => {
    const resp = await prisma.user.findMany()
    console.log(resp)
    return res.send(resp)
})


app.use('/auth', authRoutes)
app.use('/doctors', doctorRoutes)
app.use('/patients', patientRoutes)
app.use('/appointments', appointmentRoutes)

app.listen(3000, () => {
    console.log("server is running")
})