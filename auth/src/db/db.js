const mongoose = require('mongoose')

async function condb() {
    await mongoose.connect(process.env.DB_CONN)
    console.log("DATABASE CONNECTED")
}

module.exports = condb