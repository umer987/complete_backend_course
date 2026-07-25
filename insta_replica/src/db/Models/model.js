const mongoose =require('mongoose')

const postschema = new mongoose.Schema({
    image:String,
    captions:String
})

const postmodel = mongoose.model("post",postschema)


module.exports = postmodel