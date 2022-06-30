const bcrypt = require('bcrypt')

const encryptRegisterPassword = async (req, res, next) => {

    try {
        let hash = await bcrypt.hash(req.body.password, 10)
        req.body.password = hash

        next()
    } catch (error) {
        res.status(404).json(error)
    }

}


module.exports = {
    encryptRegisterPassword
}