const usermodel = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function authmiddleware(req, res, next) {
    const authHeader = req.headers.authorization || ''
 
    const token = req.cookies?.token || bearerToken

    if (!token) {
        return res.status(401).json({
            message: "USER IS NOT LOGIN",
            status: 'failed'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTSEC)
        const userId = decoded?._id || decoded?.id

        if (!userId) {
            return res.status(401).json({
                message: "UNAUTHORIZED ACCESS: INVALID TOKEN PAYLOAD",
                status: 'failed'
            })
        }

        const user = await usermodel.findById(userId)

        if (!user) {
            return res.status(401).json({
                message: "USER NOT FOUND",
                status: 'failed'
            })
        }

        req.user = user
        req.userId = user._id
        return next()
    }
    catch (err) {
        return res.status(401).json({
            message: `UNAUTHORIZED ACCESS ${err}`,
            status: 'failed'
        })
    }
}

module.exports = { authmiddleware }
