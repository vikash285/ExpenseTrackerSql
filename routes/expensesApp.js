const path = require('path')
const express = require('express')
const expensesAppController = require('../controllers/expensesApp')
const router = express.Router()

router.post('/addExpenses', expensesAppController.postExpenses)

router.get('/getExpenses', expensesAppController.getExpenses)

router.delete('/deleteExpense/:id', expensesAppController.deleteExpense)

module.exports = router