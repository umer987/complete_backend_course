const mongoose = require('mongoose')

async function connect_db() {
    await  mongoose.connect('mongodb+srv://umershakir987_db_user:H421TNMM7RV7bW5p@try.ujkebyk.mongodb.net/instadb')
    console.log("BD CONNECTED")
}

module.exports = connect_db