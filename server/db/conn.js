const mongoose = require('mongoose')
const Db =  "mongodb://localhost:27017/Crud"

mongoose.connect(Db).then(()=>console.log("connection created")).catch((err)=>console.log(err.message))