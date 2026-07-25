const mongoose =require('mongoose')

async function connectdb(){
  await  mongoose.connect(process.env.DB_CONN)
  console.log("DATABASE CONNECTED")
}

module.exports = connectdb

