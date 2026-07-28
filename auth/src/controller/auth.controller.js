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
            message:"user already exist"
        })
    }
    
    console.log(username, email, password)
    const user = await usermodel.create({
        username, email, password
    })
    const token = jwt.sign({
        id: user._id
    }, process.env.JWTSEC)
    res.cookie("token", token)
    res.status(201).json({
        message: "USER CREATED SUCCESSFULLY",
        user
    })
}

module.exports = { register }