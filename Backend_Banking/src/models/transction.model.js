const mongoose = require("mongoose");
const transctionschema = new mongoose.Schema({
    fromaccount:{
        type:mongoose.Schema.ObjectId,
        ref:"account",
        required:[true,"Transction must be with an accosiated account"],
        index:true
    },
    toaccount:{
        type:mongoose.Schema.ObjectId,
        ref:"account",
        required:[true,"Transction must be to accosiated account"],
        index:true
    },
    status:{
        type:String,
        enum:{
            values:["PENDING" , "COMPLETED", "FAILED" , "REVERSED"]
        },
    default:"PENDING"
    },
    amount:{
        type:Number,
        required:[true , "AMOUNT IS REQUIRED FOR CREATING TRANSCTION"],
        min:[0, "AMOUNT CAN BE > 0 OR IN POSITIVE NUMBER "]
    },
    idempotencykey:{
        type:String,
        required:[true,"KEY MUST REQUIRED FOR MAKE TRANSCION IN PROCESS"],
        index:true,
        unique:true
    }

},{timestamps:true})

const transctionmodel = mongoose.model("transction" , transctionschema)
module.exports =  transctionmodel
