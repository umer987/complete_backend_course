const mongoose = require('mongoose')
async function conndb() {
    try{
        await mongoose.connect(process.env.DB_CONN)
        console.log('DATABSE CONNECTED')
    }
    catch(err){
        console.log("DATABASE CONNECTIVITY ERROR", err)
    }
}

module.exports = conndb