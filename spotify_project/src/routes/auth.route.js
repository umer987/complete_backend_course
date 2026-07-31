const express = require('express')
const router = express.Router()
const authcontroller = require('../controller/auth.controller')

router.post('/register' ,  authcontroller.register_user)
router.post('/login' , authcontroller.loginuser)
router.post('/logout' , authcontroller.logout)

module.exports = router
