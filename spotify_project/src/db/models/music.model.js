const  mongoose = require("mongoose");

const musicschema = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }

})
const musicmodel = mongoose.model("music", musicschema)


module.exports = musicmodel
