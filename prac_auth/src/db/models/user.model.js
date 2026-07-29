const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    name:String,
    father:String,
    email:{
        unique:true,
        type:String
    }
})

const usermodel = mongoose.model("nuser",userschema)
module.exports = usermodel

