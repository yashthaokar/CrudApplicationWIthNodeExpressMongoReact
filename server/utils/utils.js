const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const comparePassword = async (hash, originalPassword) => {
    try {
        let result = await bcrypt.compare(originalPassword, hash);
        console.log(result)
        next()
    } catch (error) {
        return false
    }
}

const genToken = async (userdata) => {
    try {
        const token = await jwt.sign(userdata, process.env.SECRET_KEY)
        return token
    } catch (error) {
        return false
    }

}

module.exports = {
    comparePassword,
    genToken
}