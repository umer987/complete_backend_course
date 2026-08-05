const accountmodel = require('../models/account.model')

async function createaccount(req, res) {
    const userId = req.userId || req.user?._id

    if (!userId) {
        return res.status(401).json({
            message: "USER IS NOT LOGIN",
            status: 'failed'
        })
    }

    const account = await accountmodel.create({
        user: userId
    })

    return res.status(201).json({
        message: "ACCOUNT CREATED SUCCESSFULLY",
        account
    })
}

async function getallacc(req,res) {
    const user = await accountmodel.findOne({
        user:req.user._id
    })

    res.status(201).json({
        user,
        message:"account fetched"
    })
}
async function getbalancecontroller(req,res) {
     const { accountid } = req.params;
console.log(req.user);
    const account = await accountmodel.findOne({
        _id: accountid,
        user: req.user._id
    })
console.log("Account ID:", accountid);
console.log("User ID:", req.user._id);
    if (!account) {
        return res.status(404).json({
            message: "Account not found"
        })
    }

    const balance = await account.getBalance();

    res.status(200).json({
        accountId: account._id,
        balance: balance
    })
}
module.exports = {
    createaccount,
    getallacc,
    getbalancecontroller
};
