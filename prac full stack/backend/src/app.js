const cors = require('cors')
const express = require('express')
const multer = require('multer')
const uploadfile = require('./services/storage.service')
const app = express()

const postmodel = require('./db/models/model')
app.use(cors())
app.use(express.json())

const upload = multer({storage:multer.memoryStorage()})



app.post('/create-post',upload.single("image"),async (req,res) => {
    const result = await uploadfile(req.file.buffer)
    const post = await postmodel.create({
        image:result.url,
        caption: req.body.caption
    })
    return res.status(201).json({
        message:"DATA UPLOAD IN DATABASE SUCCESSFULLY"

    })
})

app.get('/feed',async (req,res) => {
    const data = await postmodel.find()
    return res.status(201).json({
        message:"DATA FETCHED SUCCESSFULLY",
        data:data
    })
})


module.exports = app