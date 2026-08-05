const mongoose = require("mongoose");
const ledgerschema = new mongoose.Schema({
    account:{
        type:mongoose.Schema.ObjectId,
        ref:'account',
        required:[true,"ACCOUNT DETAILS IS REQUIRED FOR MAINTAIN THE LEDGER"],
        index:true,
        immuteable:true
    },
    amount:{
        type:Number,
        ref:'transction',
        immuteable:true,
        index:true
    },
    type:{
        type:String,
        enum:{
            values:["CREDIT" , "DEBIT"]
        },
        immuteable:true,
        required:[true,"TYPE IS REQUIRED FOR MAINTAIN THE LEDGER"],



    }
})


function PreventModification(){
    throw new Error("LEDGER ENTRIES CANOT BE MODIFY ALL ARE IMMUTEABLE")
}

ledgerschema.pre('findOneAndUpdate',PreventModification)
ledgerschema.pre('updateOne',PreventModification)
ledgerschema.pre('deleteOne',PreventModification)
ledgerschema.pre('remove',PreventModification)


const ledgermodel = mongoose.model("ledger",ledgerschema)

module.exports = ledgermodel
