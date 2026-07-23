const express =require('express')

const app = express()
app.use(express.json())
const notes = []

app.post('/notes' , (req,res)=>{
        notes.push(req.body)
        res.status(201).json({
            message:"resourse created successfully"
        })
    })

app.get('/notes',(req,res)=>{
    res.status(200).json({
        message:"resourse fetched successfully",
        notes:notes
    })
})

app.delete('/notes/:index',(req,res)=>{
    const idx = req.params.index
    delete notes[idx]  //deleting notes
    res.status(200).json({
        message:"idx delete successfully remaings are",
        notes:notes
    })
})


app.patch('/notes/:index',(req,res)=>{
    const idx = req.params.index
    const desc = req.body.desc
    const tit = req.body.title
    notes[idx].desc = desc
    notes[idx].title = tit

    res.status(200).json({
        message:"successfully update"
    })
})

module.exports = app

