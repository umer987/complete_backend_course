const jwt = require("jsonwebtoken")

async function authartist(req, res, next) {
    const token = req.cookies.token
    if (!token) { return res.status(401).json({ message: "UNAUTHORIZED" }) }
    try {
        const decoded = jwt.verify(token, process.env.JWTSEC)
        if (decoded.role !== "artist") {return res.status(403).json({message: 'YOU DINT HAVE PERMISSION TO CREATE MUSIC'})}
        req.user = decoded
        next();
    }
    catch(err){
        console.log("ERROR OCCURED" , err)
         return res.status(403).json({
                message: 'YOU DINT HAVE PERMISSION TO CREATE MUSIC'
            })
    }
}

async function authuser(req, res, next) {
    const token = req.cookies.token
    if (!token) { return res.status(401).json({ message: "UNAUTHORIZED" }) }
    try {
        const decoded = jwt.verify(token, process.env.JWTSEC)
        if (decoded.role !== "user") {return res.status(403).json({message: 'YOU DINT HAVE PERMISSION TO CREATE MUSIC'})}
        req.user = decoded
        next();
    }
    catch(err){
        console.log("ERROR OCCURED" , err)
         return res.status(403).json({
                message: 'YOU DINT HAVE PERMISSION TO CREATE MUSIC'
            })
    }
}

module.exports = {
    authartist,
    authuser
};
