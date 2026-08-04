const jwt = require('jsonwebtoken')
const usermodel = require('../models/user.model')

async function createuser(req,res) {
    const { email,password,name } = req.body
    try{
    const is_user_exist = await usermodel.findOne({
        email
    })
    if(is_user_exist){
       return res.status(422).json({
            message:"USER ALREADY EXIST YOU CANT MAKE ACCOUNT IN IT",
            status:"FAILED"
        })
 }
    const user = await usermodel.create({
        email,password,name
    })
    const token =  jwt.sign({userid:user._id},process.env.JWTSEC,{expiresIn:'3d'})
    res.cookie("token", token)
    res.status(201).json({
        message:"USER CREATED SUCCESSFULLY",
        status:"SUCCESSFULLY",
        user:{
            email:user.email,
            name: user.name
        }
    })
   
}
catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            status: "FAILED",
            error: error.message
        });
}

}

async function loginuser(req,res) {
    const { email,password } = req.body
    try{
    const user = await usermodel.findOne({
        email
    }).select("+password")
        if (!user) {
            return res.status(422).json({
                message: "USER NOT FOUND",
                status: "FAILED"
            })
        }
        const validuser = await user.comparePassword(password)
        if(!validuser){
            return res.status(422).json({
                message: "USER NOT FOUND",
                status: "FAILED"
            })
        }
    const token =  jwt.sign({userid:user._id},process.env.JWTSEC,{expiresIn:'3d'})
    
res.cookie("token", token)
    res.status(200).json({
        message:"USER LOGIN SUCCESSFULLY",
        status:"SUCCESSFULLY",
        user:{
            email:user.email,
            name: user.name
        }
    })




    }
    catch(error){
         console.error(error);
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            status: "FAILED",
            error: error.message
        });
    }
}

module.exports = {
    createuser,
    loginuser
};
