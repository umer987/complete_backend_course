// const express = require('express')
// const router = express.Router()
// const authcontroller = require('../controller/auth.controller')
// console.log("AUTHCONTROLLER:", authcontroller)
// router.post('/register', authcontroller.register)
// router.get('/test', (req,res)=>{
//     console.log(req.cookies)
//     res.json({
//         message:"cookieess",
//        cookies: req.cookies
//     })
// })
// module.exports = router



const express = require('express')
const router = express.Router()
const authcontroller = require('../controller/auth.controller')
console.log("AUTHCONTROLLER:", authcontroller)
router.post('/register', authcontroller.register)


// router.get('/test', (req,res)=>{
//     console.log(req.cookies)
//     res.json({
//         message:"cookieess",
//        cookies: req.cookies
//     })
// })
module.exports = router