const mongoose = require('mongoose')
const userName = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true
    },
    mobile:{
        type:Number
    },
    address:{
        type:String,
        required:true,
    },
    work:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
  })

  const users = new mongoose.model('users',userName)

  module.exports = users