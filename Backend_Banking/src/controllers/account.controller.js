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

module.exports = {
    createaccount
};
