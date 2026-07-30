const express = require('express')
const cookieparser = require('cookie-parser')
const app = express()
const musicroute = require('./routes/music.route')
const authroutes = require('./routes/auth.route')
app.use(express.json())
app.use(cookieparser())

app.use('/api/auth', authroutes)
app.use('/api/music' , musicroute)
module.exports = app