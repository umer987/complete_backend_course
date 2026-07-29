const  mongoose = require("mongoose");
const usermodel = require("../db/models/user.model");
const jwt = require("jsonwebtoken");
const CookieParser = require("cookieparser");

async function register(req,res) {
    console.log("REGISTER USER")
    const {name , father, email} = req.body
    const is_user_exist = await usermodel.findOne({
        email
    })
    if (is_user_exist) {
       return res.status(409).json({
            message:"user also exist"
        })
    }
    const user = await usermodel.create({
        name, father , email
    })
    console.log(user)
    const token = jwt.sign({
        id:user._id
    },process.env.JWTSEC)
    res.cookie("cookie",token)
    res.status(201).json({
        message:"user created",
        user
    })
}


module.exports = {
    register
};
