const jwt = require("jsonwebtoken");
const musicmodel = require("../db/models/music.model");
const { uploadfile } = require("../services/storage.service");
const albummodel  = require("../db/models/album.model");

async function createmusic(req, res) {
    
    const {title} = req.body
    const file = req.file
    const result = await uploadfile(file.buffer.toString('base64'))
    console.log(result)
    const music = await musicmodel.create({
        url:result.url,
        title:title,
        artist:req.user.id
    })
    res.status(201).json({
        meassage:"MUSIC CREATED SUCCESSFULLY",
        music:{
            id:music._id,
