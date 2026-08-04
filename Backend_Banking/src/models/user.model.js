const mongoose  = require('mongoose')
const bcrypt = require("bcryptjs")

const userschema = new mongoose.Schema({
  email:{
    type:String,
    required:[true, "EMAIL CANT BE EMPTY"],
    trim:true,
    lowercase:true,
    match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/],
    unique:[true,"EMAIL ALREADY EXISIT"]
  }  ,
  name:{
    type:String,
    required:[true,"NAME IS REQUIRED TO CREATE A ACCOUNT"]
  },
    password:{
    type:String,
