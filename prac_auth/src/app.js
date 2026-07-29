require("dotenv").config()
const express = require('express')
const CookieParser = require("cookie-parser")
const app = express()
app.use(express.json())
app.use(CookieParser())

const authroutes = require('./routes/auth.routes') 
app.use('/api/auth' , authroutes)

module.exports = app;
