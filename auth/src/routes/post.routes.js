const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")
const usermodel = require("../db/models/user.model")
router.post("/create",async (req,res)=>{
    console.log(req.body)
    const token = req.cookies.token
    try{
    const decoded = jwt.verify(token, process.env.JWTSEC)
    const user = await usermodel.findOne({
        _id : decoded.id
    })
    console.log(user)
    }
    catch(err){
        return res.status(402).json({
            message:"invalid signature"
        })
    }
    if (!token) {
        res.status(401).json({
            message:"unauthorize"
        })
    }
    console.log(req.cookies)
    res.send("post created successfully")
})

module.exports = router