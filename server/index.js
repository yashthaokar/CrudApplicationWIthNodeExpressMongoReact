require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./db/conn')
const users = require('./modals/userSchema')
const router = require('./routes/router')
const authrouter = require('./routes/auth.route')

const app = express()

app.use(express.json()) 
app.use(cors()) 
const port = 8090;
app.use(express.urlencoded({ extended: false }))

app.use(router) //For API calling

// checking auth present or not token
app.use('/auth', authrouter)

app.listen(port, () => {
    console.log(`server is running at port ${port}`)
})