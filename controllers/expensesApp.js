const ExpensesApp = require('../models/expensesApp')

function isStringInvalid (string) {
    if (string === undefined || string.length === 0) {
        return true
    } else {
        return false
    }
}

exports.postExpenses = async(req, res, next) => {
    try {

        const { amount, description, category } = req.body
        if (isStringInvalid(amount) || isStringInvalid(description) || isStringInvalid(category)) {
            return res.status(400).json({ err: 'Bad Parameters, Something is missing.'})
        }
        const data = await ExpensesApp.create({ amount, description, category })
        res.status(201).json({ userExpense: data, message: 'Expense Added!', success: true })
    } catch (err) {
        res.status(500).json({ message: err, success: false })
    }
}

exports.getExpenses = async(req, res, next) => {
    try {
        const data = await ExpensesApp.findAll()
        res.status(200).json({ allExpenses: data })
    } catch (err) {
        res.status(500).json({ message: err, success: false })
    }
}

exports.deleteExpense = async(req, res, next) => {
    try {
    const eId = req.params.id
    await ExpensesApp.destroy({ where: { id: eId }})
    res.sendStatus(200)
    } catch (err) {
        res.status(500).json({ message: err, success: false })
    }
}