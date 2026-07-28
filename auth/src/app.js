require('dotenv').config()
const express = require("express")
const cookieparser = require('cookie-parser')
const app = express()
const postroutes = require('./routes/post.routes')

app.use(express.json())
app.use(cookieparser())


console.log("APP.JS LOADED")


const authroutes = require('./routes/auth.routes')
app.use('/api/auth', authroutes)
app.use('/api/post', postroutes)


module.exports = app