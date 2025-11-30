const express = require('express')
const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const router = express.Router()


router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password both are required" })
        }
        const user = await prisma.user.findUnique({
            where: { email: email }
        })

        if (!user) {
            return res.status(404).json({ error: "User not found. Please signup first." })
        }
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {

            const atoken = jwt.sign({
                email: user.email, type: user.type, id: user.id
            }
                ,
                process.env.JWT_SECRET || 'default-secret-key-for-development')
            console.log('Login successful for:', user.email, 'Type:', user.type)
            const rtoken = jwt.sign({
                email: user.email,
                type: user.type,
                id: user.id
            }, process.env.JWT_REFRESH_SECRET || 'default-refresh-secret-key-for-development')

            // Return user type directly for frontend routing
            return res.status(200).json({
                message: "Login Successful",
                atoken,
                rtoken,
                type: user.type,  // Add type directly
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    type: user.type,
                    details: user.details
                }
            })


        }
        else {
            return res.status(401).json({ error: "Invalid credentials" })
        }


    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Server error", message: err.message })
    }


})

router.post("/register", async (req, res) => {
    const { name, email, phone, password, type, details } = req.body
    try {
        const hashp = await bcrypt.hash(password, 10)
        const resp = await prisma.user.create({
            data: {
                name: name,
                email: email,
                phone: phone,
                password: hashp,
                type: type,
                details: details
            }
        })
        // Don't send password back
        const { password: _, ...userData } = resp
        return res.status(201).json({
            message: "Registration successful",
            user: userData
        })
    } catch (err) {
        console.error('Registration error:', err)
        if (err.code === 'P2002') {
            return res.status(400).json({ error: "Email or phone already exists" })
        }
        return res.status(500).json({ error: "Server error", message: err.message })
    }



})


module.exports = router