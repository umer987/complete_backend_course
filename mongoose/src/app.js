const express =require('express')
const app = express()
const notemodel = require('./db/Models/notes.model')
app.use(express.json())

app.post('/note',async (req,res)=>{
    const data = req.body
    console.log(data)
    await notemodel.create({
        title:data.title,
        desc:data.desc,
    })
    res.status(201).json({
        message: "note created successfully"
        
    })
})

app.get('/note',async (req,res)=>{
//const data = await notemodel.find({ title:'new one'}) condition in find also put it in findOne() 
  const data = await notemodel.find()  //also findOne() for find specific item
    res.status(201).json({
        message:"data fetched",
        data:data
    })
})

app.delete('/note/:id',async (req ,res) => {
    const id =req.params.id
    await notemodel.findOneAndDelete({
        _id:id
    })
    const data = await notemodel.find()
    res.status(201).json({
        message: "record deleted kindly review",
        data:data
    })
})

app.patch('/note/:id', async (req,res) => {
    const id = req.params.id
    const desc = req.body.desc
    await notemodel.findOneAndUpdate({_id:id },{desc:desc})
     res.status(201).json({
        message: "record deleted kindly review",
    })

})
module.exports = app