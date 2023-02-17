const path = require('path')
const express = require('express')
const userAppController = require('../controllers/userApp')
const router = express.Router()

router.post('/signUP', userAppController.postUserApp)

module.exports = router