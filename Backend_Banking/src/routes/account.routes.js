const express = require("express")
const router = express.Router()
const authmiddleware = require('../middleware/auth.middleware')
const accountcontroller = require('../controllers/account.controller') 


router.post("/" , authmiddleware.authmiddleware,accountcontroller.createaccount )
router.post("/get" , authmiddleware.authmiddleware,accountcontroller.getallacc )
router.get('/balance/:accountid', authmiddleware.authmiddleware , accountcontroller.getbalancecontroller)


module.exports = router
