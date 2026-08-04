const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
app.use(express.json())
app.use(cookieParser())
const authroute = require('./routes/auth.route')

app.use('/api/auth' , authroute)


module.exports = app
