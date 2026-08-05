const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
app.use(express.json())
app.use(cookieParser())
const authroute = require('./routes/auth.route')
const accountroute = require('./routes/account.routes') 
const transctionroutes = require('./routes/transction.routes')

