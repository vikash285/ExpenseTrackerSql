const path = require('path')
const express = require('express')
const expensesAppController = require('../controllers/expensesApp')
const router = express.Router()
const userAuthenticate = require('../middleware/auth')

router.post('/addExpenses', userAuthenticate.authenticate,expensesAppController.postExpenses)

router.get('/getExpenses', userAuthenticate.authenticate, expensesAppController.getExpenses)

router.delete('/deleteExpense/:id', userAuthenticate.authenticate, expensesAppController.deleteExpense)

module.exports = router