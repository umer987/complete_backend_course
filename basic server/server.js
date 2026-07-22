const express = require('express') //importing server

const app = express() //making server calass instance
app.get("/",(req,res)=>{    
    res.send("HELLO WORLD")
})
app.get('/about',(req,res)=>{
    res.send("HELLO FROM ABOUT")
})
app.listen(3000)