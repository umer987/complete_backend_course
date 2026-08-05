const express = require("express")
const router = express.Router()
const transctioncontroller = require('../controllers/transction.controller')
const sysmiddleware = require('../middleware/auth.middleware')
router.post('/', transctioncontroller.createtransction)
router.post('/system/initialfunds',sysmiddleware.systemusermiddleware ,transctioncontroller.createinitialfundtransction  )

module.exports = router
