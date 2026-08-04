const usermodel = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function authmiddleware(req, res, next) {
    const authHeader = req.headers.authorization || ''

