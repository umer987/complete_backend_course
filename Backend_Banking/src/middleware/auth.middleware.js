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

