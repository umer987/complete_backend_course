const jwt = require("jsonwebtoken");
const musicmodel = require("../db/models/music.model");
const { uploadfile } = require("../services/storage.service");
const albummodel  = require("../db/models/album.model");

async function createmusic(req, res) {
    
    const {title} = req.body
