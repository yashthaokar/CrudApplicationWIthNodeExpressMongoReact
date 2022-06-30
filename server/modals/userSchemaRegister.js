const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{
        type:String,

    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }
})


const authusers =new mongoose.model('loginUser',schema )

module.exports = authusers;