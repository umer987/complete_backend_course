const usermodel = require('../db/models/user.model')
const jwt = require("jsonwebtoken")


async function register(req, res) {
    console.log('REGISTER BODY:', req.body)
    const { username, email, password } = req.body
    const isuserexist = await usermodel.findOne({
        email
    })
    if(isuserexist){
        return res.status(409).json({
