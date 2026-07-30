const jwt = require("jsonwebtoken");
const musicmodel = require("../db/models/music.model");
const { uploadfile } = require("../services/storage.service");

async function createmusic(req, res) {
    const token = req.cookies.token
    try {
        const decoded = jwt.verify(token, process.env.JWTSEC)
        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: 'YOU DINT HAVE PERMISSION TO CREATE MUSIC'
            })
        }
    
    const {title} = req.body
    const file = req.file
    const result = await uploadfile(file.buffer.toString('base64'))
    console.log(result)
    const music = await musicmodel.create({
        url:result.url,
        title:title,
        artist:decoded.id
    })
    res.status(201).json({
        meassage:"MUSIC CREATED SUCCESSFULLY",
        music:{
            id:music._id,
            url:music.url,
            title:music.title,
            artist:music.artist
        }
    })
    }
    catch (err) {
        console.log(err)
        return res.status(401).json({
            message: "unauthorized"
        })
    }
}


module.exports = {
    createmusic
};
