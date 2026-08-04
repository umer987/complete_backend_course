const mongoose  = require('mongoose')
const bcrypt = require("bcryptjs")

const userschema = new mongoose.Schema({
  email:{
    type:String,
    required:[true, "EMAIL CANT BE EMPTY"],
    trim:true,
