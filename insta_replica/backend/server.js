require('dotenv').config()
const app = require('./src/app')
const connect_db = require('./src/db/db')

connect_db()
app.listen(3000,()=>{
    console.log("SERVER STARTED")
})