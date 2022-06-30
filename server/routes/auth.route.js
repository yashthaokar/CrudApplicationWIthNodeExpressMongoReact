const express = require('express')
const authrouter = express.Router()
require('dotenv').config()
const authusers = require('../modals/userSchemaRegister')
const { genToken } = require('../utils/utils')




authrouter.post('/register', async (req, res) => {
    const { email, name, password } = req.body
    if (!email || !name || !password) {
        res.status(404).send("Please Enter All Require Fields")
    }
    try {
        const preUser = await authusers.findOne({ email: email })
        console.log(preUser)
        if (preUser) {
            res.status(404).send("This user is already presented")
        } else {
            const addUser = new authusers({
                name, email, password
            })
            await addUser.save()
            res.status(201).json(addUser)
        }
    } catch (error) {
        res.status(404).send(error.message)
    }

})

// Login Post Route

authrouter.post('/', async (req, res) => {
    const { email } = req.body;
    const password = String(req.body.password)

    if (!email || !password) {
        res.status(404).send("Please enter all require fields")
    }
    try {
        const savedUser = await authusers.findOne({ email: email })
        // console.log(savedUser)
        const token =await genToken({userName:req.body.email})
        if (savedUser) {
            if (password === savedUser.password) {
                res.status(201).json({ message: "Success full login", savedUser: savedUser, token:token })
            } else {
                res.status(404).json({ message: "Password didn't match" })
            }
        } else {
            res.status(404).json("This user is not registered")
        }
    } catch (error) {
        res.status(404).json( error)
    }
})

module.exports = authrouter;