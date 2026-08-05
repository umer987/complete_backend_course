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
    required:[true,"PASSWORD IS REQUIRED TO CREATE A ACCOUNT"],
    minlength:[6,"PASSWORD SHOULD CONTAIN MORE THAN 6 CHARACTER"],
    select:false
    },
    systemuser:{
      type:Boolean,
      default:false,
      immutable:true,
      select:false
    }
},{timestamps:true})

 userschema.pre("save" , async function () {
    if(!this.isModified("password")){
        return 
        }
        const hash = await bcrypt.hash(this.password, 10)
        this.password = hash
        return 
 })

 userschema.methods.comparePassword  = async function(password) {
    return await bcrypt.compare(password , this.password)
 }

 const usermodel =  mongoose.model('user' , userschema)

 module.exports = usermodel
 