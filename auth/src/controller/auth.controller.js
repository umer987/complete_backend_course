const usermodel = require('../db/models/user.model')
const jwt = require("jsonwebtoken")


async function register(req, res) {
    console.log('REGISTER BODY:', req.body)
