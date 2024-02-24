const express = require('express')
const { comment } = require('../controller/comment')
const router = express.Router()




router.post('/send',comment)

module.exports = router
