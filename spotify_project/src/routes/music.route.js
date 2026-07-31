const express = require('express')
const musiccontroller = require('../controller/music.controller')
const router = express.Router()
const multer = require('multer')
const authmiddleware = require('../middlewares/auth.middleware')
const upload = multer({
    storage:multer.memoryStorage()
})
router.post('/upload',authmiddleware.authartist,upload.single('music'),musiccontroller.createmusic)
router.post('/album' , authmiddleware.authartist,musiccontroller.createalbum)
router.get('/',authmiddleware.authuser ,musiccontroller.getallm )
router.get('/album',authmiddleware.authuser ,musiccontroller.getallalbums )
router.get('/albumid/:albumid',authmiddleware.authuser ,musiccontroller.getalbumsbyid )

module.exports = router
