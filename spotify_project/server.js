require('dotenv').config()
const app = require('./src/app')
const conndb = require('./src/db/db')
conndb()
const port = 3000
 app.listen(port,()=>{
    console.log("SERVER IS RUNNING ON PORT" , port)
 })