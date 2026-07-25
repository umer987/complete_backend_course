const cors = require('cors')
const express = require('express')
const multer = require('multer')
const app = express()
app.use(cors())
app.use(express.json())
const upload = multer({storage: multer.memoryStorage()})
const uploadfile = require('./services/storage.service')
const postmodel = require('./db/Models/model')





app.post('/create-post',upload.single("image"),async (req,res)=>{
    const result = await uploadfile(req.file.buffer)
    const post = await postmodel.create({
        image:result.url,
        caption: req.body.caption
    })
    return res.status(201).json({
        message:"addedd successfully"
    })
})

app.get('/feed',async (req,res)=>{
    const feeds = await postmodel.find()
    console.log(feeds)
    return res.status(201).json({
        message:"feed data fetched success fully",
        feed:feeds
    })
})

module.exports= app           