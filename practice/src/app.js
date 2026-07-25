const express = require('express')
const multer = require('multer')
const app = express()
app.use(express.json())
const postmodel = require("./db/Models/model")
const upload = multer({Storage:multer.memoryStorage()})
const uploadfiles = require('./services/storage.service')

app.post('/create-post',upload.single("image"),async (req,res) => {
    const result = await uploadfiles(req.file.buffer)
    const post = await postmodel.create({
        image:result.url,
        caption: req.body.caption
    })
     return res.status(201).json({
        message:"addedd successfully"
    })
})


module.exports  = app