const transctionmodel = require("../models/transction.model.js")
const ledgermodel = require("../models/ledger.model.js")
const accountmodel = require('../models/account.model')
const emailservice = require('../services/email.service')
const { default: mongoose } = require("mongoose")

async function createtransction(req, res) {
    const { fromaccount, toaccount, amount, idempotencykey } = req.body
     if (!fromaccount || !toaccount || !amount || !idempotencykey) {
        return res.status(400).json({
            message: "toaccount, amount, idempotencykey is missing"
        })
    }
    const fromuseraccount = await accountmodel.findOne({ _id: fromaccount })
    const touseraccount = await accountmodel.findOne({ _id: toaccount })
   if (!fromuseraccount || !touseraccount) {
        return res.status(400).json({
            message: "INVALID ACCOUNT"
        })
    }
  const validatekey = await transctionmodel.findOne({
    idempotencykey:idempotencykey
  })
  if (idempotencykey) {
    if (validatekey.status == "COMPLETED") {
         return res.status(400).json({
            message: "TRANSCTION ALSO COMPLETED",
            validatekey
        })
    }
     if (validatekey.status == "PENDING") {
         return res.status(400).json({
            message: "TRANSCTION IS STILL IN PROCESS",
            
        })
       
    }
     if (validatekey.status == "FAILED") {
         return res.status(500).json({
            message: "TRANSCTION FAILED",
            
        })}
    if (validatekey.status == "REVERSED") {
         return res.status(500).json({
            message: "TRANSCTION IS REVERSED PLEASE TRY AGAIN WITH ANOTHER KEY",
            
        })}
    }
 if (fromuseraccount.status !== "ACTIVE" || touseraccount.status !== "ACTIVE") {
        return res.status(400).json({
            message: "Both fromAccount and toAccount must be ACTIVE to process transaction"
        })
    }

const balance = await fromuseraccount.getBalance()
if(balance  < amount ){
    return res.status(400).json({
        message:"INSUFFUCENT BALANCE"
    })
}

 const session = await mongoose.startSession()
    session.startTransaction()
    const transction = await transctionmodel.create({
        fromaccount,
        toaccount,
        amount,
        idempotencykey,
        status: 'PENDING'
    },{session})

    const debitledgerentry = await ledgermodel.create({
        account:fromaccount,
        amount:amount ,
        transction:transction._id,
        type:"DEBIT"
    },{session})
    const creditledgerentry = await ledgermodel.create({
        account: toaccount,
        amount:amount,
        transction:transction._id,
        type:"CREDIT"
    },{session})


       transction.status = "COMPLETED"
       await transction.save({session})

    await session.commitTransaction()
    session.endSession()

    return res.status(201).json({
        message: "TRANSCTION COMPLETE SUSSCCFULLY",
        transction
    })



}


async function createinitialfundtransction(req, res) {
    const { toaccount, amount, idempotencykey } = req.body
    if (!toaccount || !amount || !idempotencykey) {
        return res.status(400).json({
            message: "toaccount, amount, idempotencykey is missing"
        })
    }
    const touseraccount = await accountmodel.findOne({ _id: toaccount })

    if (!touseraccount) {
        return res.status(400).json({
            message: "INVALID ACCOUNT"
        })
    }
    const fromuseraccount = await accountmodel.findOne({
        user: req.user._id
    })
    console.log(fromuseraccount)
    if (!req.user.systemuser) {
        return res.status(400).json({
            message: "ACCOUNT NOT FIND"
        })
    }
    const session = await mongoose.startSession()
    session.startTransaction()
    const transction = new transctionmodel({
        FromAccount: fromuseraccount._id,
        ToAccount: toaccount,
        amount,
        idempotencykey,
        status: 'PENDING'
    })

    const debitledgerentry = await ledgermodel.create([{
        account: fromuseraccount._id,
        amount:amount,
        transction:transction._id,
        type:"DEBIT"
    }],{session})
    const creditledgerentry = await ledgermodel.create([{
        account: toaccount,
        amount:amount,
        transction:transction._id,
        type:"CREDIT"
    }],{session})


       transction.status = "COMPLETED"
       await transction.save({session})

    await session.commitTransaction()
    session.endSession()

    return res.status(201).json({
        message: "initial funds completed",
        transction
    })
}


module.exports = { createtransction, createinitialfundtransction }
