const allowAcess = (req, res, next) => {

    const token = req.headers.token
        if(token){
            
            next()
        }else{
        res.status(404).json({message:"You are restricted to access"})
        }
}

module.exports = {
    allowAcess
}