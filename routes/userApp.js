const path = require('path')
const express = require('express')
const userAppController = require('../controllers/userApp')
const router = express.Router()

router.post('/signUP', userAppController.postLogin)

router.post('/login', userAppController.postSignUp)

module.exports = router