const express =require('express')
const app = express()
const notemodel = require('./db/Models/notes.model')
app.use(express.json())

app.post('/note',async (req,res)=>{
    const data = req.body
    await notemodel.create({
        title:data.title,
        desc:data.desc
    })
    res.status(201).json({
        message: "note created successfully"
    })
})


module.exports = app