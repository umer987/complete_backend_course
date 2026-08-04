const express = require("express")
const router = express.Router()
const authmiddleware = require('../middleware/auth.middleware')
const accountcontroller = require('../controllers/account.controller') 


router.post("/" , authmiddleware.authmiddleware,accountcontroller.createaccount )



module.exports = router
