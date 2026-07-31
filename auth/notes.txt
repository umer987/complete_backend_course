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
            url:music.url,
            title:music.title,
            artist:music.artist
        }
    })
    } 


async function createalbum(req,res) {
     
            const {title , musics} = req.body
            const album = await albummodel.create({
                title,
                artist:req.user.id,
                musics:musics
            })
            res.status(201).json({
                message:"RESOURSE CREATRED SUCCESSFULLY",
                album:{
                    id:album._id,
                    title:album.title,
                    artist:album.artist,
                    music:album.musics
                }
            })

        }

async function getallm(req,res) {
    const musics = await musicmodel.find().limit(1).populate("artist")
    res.status(200).json({
        mesage:"musics fetched succussfully",
        musics:musics
    })
}

async function getallalbums(req,res) {
    const album = await albummodel.find()
    res.status(200).json({
        mesage:"album fetched succussfully",
        album:album
    })
}



async function getalbumsbyid(req,res) {
    const albumid = req.params.albumid
    const album = await albummodel.findById(albumid).populate('artist',"username email").populate("musics"
    )
    res.status(200).json({
        mesage:"album fetched succussfully",
        album:album
    })
}
module.exports = {
    createmusic,
    createalbum,
    getallm,
    getallalbums,
    getalbumsbyid
};
