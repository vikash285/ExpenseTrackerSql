const path = require('path')
const express = require('express')
const expensesAppController = require('../controllers/expensesApp')
const router = express.Router()
const userAuthenticate = require('../middleware/auth')

router.post('/addExpenses', userAuthenticate.authenticate,expensesAppController.postExpenses)

router.post('/addUrls', userAuthenticate.authenticate, expensesAppController.postFileUrls)

router.get('/getExpenses', userAuthenticate.authenticate, expensesAppController.getExpenses)

router.get('/getUrls', userAuthenticate.authenticate, expensesAppController.getFileUrls)

router.get('/download', userAuthenticate.authenticate, expensesAppController.downloadExpense)

router.delete('/deleteExpense/:id/:amount', userAuthenticate.authenticate, expensesAppController.deleteExpense)

module.exports = router