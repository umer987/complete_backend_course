const mongoose = require('mongoose')

async function connect_db() {
    await  mongoose.connect(process.env.DB_CONN)
    console.log("db CONNECTED")
}

module.exports = connect_db