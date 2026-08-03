const mongoose = require('mongoose')


async function connect_db() {
    try{
        await mongoose.connect(process.env.DB_CONN)
        console.log("DATABASE CONNECTED")
    }
    catch(err){
        console.log("ERROR OCCURED WHILE CONNECTING TO DATABASE ", err)
    }
}

module.exports = connect_db
